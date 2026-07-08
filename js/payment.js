// ============================================
// SSPP shared payment/registration page logic
// Reads ?item=KEY from the URL, resolves it against payment-data.js
// (type smart defaults + entry overrides), and drives the 3-step flow.
// Only submitPayment()'s actual charge is a stub — everything else,
// including dynamic fields and price-impact math, is fully working.
// ============================================

let currentItem = null;
let selectedOptionId = null;
let customAmountCents = 0;
let quantity = 1;

function initPaymentPage() {
  const params = new URLSearchParams(window.location.search);
  const itemKey = params.get('item');
  const raw = PAYMENT_ITEMS[itemKey];

  if (!raw) {
    document.getElementById('payTitle').textContent = 'Payment not found';
    document.getElementById('paySubtitle').textContent =
      'This payment link looks incomplete or out of date. Please go back and try again.';
    document.querySelector('.pay-steps').style.display = 'none';
    document.querySelector('.pay-body').style.display = 'none';
    document.querySelector('.pay-return-link').style.display = 'none';
    return;
  }

  currentItem = resolvePaymentItem(raw);

  document.getElementById('payHeaderIcon').className = `ti ${currentItem.icon || 'ti-credit-card'}`;
  document.getElementById('payTitle').textContent = currentItem.title;
  document.getElementById('paySubtitle').textContent = currentItem.subtitle || '';

  const returnTo = currentItem.returnTo || { url: 'index.html', label: 'Home' };
  document.getElementById('payReturnLabel').textContent = `Back to ${returnTo.label}`;
  document.getElementById('payReturnLink').href = returnTo.url;
  document.getElementById('paySuccessReturn').textContent = `Back to ${returnTo.label}`;
  document.getElementById('paySuccessReturn').href = returnTo.url;

  renderStep1();
  renderStep2Fields();
  bindNav();
  updateSummary();
}

// ---------- Step 1: amount ----------
function renderStep1() {
  const tiersWrap = document.getElementById('payTiersWrap');
  const customWrap = document.getElementById('payCustomWrap');
  const qtyWrap = document.getElementById('payQtyWrap');

  if (currentItem.mode === 'tiers' && currentItem.options) {
    tiersWrap.innerHTML = currentItem.options.map((opt) => `
      <div class="pay-tier-card" data-option-id="${opt.id}">
        <span class="pay-tier-name">${opt.label}</span>
        <span class="pay-tier-amount">${formatCents(opt.amount)}</span>
      </div>
    `).join('');

    tiersWrap.querySelectorAll('.pay-tier-card').forEach((card) => {
      card.addEventListener('click', () => {
        tiersWrap.querySelectorAll('.pay-tier-card').forEach((c) => c.classList.remove('is-selected'));
        card.classList.add('is-selected');
        selectedOptionId = card.dataset.optionId;
        customAmountCents = 0;
        document.getElementById('payCustomAmount').value = '';
        document.querySelectorAll('#payChipRow .pay-chip').forEach((c) => c.classList.remove('is-selected'));
        validateStep1();
        updateSummary();
      });
    });
  } else {
    tiersWrap.innerHTML = '';
  }

  if (currentItem.allowCustomAmount) {
    customWrap.style.display = 'block';
    const chipRow = document.getElementById('payChipRow');
    const amounts = currentItem.suggestedAmounts || [];
    chipRow.innerHTML = amounts.map((cents) => `
      <button type="button" class="pay-chip" data-amount="${cents}">${formatCents(cents)}</button>
    `).join('');

    chipRow.querySelectorAll('.pay-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        chipRow.querySelectorAll('.pay-chip').forEach((c) => c.classList.remove('is-selected'));
        chip.classList.add('is-selected');
        customAmountCents = parseInt(chip.dataset.amount, 10);
        document.getElementById('payCustomAmount').value = (customAmountCents / 100).toFixed(2);
        selectedOptionId = null;
        document.querySelectorAll('.pay-tier-card').forEach((c) => c.classList.remove('is-selected'));
        validateStep1();
        updateSummary();
      });
    });

    document.getElementById('payCustomAmount').addEventListener('input', (e) => {
      const dollars = parseFloat(e.target.value);
      customAmountCents = isNaN(dollars) ? 0 : Math.round(dollars * 100);
      selectedOptionId = null;
      document.querySelectorAll('.pay-tier-card, #payChipRow .pay-chip').forEach((c) => c.classList.remove('is-selected'));
      validateStep1();
      updateSummary();
    });
  }

  if (currentItem.allowQuantity) {
    qtyWrap.style.display = 'block';
    document.getElementById('payQtyMinus').addEventListener('click', () => {
      quantity = Math.max(1, quantity - 1);
      document.getElementById('payQtyVal').textContent = quantity;
      updateSummary();
    });
    document.getElementById('payQtyPlus').addEventListener('click', () => {
      quantity += 1;
      document.getElementById('payQtyVal').textContent = quantity;
      updateSummary();
    });
  }
}

