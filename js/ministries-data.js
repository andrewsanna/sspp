// ============================================
// SSPP Get Involved — Ministry data
//
// To add a new ministry: copy any object below and edit its fields.
// To mark a ministry inactive: set inactive: true (it will still show,
// labeled "Currently Inactive", at the end of its category).
// To give a ministry its own dedicated page later (instead of just the
// popup), add: detailPageUrl: 'ministries/goya.html' — a "View full
// page →" link will automatically appear in its popup.
// Order within each category array = display order (ease-of-entry first).
// ============================================

const MINISTRY_CATEGORIES = [
  {
    id: 'worship',
    label: 'Worship & Liturgical Life',
    blurb: 'Ways to serve during the Divine Liturgy and other services.',
    ministries: [
      {
        name: 'Greeters / Ushers',
        summary: 'Welcome and seat worshipers on Sunday mornings.',
        description: 'On Sunday mornings, a rotation of groups assist in greeting and seating worshipers, and receiving offerings at end of Divine Liturgy. Serving as an greeter is an important ministry to welcome parishioners and visitors, as well as creating an orderly environment for worship. Greeters serve once every nine or ten weeks and must be at Church by 9:00 AM and stand throughout the Liturgy. During Holy Week Ushers usually serve one or two times; as well as intermittently during the week at other times in the year.',
        // image: 'images/ministries/greeters.jpg',
        contact: {
          name: 'Bo LaMotte',
          role: 'Group Leader',
          email: 'ushers@ssppglenview.org',
      },
      },
      {
        name: 'Choir and Chanters',
        summary: 'Lead the musical expression of our faith during services.',
        description: 'Music and singing are an integral part of worship in the Orthodox Church. The musical expression of our faith is led by both Chanters and our Choir, yet all the faithful are encouraged to raise their voice in song during the services.',
        image: 'images/ministries/choir.jpg',
        contact: {
          name: 'Therese Speropoulos',
          role: 'Choir Director',
          email: 'Choir@ssppglenview.org',
      },
        contact: {
          name: 'Chris Atsaves',
          role: 'Chanter',
          email: 'Chanters@ssppglenview.org',
      },
      },
      {
        name: 'Readers',
        summary: 'Read psalms and epistles during services.',
        description: 'During services, lay persons are called upon to read psalms, epistles, and other texts as part of the liturgical life of the parish.',
        // image: 'images/ministries/readers.jpg',
        contact: {
          name: 'TBD',
          role: 'TBD',
          email: 'readers@ssppglenview.org',
      },
      },
      {
        name: 'Prosphora Bakers',
        summary: 'Bake the offering bread used in the Divine Liturgy.',
        description: 'Prosphora is the Greek word for offerings, and refers to the bread offered by the faithful to God to be sanctified in the Holy Eucharist. Baking prosphora is a unique and tangible way for Orthodox Christians to actively participate in the Divine Liturgy. Each week several parishioners bake prosphora on behalf of the entire community.',
        image: 'images/prosphora-kids.jpg',
        contact: {
          name: 'Tracy Ronstadt',
          role: 'Group Leader',
          email: 'prosphora@ssppglenview.org',
      },
      },
      {
        name: 'Myrrhbearers',
        summary: 'Girls (1st–12th grade) serving in the liturgical life of the parish.',
        description: 'Provides opportunities for our girls to participate in the liturgical life of our parish. Open to girls in 1st through 12th grade.',
        image: 'images/myrrhbearers.jpg',
        contact: {
          name: 'TBD',
          role: 'TBD',
          email: 'myrrhbearers@ssppglenview.org',
      },
      },
      {
        name: 'Acolytes',
        summary: 'Boys 8+ assisting the clergy in the Holy Altar.',
        description: 'Upon reaching 8 years old, boys are invited to become acolytes. An acolyte is someone who assists the clergy in the divine services, especially during Sunday Divine Liturgy. Service in the Holy Altar is a beautiful ministry of the Church which spiritually enriches the acolytes and the whole community. Acolytes are assigned to one of two teams, which alternate Sundays throughout the year. Spiritual Father: Fr. Rick.',
        image: 'images/ministries/acolytes.jpg',
        contact: {
          name: 'Steven Thell',
          role: 'Youth Director',
          email: 'acolytes@ssppglenview.org',
      },
      },
    ],
  },

  {
    id: 'children',
    label: "Children's Education",
    blurb: 'Structured programs for children, from preschool through Sunday school.',
    ministries: [
      {
        name: 'Church School',
        summary: 'Sunday morning religious education following Divine Liturgy.',
        description: 'Church School begins with family worship in Divine Liturgy at 9:30 a.m. on Sunday mornings. The students will proceed to class following Holy Communion. Classes end at 11:45 a.m. Numerous volunteer opportunities exist to offer your time and talent to our many programs.',
        image: 'images/ministries/churchschool.jpg',
        contact: {
          name: 'Elaine Carozza',
          role: 'Church School Director',
          email: 'Churchschool@ssppglenview.org',
      },
      },
      {
        name: 'Greek School',
        summary: 'Greek language, culture, and traditions for children.',
        description: 'The Saints Peter and Paul Greek School is committed to providing an excellent educational program, in a child-centered, child-friendly environment where learning can be fun. Our overall purpose is to teach our students the skills needed to communicate using the Greek language; therefore we put emphasis on conversation and introduce them to Greek culture, civilization, and traditions. We also teach them to be kind, respectful, and faithful.',
        image: 'images/ministries/greekschool.jpg',
        contact: {
          name: 'Stella Theoharopoulos',
          role: 'Greek School Director',
          email: 'greekschool@ssppglenview.org',
      },
      },
      {
        name: 'AGAPE Preschool',
        summary: 'DCFS-approved preschool rooted in the Orthodox Christian faith.',
        description: 'AGAPE Preschool is a ministry program of our parish and runs on our premises in our facility. We are committed to a high quality educational experience that emphasizes the Orthodox Christian Faith. Our program uniquely provides a loving, caring environment where children can develop spiritually, emotionally, socially, cognitively, and physically. We are DCFS approved.',
        // image: 'images/ministries/agape.jpg',
        contact: {
          name: 'Julie Mantice',
          role: 'Agape Preschool Director',
          email: 'agape@ssppglenview.org',
      },
      },
    ],
  },

  {
    id: 'adult-learning',
    label: 'Faith & Learning',
    blurb: 'Deepen your understanding of the Orthodox faith, at any stage of your journey.',
    ministries: [
      {
        name: 'Book & Icon Store',
        summary: 'Open Sundays after Liturgy — browse, no commitment needed.',
        description: 'We welcome you to visit our bookstore on Sundays following Divine Liturgy. You will find much spiritual food and support for your life\'s journey, both in Greek and English language. The Book and Icon Store is a 100% volunteer-staffed ministry of our parish. Throughout the years the Book and Icon Store has grown into a community gathering place, as each of us seeks a special way to nourish our soul and share a smile amongst friends, neighbors, children, students, parishioners, and patrons.',
        // image: 'images/ministries/bookstore.jpg',
        contact: {
          name: "Tina O'Donell",
          role: 'Group Leader',
          email: 'bookstore@ssppglenview.org',
      },
      },
      {
        name: 'Coffee Connection',
        summary: 'Adult discussion group, twice a month after church school.',
        description: 'Coffee Connection is an educational ministry for adults that aims to strengthen knowledge and practice of the Orthodox faith. Twice a month, all interested adults meet immediately following Holy Communion, when church school is dismissed, until 11:40 a.m. There we share in fellowship, provide educational materials, and offer a presentation and discussion on the week\'s topic. Led by Prof. Helen Theodoropoulos, Randa Anderson, and Doreen DeSent.',
        // image: 'images/ministries/coffeeconnection.jpg',
        contact: {
          name: 'Doreen DeSent',
          role: 'Group Leader',
          email: 'coffeeconnection@ssppglenview.org',
      },
      },
      {
        name: 'Bible Study',
        summary: 'Weekly study of Holy Scripture, open to all — no homework.',
        description: 'Our Bible Study ministry seeks to deepen the study of the Holy Scripture, guided by the wisdom and insight of the Holy Orthodox Christian Faith, for the spiritual health and growth of all who participate. The study is guided by Dr. Helen Theodoropoulos, PhD, and meets Wednesdays at 10:30 am. Participation is open to all, including those who are not members of SSPP, and also those who are not Orthodox Christians. No preparation is needed, and no homework is required. We use the Orthodox Study Bible; copies are available if you don\'t have your own.',
        // image: 'images/biblestudy.jpg',
        contact: {
          name: 'Dr. Helen Theodoropoulos',
          role: 'Group Leader',
          email: 'biblestudy@ssppglenview.org',
      },
      },
      {
        name: "St. Stephen's Men's Group",
        summary: "Thursday mornings, 6:30–7:30 am — scripture study for men.",
        description: "The St. Stephen's Men's Group is a unique opportunity for men in our parish to gather together for the edifying study of the scripture and other related books. Topics range based on the text we are reading, and with a lively and inquisitive group, there is always an interesting tangent or two to explore. We meet Thursday mornings in the church library from 6:30 am to 7:30 am, leaving plenty of time for our men to get to work after our discussions.",
        image: 'images/ministries/mensgroup.jpg',
        contact: {
          name: 'Brad DeSent',
          role: 'Group Leader',
          email: 'mensgroup@ssppglenview.org',
      },
      },
      {
        name: 'Catechism',
        summary: '12-week course for those exploring or joining the faith.',
        description: 'Interested in learning more about your Faith? Classes are open to all, but especially those interested in joining the Church through Baptism and/or Chrismation. The class will cover the basics of Orthodox Christianity over a twelve-week period and will be taught by several instructors with graduate theological education. There is no cost and it\'s a great way for everyone of any age (teenage and above) and background to learn about our Faith.',
        image: 'images/catechism.jpg',
        contact: {
          name: 'Fr. Richard Andrews',
          role: 'Spiritual Father',
          email: 'catechism@ssppglenview.org',
      },
      },
      {
        name: 'Orthodox Couples Club (OCC)',
        summary: 'Fellowship and small groups for married couples.',
        description: 'The Orthodox Couples Club (OCC) is a group based around ministering to the married couples within our community. We split our time between large fellowship activities and small breakout groups which meet in members\' homes. On top of ministering to the specific needs of married couples, one other goal of the OCC is to take a parish of over 600 families and make it feel much smaller by bringing couples together in our small group settings.',
        inactive: true,
        // image: 'images/ministries/occ.jpg',
      //    contact: {
      //     name: '',
      //     role: '',
      //     email: 'occ@ssppglenview.org',
      // },
      },
    ],
  },

  {
    id: 'adult-activities',
    label: 'Community Activities',
    blurb: 'Stay active and connected through sport, dance, and senior programming.',
    ministries: [
      {
        name: 'Dynamis Group',
        summary: 'Fellowship and enrichment for senior members of the parish.',
        description: 'Our Dynamis ministry provides a place of strength, fellowship, and enrichment, both spiritually and socially, for the senior members of our parish. Events are balanced between activities at the Church and outings to local places of interest.',
        // image: 'images/ministries/dynamis.jpg',
        contact: {
          name: 'Joanne Trahanas',
          role: 'Group Leader',
          email: 'dynamis@ssppglenview.org',
      },
      },
      {
        name: 'Adult Athletics',
        summary: 'Adult basketball and other leagues.',
        description: 'Adult athletics leagues, including basketball, give adults in the parish a chance to stay active and build community through sport — the adult counterpart to our youth GOYA athletics programs.',
        // image: 'images/ministries/athletics-a.jpg',
        contact: {
          name: 'Chris Batrich',
          role: 'Athletics Director',
          email: 'athletics@ssppglenview.org',
      },
      },
      {
        name: 'Greek Dance (Adult)',
        summary: 'Celebrate Greek heritage through traditional song and dance.',
        description: 'The Greek Dance ministry at SSPP is dedicated to promoting, celebrating, and preserving our Greek heritage through the art of song and dance. The adult group meets regularly, providing the opportunity to build friendships while learning a variety of dances from different regions of Greece.',
        image: 'images/greekdance-a.jpg',
        contact: {
          name: 'Anna Andrews',
          role: 'Group Leader',
          email: 'dance@ssppglenview.org',
      },
      },
    ],
  },

  {
    id: 'youth',
    label: 'Youth & Young Adults',
    blurb: 'Programs for every age, from elementary school through young adulthood.',
    ministries: [
      {
        name: 'Jr. GOYA',
        summary: 'Junior High (6th–8th grade) youth ministry.',
        description: 'Jr. GOYA is our Junior High-aged Youth Ministry (6th–8th grade). We gather four times a month: once for a general meeting, once for an outreach activity, once for an exciting outing, and once for a Friday Funday! There are plenty of meetings on plenty of days so everybody can get involved.',
        image: 'images/ministries/jr-goya.jpg',
        contact: {
          name: 'Steven Thell',
          role: 'Youth Director',
          email: 'youthdirector@ssppglenview.org',
      },
      },
      {
        name: 'Sr. GOYA',
        summary: 'High School-aged youth ministry.',
        description: 'GOYA is our High School-aged Youth Ministry. We gather four times a month: once for a general meeting, once for an outreach activity, once for an exciting outing, and once for a Coffee Talk. There are plenty of meetings on plenty of days so everybody can get involved.',
       image: 'images/ministries/srgoya.jpg',
        contact: {
          name: 'Steven Thell',
          role: 'Youth Director',
          email: 'youthdirector@ssppglenview.org',
      },
      },
      {
        name: 'Athletics',
        summary: 'GOYA basketball league and other youth sports.',
        description: 'GOYA basketball league and other youth athletics programs, building friendship and community through sport for our parish\'s young people.',
        image: 'images/highschool.jpg',
        contact: {
          name: 'Chris Batrich',
          role: 'Athletics Director',
          email: 'athletics@ssppglenview.org',
      },
      },
      {
        name: 'Greek Dance (Youth)',
        summary: 'Learn traditional Greek dances and build friendships.',
        description: 'The Greek Dance ministry at SSPP is dedicated to promoting, celebrating, and preserving our Greek heritage through the art of song and dance. Each youth group meets once a week, providing the opportunity to build friendships while learning a variety of dances from different regions of Greece.',
       image: 'images/ministries/greekdance-y.jpg',
        contact: {
          name: 'Anna Andrews',
          role: 'Group Leader',
          email: 'dance@ssppglenview.org',
      },
      },
      {
        name: 'FAITH, LOVE & JOY',
        summary: 'Elementary-age fellowship, education, and service.',
        description: 'FAITH, LOVE & JOY (FLJ) of SS. Peter and Paul aims to be a space of growth towards, familiarity with, and deepening of our Elementary Age Children\'s relationship with Christ and his church. FLJ strives to accomplish this mission through intentional gatherings with elements of fellowship, education, and service.',
       image: 'images/ministries/flj.jpg',
        contact: {
          name: 'Steven Thell',
          role: 'Youth Director',
          email: 'youthdirector@ssppglenview.org',
      },
      },
      {
        name: 'GOYAlumni',
        summary: 'For college-aged adults — service, fellowship, worship.',
        description: 'GOYAlumni of SS. Peter and Paul is a ministry that enriches our college-aged adults\' experience at school and at home. GOYAlumni aims to be a conduit for the holistic growth of our students with a heavy emphasis on service, fellowship, and worship.',
        image: 'images/ministries/goyalumni.jpg',
          contact: {
          name: 'Niki Papamichiel',
          role: 'Group Leader',
          email: 'goyalumni@ssppglenview.org',
      },
      },
      {
        name: 'Young Adult League (YAL)',
        summary: 'Worship, fellowship, and outreach for young adults.',
        description: 'The Young Adult League (YAL) of Saints Peter and Paul Greek Orthodox Church aims to aid the growth of our parish\'s young adults toward Christ and His Church. YAL strives to accomplish this mission through intentional gatherings of worship, fellowship, outreach, and education, giving young adults a place to encounter the challenges of modern life within the context of the Orthodox Church.',
        image: 'images/ministries/yal.jpg',
          contact: {
          name: 'Maria Mantice',
          role: 'Group Leader',
          email: 'yal@ssppglenview.org',
      },
      },
      {
        name: 'HOPE',
        summary: 'A space for the youngest church members and their families.',
        description: 'HOPE group of SS. Peter and Paul has a two-pronged mission. First, HOPE group looks to create an open space for the youngest of our church members to become comfortable and familiar with the church. As well as a space for parents and grandparents to meet each other, and learn how to foster a relationship with Christ in their children.',
        inactive: true,
        // image: 'images/ministries/hope.jpg',
      //    contact: {
      //     name: 'Steven Thell',
      //     role: 'Youth Director',
      //     email: 'youthdirector@ssppglenview.org',
      // },
      },
    ],
  },

  {
    id: 'outreach',
    label: 'Outreach & Philanthropy',
    blurb: 'How our parish serves the wider community.',
    ministries: [
      {
        name: 'Philoptochos',
        summary: '80 years of philanthropy across greater Chicago.',
        description: 'The Saints Peter & Paul Greek Orthodox Ladies Philoptochos Society, Inc. is the philanthropic arm of the Greek Orthodox Archdiocese of America that has offered eighty years of helping those in need and supporting organizations and programs that do the same. Philoptochos makes a difference in the lives of people in greater Chicago.',
       image: 'images/ministries/philo.jpg',
        contact: {
          name: 'Julie Anastos',
          role: 'Philoptochos President',
          email: 'philoptochos@ssppglenview.org',
      },
      },
      {
        name: "St. Basil's Philanthropy Ministry",
        summary: 'Partnering with local charities to serve those in need.',
        description: 'On behalf of the Parish, the Philanthropy Ministry partners with local charitable organizations, including Vitalant Blood Banks, Habitat for Humanity, Glenview Youth Services, Interfaith Action of Evanston, and many more, to follow the Way from Matthew 25:35.',
      // image: 'images/ministries/stbasil.jpg',
        contact: {
          name: 'Christy Gouletas',
          role: 'Group Leader',
          email: 'philanthropy@ssppglenview.org',
      },
      },
      {
        name: 'Care for Creation',
        summary: 'Stewardship of our environment and parish grounds.',
        description: 'As Orthodox Christians, we have a responsibility for the stewardship of our environment. The purpose of our Care for Creation Ministry is to encourage commitment, implement programs, and establish community through this stewardship. We also tend to the beautification and conservation of our parish landscape, including planting trees, shrubs, plants, and landscaping projects. Our Care for Creation Ministry is one of the first such Orthodox church ministries in the United States, fostering a spirit of volunteerism, community, and collaboration in support of our earth and the life it sustains.',
      // image: 'images/ministries/careforcreation.jpg',
        contact: {
          name: 'Suzanne Chakos',
          role: 'Group Leader',
          email: 'careforcreate@ssppglenview.org',
      },
      },
      {
        name: 'Prison Outreach',
        summary: 'Ministering to those who are incarcerated.',
        description: 'Our Prison Outreach ministry extends the love and presence of the Church to those who are incarcerated, offering spiritual support and connection.',
      // image: 'images/ministries/prison.jpg',
        contact: {
          name: 'Brad DeSent',
          role: 'Group Leader',
          email: 'prisonoutreach@ssppglenview.org',
      },
      },
    ],
  },

  {
    id: 'support',
    label: 'Support Groups',
    blurb: 'Peer support and guidance through difficult life experiences.',
    ministries: [
      {
        name: 'Georgia Photopulos Cancer Support Group',
        summary: 'Compassionate support for those affected by cancer.',
        description: 'The Cancer Support Ministry, started in 1981 by Georgia Photopulos and Fr. George Scoulas, was renamed in Georgia\'s memory in 2012. Her spirit of compassionate emotional support, gentle guidance, faith, and good humor continue to be the foundation of our group.',
       // image: 'images/ministries/cancer.jpg',
        contact: {
          name: 'Bud Photopoulos',
          role: 'Group Leader',
          email: 'cancersupport@ssppglenview.org',
      },
      },
      {
        name: 'Grief & Loss Support',
        summary: 'A place to process loss within the context of our faith.',
        description: 'Our Grief & Loss Support ministry offers a compassionate space for parishioners navigating the loss of a loved one, grounded in the comfort and hope of the Orthodox Christian faith.',
       // image: 'images/ministries/grief.jpg',
        contact: {
          name: 'Tracy Ronstadt',
          role: 'Group Leader',
          email: 'griefsupport@ssppglenview.org',
      },
      },
      {
        name: 'Divorce Rebuilders',
        summary: 'Support, guidance, and hope for the separated and divorced.',
        description: 'Saints Peter and Paul\'s Divorce Rebuilders Group is an Orthodox ministry that offers support, guidance, and hope to those who are separated and divorced. For the last fifteen years, Divorce Rebuilders has addressed the contemporary needs of Orthodox Christians by offering them a place to process the many aspects of the divorce experience through instruction, guidance, and support.',
         // image: 'images/ministries/divorce.jpg',
        contact: {
          name: 'Maria Boyle',
          role: 'Group Leader',
          email: 'divorcerebuilders@ssppglenview.org',
      },
      },
    ],
  },
];
