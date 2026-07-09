/* F1 Vaguepost Generator — content banks.
 * All fictional. Mix-and-match template fuel for maximum silly-season chaos. */

const DATA = {
  // Loosely current-era grid + legends people still tweet about.
  drivers: [
    "Verstappen", "Norris", "Leclerc", "Hamilton", "Russell", "Piastri",
    "Sainz", "Alonso", "Gasly", "Ocon", "Stroll", "Albon", "Hulkenberg",
    "Tsunoda", "Bottas", "Bearman", "Antonelli", "Colapinto", "Lawson",
    "Ricciardo", "Perez", "Vettel", "Schumacher"
  ],

  teams: [
    "Red Bull", "Ferrari", "Mercedes", "McLaren", "Aston Martin",
    "Alpine", "Williams", "Haas", "RB", "Sauber", "Audi",
    "Cadillac", "a mystery American outfit"
  ],

  nationalities: [
    "British", "Dutch", "Spanish", "Monegasque", "Australian", "French",
    "German", "Italian", "Mexican", "Danish", "Thai", "Japanese", "Finnish"
  ],

  grandsPrix: [
    "Monaco", "Silverstone", "Monza", "Spa", "Suzuka", "Bahrain",
    "Jeddah", "Miami", "Vegas", "Singapore", "Austin", "Interlagos",
    "Zandvoort", "the Hungaroring", "Baku", "Imola", "Qatar", "Abu Dhabi"
  ],

  journalists: [
    "a very reliable source", "someone close to the situation",
    "a senior paddock figure", "my guy in the paddock",
    "multiple sources", "a person familiar with the talks",
    "an engineer who shall remain nameless", "someone who was in the room"
  ],

  sponsors: [
    "a major crypto brand", "an energy drink you've never heard of",
    "a Middle Eastern airline", "a luxury watch house",
    "a fashion label", "a sports betting giant", "a Saudi tourism board"
  ],

  bodyParts: ["the front wing", "the floor", "the rear end", "the power unit",
    "the sidepods", "the diffuser", "the DRS", "the brake ducts"],

  vibes: ["not happy", "seething", "very quiet", "surprisingly relaxed",
    "up to something", "cooking", "cooked", "locked in", "unwell", "back",
    "finished", "fuming", "glowing", "shaking", "done", "eating good",
    "in his bag", "on borrowed time"],

  timeframes: ["within days", "before the summer break", "by winter testing",
    "sooner than you think", "before the next race", "by the end of the month",
    "any day now", "before {gp}", "in the coming weeks", "by lights out in {gp}"],

  cryptic: ["👀", "🍿", "🤐", "🤔", "😏", "🫡", "📌", "🚨", "🤫", "🔥", "🧩", "⏳"],

  // Fake ITK account personas for the tweet card.
  personas: [
    { name: "F1 Paddock Insider", handle: "f1_paddock_ITK", emoji: "🏎️" },
    { name: "Silly Season HQ", handle: "SillySeasonHQ", emoji: "🎪" },
    { name: "Box Box Box", handle: "boxboxbox_f1", emoji: "📦" },
    { name: "Grid Whispers", handle: "gridwhispers", emoji: "🤫" },
    { name: "The Undercut", handle: "TheUndercut_", emoji: "✂️" },
    { name: "DRS Detective", handle: "drs_detective", emoji: "🕵️" },
    { name: "Paddock Club Leaks", handle: "paddockleaks", emoji: "🔓" },
    { name: "Tenth Hunter", handle: "tenthhunter", emoji: "⏱️" },
    { name: "Formula Rumours", handle: "formularumours", emoji: "🌀" },
    { name: "Marbles Off Line", handle: "marbles_offline", emoji: "⚫" }
  ],

  // ---- Templates. {tokens} resolved by app.js against the banks above. ----

  rumours: [
    "🚨 BREAKING: {driver} to {team} for {year}. {journalist} tells me talks are 'advanced'.",
    "Hearing {driver}'s management were spotted at {team}'s factory this week 👀",
    "{team} reportedly bringing a major upgrade to {gp} — could be worth {tenths} of a second.",
    "{driver} and {driver2} relationship said to be 'at breaking point' according to {journalist}.",
    "Told {driver} has a performance clause that activates if they're behind {driver2} at {gp}. Interesting.",
    "🚨 {team} in advanced talks with {sponsor} for a title sponsorship worth a reported ${money}M.",
    "{driver} has NOT signed for {year} yet. Let that sink in.",
    "Whispers that {team} have already locked in {driver} for {year}. You didn't hear it from me.",
    "{journalist} says {team} are 'seriously concerned' about {bodyPart} ahead of {gp}.",
    "{driver} reportedly testing an old-spec chassis in the sim. Make of that what you will.",
    "Contract of {driver} said to contain a release clause tied to constructors' position. 🍿",
    "🚨 {team} could run a special livery at {gp}. Big announcement expected.",
    "Hearing {driver} turned down {team}. Yes, really.",
    "{team} engineers reportedly unhappy after {gp}. {journalist} says it's 'tense' in there.",
    "Sources: {driver} to test for {team} in the post-season young driver test. He's {age}, by the way.",
    "{driver}'s race engineer could be on the move to {team}. These things matter.",
    "Told the {team} garage went very quiet after {driver} said something on the radio at {gp}.",
    "🚨 {journalist} tells me {driver} to {team} could be announced {timeframe}. {emoji}",
    "{team} have reportedly triggered the option year on {driver}'s deal. It's happening.",
    "Hearing {driver} has a handshake agreement with {team}. Nothing on paper yet. {emoji}",
    "{driver} to {team} would mean {driver2} is out. Do the math.",
    "{team} said to be lining up {driver} as a direct replacement {timeframe}.",
    "Whispers of a {sponsor} deal walking away from {team} over results. Ouch.",
    "{team} reportedly protesting {bodyPart} on a rival car after {gp}. This could get messy.",
    "Told {driver} skipped the {team} debrief at {gp}. That never happens.",
    "{driver}'s data engineer reportedly seen leaving the {team} hospitality. 🧩",
    "Sources: {team} to bring a B-spec car to {gp}. Worth up to {tenths}s a lap.",
    "{driver} contract talks with {team} said to have 'stalled completely'. {emoji}",
    "Hearing the {team} board wants {driver} regardless of cost. {timeframe}, apparently.",
    "{driver} reportedly unhappy with {bodyPart} balance and it's 'affecting the mood'. {emoji}",
    "🚨 {driver} has been released from his {team} contract early. Announcement {timeframe}.",
    "Told {driver} and {driver2} have not spoken since {gp}. Teammates, by the way.",
    "{team} scouts reportedly at a karting round watching a {age}-year-old. The pipeline never sleeps.",
    "{journalist} says {team} are quietly shopping for a new {bodyPart} concept for {year}.",
    "{driver} said to be learning {nationality}... make of that what you will. {emoji}",
    "Rumour doing the rounds that {driver}'s {year} seat depends on a single result at {gp}.",
    "{team} reportedly furious about a leak from inside the garage at {gp}. Heads may roll.",
    "Hearing {driver}'s camp have gone cold on {team}. Something changed {timeframe}.",
    "{team} to reportedly announce a driver line-up shake-up {timeframe}. Buckle up. {emoji}",
    "Told a {sponsor} exec was seen in the {team} motorhome for two hours at {gp}. 🤔",
    "{driver} clocked the fastest {team} sim time in months this week. Coincidence? {emoji}",
    "{journalist}: '{driver} to {team} is done, it's just about when.' {timeframe}, I'm told.",
    "{team} reportedly weighing a full {bodyPart} redesign after a bad {gp}. Costly.",
    "Whispers {driver} could sit out the rest of the year. His seat? Already being circled. {emoji}"
  ],

  // Vagueposts scored by vagueness (1 = names names, 5 = pure cryptic void).
  // The vagueness slider filters to a level. Keep every level stocked.
  vagueposts: [
    // --- 1: barely subtle (basically a rumour with a wink) ---
    { text: "{driver} at {team}. that's the tweet. work it out. 👀", vague: 1 },
    { text: "keep an eye on the {team} garage at {gp}. that's all. 👀", vague: 1 },
    { text: "{driver} and {team}. remember where you heard it. 📌", vague: 1 },
    { text: "{driver} to {team}. i won't say more than that. 🤐", vague: 1 },
    { text: "{driver}. {team}. {timeframe}. that's the whole tweet. {emoji}", vague: 1 },
    { text: "so {driver} is testing at {team} now? interesting. {emoji}", vague: 1 },
    { text: "write {driver} to {team} down. check back {timeframe}. 📌", vague: 1 },
    { text: "the {driver} to {team} people are about to eat VERY good. {emoji}", vague: 1 },
    { text: "{team} fans, check on your {driver} rumours {timeframe}. 👀", vague: 1 },

    // --- 2: names a name, withholds the point ---
    { text: "not everything is as it seems in {team} right now.", vague: 2 },
    { text: "some of you are going to look very silly by {gp}. 🤡", vague: 2 },
    { text: "so THAT'S why {driver} was smiling. 😏", vague: 2 },
    { text: "the {vibe} energy from {team} today was very telling.", vague: 2 },
    { text: "funny how quiet it's gone since {gp}, isn't it?", vague: 2 },
    { text: "{driver} is {vibe}. and i think that says it all.", vague: 2 },
    { text: "{team} know exactly what they're doing. or do they. 🤔", vague: 2 },
    { text: "the real story of {gp} hasn't been told yet.", vague: 2 },
    { text: "{driver} is {vibe} and the {team} garage knows exactly why. {emoji}", vague: 2 },
    { text: "whatever {driver} just did, {team} won't forget it. {emoji}", vague: 2 },
    { text: "the {team} debrief after {gp} must have been something else. 🍿", vague: 2 },
    { text: "ask {driver} about {gp}. go on. ask. 😏", vague: 2 },
    { text: "there's a reason {driver} went so quiet after {gp}.", vague: 2 },
    { text: "{team} are one bad {gp} away from something dramatic. {emoji}", vague: 2 },
    { text: "keep {driver}'s name in your drafts. you'll need it {timeframe}. 📌", vague: 2 },
    { text: "{driver} smiling like that after {gp}? not normal. {emoji}", vague: 2 },

    // --- 3: a shape, no name ---
    { text: "someone in that garage isn't happy 👀", vague: 3 },
    { text: "a certain {nationality} driver has some explaining to do.", vague: 3 },
    { text: "no notes. no context. just vibes. {driver} 👀", vague: 3 },
    { text: "a certain garage was very quiet today. you can guess which. 👀", vague: 3 },
    { text: "someone made a phone call they'll regret. 📞", vague: 3 },
    { text: "a certain driver is {vibe}. that's all you need to know. {emoji}", vague: 3 },
    { text: "a certain {nationality} driver knows exactly what he did. {emoji}", vague: 3 },
    { text: "one of the big teams is about to have a very bad week. {emoji}", vague: 3 },
    { text: "someone in that paddock is lying through their teeth right now.", vague: 3 },
    { text: "a driver you love is {vibe} behind closed doors. 🧩", vague: 3 },
    { text: "two garages. one secret. {timeframe}. {emoji}", vague: 3 },
    { text: "a certain someone did NOT enjoy {gp}. and it shows. 👀", vague: 3 },

    // --- 4: gesturing at nothing in particular ---
    { text: "certain people need to have a look in the mirror.", vague: 4 },
    { text: "the paddock is talking. that's all i'll say.", vague: 4 },
    { text: "interesting few days ahead. keep your notifications on.", vague: 4 },
    { text: "the timing of all this... no coincidence.", vague: 4 },
    { text: "certain garages should be careful what they wish for.", vague: 4 },
    { text: "big if true. and it's true. 👀", vague: 4 },
    { text: "we are NOT ready for what's coming.", vague: 4 },
    { text: "somebody's phone is about to blow up. it's not mine. it's theirs.", vague: 4 },
    { text: "i've said too much. deleting later. 🫡", vague: 4 },
    { text: "some of you are about to owe me an apology. {timeframe}. {emoji}", vague: 4 },
    { text: "there is a storm coming and only a few of us can feel it. {emoji}", vague: 4 },
    { text: "everyone's looking in the wrong direction right now. good. {emoji}", vague: 4 },
    { text: "the quiet ones in the paddock are the ones to watch. 🤫", vague: 4 },
    { text: "something happened this week that changes everything. {timeframe} you'll see.", vague: 4 },
    { text: "trust the process. or don't. i know what i know. {emoji}", vague: 4 },
    { text: "a certain deal is closer than anyone realises. {emoji}", vague: 4 },
    { text: "the mask is about to slip. {timeframe}. 🧩", vague: 4 },
    { text: "wait until you find out who was behind it. {emoji}", vague: 4 },

    // --- 5: pure cryptic void, zero information ---
    { text: "if you know, you know.", vague: 5 },
    { text: "well. well well well.", vague: 5 },
    { text: "watch this space 🍿", vague: 5 },
    { text: "you'll understand this tweet in about three weeks.", vague: 5 },
    { text: "not saying anything. just saying. 🤐", vague: 5 },
    { text: "screenshot this one. that's all i ask.", vague: 5 },
    { text: "the people who need to know, already know.", vague: 5 },
    { text: "remember this tweet.", vague: 5 },
    { text: "you can feel it, can't you.", vague: 5 },
    { text: "no.", vague: 5 },
    { text: "hm.", vague: 5 },
    { text: "so it begins. {emoji}", vague: 5 },
    { text: "i tried to warn you.", vague: 5 },
    { text: "it's happening. it's actually happening. {emoji}", vague: 5 },
    { text: "you're not ready. none of you are.", vague: 5 },
    { text: "tick. tock. ⏳", vague: 5 },
    { text: "i'll say this once and never again: {emoji}", vague: 5 },
    { text: "the silence tells you everything.", vague: 5 },
    { text: "read the room. then read it again. {emoji}", vague: 5 },
    { text: "it was never about what you thought it was about.", vague: 5 }
  ]
};