function validateStep1() {
  const hasSelection = selectedOptionId !== null || customAmountCents > 0;
  document.getElementById('payToStep2').disabled = !hasSelection;
}

// ---------- Step 2: dynamic fields ----------
function renderStep2Fields() {
  const container = document.getElementById('payDynamicFields');
  const fields = currentItem.fields || [];
  container.innerHTML = fields.map(renderField).join('');

  fields.forEach((f) => {
    const el = document.getElementById(`field-${f.id}`);
    if (!el) return;
    const evt = f.type === 'checkbox' ? 'change' : 'input';
    el.addEventListener(evt, updateSummary);
  });
}

function renderField(f) {
  const requiredMark = f.required ? '' : ' <span>(optional)</span>';
  switch (f.type) {
    case 'text':
      return `
        <div class="pay-field">
          <label for="field-${f.id}">${f.label}${requiredMark}</label>
          <input type="text" id="field-${f.id}" ${f.required ? 'required' : ''}>
        </div>`;
    case 'number':
      return `
        <div class="pay-field">
          <label for="field-${f.id}">${f.label}${requiredMark}</label>
          <input type="number" id="field-${f.id}" min="0" step="1" ${f.required ? 'required' : ''}>
        </div>`;
    case 'textarea':
      return `
        <div class="pay-field pay-field-full">
          <label for="field-${f.id}">${f.label}${requiredMark}</label>
          <textarea id="field-${f.id}" rows="2" ${f.required ? 'required' : ''}></textarea>
        </div>`;
    case 'select': {
      const opts = f.options.map((o) => (typeof o === 'string' ? { label: o } : o));
      return `
        <div class="pay-field">
          <label for="field-${f.id}">${f.label}${requiredMark}</label>
          <select id="field-${f.id}" ${f.required ? 'required' : ''}>
            ${opts.map((o) => `<option value="${escapeAttr(o.label)}">${o.label}</option>`).join('')}
          </select>
        </div>`;
    }
    case 'checkbox':
      return `
        <div class="pay-field pay-field-full pay-field-checkbox">
          <label>
            <input type="checkbox" id="field-${f.id}">
            ${f.label}
          </label>
        </div>`;
    default:
      return '';
  }
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}

// ---------- Totals (base amount + quantity + field price impacts) ----------
function getUnitAmountCents() {
  if (selectedOptionId) {
    const opt = currentItem.options.find((o) => o.id === selectedOptionId);
    return opt ? opt.amount : 0;
  }
  return customAmountCents;
}

// Returns [{ label, amount }] for every field currently adding/subtracting
// from the price — a select option with a priceImpact, a checked checkbox
// with a priceImpact, or a number field with a pricePerUnit.
function getFieldPriceImpacts() {
  const fields = currentItem.fields || [];
  const impacts = [];

  fields.forEach((f) => {
    const el = document.getElementById(`field-${f.id}`);
    if (!el) return;

    if (f.type === 'select' && f.options) {
      const opts = f.options.map((o) => (typeof o === 'string' ? { label: o } : o));
      const chosen = opts.find((o) => o.label === el.value);
      if (chosen && chosen.priceImpact) {
        impacts.push({ label: chosen.label, amount: chosen.priceImpact });
      }
    } else if (f.type === 'checkbox' && f.priceImpact && el.checked) {
      impacts.push({ label: f.label, amount: f.priceImpact });
    } else if (f.type === 'number' && f.pricePerUnit) {
      const val = parseInt(el.value, 10) || 0;
      if (val > 0) {
        impacts.push({ label: `${f.label} × ${val}`, amount: f.pricePerUnit * val });
      }
    }
  });

  return impacts;
}

