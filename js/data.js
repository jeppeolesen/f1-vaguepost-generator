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
    "up to something", "cooking", "cooked", "locked in", "unwell", "back"],

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
    "Told the {team} garage went very quiet after {driver} said something on the radio at {gp}."
  ],

  // Vagueposts scored by vagueness (1 = names names, 5 = pure cryptic void).
  // The vagueness slider filters to a level. Keep every level stocked.
  vagueposts: [
    // --- 1: barely subtle (basically a rumour with a wink) ---
    { text: "{driver} at {team}. that's the tweet. work it out. 👀", vague: 1 },
    { text: "keep an eye on the {team} garage at {gp}. that's all. 👀", vague: 1 },
    { text: "{driver} and {team}. remember where you heard it. 📌", vague: 1 },
    { text: "{driver} to {team}. i won't say more than that. 🤐", vague: 1 },

    // --- 2: names a name, withholds the point ---
    { text: "not everything is as it seems in {team} right now.", vague: 2 },
    { text: "some of you are going to look very silly by {gp}. 🤡", vague: 2 },
    { text: "so THAT'S why {driver} was smiling. 😏", vague: 2 },
    { text: "the {vibe} energy from {team} today was very telling.", vague: 2 },
    { text: "funny how quiet it's gone since {gp}, isn't it?", vague: 2 },
    { text: "{driver} is {vibe}. and i think that says it all.", vague: 2 },
    { text: "{team} know exactly what they're doing. or do they. 🤔", vague: 2 },
    { text: "the real story of {gp} hasn't been told yet.", vague: 2 },

    // --- 3: a shape, no name ---
    { text: "someone in that garage isn't happy 👀", vague: 3 },
    { text: "a certain {nationality} driver has some explaining to do.", vague: 3 },
    { text: "no notes. no context. just vibes. {driver} 👀", vague: 3 },
    { text: "a certain garage was very quiet today. you can guess which. 👀", vague: 3 },
    { text: "someone made a phone call they'll regret. 📞", vague: 3 },

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

    // --- 5: pure cryptic void, zero information ---
    { text: "if you know, you know.", vague: 5 },
    { text: "well. well well well.", vague: 5 },
    { text: "watch this space 🍿", vague: 5 },
    { text: "you'll understand this tweet in about three weeks.", vague: 5 },
    { text: "not saying anything. just saying. 🤐", vague: 5 },
    { text: "screenshot this one. that's all i ask.", vague: 5 },
    { text: "the people who need to know, already know.", vague: 5 },
    { text: "remember this tweet.", vague: 5 },
    { text: "you can feel it, can't you.", vague: 5 }
  ]
};
