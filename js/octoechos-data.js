// Hymns for follow-along.html.
// - Texts come from the choir's sheet music; Greek is the standard liturgical text.
// - Phonetic: null = "Coming soon". Fill in from the choir books so the site matches
//   what singers see on Sunday (to be checked by the Choir Director).
// - SHOW_MUSIC: set to false to hide all "View music" buttons (e.g. until the
//   parish confirms permission to post the arrangements).
const SHOW_MUSIC = true;

const TONE_NAMES = {
  1: 'Tone 1', 2: 'Tone 2', 3: 'Tone 3', 4: 'Tone 4',
  5: 'Tone 5 · Plagal 1', 6: 'Tone 6 · Plagal 2', 7: 'Tone 7 · Plagal 3', 8: 'Tone 8 · Plagal 4'
};

const everySunday = [
  {
    label: 'Apolytikion · Our parish hymn',
    title: 'Hymn of Saints Peter and Paul',
    english: "O Leaders of the apostles and teachers of the world, intercede with the Master of all, that He may grant peace to the world and to our souls the great mercy.",
    greek: "Οι των Αποστόλων πρωτόθρονοι και της οικουμένης διδάσκαλοι, τω Δεσπότη των όλων πρεσβεύσατε, ειρήνην τη οικουμένη δωρήσασθαι και ταις ψυχαίς ημών το μέγα έλεος.",
    phonetic: null,
    credit: '',
    music: 'images/hymns/hymn-sts-peter-paul.png'
  },
  {
    label: 'Kontakion · Ordinary Sundays',
    title: 'The Ordinary Kontakion (Prostasia)',
    english: "O unfailing protection of Christians, and our faithful advocate before the Creator: though we are sinners, do not ignore our entreaty; but in your goodness, grant your timely help to us who appeal to you in faith. Quickly make intercession; on our behalf make speedy supplication, O Theotokos, for you always protect those who honor you.",
    greek: "Προστασία των Χριστιανών ακαταίσχυντε, μεσιτεία προς τον Ποιητήν αμετάθετε, μη παρίδης αμαρτωλών δεήσεων φωνάς, αλλά πρόφθασον ως αγαθή εις την βοήθειαν ημών των πιστώς κραυγαζόντων σοι· τάχυνον εις πρεσβείαν και σπεύσον εις ικεσίαν, η προστατεύουσα αεί, Θεοτόκε, των τιμώντων σε.",
    phonetic: null,
    credit: 'Music: K. Lawrence',
    music: 'images/hymns/kontakion-prostasia.png'
  },
  {
    label: 'Hymn to the Theotokos · Megalynarion',
    title: 'It Is Truly Meet',
    english: "It is truly meet to bless thee, O Theotokos, ever blessed and most pure and the Mother of our God. More honorable than the Cherubim and beyond compare more glorious than the Seraphim, who without stain didst give birth to God the Word, true Theotokos, we magnify thee.",
    greek: "Άξιόν εστιν ως αληθώς μακαρίζειν σε την Θεοτόκον, την αειμακάριστον και παναμώμητον και μητέρα του Θεού ημών. Την τιμιωτέραν των Χερουβείμ και ενδοξοτέραν ασυγκρίτως των Σεραφείμ, την αδιαφθόρως Θεόν Λόγον τεκούσαν, την όντως Θεοτόκον σε μεγαλύνομεν.",
    phonetic: null,
    credit: 'M. B. Petrovich · Based on the Neo-Byzantine 1st Plagal Mode',
    music: 'images/hymns/it-is-truly-meet.png'
  },
  {
    label: 'Communion Hymn · Ordinary Sundays',
    title: 'Praise the Lord',
    english: "Praise the Lord. Praise Him from the heavens. Praise Him. Praise Him. Praise Him in the highest. Alliluia.",
    greek: "Αινείτε τον Κύριον εκ των ουρανών. Αινείτε αυτόν εν τοις υψίστοις. Αλληλούια.",
    phonetic: "Ay-NEE-teh ton KEE-ree-on ek ton oo-ra-NON. Ay-NEE-teh af-TON en tees ee-PSEE-stees. Al-li-LOO-ee-a.",
    credit: 'Music: Alexander Georges · English adaptation: Vivian G. Cardwell',
    music: 'images/hymns/communion-hymn-praise-the-lord.png'
  }
];