function getTotalCents() {
  const unit = getUnitAmountCents();
  const qty = currentItem.allowQuantity ? quantity : 1;
  const base = unit * qty;
  const impactTotal = getFieldPriceImpacts().reduce((sum, i) => sum + i.amount, 0);
  return Math.max(0, base + impactTotal);
}

function formatCents(cents) {
  const sign = cents < 0 ? '–' : '';
  return `${sign}$${Math.abs(cents / 100).toFixed(2)}`;
}

function updateSummary() {
  const linesEl = document.getElementById('paySummaryLines');
  const totalEl = document.getElementById('paySummaryTotal');
  const unit = getUnitAmountCents();

  if (unit === 0) {
    linesEl.innerHTML = `<span style="opacity:.5;">Select an amount to continue</span>`;
    totalEl.textContent = '$0.00';
    return;
  }

  const baseLabel = selectedOptionId
    ? currentItem.options.find((o) => o.id === selectedOptionId).label
    : currentItem.title;

  const qty = currentItem.allowQuantity ? quantity : 1;
  const lines = [{ label: `${baseLabel}${qty > 1 ? ` × ${qty}` : ''}`, amount: unit * qty }];
  lines.push(...getFieldPriceImpacts());

  linesEl.innerHTML = lines.map((l) => `
    <div class="pay-summary-line">
      <span>${l.label}</span>
      <span>${formatCents(l.amount)}</span>
    </div>
  `).join('');

  totalEl.textContent = formatCents(getTotalCents());
}

// ---------- Step navigation ----------
function goToStep(step) {
  document.querySelectorAll('.pay-panel').forEach((p) => p.classList.remove('is-active'));
  document.querySelector(`.pay-panel[data-panel="${step}"]`).classList.add('is-active');

  document.querySelectorAll('.pay-step').forEach((s) => {
    const n = parseInt(s.dataset.step, 10);
    s.classList.toggle('is-active', n === step);
    s.classList.toggle('is-done', n < step);
  });
}

function bindNav() {
  document.getElementById('payToStep2').addEventListener('click', () => goToStep(2));
  document.getElementById('payToStep3').addEventListener('click', () => {
    if (!validateStep2()) return;
    goToStep(3);
  });
  document.querySelectorAll('[data-back]').forEach((btn) => {
    btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.back, 10)));
  });
  document.getElementById('payComplete').addEventListener('click', submitPayment);
}

function validateStep2() {
  const name = document.getElementById('payName').value.trim();
  const email = document.getElementById('payEmail').value.trim();
  if (!name || !email) {
    alert('Please enter your name and email to continue.');
    return false;
  }

  const missing = (currentItem.fields || []).find((f) => {
    if (!f.required) return false;
    const el = document.getElementById(`field-${f.id}`);
    return el && !el.value.trim();
  });
  if (missing) {
    alert(`Please fill in "${missing.label}" to continue.`);
    return false;
  }

  return true;
}

// ---------- Submit ----------
// TODO: once Stripe or Square is chosen, tokenize the card via the
// processor's JS SDK (mounted into #card-element), then send the
// token + purchaser info + all field values + getTotalCents() to the
// serverless charge endpoint. Show success on a real confirmation.
function submitPayment() {
  const btn = document.getElementById('payComplete');
  const label = document.getElementById('payCompleteLabel');
  const spinner = document.getElementById('paySpinner');

  btn.disabled = true;
  label.textContent = 'Processing…';
  spinner.style.display = 'inline-block';

  setTimeout(() => {
    const total = formatCents(getTotalCents());
    document.getElementById('paySuccessMsg').textContent =
      `Your payment of ${total} for ${currentItem.title} was received. A confirmation has been sent to ${document.getElementById('payEmail').value}.`;
    goToStep('success');
  }, 900);
}

document.addEventListener('DOMContentLoaded', initPaymentPage);
