// MEG Topics — 32 grammar topics across A1/A2/B1/B2

export const TOPICS = [

  // ── A1 ──────────────────────────────────────────────────────

  {
    id: 'to_be',
    name: 'To Be (am/is/are)',
    level: 'A1',
    description: 'The verb "to be" is the most fundamental verb in English. Use it to describe people, places, and things — who they are, what they are, and where they are.',
    critical: false,
    formula: {
      affirmative: 'Subject + am/is/are + ...',
      negative:    'Subject + am/is/are + not + ...',
      question:    'Am/Is/Are + Subject + ... ?',
    },
    signalWords: ['name', 'age', 'from', 'nationality', 'job', 'location', 'feelings', 'descriptions'],
    examples: [
      { en: 'I {am} a student from Turkey.', tr: 'Ben Türkiye\'den bir öğrenciyim.' },
      { en: 'She {is} a very good teacher.', tr: 'O çok iyi bir öğretmen.' },
      { en: 'They {are} in the classroom right now.', tr: 'Onlar şu an sınıfta.' },
      { en: 'I {am not} tired — I {am} just bored.', tr: 'Ben yorgun değilim — sadece sıkıldım.' },
      { en: '{Are} you from Istanbul?', tr: 'İstanbul\'dan mısın?' },
    ],
    commonMistakes: [
      { wrong: 'She am a teacher.',         correct: 'She is a teacher.',          rule: 'She/He/It → use "is" (not "am")' },
      { wrong: 'They is students.',         correct: 'They are students.',          rule: 'They/We/You + plural → use "are"' },
      { wrong: 'I not tired.',              correct: 'I am not tired.',             rule: '"to be" cannot be dropped — always include am/is/are' },
      { wrong: 'Is you hungry?',            correct: 'Are you hungry?',             rule: 'With "you", always use "are" — never "is"' },
    ],
    practicePrompts: [
      'Tell me about yourself — who are you and where are you from?',
      'Describe your best friend using "is" and "are".',
      'Tell me how you feel today and why.',
      'Describe the room you are in right now.',
    ],
  },

  {
    id: 'present_simple',
    name: 'Present Simple',
    level: 'A1',
    description: 'Used for habits, routines, and general truths that are always or usually true. This is the tense you use to talk about your regular daily life.',
    critical: false,
    formula: {
      affirmative: 'Subject + V1 (add s/es for he/she/it)',
      negative:    'Subject + do/does + not + V1',
      question:    'Do/Does + Subject + V1 + ?',
    },
    signalWords: ['always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'every day', 'every week', 'on Mondays', 'in general'],
    examples: [
      { en: 'I {study} English every morning.', tr: 'Her sabah İngilizce çalışırım.' },
      { en: 'She {works} in a hospital.', tr: 'O bir hastanede çalışır.' },
      { en: 'The sun {rises} in the east.', tr: 'Güneş doğudan doğar.' },
      { en: 'He {does not} eat meat.', tr: 'O et yemez.' },
      { en: '{Do} you {drink} coffee in the morning?', tr: 'Sabahları kahve içer misin?' },
    ],
    commonMistakes: [
      { wrong: 'She play tennis every day.',   correct: 'She plays tennis every day.',    rule: 'He/She/It → add -s/-es to the verb' },
      { wrong: 'He don\'t like coffee.',       correct: 'He doesn\'t like coffee.',       rule: 'He/She/It → use "doesn\'t" (not "don\'t")' },
      { wrong: 'Does he works here?',          correct: 'Does he work here?',             rule: 'After does/do, use the base form (no -s)' },
      { wrong: 'I am study every day.',        correct: 'I study every day.',             rule: 'Present Simple does NOT use "am/is/are + verb"' },
    ],
    practicePrompts: [
      'Tell me about your daily routine — what do you do every day?',
      'What do you usually eat for breakfast?',
      'Describe your job or studies.',
      'What does your family do on weekends?',
    ],
  },

  {
    id: 'present_continuous',
    name: 'Present Continuous',
    level: 'A1',
    description: 'Used for actions happening right now, at this moment, or around this period of time. Also used for planned future arrangements.',
    critical: false,
    formula: {
      affirmative: 'Subject + am/is/are + V-ing',
      negative:    'Subject + am/is/are + not + V-ing',
      question:    'Am/Is/Are + Subject + V-ing + ?',
    },
    signalWords: ['now', 'right now', 'at the moment', 'currently', 'today', 'this week', 'these days', 'look!', 'listen!'],
    examples: [
      { en: 'I {am studying} English right now.', tr: 'Şu an İngilizce çalışıyorum.' },
      { en: 'She {is talking} on the phone.', tr: 'O telefonda konuşuyor.' },
      { en: 'We {are not working} today — it\'s a holiday.', tr: 'Bugün çalışmıyoruz — tatil.' },
      { en: '{Are} you {coming} to the party tonight?', tr: 'Bu gece partiye geliyor musun?' },
      { en: 'Look! It {is raining}.', tr: 'Bak! Yağmur yağıyor.' },
    ],
    commonMistakes: [
      { wrong: 'I am study right now.',      correct: 'I am studying right now.',    rule: 'am/is/are + V-ing (add -ing to the verb)' },
      { wrong: 'She is work at the moment.', correct: 'She is working at the moment.', rule: 'V-ing needed: work → working' },
      { wrong: 'I playing a game.',          correct: 'I am playing a game.',        rule: '"am/is/are" cannot be dropped' },
      { wrong: 'He is knowing the answer.',  correct: 'He knows the answer.',        rule: 'State verbs (know, like, want, have) don\'t use -ing' },
    ],
    practicePrompts: [
      'What are you doing right now? Describe your surroundings.',
      'What are you learning these days?',
      'Tell me your plans for this evening using "going to" or present continuous.',
      'What are your friends doing at this moment?',
    ],
  },

  {
    id: 'there_is_are',
    name: 'There is / There are',
    level: 'A1',
    description: 'Used to say that something exists or is located somewhere. "There is" for one thing, "There are" for more than one thing.',
    critical: false,
    formula: {
      affirmative: 'There is + singular noun / There are + plural noun',
      negative:    'There is not / There are not + noun',
      question:    'Is there + singular? / Are there + plural?',
    },
    signalWords: ['in the room', 'on the table', 'near the window', 'some', 'any', 'many', 'a lot of', 'no'],
    examples: [
      { en: '{There is} a book on the table.', tr: 'Masanın üzerinde bir kitap var.' },
      { en: '{There are} many students in the class.', tr: 'Sınıfta çok sayıda öğrenci var.' },
      { en: '{There isn\'t} a supermarket near here.', tr: 'Buranın yakınında market yok.' },
      { en: '{Are there} any good restaurants in this area?', tr: 'Bu bölgede iyi restoranlar var mı?' },
    ],
    commonMistakes: [
      { wrong: 'There are a cat in the garden.',  correct: 'There is a cat in the garden.',   rule: 'Singular noun → "There is" (not "There are")' },
      { wrong: 'There is many books on the shelf.', correct: 'There are many books on the shelf.', rule: 'Plural noun → "There are" (not "There is")' },
      { wrong: 'It is a park near here.',          correct: 'There is a park near here.',      rule: 'Use "there is/are" to say something exists — not "it is"' },
    ],
    practicePrompts: [
      'Describe your room — what is there in it?',
      'Tell me about your neighborhood. What is there near your house?',
      'Describe the ideal city. What should there be?',
      'Tell me about your school or workplace. What is there?',
    ],
  },

  {
    id: 'can_cant',
    name: 'Can / Can\'t',
    level: 'A1',
    description: 'Use "can" to talk about ability (what you are able to do) and to ask for or give permission. "Can\'t" is the negative form.',
    critical: false,
    formula: {
      affirmative: 'Subject + can + V1',
      negative:    'Subject + cannot (can\'t) + V1',
      question:    'Can + Subject + V1 + ?',
    },
    signalWords: ['ability', 'permission', 'possibility', 'request'],
    examples: [
      { en: 'I {can} speak Turkish and some English.', tr: 'Türkçe ve biraz İngilizce konuşabiliyorum.' },
      { en: 'She {can\'t} drive — she doesn\'t have a licence.', tr: 'O araba süremez — ehliyeti yok.' },
      { en: '{Can} you help me with this exercise?', tr: 'Bu egzersizde bana yardım edebilir misin?' },
      { en: 'He {can} play the guitar really well.', tr: 'O gitarı çok iyi çalabilir.' },
    ],
    commonMistakes: [
      { wrong: 'She can speaks English.',     correct: 'She can speak English.',       rule: 'After "can", always use the base form (no -s)' },
      { wrong: 'I can to swim.',              correct: 'I can swim.',                  rule: 'No "to" after modal verbs like "can"' },
      { wrong: 'Can you to help me?',         correct: 'Can you help me?',             rule: 'No "to" after modal verbs in questions either' },
    ],
    practicePrompts: [
      'Tell me three things you can do very well.',
      'What can\'t you do that you would like to learn?',
      'Can you describe what abilities are needed for your job or studies?',
      'Ask me something using "can" — be creative!',
    ],
  },

  {
    id: 'basic_questions',
    name: 'Basic Questions (What/Where/Who/When)',
    level: 'A1',
    description: 'Question words help you ask for specific information. Each question word has a specific purpose and position in the sentence.',
    critical: false,
    formula: {
      affirmative: 'Question word + auxiliary verb + subject + main verb',
      negative:    'Question word + don\'t/doesn\'t/isn\'t/aren\'t + subject + verb',
      question:    'What / Where / Who / When / Why / How + do/does/is/are + ...?',
    },
    signalWords: ['What?', 'Where?', 'Who?', 'When?', 'Why?', 'How?', 'How much?', 'How many?', 'Which?'],
    examples: [
      { en: '{What} do you do for work?', tr: 'İş için ne yapıyorsun?' },
      { en: '{Where} do you live?', tr: 'Nerede yaşıyorsun?' },
      { en: '{Who} is your English teacher?', tr: 'İngilizce öğretmeni kim?' },
      { en: '{When} does the class start?', tr: 'Ders ne zaman başlıyor?' },
      { en: '{Why} are you learning English?', tr: 'Neden İngilizce öğreniyorsun?' },
      { en: '{How} do you go to school?', tr: 'Okula nasıl gidiyorsun?' },
    ],
    commonMistakes: [
      { wrong: 'Where you live?',             correct: 'Where do you live?',           rule: 'Questions need an auxiliary verb (do/does/is/are)' },
      { wrong: 'What is your job do?',        correct: 'What do you do for work?',     rule: '"What do you do?" is how you ask about someone\'s job' },
      { wrong: 'Who you are?',                correct: 'Who are you?',                 rule: 'Invert subject and verb: "Who are you?" not "Who you are?"' },
    ],
    practicePrompts: [
      'Ask me five questions using different question words.',
      'Tell me about your favorite place using where, when, and why.',
      'Ask me about my daily routine using question words.',
      'Interview me as if you are a journalist. Ask me interesting questions!',
    ],
  },

  // ── A2 ──────────────────────────────────────────────────────

  {
    id: 'past_simple_regular',
    name: 'Past Simple (Regular Verbs)',
    level: 'A2',
    description: 'Used for completed actions at a specific time in the past with regular verbs. Regular verbs form the past tense by adding -ed to the base form. The time is either stated or clearly understood from context.',
    critical: false,
    formula: {
      affirmative: 'Subject + V1 + ed (regular verb)',
      negative:    'Subject + did + not + V1',
      question:    'Did + Subject + V1 + ?',
    },
    signalWords: ['yesterday', 'last night', 'last week', 'ago', 'in 2020', 'when I was...', 'once', 'then', 'after that'],
    examples: [
      { en: 'I {visited} my grandmother last weekend.', tr: 'Geçen hafta sonu büyükannemi ziyaret ettim.' },
      { en: 'She {worked} at a cafe two years ago.', tr: 'İki yıl önce bir kafede çalıştı.' },
      { en: 'We {did not finish} the project on time.', tr: 'Projeyi zamanında bitiremedik.' },
      { en: '{Did} you {watch} that film last night?', tr: 'Dün gece o filmi izledin mi?' },
      { en: 'They {played} football after school every day.', tr: 'Her gün okuldan sonra futbol oynadılar.' },
    ],
    commonMistakes: [
      { wrong: 'I watch a film yesterday.',       correct: 'I watched a film yesterday.',      rule: 'Past Simple regular verbs need -ed ending' },
      { wrong: 'She didn\'t watched the game.',   correct: 'She didn\'t watch the game.',      rule: 'After did/didn\'t, use base form (V1), not V2' },
      { wrong: 'Did he played tennis?',           correct: 'Did he play tennis?',              rule: 'After "did", use base form (V1)' },
      { wrong: 'I stoped the car.',               correct: 'I stopped the car.',               rule: 'Short vowel + consonant → double the consonant: stop → stopped' },
    ],
    practicePrompts: [
      'Tell me about your last holiday or trip using regular verbs.',
      'What did you do last weekend? Use -ed verbs.',
      'Describe a normal day from your childhood.',
      'Tell me about something you learned recently.',
    ],
  },

  {
    id: 'past_simple_irregular',
    name: 'Past Simple (Irregular Verbs)',
    level: 'A2',
    description: 'Used for completed actions at a specific time in the past with irregular verbs. Irregular verbs do NOT follow the -ed pattern — each one has its own special past form that must be memorized.',
    critical: false,
    formula: {
      affirmative: 'Subject + V2 (irregular: special form)',
      negative:    'Subject + did + not + V1',
      question:    'Did + Subject + V1 + ?',
    },
    signalWords: ['yesterday', 'last night', 'last week', 'ago', 'in 2020', 'when I was...', 'once', 'then', 'after that'],
    examples: [
      { en: 'She {found} a new job three months ago.', tr: 'Üç ay önce yeni bir iş buldu.' },
      { en: 'He {went} to London in 2022.', tr: 'O 2022\'de Londra\'ya gitti.' },
      { en: 'I {bought} a new phone last week.', tr: 'Geçen hafta yeni bir telefon aldım.' },
      { en: '{Did} you {see} that film last night?', tr: 'Dün gece o filmi gördün mü?' },
      { en: 'We {ate} dinner at a nice restaurant.', tr: 'Güzel bir restoranda akşam yemeği yedik.' },
    ],
    commonMistakes: [
      { wrong: 'I goed to the market yesterday.',  correct: 'I went to the market yesterday.',  rule: '"go" is irregular: go → went (not "goed")' },
      { wrong: 'She didn\'t went to school.',      correct: 'She didn\'t go to school.',        rule: 'After did/didn\'t, use base form (V1), not V2' },
      { wrong: 'Did he went to the party?',        correct: 'Did he go to the party?',          rule: 'After "did", use base form (V1)' },
      { wrong: 'I buyed a new phone.',             correct: 'I bought a new phone.',            rule: '"buy" is irregular: buy → bought' },
    ],
    irregularVerbs: [
      { base: 'be',     past: 'was/were',  participle: 'been' },
      { base: 'become', past: 'became',    participle: 'become' },
      { base: 'begin',  past: 'began',     participle: 'begun' },
      { base: 'break',  past: 'broke',     participle: 'broken' },
      { base: 'bring',  past: 'brought',   participle: 'brought' },
      { base: 'build',  past: 'built',     participle: 'built' },
      { base: 'buy',    past: 'bought',    participle: 'bought' },
      { base: 'catch',  past: 'caught',    participle: 'caught' },
      { base: 'choose', past: 'chose',     participle: 'chosen' },
      { base: 'come',   past: 'came',      participle: 'come' },
      { base: 'cost',   past: 'cost',      participle: 'cost' },
      { base: 'do',     past: 'did',       participle: 'done' },
      { base: 'drink',  past: 'drank',     participle: 'drunk' },
      { base: 'drive',  past: 'drove',     participle: 'driven' },
      { base: 'eat',    past: 'ate',       participle: 'eaten' },
      { base: 'fall',   past: 'fell',      participle: 'fallen' },
      { base: 'feel',   past: 'felt',      participle: 'felt' },
      { base: 'find',   past: 'found',     participle: 'found' },
      { base: 'forget', past: 'forgot',    participle: 'forgotten' },
      { base: 'get',    past: 'got',       participle: 'got/gotten' },
      { base: 'give',   past: 'gave',      participle: 'given' },
      { base: 'go',     past: 'went',      participle: 'gone' },
      { base: 'grow',   past: 'grew',      participle: 'grown' },
      { base: 'have',   past: 'had',       participle: 'had' },
      { base: 'hear',   past: 'heard',     participle: 'heard' },
      { base: 'keep',   past: 'kept',      participle: 'kept' },
      { base: 'know',   past: 'knew',      participle: 'known' },
      { base: 'learn',  past: 'learned/learnt', participle: 'learned/learnt' },
      { base: 'leave',  past: 'left',      participle: 'left' },
      { base: 'lose',   past: 'lost',      participle: 'lost' },
      { base: 'make',   past: 'made',      participle: 'made' },
      { base: 'meet',   past: 'met',       participle: 'met' },
      { base: 'pay',    past: 'paid',      participle: 'paid' },
      { base: 'put',    past: 'put',       participle: 'put' },
      { base: 'read',   past: 'read',      participle: 'read' },
      { base: 'run',    past: 'ran',       participle: 'run' },
      { base: 'say',    past: 'said',      participle: 'said' },
      { base: 'see',    past: 'saw',       participle: 'seen' },
      { base: 'sell',   past: 'sold',      participle: 'sold' },
      { base: 'send',   past: 'sent',      participle: 'sent' },
      { base: 'sit',    past: 'sat',       participle: 'sat' },
      { base: 'sleep',  past: 'slept',     participle: 'slept' },
      { base: 'speak',  past: 'spoke',     participle: 'spoken' },
      { base: 'spend',  past: 'spent',     participle: 'spent' },
      { base: 'stand',  past: 'stood',     participle: 'stood' },
      { base: 'swim',   past: 'swam',      participle: 'swum' },
      { base: 'take',   past: 'took',      participle: 'taken' },
      { base: 'teach',  past: 'taught',    participle: 'taught' },
      { base: 'tell',   past: 'told',      participle: 'told' },
      { base: 'think',  past: 'thought',   participle: 'thought' },
      { base: 'throw',  past: 'threw',     participle: 'thrown' },
      { base: 'understand', past: 'understood', participle: 'understood' },
      { base: 'wake',   past: 'woke',      participle: 'woken' },
      { base: 'wear',   past: 'wore',      participle: 'worn' },
      { base: 'win',    past: 'won',       participle: 'won' },
      { base: 'write',  past: 'wrote',     participle: 'written' },
    ],
    practicePrompts: [
      'Tell me about a memorable day from your past using irregular verbs.',
      'What did you eat, drink, and do yesterday?',
      'Tell me about the last film or series you watched.',
      'Describe a trip you took — where did you go, what did you see?',
    ],
  },

  {
    id: 'past_continuous',
    name: 'Past Continuous',
    level: 'A2',
    description: 'Used for actions that were in progress at a specific time in the past. Often paired with Past Simple — the background action uses Past Continuous, the interruption uses Past Simple.',
    critical: false,
    formula: {
      affirmative: 'Subject + was/were + V-ing',
      negative:    'Subject + was/were + not + V-ing',
      question:    'Was/Were + Subject + V-ing + ?',
    },
    signalWords: ['while', 'when', 'at that moment', 'at 10 o\'clock', 'all day', 'all morning', 'as'],
    examples: [
      { en: 'I {was reading} when you called.', tr: 'Sen aradığında kitap okuyordum.' },
      { en: 'She {was cooking} all afternoon.', tr: 'Bütün öğleden sonra yemek pişiriyordu.' },
      { en: 'While I {was sleeping}, it {started} to rain.', tr: 'Ben uyurken yağmur başladı.' },
      { en: 'We {were not watching} TV — we {were studying}.', tr: 'TV izlemiyorduk — çalışıyorduk.' },
      { en: '{Were} you {working} late last night?', tr: 'Dün gece geç saatlere kadar çalışıyor muydun?' },
    ],
    commonMistakes: [
      { wrong: 'I was cook when she arrived.',   correct: 'I was cooking when she arrived.',  rule: 'was/were + V-ing (add -ing to the verb)' },
      { wrong: 'They were play games all night.', correct: 'They were playing games all night.', rule: 'V-ing needed: play → playing' },
      { wrong: 'While I coded, she was testing.', correct: 'While I was coding, she tested.', rule: 'Background/longer action → Past Continuous; short interruption → Past Simple' },
    ],
    practicePrompts: [
      'What were you doing at 8 o\'clock this morning?',
      'Tell me about a time when something interrupted you while you were doing something.',
      'Describe what was happening around you when something important happened in your life.',
      'What were you doing this time last year?',
    ],
  },

  {
    id: 'future_will',
    name: 'Future with Will',
    level: 'A2',
    description: 'Use "will" for spontaneous decisions made at the moment of speaking, predictions about the future, promises, and offers.',
    critical: false,
    formula: {
      affirmative: 'Subject + will + V1',
      negative:    'Subject + will + not (won\'t) + V1',
      question:    'Will + Subject + V1 + ?',
    },
    signalWords: ['tomorrow', 'next week', 'next year', 'soon', 'I think...', 'probably', 'I\'m sure...', 'I promise', 'I\'ll...'],
    examples: [
      { en: 'I think it {will rain} tomorrow.', tr: 'Bence yarın yağmur yağacak.' },
      { en: 'I {\'ll help} you — don\'t worry.', tr: 'Sana yardım edeceğim — endişelenme.' },
      { en: 'She {won\'t be} at the meeting.', tr: 'O toplantıda olmayacak.' },
      { en: '{Will} you {come} to the party on Friday?', tr: 'Cuma geceki partiye gelecek misin?' },
      { en: 'One day, robots {will do} all our work.', tr: 'Bir gün robotlar tüm işlerimizi yapacak.' },
    ],
    commonMistakes: [
      { wrong: 'I will to go to the party.',    correct: 'I will go to the party.',       rule: 'will + V1 (base form, no "to")' },
      { wrong: 'She wills be late.',            correct: 'She will be late.',             rule: '"will" never changes — same for all subjects (no -s)' },
      { wrong: 'I am go to call you.',          correct: 'I will call you.',              rule: 'For instant decisions at the moment of speaking, use "will"' },
    ],
    practicePrompts: [
      'What do you think life will be like in 20 years?',
      'Make three promises using "will".',
      'Tell me about your plans for next month.',
      'Offer to help me with something using "I will...".',
    ],
  },

  {
    id: 'future_going_to',
    name: 'Future with Going To',
    level: 'A2',
    description: 'Use "going to" for plans and intentions already decided before the moment of speaking, and for predictions based on what you can see right now.',
    critical: false,
    formula: {
      affirmative: 'Subject + am/is/are + going to + V1',
      negative:    'Subject + am/is/are + not + going to + V1',
      question:    'Am/Is/Are + Subject + going to + V1 + ?',
    },
    signalWords: ['tomorrow', 'next week', 'this weekend', 'tonight', 'I plan to...', 'I intend to...', 'look! (prediction)'],
    examples: [
      { en: 'I {am going to study} medicine at university.', tr: 'Üniversitede tıp okuyacağım (planım var).' },
      { en: 'She {is going to visit} her parents this weekend.', tr: 'Bu hafta sonu ailesini ziyaret edecek.' },
      { en: 'Look at those clouds — it {is going to rain}!', tr: 'Şu bulutlara bak — yağmur yağacak!' },
      { en: 'We {are not going to} watch the game tonight.', tr: 'Bu gece maçı izlemeyeceğiz.' },
      { en: '{Are} you {going to} apply for that job?', tr: 'O işe başvuracak mısın?' },
    ],
    commonMistakes: [
      { wrong: 'I going to travel next summer.',   correct: 'I am going to travel next summer.',  rule: 'Don\'t forget "am/is/are" before "going to"' },
      { wrong: 'She is go to call you.',           correct: 'She is going to call you.',          rule: 'Full form: am/is/are + going to + verb' },
      { wrong: 'I\'ll visit her. (I already planned it)', correct: 'I\'m going to visit her.',   rule: 'Pre-planned decisions use "going to", not "will"' },
    ],
    practicePrompts: [
      'Tell me three things you are going to do this week.',
      'What are your plans for the next year? Use "going to".',
      'Describe a picture in your mind: "Look at those clouds..." — make a prediction.',
      'Tell me about a big decision you have made — what are you going to do?',
    ],
  },

  {
    id: 'comparatives_superlatives',
    name: 'Comparatives & Superlatives',
    level: 'A2',
    description: 'Comparatives are used to compare two things. Superlatives are used to say which thing in a group is the most or least.',
    critical: false,
    formula: {
      affirmative: 'Comparative: adj + -er / more + adj + than | Superlative: the + adj + -est / the most + adj',
      negative:    'less + adj + than / the least + adj',
      question:    'Which is + comparative/superlative + ?',
    },
    signalWords: ['than', 'the most', 'the least', 'the best', 'the worst', 'more', 'less', 'better', 'worse', 'bigger'],
    examples: [
      { en: 'Istanbul is {bigger than} Ankara.', tr: 'İstanbul Ankara\'dan büyüktür.' },
      { en: 'This exercise is {more difficult than} the last one.', tr: 'Bu alıştırma bir öncekinden daha zor.' },
      { en: 'She is {the best} student in the class.', tr: 'O sınıftaki en iyi öğrenci.' },
      { en: 'This is {the most interesting} book I have ever read.', tr: 'Bu şimdiye kadar okuduğum en ilginç kitap.' },
      { en: 'Today is {worse than} yesterday.', tr: 'Bugün dünden daha kötü.' },
    ],
    commonMistakes: [
      { wrong: 'She is more taller than me.',   correct: 'She is taller than me.',          rule: 'Short adjectives (1-2 syllables): use -er, NOT "more"' },
      { wrong: 'He is the most tall person.',   correct: 'He is the tallest person.',        rule: 'Short adjectives: use -est, NOT "the most"' },
      { wrong: 'English is more easy than maths.', correct: 'English is easier than maths.', rule: 'easy → easier (y → i + er)' },
    ],
    practicePrompts: [
      'Compare two cities you know well.',
      'What is the best film you have ever seen and why?',
      'Compare two things you use every day — your phone and your laptop, for example.',
      'Tell me about the most interesting person you have ever met.',
    ],
  },

  {
    id: 'articles',
    name: 'Articles (a, an, the)',
    level: 'A2',
    description: 'Articles tell us whether we are talking about something specific (the) or something general/unspecific (a/an). This is one of the most common sources of mistakes for Turkish speakers because Turkish has no articles.',
    critical: false,
    formula: {
      affirmative: 'a/an + singular countable noun (first mention or general) | the + specific/known noun',
      negative:    'No article + plural/uncountable nouns (general meaning)',
      question:    'Is this a/an/the + noun?',
    },
    signalWords: ['a (consonant sound)', 'an (vowel sound)', 'the (specific, unique, both know it)', 'Ø (no article — general plural)'],
    examples: [
      { en: 'I saw {a} cat in the garden. {The} cat was black.', tr: 'Bahçede bir kedi gördüm. Kedi siyahtı.' },
      { en: 'She is {an} engineer at {a} tech company.', tr: 'O bir teknoloji şirketinde mühendis.' },
      { en: '{The} sun rises in {the} east.', tr: 'Güneş doğudan doğar.' },
      { en: 'I love {Ø} coffee but I don\'t like {Ø} tea.', tr: 'Kahveyi severim ama çayı sevmem.' },
    ],
    commonMistakes: [
      { wrong: 'She is doctor.',               correct: 'She is a doctor.',                rule: 'Use "a/an" with jobs and professions (first mention)' },
      { wrong: 'I went to school by the bus.', correct: 'I went to school by bus.',        rule: 'Transport phrases: by bus/car/train — no article' },
      { wrong: 'The life is beautiful.',       correct: 'Life is beautiful.',              rule: 'No article with abstract nouns used in a general sense' },
      { wrong: 'I like the dogs.',             correct: 'I like dogs.',                   rule: 'No article when talking about things in general (all dogs)' },
    ],
    practicePrompts: [
      'Describe your home — what is there in each room? Use a, an, and the.',
      'Tell me a story using at least 5 articles correctly.',
      'Describe your job or what you study — remember articles with professions!',
      'Tell me about a film or book you like. Use articles carefully.',
    ],
  },

  {
    id: 'prepositions_time',
    name: 'Prepositions of Time (in/at/on)',
    level: 'A2',
    description: 'Prepositions of time show WHEN something happens. "In" is used for months, years, seasons, and parts of the day. "At" is used for specific clock times and fixed expressions. "On" is used for days and dates. Turkish speakers often confuse these because they all translate differently in Turkish.',
    critical: false,
    formula: {
      affirmative: 'in (months/years/seasons/parts of day) | at (clock times/night/weekend) | on (days/dates)',
      negative:    'Not: in Monday / at morning → correct: on Monday / in the morning',
      question:    'When is...? / What time is...? + preposition answer',
    },
    signalWords: ['in the morning', 'in January', 'in 2020', 'in summer', 'at noon', 'at 9 o\'clock', 'at night', 'on Monday', 'on 5th May', 'on my birthday'],
    examples: [
      { en: 'I was born {in} 1998.', tr: '1998 yılında doğdum.' },
      { en: 'The class starts {at} 9 o\'clock {on} Monday.', tr: 'Ders pazartesi saat 9\'da başlıyor.' },
      { en: 'We always go on holiday {in} summer.', tr: 'Biz her zaman yazın tatile gideriz.' },
      { en: 'I usually study {in} the evening, but {at} night I rest.', tr: 'Genellikle akşam çalışırım, ama gece dinlenirim.' },
      { en: 'My birthday is {on} the 15th of March.', tr: 'Doğum günüm 15 Mart\'ta.' },
    ],
    commonMistakes: [
      { wrong: 'I will see you in Monday.',    correct: 'I will see you on Monday.',       rule: 'Days of the week → "on" (on Monday, on Friday)' },
      { wrong: 'She arrived at 6 in night.',   correct: 'She arrived at 6 at night.',     rule: '"at night" is a fixed expression — not "in night"' },
      { wrong: 'I was born on 1998.',          correct: 'I was born in 1998.',             rule: 'Years → "in" (in 1998, in 2020)' },
      { wrong: 'The meeting is in 3 o\'clock.', correct: 'The meeting is at 3 o\'clock.', rule: 'Specific clock times → "at" (at 3, at noon, at midnight)' },
    ],
    practicePrompts: [
      'Tell me about your typical weekday — use "in", "at", and "on" for times.',
      'When are your English classes? Tell me the time and day.',
      'Tell me important dates in your life — use the correct prepositions.',
      'Describe your daily schedule from morning to night using time prepositions.',
    ],
  },

  {
    id: 'prepositions_place',
    name: 'Prepositions of Place (in/at/on)',
    level: 'A2',
    description: 'Prepositions of place show WHERE something is located. "In" is used for enclosed spaces and large areas. "At" is used for specific points and locations. "On" is used for surfaces. Turkish speakers often struggle because Turkish uses different suffixes (-de/-da) for all of these.',
    critical: false,
    formula: {
      affirmative: 'in (enclosed spaces/cities/countries) | at (specific points/addresses) | on (surfaces/floors/transport)',
      negative:    'Not: in the bus / at the table → correct: on the bus / at the table',
      question:    'Where is...? + preposition answer',
    },
    signalWords: ['in the room', 'in Istanbul', 'in the car', 'at home', 'at school', 'at the station', 'on the table', 'on the wall', 'on the bus', 'next to', 'between', 'behind'],
    examples: [
      { en: 'She lives {in} a small flat {in} the city centre.', tr: 'O şehir merkezinde küçük bir dairede yaşıyor.' },
      { en: 'The book is {on} the table, {next to} the lamp.', tr: 'Kitap lambanın yanında masanın üzerinde.' },
      { en: 'I\'ll meet you {at} the station.', tr: 'Seni istasyonda karşılayacağım.' },
      { en: 'The picture is {on} the wall {between} the two windows.', tr: 'Resim iki pencerenin arasındaki duvarda.' },
      { en: 'He is {at} home right now.', tr: 'O şu an evde.' },
    ],
    commonMistakes: [
      { wrong: 'He is in the bus.',            correct: 'He is on the bus.',               rule: 'Public transport: on the bus/train/plane (not "in")' },
      { wrong: 'I live at Istanbul.',          correct: 'I live in Istanbul.',              rule: 'Cities and countries → "in" (in Istanbul, in Turkey)' },
      { wrong: 'The cat is in the table.',     correct: 'The cat is on the table.',         rule: 'Surfaces → "on" (on the table, on the floor)' },
      { wrong: 'She is in home.',              correct: 'She is at home.',                  rule: '"at home" is a fixed expression — not "in home"' },
    ],
    practicePrompts: [
      'Describe where things are in your room — use prepositions of place.',
      'Describe where you live using prepositions.',
      'Tell me how to get from your home to your school or workplace.',
      'Describe a picture to me — where is everything located?',
    ],
  },

  // ── B1 (CRITICAL) ───────────────────────────────────────────

  {
    id: 'present_perfect',
    name: 'Present Perfect',
    level: 'B1',
    description: 'Connects the past to the present. Use it when the exact time doesn\'t matter, when the result affects now, or when talking about life experiences. This is the tense that most separates A2 from B1.',
    critical: true,
    formula: {
      affirmative: 'Subject + have/has + V3 (past participle)',
      negative:    'Subject + have/has + not + V3',
      question:    'Have/Has + Subject + V3 + ?',
    },
    signalWords: ['just', 'already', 'yet', 'ever', 'never', 'recently', 'lately', 'so far', 'since', 'for', 'before', 'still'],
    examples: [
      { en: 'I {have just finished} my homework.', tr: 'Ödevimi az önce bitirdim (ve şimdi hazırım).' },
      { en: 'She {has already seen} that film.', tr: 'O filmi zaten görmüş (şimdi gerek yok).' },
      { en: 'Have you {ever eaten} sushi?', tr: 'Hiç suşi yedin mi? (hayatında)' },
      { en: 'I {haven\'t finished} my report yet.', tr: 'Raporumu henüz bitirmedim (hâlâ devam ediyor).' },
      { en: 'He {has lived} here for ten years.', tr: 'On yıldır burada yaşıyor (hâlâ yaşıyor).' },
      { en: 'I {have never seen} snow in real life.', tr: 'Gerçek hayatta hiç kar görmedim.' },
    ],
    commonMistakes: [
      { wrong: 'I have saw that film.',             correct: 'I have seen that film.',           rule: 'Use past participle (V3): see → seen (not "saw")' },
      { wrong: 'I have finished it yesterday.',     correct: 'I finished it yesterday.',         rule: 'Specific past time (yesterday) → Past Simple, not Present Perfect' },
      { wrong: 'She is worked here for 3 years.',  correct: 'She has worked here for 3 years.', rule: 'Present Perfect = have/has + V3, not "is + V3"' },
      { wrong: 'Did you ever eat sushi?',           correct: 'Have you ever eaten sushi?',       rule: '"ever" with life experience → Present Perfect, not Past Simple' },
    ],
    practicePrompts: [
      'Tell me about places you have visited in your life.',
      'What have you done so far today? (Use "already" and "just")',
      'Tell me three things you have never done but want to do.',
      'Tell me about your English learning journey — what have you learned?',
    ],
  },

  {
    id: 'present_perfect_already_yet_just',
    name: 'Present Perfect: Already, Yet, Just',
    level: 'B1',
    description: 'These three adverbs are the most common signal words for the Present Perfect. "Just" means a very short time ago. "Already" means sooner than expected. "Yet" is used in negatives and questions to mean "up to now". Mastering their placement is key to sounding natural.',
    critical: true,
    formula: {
      affirmative: 'Subject + have/has + just/already + V3',
      negative:    'Subject + haven\'t/hasn\'t + V3 + yet',
      question:    'Have/Has + Subject + V3 + yet?',
    },
    signalWords: ['just', 'already', 'yet', 'not yet', 'still', 'already done', 'just finished'],
    examples: [
      { en: 'I {have just eaten} — I\'m not hungry.', tr: 'Az önce yedim — aç değilim.' },
      { en: 'She {has already left} — you missed her.', tr: 'O çoktan gitti — onu kaçırdın.' },
      { en: '{Have} you {finished} your homework {yet}?', tr: 'Ödevini henüz bitirdin mi?' },
      { en: 'I {haven\'t called} her {yet}, but I will.', tr: 'Onu henüz aramadım, ama arayacağım.' },
      { en: 'He {has already read} that book three times!', tr: 'O kitabı zaten üç kez okumuş!' },
    ],
    commonMistakes: [
      { wrong: 'I have finished already it.',     correct: 'I have already finished it.',     rule: '"already" goes between "have/has" and the past participle' },
      { wrong: 'Have you finished already?',      correct: 'Have you finished yet?',          rule: 'In questions, use "yet" (at the end), not "already"' },
      { wrong: 'I didn\'t finish yet.',           correct: 'I haven\'t finished yet.',        rule: '"yet" is used with Present Perfect, not Past Simple' },
      { wrong: 'She has just now arrived.',       correct: 'She has just arrived.',            rule: '"just" alone is enough — no need for "now"' },
    ],
    practicePrompts: [
      'Tell me five things you have already done today.',
      'What haven\'t you done yet this week that you need to do?',
      'Tell me something that has just happened — in your life or in the news.',
      'Ask me questions using "yet" to find out what I have or haven\'t done.',
    ],
  },

  {
    id: 'present_perfect_ever_never',
    name: 'Present Perfect: Ever & Never',
    level: 'B1',
    description: '"Ever" and "never" are used with the Present Perfect to talk about life experiences — things you have or have not done at any time in your life. "Ever" means "at any time" and is mainly used in questions. "Never" means "not at any time" and replaces "not" in negative sentences.',
    critical: true,
    formula: {
      affirmative: 'Subject + have/has + never + V3 (negative meaning)',
      negative:    'Subject + have/has + never + V3',
      question:    'Have/Has + Subject + ever + V3 + ?',
    },
    signalWords: ['ever', 'never', 'in your life', 'before', 'the first time', 'experience'],
    examples: [
      { en: '{Have} you {ever been} to England?', tr: 'Hiç İngiltere\'ye gittin mi?' },
      { en: 'I {have never eaten} sushi in my life.', tr: 'Hayatımda hiç suşi yemedim.' },
      { en: 'This is the best film I {have ever seen}.', tr: 'Bu şimdiye kadar gördüğüm en iyi film.' },
      { en: 'She {has never driven} a car before.', tr: 'O daha önce hiç araba kullanmamış.' },
      { en: '{Have} you {ever met} a famous person?', tr: 'Hiç ünlü biriyle tanıştın mı?' },
    ],
    commonMistakes: [
      { wrong: 'Did you ever visit Paris?',       correct: 'Have you ever visited Paris?',    rule: 'Life experience questions use Present Perfect, not Past Simple' },
      { wrong: 'I haven\'t never been there.',    correct: 'I have never been there.',        rule: '"never" already means "not" — don\'t use double negatives' },
      { wrong: 'I have ever been to Japan.',      correct: 'I have been to Japan.',            rule: '"ever" is for questions and superlatives, not affirmative statements' },
      { wrong: 'She never has tried Turkish food.', correct: 'She has never tried Turkish food.', rule: '"never" goes between "have/has" and the past participle' },
    ],
    practicePrompts: [
      'Have you ever been to another country? Tell me about your experiences.',
      'Tell me five things you have never done but would like to try.',
      'Ask me "Have you ever...?" questions and I will answer.',
      'What is the most interesting thing you have ever seen or done?',
    ],
  },

  {
    id: 'present_perfect_for_since',
    name: 'Present Perfect: For & Since',
    level: 'B1',
    description: '"For" and "since" are used with the Present Perfect to talk about duration — how long something has been happening from a point in the past until now. "For" is followed by a period of time (for 3 years). "Since" is followed by a point in time (since 2020). Turkish speakers often confuse these because Turkish uses a single suffix (-dir) for both.',
    critical: true,
    formula: {
      affirmative: 'Subject + have/has + V3 + for + duration / since + point in time',
      negative:    'Subject + haven\'t/hasn\'t + V3 + for/since...',
      question:    'How long + have/has + Subject + V3 + ?',
    },
    signalWords: ['for', 'since', 'how long', 'for a long time', 'for 3 years', 'since 2020', 'since Monday', 'since I was a child'],
    examples: [
      { en: 'I {have lived} in Istanbul {for} ten years.', tr: 'On yıldır İstanbul\'da yaşıyorum.' },
      { en: 'She {has worked} here {since} 2019.', tr: '2019\'dan beri burada çalışıyor.' },
      { en: 'We {haven\'t seen} each other {for} months.', tr: 'Aylardır birbirimizi görmedik.' },
      { en: 'He {has known} her {since} they were children.', tr: 'Onlar çocukken tanışmış, o zamandan beri tanıyor.' },
      { en: 'How long {have} you {studied} English?', tr: 'Ne zamandır İngilizce çalışıyorsun?' },
    ],
    commonMistakes: [
      { wrong: 'I live here for 5 years.',         correct: 'I have lived here for 5 years.',  rule: 'Duration from past to now → Present Perfect (not Present Simple)' },
      { wrong: 'She has worked here for 2019.',    correct: 'She has worked here since 2019.', rule: 'A point in time (2019) → "since"; a period (5 years) → "for"' },
      { wrong: 'I know him since 10 years.',       correct: 'I have known him for 10 years.',  rule: '"10 years" is a duration → use "for" (and Present Perfect)' },
      { wrong: 'I am here since Monday.',          correct: 'I have been here since Monday.',  rule: '"since" + point in time needs Present Perfect, not Present Simple' },
    ],
    practicePrompts: [
      'How long have you been learning English? Use "for" and "since".',
      'Tell me about things in your life that have been true for a long time.',
      'Ask me "How long have you...?" questions.',
      'Tell me about your friendships — how long have you known your best friend?',
    ],
  },

  {
    id: 'past_perfect',
    name: 'Past Perfect',
    level: 'B1',
    description: 'The "past before the past". Use it to show that one past action happened BEFORE another past action. Essential for telling stories with correct sequence.',
    critical: true,
    formula: {
      affirmative: 'Subject + had + V3',
      negative:    'Subject + had + not (hadn\'t) + V3',
      question:    'Had + Subject + V3 + ?',
    },
    signalWords: ['already', 'just', 'never', 'by the time', 'before', 'after', 'when', 'because', 'by then'],
    examples: [
      { en: 'When I arrived, she {had already left}.', tr: 'Ben geldiğimde o çoktan gitmişti.' },
      { en: 'He was tired because he {hadn\'t slept} well.', tr: 'Uyumadığı için yorgundu.' },
      { en: 'By the time the film started, I {had read} the book.', tr: 'Film başlayana kadar kitabı okumuştum.' },
      { en: '{Had} you ever {been} to Italy before your trip there?', tr: 'Oraya gitmeden önce hiç İtalya\'ya gitmiş miydin?' },
    ],
    commonMistakes: [
      { wrong: 'She had went home before I called.',  correct: 'She had gone home before I called.',  rule: 'Use V3 (past participle): go → gone (not "went")' },
      { wrong: 'I had finished it yesterday.',        correct: 'I finished it yesterday.',            rule: 'If there\'s no second past event to compare, use Past Simple' },
      { wrong: 'When I come, he had left.',           correct: 'When I came, he had left.',           rule: 'The main clause describing the later event uses Past Simple' },
    ],
    practicePrompts: [
      'Tell me about a time you arrived somewhere late — what had already happened when you got there?',
      'Describe a moment when you realized you had made a mistake.',
      'Tell a story: explain what had happened before the main event.',
      'Tell me about a film or book using past perfect to describe the backstory.',
    ],
  },

  {
    id: 'present_perfect_vs_past_simple',
    name: 'Present Perfect vs Past Simple',
    level: 'B1',
    description: 'The most important distinction in B1 English. Present Perfect connects to NOW; Past Simple is finished and disconnected from now. The key question: does the time period still connect to the present?',
    critical: true,
    formula: {
      affirmative: 'PP: have/has + V3 (unfinished time/experience/result now) | PS: V2 (finished, specific time)',
      negative:    'PP: haven\'t/hasn\'t + V3 | PS: didn\'t + V1',
      question:    'PP: Have/Has + V3? | PS: Did + V1?',
    },
    signalWords: ['PP: just, already, yet, ever, never, since, for, recently | PS: yesterday, last week, ago, in 2020, when'],
    examples: [
      { en: 'I {have lived} here for three years. (I still live here)', tr: 'Üç yıldır burada yaşıyorum. (hâlâ yaşıyorum)' },
      { en: 'I {lived} there for three years. (I don\'t live there now)', tr: 'Orada üç yıl yaşadım. (artık yaşamıyorum)' },
      { en: '{Have} you {seen} the new film? / {Did} you {see} the film last night?', tr: 'O yeni filmi gördün mü? / Dün gece filmi gördün mü?' },
      { en: 'She {has worked} here since 2020. (She still works here)', tr: '2020\'den beri burada çalışıyor. (hâlâ çalışıyor)' },
      { en: 'She {worked} here in 2020. (She doesn\'t work here now)', tr: '2020\'de burada çalıştı. (artık çalışmıyor)' },
    ],
    commonMistakes: [
      { wrong: 'I have seen her yesterday.',    correct: 'I saw her yesterday.',           rule: '"yesterday" is a finished time → Past Simple' },
      { wrong: 'Did you ever eat Italian food?', correct: 'Have you ever eaten Italian food?', rule: 'Life experience questions → Present Perfect' },
      { wrong: 'I live here for 5 years.',      correct: 'I have lived here for 5 years.', rule: 'Starting in the past and still ongoing → Present Perfect' },
    ],
    practicePrompts: [
      'Tell me about your work or study experience — use both tenses correctly.',
      'I\'ll ask you questions, and you decide: Past Simple or Present Perfect?',
      'Tell me about your city — what has changed recently? What happened there in the past?',
      'Have you ever been to another country? Tell me when and what happened.',
    ],
  },

  {
    id: 'present_perfect_vs_past_perfect',
    name: 'Present Perfect vs Past Perfect',
    level: 'B1',
    description: 'Both use a past participle (V3), but the time reference is different. Present Perfect connects past to NOW. Past Perfect connects one past event to another EARLIER past event.',
    critical: true,
    formula: {
      affirmative: 'PP: have/has + V3 (past → now) | PastP: had + V3 (past → even earlier past)',
      negative:    'PP: haven\'t/hasn\'t + V3 | PastP: hadn\'t + V3',
      question:    'PP: Have/Has + V3? (any connection to now) | PastP: Had + V3? (before another past event)',
    },
    signalWords: ['PP: since, for, already, yet, ever, just | PastP: by the time, before, after, already (in past context), when'],
    examples: [
      { en: 'I {have finished} my report. (it\'s done now)', tr: 'Raporumu bitirdim. (şu an tamamlandı)' },
      { en: 'When she called, I {had already finished} my report.', tr: 'O aradığında, raporumu çoktan bitirmiştim.' },
      { en: 'I {have never been} to Japan. (life experience)', tr: 'Hiç Japonya\'ya gitmedim. (hayat deneyimi)' },
      { en: 'He {had never been} abroad before he moved to England.', tr: 'İngiltere\'ye taşınmadan önce hiç yurt dışına gitmemişti.' },
    ],
    commonMistakes: [
      { wrong: 'By the time she arrived, I have left.', correct: 'By the time she arrived, I had left.', rule: '"By the time" + past event → Past Perfect for the earlier action' },
      { wrong: 'I had finished the book yesterday.',    correct: 'I finished the book yesterday.',       rule: 'Specific past time → Past Simple (not Past Perfect)' },
    ],
    practicePrompts: [
      'Tell me what you have done today (present perfect) AND what you had done before a specific moment.',
      'Describe your morning: what had you done before you ate breakfast?',
      'Compare: "I have worked there" vs "I had worked there". Use both in sentences.',
      'Tell a story with a clear sequence of events. Use Past Simple + Past Perfect for order.',
    ],
  },

  {
    id: 'all_tenses_compared',
    name: 'All Tenses Compared',
    level: 'B1',
    description: 'Understanding how all the main tenses relate to each other is key to fluency. This topic covers choosing the right tense based on context — the most important skill for B1.',
    critical: true,
    formula: {
      affirmative: 'Present Simple (habit) | Present Continuous (now) | Past Simple (finished past) | Present Perfect (past→now) | Past Perfect (past before past) | Future will (prediction/decision now)',
      negative:    'Use the correct auxiliary: don\'t / isn\'t / didn\'t / haven\'t / hadn\'t / won\'t',
      question:    'Do? / Is...ing? / Did? / Have? / Had? / Will?',
    },
    signalWords: ['always (PS) | now (PC) | yesterday (PastS) | just/already/since (PP) | by the time/before (PastP) | tomorrow/probably (Will)'],
    examples: [
      { en: 'I {work} here. (habit) I {am working} late today. (now) I {worked} here last year. (past)', tr: 'Burada çalışırım. / Bugün geç saate kadar çalışıyorum. / Geçen yıl burada çalıştım.' },
      { en: 'I {have worked} here since 2022. (ongoing from past) I {had worked} there before I {moved}. (sequence)', tr: '2022\'den beri burada çalışıyorum. / Taşınmadan önce orada çalışmıştım.' },
    ],
    commonMistakes: [
      { wrong: 'I am working here every day.',     correct: 'I work here every day.',          rule: 'Habits/routines → Present Simple (not Continuous)' },
      { wrong: 'I know him since 2020.',           correct: 'I have known him since 2020.',    rule: '"since" with states → Present Perfect' },
      { wrong: 'I have seen her yesterday.',       correct: 'I saw her yesterday.',            rule: 'Specific time in past → Past Simple' },
    ],
    practicePrompts: [
      'Tell me your life story from childhood to now — use at least 4 different tenses.',
      'Describe your day: what you usually do, what you did today, and what you will do tonight.',
      'Tell me about your English learning: how you started, what has happened since, and what you plan to do next.',
      'I will give you situations. You choose the right tense and explain why.',
    ],
  },

  {
    id: 'passive_voice',
    name: 'Passive Voice',
    level: 'B1',
    description: 'Used when the action is more important than who does it, or when we don\'t know who does the action. Formed by making the object of an active sentence into the subject.',
    critical: true,
    formula: {
      affirmative: 'Subject + am/is/are/was/were + V3 (+ by + agent)',
      negative:    'Subject + am/is/are/was/were + not + V3',
      question:    'Am/Is/Are/Was/Were + Subject + V3?',
    },
    signalWords: ['was built', 'is made', 'were sent', 'has been opened', 'is being repaired', 'by + agent'],
    examples: [
      { en: 'This bridge {was built} in 1920.', tr: 'Bu köprü 1920\'de inşa edildi.' },
      { en: 'English {is spoken} in many countries.', tr: 'İngilizce pek çok ülkede konuşulur.' },
      { en: 'My phone {was stolen} on the train.', tr: 'Telefonum trende çalındı.' },
      { en: 'The report {has been finished} by the team.', tr: 'Rapor ekip tarafından bitirildi.' },
    ],
    commonMistakes: [
      { wrong: 'The book was wrote by Orhan Pamuk.', correct: 'The book was written by Orhan Pamuk.', rule: 'Use V3 (past participle): write → written (not "wrote")' },
      { wrong: 'The window is break.',               correct: 'The window is broken.',               rule: 'Passive uses V3: break → broken' },
      { wrong: 'It was builded 100 years ago.',      correct: 'It was built 100 years ago.',         rule: '"build" is irregular: build → built (not "builded")' },
    ],
    practicePrompts: [
      'Tell me about a famous landmark. When was it built? What is it used for?',
      'Describe your country: what is it known for? What is produced there?',
      'Tell me about something that happened to you using the passive.',
      'Convert these active sentences to passive: "They make coffee in Colombia."',
    ],
  },

  {
    id: 'modal_verbs',
    name: 'Modal Verbs (must/should/could)',
    level: 'B1',
    description: 'Modal verbs express ability, permission, obligation, advice, and possibility. They never change form and are always followed by a bare infinitive (V1).',
    critical: true,
    formula: {
      affirmative: 'Subject + modal (must/should/could/might/would) + V1',
      negative:    'Subject + modal + not + V1',
      question:    'Modal + Subject + V1?',
    },
    signalWords: ['must (obligation)', 'mustn\'t (prohibition)', 'should (advice)', 'could (past ability/suggestion)', 'might (possibility)', 'would (polite request)'],
    examples: [
      { en: 'You {must} bring your passport to the exam.', tr: 'Sınava pasaportunuzu getirmelisiniz. (zorunluluk)' },
      { en: 'You {should} practice speaking every day.', tr: 'Her gün konuşma pratiği yapmalısın. (tavsiye)' },
      { en: 'She {could} speak three languages when she was young.', tr: 'Gençken üç dil konuşabiliyordu. (geçmiş yetenek)' },
      { en: 'It {might} rain later — take an umbrella.', tr: 'Sonra yağmur yağabilir — şemsiye al. (olasılık)' },
      { en: '{Would} you {like} some tea?', tr: 'Biraz çay ister misiniz? (kibar teklif)' },
    ],
    commonMistakes: [
      { wrong: 'You must to study harder.',      correct: 'You must study harder.',           rule: 'No "to" after modal verbs (must, should, could, might, will)' },
      { wrong: 'She coulds drive at 16.',        correct: 'She could drive at 16.',           rule: 'Modals never add -s for he/she/it' },
      { wrong: 'You should to see a doctor.',    correct: 'You should see a doctor.',         rule: 'No "to" after "should"' },
    ],
    practicePrompts: [
      'Give me three pieces of advice for learning English using "should".',
      'Tell me about rules in your country or workplace using "must" and "mustn\'t".',
      'What could you do as a child that you can\'t do now?',
      'What might happen in your life in the next five years?',
    ],
  },

  {
    id: 'first_conditional',
    name: 'First Conditional',
    level: 'B1',
    description: 'Used for real and possible future situations. If something happens (and it\'s likely), then something else will happen. The condition is in present tense; the result uses "will".',
    critical: true,
    formula: {
      affirmative: 'If + Subject + Present Simple, Subject + will + V1',
      negative:    'If + Subject + don\'t/doesn\'t + V1, Subject + won\'t + V1',
      question:    'What will happen if + Subject + Present Simple?',
    },
    signalWords: ['if', 'when', 'unless', 'as soon as', 'provided that', 'will', 'might', 'can'],
    examples: [
      { en: 'If it {rains} tomorrow, we {\'ll stay} at home.', tr: 'Yarın yağmur yağarsa, evde kalacağız.' },
      { en: 'If you {study} hard, you {will pass} the exam.', tr: 'Çok çalışırsan sınavı geçeceksin.' },
      { en: 'Unless you {hurry}, you {\'ll miss} the bus.', tr: 'Acele etmezsen otobüsü kaçıracaksın.' },
      { en: 'I {\'ll call} you when I {arrive}.', tr: 'Varınca seni arayacağım.' },
      { en: 'What {will} you {do} if you {don\'t} get the job?', tr: 'İşi almazsan ne yapacaksın?' },
    ],
    commonMistakes: [
      { wrong: 'If it will rain, I will stay home.',  correct: 'If it rains, I will stay home.',     rule: 'After "if", use Present Simple — not "will"' },
      { wrong: 'If I will pass, I\'ll celebrate.',   correct: 'If I pass, I\'ll celebrate.',         rule: 'The "if clause" uses Present Simple, not future' },
      { wrong: 'Unless you will study, you\'ll fail.', correct: 'Unless you study, you\'ll fail.',   rule: '"unless" also takes Present Simple (= if...not)' },
    ],
    practicePrompts: [
      'Make three first conditional sentences about your future plans.',
      'Tell me: what will you do if you pass your English exam?',
      'What will happen if you don\'t practice English every day?',
      'Complete these sentences: "If I get a good job...", "If I have more free time...", "If I move abroad..."',
    ],
  },

  // ── B2 ──────────────────────────────────────────────────────

  {
    id: 'present_perfect_continuous',
    name: 'Present Perfect Continuous',
    level: 'B2',
    description: 'Emphasizes the duration and continuity of an action that started in the past and is still happening now (or has just stopped with a visible result). It answers "how long have you been doing this?" and stresses the ongoing process rather than completion.',
    critical: false,
    formula: {
      affirmative: 'Subject + have/has + been + V-ing',
      negative:    'Subject + haven\'t/hasn\'t + been + V-ing',
      question:    'Have/Has + Subject + been + V-ing + ?',
    },
    signalWords: ['for', 'since', 'all day', 'all morning', 'how long', 'lately', 'recently'],
    examples: [
      { en: 'I {have been studying} English for three years.', tr: 'Üç yıldır İngilizce çalışıyorum (ve hâlâ çalışıyorum).' },
      { en: 'Why are your eyes red? — I {\'ve been crying}.', tr: 'Gözlerin neden kırmızı? — Ağlıyordum.' },
      { en: 'She {has been working} here since January.', tr: 'Ocak ayından beri burada çalışıyor.' },
      { en: 'How long {have} you {been waiting}?', tr: 'Ne zamandır bekliyorsun?' },
      { en: 'It {has been raining} all day.', tr: 'Bütün gün yağmur yağıyor.' },
    ],
    commonMistakes: [
      { wrong: 'I have been study for hours.',        correct: 'I have been studying for hours.',    rule: 'have/has been + V-ing (don\'t forget -ing)' },
      { wrong: 'She has been knowing him for years.', correct: 'She has known him for years.',       rule: 'State verbs (know, love, want, believe) don\'t use continuous' },
      { wrong: 'I am studying here since 2020.',      correct: 'I have been studying here since 2020.', rule: '"since" + ongoing action → Present Perfect Continuous, not Present Continuous' },
    ],
    practicePrompts: [
      'Tell me what you have been doing lately. Use "have been + -ing".',
      'Describe something you have been working on for a long time.',
      'How long have you been learning English? Tell me in detail.',
      'What have you been reading, watching, or playing recently?',
    ],
  },

  {
    id: 'past_perfect_continuous',
    name: 'Past Perfect Continuous',
    level: 'B2',
    description: 'Emphasizes the duration and continuity of an action that was in progress BEFORE another past event. It answers "how long had you been doing this before something else happened?" and shows that a continuous activity led up to a moment in the past.',
    critical: false,
    formula: {
      affirmative: 'Subject + had + been + V-ing',
      negative:    'Subject + hadn\'t + been + V-ing',
      question:    'Had + Subject + been + V-ing + ?',
    },
    signalWords: ['for', 'since', 'all day', 'how long', 'by the time', 'before', 'when', 'because'],
    examples: [
      { en: 'She {had been waiting} for an hour when the doctor finally arrived.', tr: 'Doktor sonunda geldiğinde bir saattir bekliyordu.' },
      { en: 'I was exhausted because I {had been running} for 30 minutes.', tr: 'Bitkin düşmüştüm çünkü 30 dakikadır koşuyordum.' },
      { en: 'They {had been living} in London for five years before they moved to Istanbul.', tr: 'İstanbul\'a taşınmadan önce beş yıldır Londra\'da yaşıyorlardı.' },
      { en: 'How long {had} you {been studying} before you passed the exam?', tr: 'Sınavı geçmeden önce ne kadar süredir çalışıyordun?' },
      { en: 'The ground was wet because it {had been raining} all night.', tr: 'Zemin ıslaktı çünkü bütün gece yağmur yağmıştı.' },
    ],
    commonMistakes: [
      { wrong: 'I had been wait for two hours.',      correct: 'I had been waiting for two hours.',  rule: 'had been + V-ing (don\'t forget -ing)' },
      { wrong: 'She had been knowing the answer.',    correct: 'She had known the answer.',          rule: 'State verbs (know, love, believe) don\'t use continuous' },
      { wrong: 'I have been waiting when he arrived.', correct: 'I had been waiting when he arrived.', rule: 'Before another past event → Past Perfect Continuous (not Present Perfect Continuous)' },
    ],
    practicePrompts: [
      'Tell me about a time you were exhausted — what had you been doing?',
      'Describe a situation: what had you been doing before something unexpected happened?',
      'How long had you been studying English before you started using MEG?',
      'Tell me about a moment when you were interrupted — what had you been working on?',
    ],
  },

  {
    id: 'reported_speech',
    name: 'Reported Speech',
    level: 'B2',
    description: 'Used to tell someone what another person said, without using their exact words. The tenses usually shift back one step, and pronouns and time expressions change.',
    critical: false,
    formula: {
      affirmative: 'Direct: "I am tired." → Reported: She said (that) she was tired.',
      negative:    'Direct: "I don\'t know." → Reported: He said he didn\'t know.',
      question:    'Direct: "Are you ready?" → Reported: She asked if/whether I was ready.',
    },
    signalWords: ['said', 'told', 'asked', 'explained', 'mentioned', 'replied', 'announced', 'admitted'],
    examples: [
      { en: '"I {love} English." → She said she {loved} English.', tr: '"İngilizce seviyorum." → O, İngilizce sevdiğini söyledi.' },
      { en: '"I {am studying}." → He said he {was studying}.', tr: '"Çalışıyorum." → Çalıştığını söyledi.' },
      { en: '"I {will call} you." → She said she {would call} me.', tr: '"Seni arayacağım." → Beni arayacağını söyledi.' },
      { en: '"Are you ready?" → He asked if I {was} ready.', tr: '"Hazır mısın?" → Hazır olup olmadığımı sordu.' },
    ],
    commonMistakes: [
      { wrong: 'She said me that she was tired.',  correct: 'She told me that she was tired. / She said she was tired.', rule: '"say" doesn\'t take an object person; "tell" does (tell me, tell him)' },
      { wrong: 'He said he will come.',            correct: 'He said he would come.',             rule: '"will" shifts to "would" in reported speech' },
      { wrong: 'She asked where did he go.',       correct: 'She asked where he had gone.',       rule: 'Reported questions use normal word order (not question order)' },
    ],
    practicePrompts: [
      'Tell me about a conversation you had recently — report what was said.',
      'Pretend you interviewed someone famous. Report what they said.',
      'Tell me what your teacher, parent, or friend said to you this week.',
      'Report the news: "The president said..." / "Scientists announced..."',
    ],
  },

  {
    id: 'second_conditional',
    name: 'Second Conditional',
    level: 'B2',
    description: 'Used for imaginary, unlikely, or impossible present and future situations. It describes what you WOULD do if the situation were different from reality right now. The condition uses Past Simple, and the result uses "would".',
    critical: false,
    formula: {
      affirmative: 'If + Subject + Past Simple, Subject + would + V1',
      negative:    'If + Subject + didn\'t + V1, Subject + wouldn\'t + V1',
      question:    'What would you do if + Subject + Past Simple?',
    },
    signalWords: ['if I were', 'if I had', 'would', 'could', 'might', 'imaginary', 'hypothetical', 'unlikely'],
    examples: [
      { en: 'If I {had} more money, I {would travel} the world.', tr: 'Daha fazla param olsaydı, dünyayı gezerdim (ama yok).' },
      { en: 'If I {were} you, I {would study} every day.', tr: 'Senin yerinde olsaydım, her gün çalışırdım.' },
      { en: 'If she {spoke} English fluently, she {would get} a better job.', tr: 'Akıcı İngilizce konuşsaydı daha iyi bir iş alırdı.' },
      { en: 'What {would} you {do} if you {won} the lottery?', tr: 'Piyango kazansaydın ne yapardın?' },
      { en: 'I {wouldn\'t buy} that car even if I {had} the money.', tr: 'Param olsa bile o arabayı almazdım.' },
    ],
    commonMistakes: [
      { wrong: 'If I would have money, I would travel.',  correct: 'If I had money, I would travel.',        rule: 'After "if" in 2nd conditional: Past Simple (not would)' },
      { wrong: 'If I was rich, I will buy a car.',        correct: 'If I were rich, I would buy a car.',     rule: 'Use "were" (not "was") in 2nd conditional, and "would" (not "will")' },
      { wrong: 'If I know the answer, I would tell you.', correct: 'If I knew the answer, I would tell you.', rule: 'The "if clause" must use Past Simple for imaginary situations' },
    ],
    practicePrompts: [
      'If you could live anywhere in the world, where would you live and why?',
      'What would you do if you won a million euros?',
      'If you were the president, what would you change?',
      'Describe your dream life using second conditional sentences.',
    ],
  },

  {
    id: 'third_conditional',
    name: 'Third Conditional',
    level: 'B2',
    description: 'Used for imaginary past situations — things that did NOT happen but you imagine what WOULD HAVE happened if they had. It is the conditional of regret and "what if" about the past. The condition uses Past Perfect, and the result uses "would have + V3".',
    critical: false,
    formula: {
      affirmative: 'If + Subject + had + V3, Subject + would + have + V3',
      negative:    'If + Subject + hadn\'t + V3, Subject + wouldn\'t + have + V3',
      question:    'What would have happened if + Subject + had + V3?',
    },
    signalWords: ['if I had known', 'would have', 'could have', 'might have', 'wouldn\'t have', 'regret', 'wish'],
    examples: [
      { en: 'If she {had studied} harder, she {would have passed}.', tr: 'Daha çok çalışsaydı, geçerdi (ama geçemedi).' },
      { en: 'We {wouldn\'t have been} late if we {had left} earlier.', tr: 'Daha erken ayrılsaydık geç kalmazdık.' },
      { en: 'If I {had known} about the party, I {would have come}.', tr: 'Partiyi bilseydim gelirdim.' },
      { en: 'She {could have won} if she {had trained} more.', tr: 'Daha çok antrenman yapsaydı kazanabilirdi.' },
      { en: 'What {would} you {have done} if you {had been} there?', tr: 'Orada olsaydın ne yapardın?' },
    ],
    commonMistakes: [
      { wrong: 'If I had known, I would told you.',     correct: 'If I had known, I would have told you.',  rule: '3rd conditional result: would + have + V3 (not just would + V1)' },
      { wrong: 'If I would have studied, I would have passed.', correct: 'If I had studied, I would have passed.', rule: 'After "if" in 3rd conditional: Past Perfect (not "would have")' },
      { wrong: 'If she had came earlier, she would have seen him.', correct: 'If she had come earlier, she would have seen him.', rule: 'Use V3 (past participle): come → come (not "came")' },
    ],
    practicePrompts: [
      'If you had been born in a different country, how would your life have been different?',
      'Think of a regret. What would have happened if you had made a different choice?',
      'If you had started learning English earlier, what would have changed?',
      'Tell me about a missed opportunity — what could you have done differently?',
    ],
  },

  {
    id: 'advanced_modals',
    name: 'Advanced Modal Verbs',
    level: 'B2',
    description: 'Advanced modals express degrees of certainty (must, can\'t, might), past ability and regret (could have, should have, would have), and complex obligation and permission.',
    critical: false,
    formula: {
      affirmative: 'Certainty: must/can\'t/might + be/V1 | Past deduction: must/might/can\'t + have + V3 | Regret: should/could + have + V3',
      negative:    'can\'t + be (strong negative deduction) | shouldn\'t have + V3 (regret)',
      question:    'Could it have been...? / Should I have...?',
    },
    signalWords: ['must be (deduction)', 'can\'t be (impossible)', 'might be (possibility)', 'should have (regret)', 'could have (missed opportunity)', 'would have (hypothetical)'],
    examples: [
      { en: 'She {must be} tired — she worked all night.', tr: 'O yorgun olmalı — bütün gece çalıştı. (kesin çıkarım)' },
      { en: 'That {can\'t be} right — the numbers don\'t add up.', tr: 'Bu doğru olamaz — sayılar tutmuyor.' },
      { en: 'I {should have studied} more. I regret it now.', tr: 'Daha fazla çalışmalıydım. Şimdi pişmanım.' },
      { en: 'You {could have told} me — I would have helped!', tr: 'Söyleyebilirdin — yardım ederdim!' },
      { en: 'She {might have missed} the train.', tr: 'Treni kaçırmış olabilir.' },
    ],
    commonMistakes: [
      { wrong: 'He must have be the teacher.',      correct: 'He must be the teacher.',            rule: 'Present deduction: must + be (not "must have be")' },
      { wrong: 'I should have study harder.',       correct: 'I should have studied harder.',      rule: 'should/could/would + have + V3 (past participle)' },
      { wrong: 'She can\'t have forgot already.',   correct: 'She can\'t have forgotten already.', rule: 'Use V3: forget → forgotten' },
    ],
    practicePrompts: [
      'Look at this situation and make deductions: "Someone left their umbrella. It must be..." ',
      'Tell me about a regret using "should have" or "could have".',
      'Describe someone\'s behaviour. What must they have been thinking?',
      'Tell me about a missed opportunity. What could you have done differently?',
    ],
  },

];

// ============================================================
// Helper functions
// ============================================================

export function getTopicById(id) {
  return TOPICS.find(t => t.id === id) || null;
}

export function getTopicsByLevel(level) {
  return TOPICS.filter(t => t.level === level);
}

export function getCriticalTopics() {
  return TOPICS.filter(t => t.critical === true);
}

export function getAllLevelsWithTopics() {
  const levels = ['A1', 'A2', 'B1', 'B2'];
  return levels.map(level => ({
    level,
    topics: getTopicsByLevel(level),
  }));
}