const tones = {
  1: [{
    label: 'Resurrectional Apolytikion',
    title: 'Although Your Tomb Was Sealed with a Stone',
    english: "Although Your tomb was sealed with a stone by the Judaeans and Your most sacred body, O Savior, was guarded by the soldiers, You rose on the third day, O Christ, and gave life to all the world. Wherefore all the heavenly Powers proclaimed that You are the Giver of Life. Glory to Your Resurrection, O Christ. Glory to Your Kingdom. Glory to Your Dispensation, O You, who alone love mankind.",
    greek: "Του λίθου σφραγισθέντος υπό των Ιουδαίων και στρατιωτών φυλασσόντων το άχραντόν σου σώμα, ανέστης τριήμερος, Σωτήρ, δωρούμενος τω κόσμω την ζωήν. Διά τούτο αι Δυνάμεις των ουρανών εβόων σοι, Ζωοδότα· δόξα τη αναστάσει σου, Χριστέ, δόξα τη βασιλεία σου, δόξα τη οικονομία σου, μόνε φιλάνθρωπε.",
    phonetic: null,
    credit: 'English adaptation: Vivian G. Cardwell',
    music: 'images/hymns/resurrectional-tone-1.png'
  }],
  2: [{
    label: 'Resurrectional Apolytikion',
    title: 'When You Descended',
    english: "When You descended to the realm of death, You as Life immortal, rendered to Hades a mortal blow by Your all radiant divinity; and when You raised the dead from the infernal depths and from the darkness below, all the hosts of heav'nly pow'rs proclaimed and cried out to You: O life-giving Christ, our God, glory to You.",
    greek: "Ότε κατήλθες προς τον θάνατον, η Ζωή η αθάνατος, τότε τον Άδην ενέκρωσας τη αστραπή της θεότητος· ότε δε και τους τεθνεώτας εκ των καταχθονίων ανέστησας, πάσαι αι Δυνάμεις των επουρανίων εκραύγαζον· Ζωοδότα Χριστέ ο Θεός ημών, δόξα σοι.",
    phonetic: null,
    credit: '',
    music: 'images/hymns/resurrectional-tone-2.png'
  }],
  3: [{
    label: 'Resurrectional Apolytikion',
    title: 'Come Rejoice All Ye Heavens',
    english: "Come rejoice all ye Heavens and be glad all ye on earth. For by His pow'r the Lord created might, by His death He conquered death. For He became the firstborn of the dead. From the depths of Hades He delivered us, and He granted to mankind His great mercy.",
    greek: "Ευφραινέσθω τα ουράνια, αγαλλιάσθω τα επίγεια, ότι εποίησε κράτος εν βραχίονι αυτού ο Κύριος· επάτησε τω θανάτω τον θάνατον, πρωτότοκος των νεκρών εγένετο· εκ κοιλίας Άδου ερρύσατο ημάς, και παρέσχε τω κόσμω το μέγα έλεος.",
    phonetic: null,
    credit: '',
    music: 'images/hymns/resurrectional-tone-3.png'
  }],
  4: [{
    label: 'Resurrectional Apolytikion',
    title: 'The Joyful News',
    english: "When the women disciples of the Lord learned from the angel the joyful news of the resurrection which cast away from them the ancestral condemnation, they proudly proclaimed the news to the Apostles: Death has been vanquished; for Christ our God has risen from the dead and granted to the world His great mercy.",
    greek: "Το φαιδρόν της Αναστάσεως κήρυγμα εκ του Αγγέλου μαθούσαι αι του Κυρίου μαθήτριαι, και την προγονικήν απόφασιν απορρίψασαι, τοις Αποστόλοις καυχώμεναι έλεγον· Εσκύλευται ο θάνατος, ηγέρθη Χριστός ο Θεός, δωρούμενος τω κόσμω το μέγα έλεος.",
    phonetic: null,
    credit: 'Fr. George Scoulas · Vivian G. Cardwell',
    music: 'images/hymns/resurrectional-tone-4.png'
  }],
  5: [{
    label: 'Resurrectional Apolytikion',
    title: 'The Eternal Word',
    english: "Eternal with the Father and the Spirit is the Word, Who was begotten of the Virgin for our salvation. As the faithful, we both praise and worship Him; for He consented to ascend the cross in the flesh and to endure death. Thus He raised the dead unto life through His all glorious resurrection.",
    greek: "Τον συνάναρχον Λόγον Πατρί και Πνεύματι, τον εκ Παρθένου τεχθέντα εις σωτηρίαν ημών, ανυμνήσωμεν πιστοί και προσκυνήσωμεν· ότι ηυδόκησε σαρκί ανελθείν εν τω σταυρώ, και θάνατον υπομείναι, και εγείραι τους τεθνεώτας εν τη ενδόξω αναστάσει αυτού.",
    phonetic: null,
    credit: 'English adaptation: Vivian G. Cardwell',
    music: 'images/hymns/resurrectional-tone-5.png'
  }],
  6: [{
    label: 'Resurrectional Apolytikion',
    title: 'The Angelic Powers',
    english: "When the angelic powers appeared at Your tomb and those who guarded You became as though dead, and standing by Your sepulchre was Mary seeking Your pure and sacred body. For You did vanquish Hades and uncorrupted by its touch You came unto the virgin woman, bestowing the gift of life. O You who rose from the dead, Lord, we give glory to You.",
    greek: "Αγγελικαί Δυνάμεις επί το μνήμα σου, και οι φυλάσσοντες απενεκρώθησαν, και ίστατο Μαρία εν τω τάφω, ζητούσα το άχραντόν σου σώμα. Εσκύλευσας τον Άδην, μη πειρασθείς υπ' αυτού· υπήντησας τη Παρθένω, δωρούμενος την ζωήν. Ο αναστάς εκ των νεκρών, Κύριε, δόξα σοι.",
    phonetic: null,
    credit: '',
    music: 'images/hymns/resurrectional-tone-6.png'
  }],
  7: [{
    label: 'Resurrectional Apolytikion',
    title: 'By Death on the Cross, Lord',
    english: "By death on the cross, O Lord, You shattered death. You opened up paradise to the lowly thief. You turned the sorrow of the myrrhbearers into joy. You sent Your apostles to preach the glad tidings: that You, O Christ our God, had risen from the dead and granted to the world Your great mercy.",
    greek: "Κατέλυσας τω σταυρώ σου τον θάνατον, ηνέωξας τω ληστή τον Παράδεισον· των Μυροφόρων τον θρήνον μετέβαλες, και τοις σοις Αποστόλοις κηρύττειν επέταξας, ότι ανέστης, Χριστέ ο Θεός, παρέχων τω κόσμω το μέγα έλεος.",
    phonetic: null,
    credit: 'English adaptation: Vivian G. Cardwell',
    music: 'images/hymns/resurrectional-tone-7.png'
  }],
  8: [{
    label: 'Resurrectional Apolytikion',
    title: 'You Descended from On High',
    english: "You descended from on high, O merciful Lord. You accepted the cross and three days in the tomb to free us from the bondage of sin, O our life and resurrection. Glory to You, O Lord.",
    greek: "Εξ ύψους κατήλθες ο εύσπλαγχνος, ταφήν κατεδέξω τριήμερον, ίνα ημάς ελευθερώσης των παθών· η ζωή και η ανάστασις ημών, Κύριε, δόξα σοι.",
    phonetic: null,
    credit: 'English adaptation: Vivian G. Cardwell',
    music: 'images/hymns/resurrectional-tone-8.png'
  }]
};
