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
    id: 'leadership',
    label: 'Parish Governance',
    blurb: 'How our parish is administered, and how to get involved.',
    ministries: [
      {
        name: 'Parish Council',
        summary: 'Elected body overseeing parish affairs alongside the pastor.',
        description: "The parish council is a ministry of the Church and it's mission is to keep, practice and proclaim the Orthodox Christian Faith pure and undefiled. This governing body works cooperatively with the priest to administer and support the total parish program including all the liturgical and pastoral ministries as well as the buildings, grounds and facilities. The parish council is accountable to the local bishop and the parish assembly.",
        image: 'images/ministries/parishcouncil.jpg',
        detailPageUrl: 'contact.html?to=#council',
        calendarCategory: 'ministries',
        contact: {
          name: 'George Seletos',
          role: 'Parish Council President',
          email: 'PCpresident@ssppglenview.org',
        },
      },
        {
        name: 'Parish Vitality Team',
        summary: 'Working to strengthen the long-term health of our parish.',
        description: 'The Parish Vitality Team works alongside the pastor and Parish Council to assess and strengthen the long-term health of our parish community, guided by our Parish Health Plan.',
        // image: 'images/ministries/vitalityteam.jpg',
        detailPageUrl: 'https://ssppglenview.org/wp-content/uploads/2025/12/SSPP-Parish-Health-Plan-2025-1.0.pdf',
            // calendarCategory: 'ministries',
        contact: {
          name: 'Keith Anderson',
          role: 'Group Leader',
          email: 'vitalityteam@ssppglenview.org',
        },
      },
    ],
  },
  
  {
    id: 'worship',
    label: 'Worship & Liturgical Life',
    blurb: 'Ways to serve during the Divine Liturgy and other services.',
    ministries: [
      {
        name: 'Greeters / Ushers',
        summary: 'Welcome and seat worshipers on Sunday mornings.',
        description: "For each service at the Church, the Usher's main job is to make people feel welcome, control the flow, and assist Father to ensure smooth Liturgy as well as creating an orderly environment for worship. Ushers serve every 6-8 weeks except for Holy Week which can be up to 4 times. Services are usually Sunday and Saturday but can be any day of the week depending on the Liturgical Calendar.",
        // image: 'images/ministries/greeters.jpg',
        calendarCategory: 'liturgical',
        contact: {
          name: 'Bo LaMotte',
          role: 'Group Leader',
          email: 'ushers@ssppglenview.org',
      },
      },
      {
        name: 'Chanters',
        summary: 'Lead the musical expression of our faith during services.',
        description: 'Music and singing are an integral part of worship in the Orthodox Church. The musical expression of our faith is led by both Chanters and our Choir, yet all the faithful are encouraged to raise their voice in song during the services.',
        image: 'images/ministries/chantors.jpg',
        calendarCategory: 'liturgical',
        contact: {
          name: 'Chris Atsaves',
          role: 'Chanter',
          email: 'Chanters@ssppglenview.org',
      },
      },
      {
        name: 'Choir',
        summary: 'Lead the musical expression of our faith during services.',
        description: 'Music and singing are an integral part of worship in the Orthodox Church. The musical expression of our faith is led by both Chanters and our Choir, yet all the faithful are encouraged to raise their voice in song during the services.',
        image: 'images/ministries/choir.jpg',
        calendarCategory: 'liturgical',
        contact: {
          name: 'Therese Speropoulos',
          role: 'Choir Director',
          email: 'Choir@ssppglenview.org',
      },
      },
      {
        name: 'Readers',
        summary: 'Read psalms and epistles during services.',
        description: 'During the worship services, lay persons are called upon to read Psalms, Epistles and Old Testament prophecies and wisdom passages. This requires training and preparation with comprehension, vocal diction and projection. This ministry is open to males and females of all ages. Saturday Vespers, Sunday Orthros and Liturgy, Feasts, Lent and Holy Week provide plenty of opportunity for involvement.',
        // image: 'images/ministries/readers.jpg',
        calendarCategory: 'liturgical',
        contact: {
          name: 'Steven Thell',
          role: 'TBD',
          email: 'readers@ssppglenview.org',
      },
      },
      {
        name: 'Prosphora Bakers',
        summary: 'Bake the offering bread used in the Divine Liturgy.',
        description: 'Prosphora is the Greek word for offerings, and refers to the bread offered by the faithful to God to be sanctified in the Holy Eucharist. Baking prosphora is a unique and tangible way for Orthodox Christians to actively participate in the Divine Liturgy. Each week several parishioners bake prosphora on behalf of the entire community.',
        image: 'images/prosphora-kids.jpg',
        calendarCategory: 'liturgical',
        contact: {
          name: 'Tracy Ronstadt',
          role: 'Group Leader',
          email: 'prosphora@ssppglenview.org',
      },
      },
      {
        name: 'Myrrhbearers',
        summary: 'Girls (1st–12th grade) serving in the liturgical life of the parish.',
        description: 'The Myrrhbearers Ministry provides opportunities for our girls to participate in the liturgical life of our parish so that they can cultivate a deeper love for Christ. During the year 3rd-12th grade Myrrhbearers have liturgical roles similar to and alongside the Acolytes during Divine Liturgy and other weekday services. During Holy Week, 1st-12th grade Myrrhbearers not only participate in roles similar to the Acolytes but also in unique roles that reflect the presence of the Myrrhbearing women during Christ\'s Passion and Resurrection.',
        image: 'images/myrrbearers.jpg',
        calendarCategory: 'liturgical',
        contact: {
          name: 'Steven Thell',
          role: 'TBD',
          email: 'myrrhbearers@ssppglenview.org',
      },
      },
      {
        name: 'Acolytes',
        summary: 'Boys 8+ assisting the clergy in the Holy Altar.',
        description: "An acolyte is a boy or a man who assists the clergy during the divine services, especially Sunday Divine Liturgy. Service in the Holy Altar is a beautiful ministry of the Church which spiritually enriches the acolytes and the whole community. In addition to knowing the divine worship services, the acolytes are trained to know the areas of the sanctuary and its sacred instruments.",
        image: 'images/ministries/acolytes.jpg',
        calendarCategory: 'liturgical',
        contact: {
          name: 'Steven Thell',
          role: 'Youth Director',
          email: 'acolytes@ssppglenview.org',
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
        name: 'FLJ',
        summary: 'Elementary-age fellowship, education, and service.',
        description: 'Faith, Love & Joy (Junior Orthodox Youth) seeks to foster growth toward a deepening of our elementary children\'s relationship with Christ and His Church through shared fellowship, education and service.',
        image: 'images/ministries/flj.jpg',
        detailPageUrl: 'ministries/youth.html',
        calendarCategory: 'youth',
        contact: {
          name: 'Steven Thell',
          role: 'Youth Director',
          email: 'youthdirector@ssppglenview.org',
      },
      },
      {
        name: 'Jr. GOYA',
        summary: 'Junior High (6th–8th grade) youth ministry.',
        description: 'Jr. GOYA (Greek Orthodox Youth of America) focuses on establishing and maintaining a relationship with Christ. Middle schoolers gather several times throughout the month to strengthen and build continuous relationships to each other, the Church, and their faith through discussion, outreach activities, and worship.',
        image: 'images/ministries/jr-goya.jpg',
        detailPageUrl: 'ministries/youth.html',
        calendarCategory: 'youth',
        contact: {
          name: 'Steven Thell',
          role: 'Youth Director',
          email: 'youthdirector@ssppglenview.org',
      },
      },
      {
        name: 'Sr. GOYA',
        summary: 'High School-aged youth ministry.',
        description: 'Sr. GOYA (Greek Orthodox Youth of America) continues the groundwork laid in Junior GOYA at a pivotal time during our youths\' lives. High schoolers continue to build on their relationships with each other, the Church, and most importantly, continue on their journey to deepen their faith in Christ through fellowship, worship, and community.',
        image: 'images/ministries/srgoya.jpg',
        detailPageUrl: 'ministries/youth.html',
        calendarCategory: 'youth',
        contact: {
          name: 'Steven Thell',
          role: 'Youth Director',
          email: 'youthdirector@ssppglenview.org',
      },
      },
      {
        name: 'Athletics',
        summary: 'GOYA basketball league and other youth sports.',
        description: "As an extension of our Saints Peter and Paul parish family, we offer many wonderful opportunities for growth in fellowship, teamwork, Christian competition, and athletic excellence, including: Greek Orthodox Athletic League Basketball, Metropolis of Chicago Junior Olympics, Men's Adult Pick-up Basketball, Volleyball, Women's Adult Pick-up Basketball.",
        image: 'images/highschool.jpg',
        calendarCategory: 'athletics',
        contact: {
          name: 'Steven Conway & Chris Batrich',
          role: 'Athletics Director',
          email: 'athletics@ssppglenview.org',
      },
      },
      {
        name: 'Greek Dance (Youth)',
        summary: 'Learn traditional Greek dances and build friendships.',
        description: 'The Greek Dance ministry at SSPP is dedicated to promoting, celebrating, and preserving our Greek heritage through the art of song and dance. Each youth group meets once a week, providing the opportunity to build friendships while learning a variety of dances from different regions of Greece.',
        image: 'images/ministries/greekdance-y.jpg',
        calendarCategory: 'athletics',
        contact: {
          name: 'Anna Andrews',
          role: 'Group Leader',
          email: 'dance@ssppglenview.org',
      },
      },
      {
        name: 'GOYAlumni',
        summary: 'For college-aged adults — service, fellowship, worship.',
        description: 'This is a ministry that enriches our college-aged adults\' experience at school and at home. GOYAlumni aims to be a conduit for the holistic growth of our students with a heavy emphasis on service, fellowship, and worship.',
        image: 'images/ministries/goyalumni.jpg',
        calendarCategory: 'youth',
          contact: {
          name: 'Niki Alexis & Ana Arzoumanidis',
          role: 'Group Leader',
          email: 'goyalumni@ssppglenview.org',
      },
      },
      {
        name: 'Young Adult League (YAL)',
        summary: 'Worship, fellowship, and outreach for post-college young adults.',
        description: 'The Young Adult League (YAL) aims to aid the growth of our parish young adults toward Christ and His Church. Our YAL strives to accomplish this mission by intentional gatherings of worship, fellowship, outreach, and education, giving them a place to encounter the newest challenges in our society.',
        image: 'images/ministries/yal.jpg',
        calendarCategory: 'youth',
          contact: {
          name: 'Maria Mantice',
          role: 'Group Leader',
          email: 'yal@ssppglenview.org',
      },
      },
      {
        name: 'HOPE',
        summary: 'A space for the youngest church members and their families.',
        description: 'HOPE (Holy Orthodox Primary Education) was developed for children age 0 to 5 years old with the idea of creating an open space for a young person to develop familiarity with the church and learn to see the church as their home. HOPE also desires to foster a space for parents and grandparents to encounter and build a relationship with Christ in their children.',
        inactive: true,
        // calendarCategory: 'youth',
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
    id: 'children',
    label: "Children's Education",
    blurb: 'Structured programs for children, from preschool through Sunday school.',
    ministries: [
      {
        name: 'Church School',
        summary: 'Sunday morning religious education following Divine Liturgy.',
        description: 'Church School begins with family worship in Divine Liturgy at 9:30 a.m. on Sunday mornings. The students proceed to class following Holy Communion. Classes end at 11:45 a.m. Teachers are carefully selected for the task, and many have been involved in the program for several years. Students are grouped into classes according to grade level. An Orthodox Christian curriculum is used to help our children learn about their faith.',
        image: 'images/ministries/churchschool.jpg',
        detailPageUrl: 'ministries/churchschool.html',
        calendarCategory: 'youth',
        contact: {
          name: 'Alexis Douglas',
          role: 'Church School Director',
          email: "Churchschool@ssppglenview.org",
      },
      },
      {
        name: 'Greek School',
        summary: 'Greek language, culture, and traditions for children.',
        description: 'The Saints Peter and Paul Greek School is committed to providing an excellent educational program, in a child-centered, child-friendly environment where learning can be fun. Our overall purpose is to teach our students the skills needed to communicate using the Greek language; therefore we put emphasis on conversation and introduce them to Greek culture, civilization, and traditions. We also teach them to be kind, respectful, and faithful. The small number of students in each level enables the teachers to focus on each child\'s individual needs.',
        image: 'images/ministries/greekschool.jpg',
        calendarCategory: 'youth',
        contact: {
          name: 'Stella Theoharopoulos',
          role: 'Greek School Director',
          email: 'greekschool@ssppglenview.org',
      },
      },
      {
        name: 'AGAPE Preschool',
        summary: 'DCFS-approved preschool rooted in the Orthodox Christian faith.',
        description: 'AGAPE School is a ministry program of our parish and operates within our facility. We are committed to a high quality educational experience for pre school and kindergarten that emphasizes the Orthodox Christian Faith. Our program uniquely provides a loving, caring environment where children can develop spiritually, emotionally, socially, cognitively, and physically. We are DCFS approved.',
        // image: 'images/ministries/agape.jpg',
        detailPageUrl: 'ministries/agape.html',
        calendarCategory: 'agape',
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
        description: "The bookstore offers a variety of Christian and specifically Orthodox books that include Orthodox saints, the Divine Liturgy, spirituality, growing in the faith, women and the faith, marriage, and parenting. We also have a wide selection of children's books. We carry the Orthodox Study Bible as well as several children's Bibles. We offer a variety of icons, prayer rope bracelets, religious jewelry, incense and charcoal as well as many other items. Please browse and inquire if the merchandise you seek is not on the shelves! Bookstore is open after Divine Liturgy on Sundays from 11:15 am – 12:00 pm or by appointment.",
        // image: 'images/ministries/bookstore.jpg',
        calendarCategory: 'adult_faith',
        contact: {
          name: "Tina O'Donnell",
          role: 'Group Leader',
          email: 'bookstore@ssppglenview.org',
      },
      },
      {
        name: 'Coffee Connection',
        summary: 'Adult discussion group, twice a month after church school.',
        description: 'Coffee Connection is an educational ministry for adults that aims to strengthen knowledge and practice of the Orthodox faith. Twice a month, all interested adults meet in the Youth Room (under the gym) immediately following Holy Communion, until church school is dismissed, at 11:45 am. There we share in fellowship, provide educational materials, and offer a presentation and discussion on the topic of the week. The presentation is an opportunity to learn more about our faith, while the discussion emphasizes how to practice Orthodox traditions in our lives.',
        // image: 'images/ministries/coffeeconnection.jpg',
        calendarCategory: 'adult_faith',
        contact: {
          name: 'Doreen DeSent',
          role: 'Group Leader',
          email: 'coffeeconnection@ssppglenview.org',
      },
      },
      {
        name: 'Bible Study',
        summary: 'Weekly study of Holy Scripture, open to all — no homework.',
        description: "Our Bible Study Ministry seeks to deepen the study of Holy Scripture, guided by the wisdom and insight of the Holy Orthodox Christian Faith, for the spiritual health and growth of all who participate. The study is guided by Dr. Helen Theodoropoulos, PhD, and meets Wednesdays at 10:30 am. It is open to all, including non-members of SSPP, and non-Orthodox Christians. No preparation or homework is required. We use the Orthodox Study Bible, and we have extra copies.",
        // image: 'images/biblestudy.jpg',
        calendarCategory: 'adult_faith',
        contact: {
          name: 'Dr. Helen Theodoropoulos',
          role: 'Group Leader',
          email: 'biblestudy@ssppglenview.org',
      },
      },
      {
        name: "St. Stephen's Men's Group",
        summary: "Thursday mornings, 6:30–7:30 am — scripture study for men.",
        description: "This group is an opportunity for men to gather for social, educational, and recreational experience. Every Thursday morning during the school year, we hold an edifying study of the Scripture or religious/spiritual writings. Multi-week topics are presented on a theme, and with a lively and inquisitive group, there is always an interesting tangent or two to explore. We meet from 7—8 am, leaving plenty of time for our men to get to work after our discussions.",
        image: 'images/ministries/mensgroup.jpg',
        calendarCategory: 'adult_faith',
        contact: {
          name: 'Joe Kolbaba & Dean Matsas',
          role: 'Group Leader',
          email: 'mensgroup@ssppglenview.org',
      },
      },
      {
        name: 'Catechism',
        summary: '12-week course for those exploring or joining the faith.',
        description: 'Introduction to Orthodox Christianity Class is held on Tuesday evenings in the Fall and Monday evenings in the Winter/Spring, 7—9 pm. Class is open to all but especially for those interested in joining the Church through Baptism and/or Chrismation. Class will cover the basics of Orthodox Christianity over a twelve-week period and will be taught by several instructors with graduate theological education. There is no cost and it\'s a great way for anyone of any age (teenage and above) to learn about our Faith.',
        image: 'images/catechism.jpg',
        calendarCategory: 'adult_faith',
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
          // calendarCategory: 'adult_faith',
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
        name: 'Coffee Fellowship',
        summary: 'Fellowship and connection after Divine Liturgy.',
        description: 'We welcome families and ministry groups to host a Coffee Fellowship following the Sunday Divine Liturgy. It is an opportunity to promote interaction among our parishioners and visitors by offering hospitality and refreshments. Your family, or a group, can celebrate a special occasion (nameday, birthday, anniversary, memorial, graduation, etc) or host for no reason at all.',
        // image: 'images/ministries/dynamis.jpg',
        // calendarCategory: 'activities',
        contact: {
          name: 'Carolyn Kolbaba',
          role: 'Group Leader',
          email: 'carolyn@ssppglenview.org',
      },
      },
      {
        name: 'Welcome Committee',
        summary: 'Helping newcomers feel at home from their very first visit.',
        description: 'This group focuses on welcoming visitors and new members to our parish, reaches in to current members, and reaches out to the local community so that our parish remains a visible, active presence that invites everyone into our midst.',
        image: 'images/ministries/welcome.jpg',
        // calendarCategory: 'liturgical',
        contact: {
          name: 'Keith Anderson and Sylvia Creatura',
          role: 'Group Leader',
          email: 'welcome@ssppglenview.org',
        },
      },
      {
        name: 'Dynamis Group',
        summary: 'Fellowship and enrichment for senior members of the parish.',
        description: "Dynamis means \"power\" or \"strength\" and it is a fellowship ministry for seniors, retired people and others in their golden years. Lunches, dinners, day trips, lectures and other activities are ministry features.",
        // image: 'images/ministries/dynamis.jpg',
          // calendarCategory: 'activities',
        contact: {
          name: 'Vicky Nestor',
          role: 'Group Leader',
          email: 'dynamis@ssppglenview.org',
      },
      },
      {
        name: 'Adult Athletics',
        summary: 'Adult basketball and other leagues.',
        description: 'Adult athletics leagues, including basketball, give adults in the parish a chance to stay active and build community through sport — the adult counterpart to our youth GOYA athletics programs.',
        // image: 'images/ministries/athletics-a.jpg',
          // calendarCategory: 'activities',
        contact: {
          name: 'Steven Conway & Chris Batrich',
          role: 'Athletics Director',
          email: 'athletics@ssppglenview.org',
      },
      },
      {
        name: 'Greek Dance (Adult)',
        summary: 'Celebrate Greek heritage through traditional song and dance.',
        description: 'The Greek Dance ministry at SSPP is dedicated to promoting, celebrating, and preserving our Greek heritage through the art of song and dance. The adult group meets regularly, providing the opportunity to build friendships while learning a variety of dances from different regions of Greece.',
        image: 'images/ministries/greekdance-a.jpg',
          // calendarCategory: 'activities',
        contact: {
          name: 'Anna Andrews',
          role: 'Group Leader',
          email: 'dance@ssppglenview.org',
      },
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
        description: 'The Greek Orthodox Ladies Philoptochos Society, Inc. is the philanthropic arm of the Greek Orthodox Archdiocese of America. It has offered eighty years of helping those in need and supports organizations and programs that do the same. Philoptochos makes a difference in the lives of people in greater Chicago, the United States and throughout the world. Our local parish chapter has been working since the founding of our community in the early 1960s. Our women engage in a multitude of fundraising and educational programs to accomplish the mission of Philoptochos.',
       image: 'images/ministries/philo.jpg',
        calendarCategory: 'philanthropy',
        contact: {
          name: 'Julie Anastos',
          role: 'Philoptochos President',
          email: 'philoptochos@ssppglenview.org',
      },
      },
      {
        name: "St. Basil's Philanthropy",
        summary: 'Partnering with local charities to serve those in need.',
        description: 'On behalf of the Parish, the Philanthropy Ministry partners with local charitable organizations, including Vitalant Blood Banks, Habitat for Humanity, Glenview Youth Services, and Interfaith Action of Evanston in order to fulfill every commandment of Christ in Matthew 25:35. The ministry works with every other ministry of our parish to find more opportunities to give back.',
      // image: 'images/ministries/stbasil.jpg',
        calendarCategory: 'philanthropy',
        contact: {
          name: 'Christy Gouletas',
          role: 'Group Leader',
          email: 'philanthropy@ssppglenview.org',
      },
      },
      {
        name: 'Care for Creation',
        summary: 'Stewardship of our environment and parish grounds.',
        description: 'As Orthodox Christians, we have a responsibility for the stewardship of our environment. The purpose of our Care for Creation Ministry is to encourage commitment, implement programs, and establish community through this stewardship. We also tend to the beautification and conservation of our parish landscape, including planting trees, shrubs, plants, and landscaping projects. We also coordinate an annual Vespers on August 31st for the Protection of the Environment.',
      // image: 'images/ministries/careforcreation.jpg',
        calendarCategory: 'philanthropy',
        contact: {
          name: 'John Kiriklakis',
          role: 'Group Leader',
          email: 'careforcreate@ssppglenview.org',
      },
      },
      {
        name: 'Prison Outreach',
        summary: 'Ministering to those who are incarcerated.',
        description: 'In Matthew 25 Jesus emphasizes ministry to prisoners as essential to our own salvation. Currently, with a blessing from the priest and training from experts, parishioners can participate in letter-writing to prisoners and provide material support to their families. Additional opportunities are anticipated in the future.',
      // image: 'images/ministries/prison.jpg',
        calendarCategory: 'philanthropy',
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
        description: "The Cancer Support Ministry, started in 1981 by Georgia Photopulos and Fr. George Scoulas, was renamed in Georgia's memory in 2012. Her spirit of compassionate emotional support, gentle guidance, faith and good humor continue to be the foundation of our group. Meetings are held on the second Tuesday of each month. They are open to our parishioners and those of other Orthodox churches, as well as individuals from other denominations.",
       // image: 'images/ministries/cancer.jpg',
        calendarCategory: 'support_groups',
        contact: {
          name: 'Bud Photopulos',
          role: 'Group Leader',
          email: 'cancersupport@ssppglenview.org',
      },
      },
      {
        name: 'Grief & Loss Support',
        summary: 'A place to process loss within the context of our faith.',
        description: 'Death and loss are a part of life but are often difficult to manage because of trauma and pain. This group offers communal and personal support during trying times. Grief is a journey and requires active effort. People who have experienced significant loss can often provide the best care. This ministry is for everyone along the journey of grief.',
       // image: 'images/ministries/grief.jpg',
        calendarCategory: 'support_groups',
        contact: {
          name: 'Tracy Ronstadt',
          role: 'Group Leader',
          email: 'griefsupport@ssppglenview.org',
      },
      },
      {
        name: 'Divorce Rebuilders',
        summary: 'Support, guidance, and hope for the separated and divorced.',
        description: "Saints Peter and Paul's Divorce Rebuilders Group (Hybrid - Online and In-Person SSPP Library) is an Orthodox ministry that offers support, guidance, and hope to those who are separated and divorced. For the last nine years, Divorce Rebuilders has addressed the contemporary needs of Orthodox Christians by offering them a place to process the many aspects of the divorce experience. Group session activities are grounded in psychoeducational and faith-based principles and references. One group session is led by the parish priest. An important program component includes opportunities to socialize with other group participants.",
         // image: 'images/ministries/divorce.jpg',
        detailPageUrl: 'ministries/divorcerebuilders.html',
        calendarCategory: 'support_groups',
        contact: {
          name: 'Maria Boyle',
          role: 'Group Leader',
          email: 'divorcerebuilders@ssppglenview.org',
      },
      },
    ],
  },
];
