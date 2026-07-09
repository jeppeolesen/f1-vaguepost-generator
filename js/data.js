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

  vagueposts: [
    "someone in that garage isn't happy 👀",
    "if you know, you know.",
    "certain people need to have a look in the mirror.",
    "well. well well well.",
    "watch this space 🍿",
    "not everything is as it seems in {team} right now.",
    "a certain {nationality} driver has some explaining to do.",
    "the paddock is talking. that's all i'll say.",
    "some of you are going to look very silly by {gp}. 🤡",
    "interesting few days ahead. keep your notifications on.",
    "so THAT'S why {driver} was smiling. 😏",
    "the timing of all this... no coincidence.",
    "certain garages should be careful what they wish for.",
    "you'll understand this tweet in about three weeks.",
    "not saying anything. just saying. 🤐",
    "the {vibe} energy from {team} today was very telling.",
    "screenshot this one. that's all i ask.",
    "funny how quiet it's gone since {gp}, isn't it?",
    "{driver} is {vibe}. and i think that says it all.",
    "big if true. and it's true. 👀",
    "we are NOT ready for what's coming.",
    "somebody's phone is about to blow up. it's not mine. it's theirs.",
    "the people who need to know, already know.",
    "i've said too much. deleting later. 🫡",
    "remember this tweet.",
    "{team} know exactly what they're doing. or do they. 🤔",
    "the real story of {gp} hasn't been told yet.",
    "you can feel it, can't you.",
    "no notes. no context. just vibes. {driver} 👀"
  ]
};
