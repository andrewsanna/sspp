// ============================================
// Octoechos (the Eight Tones): hymn texts for follow-along.html
//
// Labels and texts come from the Choir Director. Each hymn is
//   { label, title, english, phonetic, greek, credit, music }
//   - "label" is the small gold heading; "title" (optional) is the hymn's name.
//   - "credit" (optional): composer / arranger line, shown in small text.
//   - "music" (optional): path to a sheet-music image (e.g. in images/hymns/);
//     adds a "View music" button that opens it full screen.
//   - Line breaks: put \n where a new line should start.
//   - Leave phonetic / greek as OCTOECHOS_PLACEHOLDER until they're ready;
//     the page then shows the English with a short "coming soon" note.
//
// OCTOECHOS[1–8]: the hymns for that tone.
// OCTOECHOS.everySunday: hymns sung every week whatever the tone, shown in the
// "Every Sunday" section above the tone tabs (in the order they're sung).
// Tones 5–8 are the plagal tones (Plagal of the 1st–4th Tone).
// ============================================
const OCTOECHOS_PLACEHOLDER = 'Coming soon';

const resurrectional = (tone, title, english) => ({
  label: 'Resurrectional Apolytikion · ' + tone,
  title: title,
  english: english,
  phonetic: OCTOECHOS_PLACEHOLDER,
  greek: OCTOECHOS_PLACEHOLDER,
});

const OCTOECHOS = {
  1: [resurrectional('First Tone', 'Although Your Tomb Was Sealed',
    'Although Your tomb was sealed with a stone by the Judaeans and Your most sacred body, O Savior, was guarded by the soldiers, You rose on the third day, O Christ, and gave life to all the world. Wherefore, all the heavenly powers proclaimed that You are the Giver of Life. Glory to Your Resurrection O Christ. Glory to Your Kingdom. Glory to Your dispensation O You who alone love mankind.')],

  2: [resurrectional('Second Tone', 'When You Descended',
    'When You descended to the realm of death, You as Life immortal, rendered to Hades a mortal blow by Your all-radiant divinity; and when You raised the dead, from the infernal depths and from the darkness below, all the hosts of heavenly powers proclaimed and cried out to You: O life giving Christ our God, glory to You.')],

  3: [resurrectional('Third Tone', 'Come Rejoice All Ye Heavens',
    'Come rejoice all ye Heavens and be glad all ye on earth. For by His power the Lord created might, by His death He conquered death. For He became the first born of the dead. From the depths of Hades He delivered us, and He granted to mankind His great mercy.')],

  4: [resurrectional('Fourth Tone', 'The Joyful News',
    'When the women disciples of the Lord learned from the angel the joyful news of the resurrection, which cast away from them the ancestral condemnation, they proudly proclaimed the news to the Apostles: Death has been vanquished; for Christ our God has risen from the dead and granted to the world His great mercy.')],

  5: [resurrectional('Plagal of the First Tone', 'The Eternal Word',
    'Eternal with the Father and the Spirit is the Word, Who was begotten of the Virgin for our salvation. As the faithful, we both praise and worship Him; for He consented to ascend the Cross in the flesh and to endure death. Thus, He raised the dead unto life through His all-glorious resurrection.')],

  6: [resurrectional('Plagal of the Second Tone', 'The Angelic Powers',
    'When the angelic powers appeared at Your tomb and those who guarded You became as though dead, and standing by Your sepulcher was Mary seeking Your pure and sacred body. For You did vanquish Hades and uncorrupted by its touch, You came unto the Virgin Woman bestowing the gift of life. O You who rose from the dead. Lord we give glory to You.')],

  7: [resurrectional('Plagal of the Third Tone', 'By Death on the Cross',
    'By death on the Cross, O Lord, You shattered death. You opened up paradise to the lowly thief. You turned the sorrow of the myrrhbearers into joy. You sent Your apostles to preach the glad tidings: that You, O Christ our God, had risen from the dead and granted to the world Your great mercy.')],

  8: [resurrectional('Plagal of the Fourth Tone', 'You Descended from on High',
    'You descended from on high, O merciful Lord, You accepted the cross and three days to free us from the bondage of sin, O our life and our resurrection, Glory to You O Lord.')],
};

// Sung every week, whatever the tone
OCTOECHOS.everySunday = [
  {
    label: 'Apolytikion of Saints Peter & Paul',
    english: 'O Leaders of the Apostles and teachers of the world, intercede with the Master of all, that He may grant peace to the world, and to our souls the great mercy.',
    phonetic: OCTOECHOS_PLACEHOLDER,
    greek: OCTOECHOS_PLACEHOLDER,
  },
  {
    label: 'Kontakion of the Theotokos',
    english: 'O unfailing protection of Christians, and our faithful advocate before the Creator: though we are sinners, do not ignore our entreaty; but in your goodness grant your timely help to us who appeal to you in faith. Quickly make intercession; on our behalf make speedy supplication, O Theotokos, for you always protect those who honor you.',
    phonetic: OCTOECHOS_PLACEHOLDER,
    greek: OCTOECHOS_PLACEHOLDER,
  },
  {
    label: 'Hymn to the Theotokos',
    english: 'It is truly meet to bless you, O Theotokos, ever-blessed and most pure, and the Mother of our God. More honorable than the Cherubim, and beyond compare more glorious than the Seraphim, who without stain didst give birth to God the Word. True Theotokos, we magnify you!',
    phonetic: OCTOECHOS_PLACEHOLDER,
    greek: OCTOECHOS_PLACEHOLDER,
  },
  {
    label: 'Communion Hymn · Ordinary Sundays',
    title: 'Praise the Lord',
    greek: 'Αινείτε τον Κύριον εκ των ουρανών. Αινείτε αυτόν εν τοις υψίστοις. Αλληλούια.',
    // Phonetic spelling to be checked by the Choir Director.
    phonetic: 'Ay-NEE-teh ton KEE-ree-on ek ton oo-ra-NON. Ay-NEE-teh af-TON en tees ee-PSEE-stees. Al-li-LOO-ee-a.',
    english: 'Praise the Lord. Praise Him from the heavens. Praise Him. Praise Him. Praise Him in the highest. Alliluia.',
    credit: 'Music: Alexander Georges · English adaptation: Vivian G. Cardwell',
    music: 'images/hymns/communion-hymn-praise-the-lord.png',
  },
];
