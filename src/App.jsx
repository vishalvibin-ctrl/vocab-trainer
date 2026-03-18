import { useState, useEffect } from "react";

// ─── Word Bank: 30 days × 5 words ───
const WORD_BANK = [
  [
    { word: "Ubiquitous", phonetic: "/juːˈbɪk.wɪ.təs/", meaning: "Present, appearing, or found everywhere", example: "Smartphones have become ubiquitous in modern life.", synonyms: ["omnipresent", "pervasive", "universal"] },
    { word: "Pragmatic", phonetic: "/præɡˈmæt.ɪk/", meaning: "Dealing with things sensibly and realistically", example: "She took a pragmatic approach to solving the budget crisis.", synonyms: ["practical", "realistic", "sensible"] },
    { word: "Ephemeral", phonetic: "/ɪˈfem.ər.əl/", meaning: "Lasting for a very short time", example: "The beauty of cherry blossoms is ephemeral.", synonyms: ["fleeting", "transient", "momentary"] },
    { word: "Eloquent", phonetic: "/ˈel.ə.kwənt/", meaning: "Fluent or persuasive in speaking or writing", example: "His eloquent speech moved the entire audience.", synonyms: ["articulate", "expressive", "fluent"] },
    { word: "Resilient", phonetic: "/rɪˈzɪl.i.ənt/", meaning: "Able to recover quickly from difficulties", example: "The resilient community rebuilt after the flood.", synonyms: ["tough", "adaptable", "hardy"] },
  ],
  [
    { word: "Paradigm", phonetic: "/ˈpær.ə.daɪm/", meaning: "A typical example or pattern of something; a model", example: "The discovery shifted the paradigm of modern physics.", synonyms: ["model", "framework", "archetype"] },
    { word: "Nuance", phonetic: "/ˈnjuː.ɑːns/", meaning: "A subtle difference in meaning, expression, or sound", example: "She appreciated the nuance in his argument.", synonyms: ["subtlety", "shade", "distinction"] },
    { word: "Cogent", phonetic: "/ˈkoʊ.dʒənt/", meaning: "Clear, logical, and convincing", example: "The lawyer presented a cogent case to the jury.", synonyms: ["compelling", "persuasive", "convincing"] },
    { word: "Dichotomy", phonetic: "/daɪˈkɒt.ə.mi/", meaning: "A division into two contrasting things", example: "There is a dichotomy between his public and private persona.", synonyms: ["division", "split", "contrast"] },
    { word: "Erudite", phonetic: "/ˈer.ʊ.daɪt/", meaning: "Having or showing great knowledge or learning", example: "The erudite professor lectured on ancient philosophy.", synonyms: ["scholarly", "learned", "knowledgeable"] },
  ],
  [
    { word: "Synergy", phonetic: "/ˈsɪn.ər.dʒi/", meaning: "The interaction of elements that produces a combined effect greater than the sum", example: "The merger created synergy between the two companies.", synonyms: ["collaboration", "cooperation", "combined effort"] },
    { word: "Leverage", phonetic: "/ˈlev.ər.ɪdʒ/", meaning: "Use something to maximum advantage", example: "We can leverage our expertise to win the contract.", synonyms: ["exploit", "utilize", "capitalize on"] },
    { word: "Meticulous", phonetic: "/məˈtɪk.jʊ.ləs/", meaning: "Showing great attention to detail; very careful", example: "Her meticulous research uncovered new evidence.", synonyms: ["thorough", "precise", "scrupulous"] },
    { word: "Benchmark", phonetic: "/ˈbentʃ.mɑːrk/", meaning: "A standard or point of reference against which things may be compared", example: "This report sets a benchmark for future performance.", synonyms: ["standard", "criterion", "yardstick"] },
    { word: "Pivotal", phonetic: "/ˈpɪv.ə.təl/", meaning: "Of crucial importance in relation to the development of something", example: "It was a pivotal moment in her career.", synonyms: ["crucial", "critical", "key"] },
  ],
  [
    { word: "Empathy", phonetic: "/ˈem.pə.θi/", meaning: "The ability to understand and share the feelings of another", example: "Good leaders demonstrate empathy towards their team.", synonyms: ["compassion", "understanding", "sensitivity"] },
    { word: "Candor", phonetic: "/ˈkæn.dər/", meaning: "The quality of being open and honest in expression", example: "I appreciate your candor during this discussion.", synonyms: ["frankness", "honesty", "openness"] },
    { word: "Stoic", phonetic: "/ˈstoʊ.ɪk/", meaning: "Enduring pain or hardship without showing feelings or complaining", example: "He remained stoic despite the devastating news.", synonyms: ["unemotional", "impassive", "patient"] },
    { word: "Altruistic", phonetic: "/ˌæl.truˈɪs.tɪk/", meaning: "Showing a selfless concern for the well-being of others", example: "Her altruistic nature led her to volunteer at shelters.", synonyms: ["selfless", "generous", "philanthropic"] },
    { word: "Volatile", phonetic: "/ˈvɒl.ə.taɪl/", meaning: "Liable to change rapidly and unpredictably", example: "The market has been volatile this quarter.", synonyms: ["unpredictable", "unstable", "erratic"] },
  ],
  [
    { word: "Rhetoric", phonetic: "/ˈret.ər.ɪk/", meaning: "The art of effective or persuasive speaking or writing", example: "Political rhetoric often simplifies complex issues.", synonyms: ["oratory", "eloquence", "discourse"] },
    { word: "Anecdote", phonetic: "/ˈæn.ɪk.doʊt/", meaning: "A short and amusing or interesting story about a real incident", example: "He opened with a humorous anecdote about his childhood.", synonyms: ["story", "tale", "narrative"] },
    { word: "Hyperbole", phonetic: "/haɪˈpɜːr.bə.li/", meaning: "Exaggerated statements not meant to be taken literally", example: "Saying 'I've told you a million times' is hyperbole.", synonyms: ["exaggeration", "overstatement", "embellishment"] },
    { word: "Juxtapose", phonetic: "/ˌdʒʌk.stəˈpoʊz/", meaning: "Place close together for contrasting effect", example: "The artist juxtaposed light and shadow beautifully.", synonyms: ["contrast", "compare", "set side by side"] },
    { word: "Ambiguous", phonetic: "/æmˈbɪɡ.ju.əs/", meaning: "Open to more than one interpretation; unclear", example: "The contract's ambiguous language caused disputes.", synonyms: ["vague", "unclear", "equivocal"] },
  ],
  [
    { word: "Empirical", phonetic: "/ɪmˈpɪr.ɪ.kəl/", meaning: "Based on observation or experience rather than theory", example: "The study relied on empirical data from field tests.", synonyms: ["observed", "experiential", "practical"] },
    { word: "Conjecture", phonetic: "/kənˈdʒek.tʃər/", meaning: "An opinion or conclusion formed on the basis of incomplete information", example: "Without evidence, it remains mere conjecture.", synonyms: ["speculation", "guess", "hypothesis"] },
    { word: "Fallacy", phonetic: "/ˈfæl.ə.si/", meaning: "A mistaken belief based on unsound argument", example: "The argument was built on a logical fallacy.", synonyms: ["misconception", "error", "delusion"] },
    { word: "Axiom", phonetic: "/ˈæk.si.əm/", meaning: "A statement regarded as being established or self-evidently true", example: "It's an axiom that practice makes perfect.", synonyms: ["principle", "truth", "maxim"] },
    { word: "Substantiate", phonetic: "/səbˈstæn.ʃi.eɪt/", meaning: "Provide evidence to support or prove the truth of", example: "Can you substantiate your claims with data?", synonyms: ["verify", "confirm", "validate"] },
  ],
  [
    { word: "Galvanize", phonetic: "/ˈɡæl.və.naɪz/", meaning: "Shock or excite someone into taking action", example: "The speech galvanized the crowd into protest.", synonyms: ["inspire", "motivate", "stimulate"] },
    { word: "Delegate", phonetic: "/ˈdel.ɪ.ɡeɪt/", meaning: "Entrust a task or responsibility to another person", example: "Good managers delegate effectively.", synonyms: ["assign", "entrust", "transfer"] },
    { word: "Catalyst", phonetic: "/ˈkæt.əl.ɪst/", meaning: "A person or thing that precipitates an event or change", example: "The crisis was a catalyst for reform.", synonyms: ["stimulus", "spark", "trigger"] },
    { word: "Tenure", phonetic: "/ˈten.jər/", meaning: "The holding of an office or the period of holding it", example: "During her tenure, the company doubled its revenue.", synonyms: ["term", "incumbency", "period"] },
    { word: "Autonomy", phonetic: "/ɔːˈtɒn.ə.mi/", meaning: "The right or condition of self-governance", example: "The team was given full autonomy over the project.", synonyms: ["independence", "freedom", "self-governance"] },
  ],
  [
    { word: "Succinct", phonetic: "/səkˈsɪŋkt/", meaning: "Briefly and clearly expressed", example: "Her succinct summary captured the key points.", synonyms: ["concise", "brief", "pithy"] },
    { word: "Verbose", phonetic: "/vɜːrˈboʊs/", meaning: "Using more words than needed; wordy", example: "The report was too verbose and needed editing.", synonyms: ["wordy", "long-winded", "prolix"] },
    { word: "Lucid", phonetic: "/ˈluː.sɪd/", meaning: "Expressed clearly; easy to understand", example: "The professor gave a lucid explanation of quantum theory.", synonyms: ["clear", "intelligible", "coherent"] },
    { word: "Prose", phonetic: "/proʊz/", meaning: "Written or spoken language in its ordinary form", example: "She writes prose that flows like poetry.", synonyms: ["text", "writing", "composition"] },
    { word: "Allegory", phonetic: "/ˈæl.ɪ.ɡɔːr.i/", meaning: "A story with a hidden meaning, usually moral or political", example: "Animal Farm is an allegory for the Russian Revolution.", synonyms: ["parable", "fable", "metaphor"] },
  ],
  [
    { word: "Hypothesis", phonetic: "/haɪˈpɒθ.ə.sɪs/", meaning: "A proposed explanation made on limited evidence as a starting point", example: "The scientist tested her hypothesis in the lab.", synonyms: ["theory", "proposition", "assumption"] },
    { word: "Anomaly", phonetic: "/əˈnɒm.ə.li/", meaning: "Something that deviates from what is standard or expected", example: "The data anomaly required further investigation.", synonyms: ["irregularity", "aberration", "deviation"] },
    { word: "Synthesize", phonetic: "/ˈsɪn.θə.saɪz/", meaning: "Combine elements to form a coherent whole", example: "She synthesized findings from multiple studies.", synonyms: ["combine", "integrate", "merge"] },
    { word: "Obsolete", phonetic: "/ˌɒb.səˈliːt/", meaning: "No longer produced or used; out of date", example: "Floppy disks have become obsolete.", synonyms: ["outdated", "antiquated", "archaic"] },
    { word: "Proliferate", phonetic: "/prəˈlɪf.ər.eɪt/", meaning: "Increase rapidly in number; multiply", example: "Social media platforms have proliferated in the last decade.", synonyms: ["multiply", "spread", "expand"] },
  ],
  [
    { word: "Amortize", phonetic: "/ˈæm.ər.taɪz/", meaning: "Gradually write off the initial cost of an asset", example: "The loan will be amortized over 30 years.", synonyms: ["spread", "write off", "depreciate"] },
    { word: "Fiduciary", phonetic: "/fɪˈduː.ʃi.er.i/", meaning: "Involving trust, especially relating to the relationship between a trustee and a beneficiary", example: "The advisor has a fiduciary duty to clients.", synonyms: ["trustee", "custodian", "guardian"] },
    { word: "Liquidity", phonetic: "/lɪˈkwɪd.ɪ.ti/", meaning: "The availability of liquid assets; ease of converting to cash", example: "The bank maintained high liquidity ratios.", synonyms: ["cash flow", "solvency", "fluidity"] },
    { word: "Collateral", phonetic: "/kəˈlæt.ər.əl/", meaning: "Something pledged as security for repayment of a loan", example: "He used his property as collateral for the loan.", synonyms: ["security", "guarantee", "pledge"] },
    { word: "Arbitrage", phonetic: "/ˈɑːr.bɪ.trɑːʒ/", meaning: "Buying and selling in different markets to profit from price differences", example: "Currency arbitrage exploits exchange rate differences.", synonyms: ["trading", "speculation", "dealing"] },
  ],
  [
    { word: "Existential", phonetic: "/ˌeɡ.zɪˈsten.ʃəl/", meaning: "Relating to existence; concerning life's fundamental nature", example: "Climate change poses an existential threat.", synonyms: ["fundamental", "metaphysical", "profound"] },
    { word: "Utilitarian", phonetic: "/juːˌtɪl.ɪˈteər.i.ən/", meaning: "Designed to be useful rather than attractive; relating to the greatest good", example: "The utilitarian approach prioritizes overall happiness.", synonyms: ["practical", "functional", "pragmatic"] },
    { word: "Dogmatic", phonetic: "/dɒɡˈmæt.ɪk/", meaning: "Inclined to lay down principles as undeniably true", example: "His dogmatic beliefs prevented open discussion.", synonyms: ["opinionated", "rigid", "inflexible"] },
    { word: "Esoteric", phonetic: "/ˌes.əˈter.ɪk/", meaning: "Intended for or understood by only a small group", example: "The lecture covered esoteric aspects of quantum mechanics.", synonyms: ["obscure", "arcane", "niche"] },
    { word: "Nihilism", phonetic: "/ˈnaɪ.ɪ.lɪz.əm/", meaning: "The rejection of all religious and moral principles; belief that life is meaningless", example: "The novel explores themes of nihilism and despair.", synonyms: ["skepticism", "pessimism", "cynicism"] },
  ],
  [
    { word: "Cognitive", phonetic: "/ˈkɒɡ.nɪ.tɪv/", meaning: "Relating to cognition; mental processes of perception and reasoning", example: "Cognitive biases affect decision-making.", synonyms: ["mental", "intellectual", "cerebral"] },
    { word: "Intrinsic", phonetic: "/ɪnˈtrɪn.zɪk/", meaning: "Belonging naturally; essential", example: "She has an intrinsic motivation to learn.", synonyms: ["inherent", "innate", "natural"] },
    { word: "Catharsis", phonetic: "/kəˈθɑːr.sɪs/", meaning: "The process of releasing strong emotions through art or activity", example: "Writing in her journal provided catharsis.", synonyms: ["release", "purging", "cleansing"] },
    { word: "Apathy", phonetic: "/ˈæp.ə.θi/", meaning: "Lack of interest, enthusiasm, or concern", example: "Voter apathy led to low turnout.", synonyms: ["indifference", "disinterest", "passivity"] },
    { word: "Narcissism", phonetic: "/ˈnɑːr.sɪ.sɪz.əm/", meaning: "Excessive interest in or admiration of oneself", example: "Social media can fuel narcissism.", synonyms: ["vanity", "self-absorption", "egotism"] },
  ],
  [
    { word: "Jurisdiction", phonetic: "/ˌdʒʊr.ɪsˈdɪk.ʃən/", meaning: "The official power to make legal decisions and judgments", example: "The case falls under federal jurisdiction.", synonyms: ["authority", "power", "domain"] },
    { word: "Precedent", phonetic: "/ˈpres.ɪ.dənt/", meaning: "An earlier event or action regarded as an example or guide", example: "The court ruling set a legal precedent.", synonyms: ["example", "model", "standard"] },
    { word: "Sovereign", phonetic: "/ˈsɒv.rɪn/", meaning: "Possessing supreme or ultimate power; a ruler", example: "Each nation is a sovereign entity.", synonyms: ["supreme", "independent", "autonomous"] },
    { word: "Litigate", phonetic: "/ˈlɪt.ɪ.ɡeɪt/", meaning: "To take a claim or dispute to a court of law", example: "They chose to litigate rather than settle.", synonyms: ["sue", "prosecute", "contest"] },
    { word: "Amnesty", phonetic: "/ˈæm.nə.sti/", meaning: "An official pardon for people convicted of offenses", example: "The government declared amnesty for political prisoners.", synonyms: ["pardon", "reprieve", "forgiveness"] },
  ],
  [
    { word: "Algorithm", phonetic: "/ˈæl.ɡə.rɪð.əm/", meaning: "A process or set of rules to be followed in calculations or problem-solving", example: "The search algorithm ranks results by relevance.", synonyms: ["procedure", "formula", "method"] },
    { word: "Encryption", phonetic: "/ɪnˈkrɪp.ʃən/", meaning: "The process of converting information into code to prevent unauthorized access", example: "End-to-end encryption protects messages.", synonyms: ["encoding", "ciphering", "coding"] },
    { word: "Latency", phonetic: "/ˈleɪ.tən.si/", meaning: "The delay before a transfer of data begins", example: "Low latency is critical for online gaming.", synonyms: ["delay", "lag", "response time"] },
    { word: "Scalable", phonetic: "/ˈskeɪ.lə.bəl/", meaning: "Able to be changed in size or scale", example: "The architecture is designed to be scalable.", synonyms: ["expandable", "flexible", "adaptable"] },
    { word: "Deprecated", phonetic: "/ˈdep.rə.keɪ.tɪd/", meaning: "Disapproved of; declared obsolete in software", example: "That API function has been deprecated.", synonyms: ["obsolete", "outdated", "discontinued"] },
  ],
  [
    { word: "Biodiversity", phonetic: "/ˌbaɪ.oʊ.daɪˈvɜːr.sə.ti/", meaning: "The variety of plant and animal life in a habitat", example: "Rainforests have incredible biodiversity.", synonyms: ["variety", "ecological diversity", "species richness"] },
    { word: "Sustainable", phonetic: "/səˈsteɪ.nə.bəl/", meaning: "Able to be maintained at a certain rate or level", example: "We need sustainable farming practices.", synonyms: ["viable", "renewable", "maintainable"] },
    { word: "Ecosystem", phonetic: "/ˈiː.koʊ.sɪs.təm/", meaning: "A biological community of interacting organisms and their environment", example: "Coral reefs are fragile ecosystems.", synonyms: ["habitat", "environment", "biome"] },
    { word: "Erosion", phonetic: "/ɪˈroʊ.ʒən/", meaning: "The gradual wearing away of soil, rock, or land", example: "Coastal erosion threatens nearby homes.", synonyms: ["wearing away", "deterioration", "degradation"] },
    { word: "Indigenous", phonetic: "/ɪnˈdɪdʒ.ə.nəs/", meaning: "Originating or occurring naturally in a particular place", example: "The koala is indigenous to Australia.", synonyms: ["native", "aboriginal", "local"] },
  ],
  [
    { word: "Zeitgeist", phonetic: "/ˈtsaɪt.ɡaɪst/", meaning: "The defining spirit or mood of a particular period of history", example: "The film captured the zeitgeist of the 1990s.", synonyms: ["spirit", "ethos", "mood"] },
    { word: "Diaspora", phonetic: "/daɪˈæs.pər.ə/", meaning: "The dispersion of people from their original homeland", example: "The Indian diaspora spans every continent.", synonyms: ["dispersion", "scattering", "migration"] },
    { word: "Egalitarian", phonetic: "/ɪˌɡæl.ɪˈteər.i.ən/", meaning: "Relating to the principle that all people are equal", example: "Scandinavian countries are known for egalitarian policies.", synonyms: ["equal", "democratic", "fair"] },
    { word: "Hegemony", phonetic: "/hɪˈdʒem.ə.ni/", meaning: "Leadership or dominance, especially by one country or social group", example: "The empire's hegemony lasted for centuries.", synonyms: ["dominance", "supremacy", "authority"] },
    { word: "Vernacular", phonetic: "/vərˈnæk.jʊ.lər/", meaning: "The language or dialect spoken by ordinary people of a region", example: "The book is written in the local vernacular.", synonyms: ["dialect", "colloquial", "native tongue"] },
  ],
  [
    { word: "Conciliation", phonetic: "/kənˌsɪl.iˈeɪ.ʃən/", meaning: "The action of mediating between two disputing parties", example: "Both sides agreed to conciliation before arbitration.", synonyms: ["mediation", "peacemaking", "reconciliation"] },
    { word: "Belligerent", phonetic: "/bəˈlɪdʒ.ər.ənt/", meaning: "Hostile and aggressive; engaged in a war", example: "The belligerent nations refused to negotiate.", synonyms: ["aggressive", "hostile", "combative"] },
    { word: "Capitulate", phonetic: "/kəˈpɪtʃ.ʊ.leɪt/", meaning: "Cease to resist an opponent or an unwelcome demand", example: "After weeks of negotiation, they capitulated.", synonyms: ["surrender", "yield", "submit"] },
    { word: "Impasse", phonetic: "/ˈɪm.pæs/", meaning: "A situation in which no progress is possible", example: "Talks reached an impasse on trade tariffs.", synonyms: ["deadlock", "stalemate", "standoff"] },
    { word: "Armistice", phonetic: "/ˈɑːr.mɪ.stɪs/", meaning: "An agreement to stop fighting", example: "The armistice ended four years of war.", synonyms: ["ceasefire", "truce", "peace agreement"] },
  ],
  [
    { word: "Prognosis", phonetic: "/prɒɡˈnoʊ.sɪs/", meaning: "The likely course of a disease or ailment", example: "The doctor gave an optimistic prognosis.", synonyms: ["forecast", "outlook", "prediction"] },
    { word: "Chronic", phonetic: "/ˈkrɒn.ɪk/", meaning: "Persisting for a long time or constantly recurring", example: "He suffers from chronic back pain.", synonyms: ["persistent", "long-term", "ongoing"] },
    { word: "Palliative", phonetic: "/ˈpæl.i.ə.tɪv/", meaning: "Relieving pain without dealing with the cause", example: "Palliative care focuses on quality of life.", synonyms: ["soothing", "alleviating", "comforting"] },
    { word: "Pathogen", phonetic: "/ˈpæθ.ə.dʒən/", meaning: "A bacterium, virus, or other microorganism that can cause disease", example: "The pathogen was identified through lab testing.", synonyms: ["germ", "microbe", "virus"] },
    { word: "Immunology", phonetic: "/ˌɪm.jʊˈnɒl.ə.dʒi/", meaning: "The branch of medicine dealing with the immune system", example: "Advances in immunology led to new vaccines.", synonyms: ["immune science", "serology"] },
  ],
  [
    { word: "Aesthetic", phonetic: "/esˈθet.ɪk/", meaning: "Concerned with beauty or the appreciation of beauty", example: "The building has a minimalist aesthetic.", synonyms: ["artistic", "visual", "tasteful"] },
    { word: "Symmetry", phonetic: "/ˈsɪm.ə.tri/", meaning: "The quality of being made up of exactly similar parts facing each other", example: "The façade is a study in symmetry.", synonyms: ["balance", "proportion", "harmony"] },
    { word: "Façade", phonetic: "/fəˈsɑːd/", meaning: "The front of a building; an outward appearance maintained to conceal reality", example: "Behind the cheerful façade lay deep anxiety.", synonyms: ["front", "exterior", "appearance"] },
    { word: "Eclectic", phonetic: "/ɪˈklek.tɪk/", meaning: "Deriving ideas, style, or taste from a broad range of sources", example: "The café has an eclectic décor.", synonyms: ["diverse", "varied", "wide-ranging"] },
    { word: "Monolithic", phonetic: "/ˌmɒn.əˈlɪθ.ɪk/", meaning: "Large, powerful, and intractably indivisible", example: "The monolithic structure dominated the skyline.", synonyms: ["massive", "imposing", "colossal"] },
  ],
  [
    { word: "Celestial", phonetic: "/sɪˈles.tʃəl/", meaning: "Positioned in or relating to the sky or outer space", example: "Stars are celestial objects visible at night.", synonyms: ["heavenly", "astral", "cosmic"] },
    { word: "Nebula", phonetic: "/ˈneb.jʊ.lə/", meaning: "A cloud of gas and dust in outer space", example: "The Orion Nebula is visible to the naked eye.", synonyms: ["gas cloud", "star nursery"] },
    { word: "Trajectory", phonetic: "/trəˈdʒek.tər.i/", meaning: "The path followed by a projectile or moving object", example: "The satellite's trajectory was carefully calculated.", synonyms: ["path", "course", "route"] },
    { word: "Cosmos", phonetic: "/ˈkɒz.mɒs/", meaning: "The universe seen as a well-ordered whole", example: "Ancient Greeks studied the cosmos with wonder.", synonyms: ["universe", "creation", "macrocosm"] },
    { word: "Perihelion", phonetic: "/ˌper.ɪˈhiː.li.ən/", meaning: "The point in the orbit of a planet nearest to the sun", example: "Earth reaches perihelion in early January.", synonyms: ["closest approach", "nearest point"] },
  ],
  [
    { word: "Crescendo", phonetic: "/krɪˈʃen.doʊ/", meaning: "A gradual increase in loudness or intensity", example: "The symphony built to a powerful crescendo.", synonyms: ["peak", "climax", "buildup"] },
    { word: "Virtuoso", phonetic: "/ˌvɜːr.tʃuˈoʊ.soʊ/", meaning: "A person highly skilled in music or another artistic pursuit", example: "She's a virtuoso on the violin.", synonyms: ["master", "expert", "prodigy"] },
    { word: "Avant-garde", phonetic: "/ˌæv.ɒ̃ˈɡɑːrd/", meaning: "New and experimental ideas, especially in the arts", example: "The gallery showcases avant-garde sculptures.", synonyms: ["innovative", "experimental", "cutting-edge"] },
    { word: "Renaissance", phonetic: "/ˈren.ə.sɑːns/", meaning: "A revival of interest in art and learning", example: "We're witnessing a renaissance in local cuisine.", synonyms: ["revival", "rebirth", "renewal"] },
    { word: "Motif", phonetic: "/moʊˈtiːf/", meaning: "A decorative design or pattern; a recurring theme", example: "The floral motif appears throughout the painting.", synonyms: ["theme", "pattern", "design"] },
  ],
  [
    { word: "Charisma", phonetic: "/kəˈrɪz.mə/", meaning: "Compelling attractiveness that can inspire devotion", example: "Her charisma drew followers from all walks of life.", synonyms: ["charm", "magnetism", "allure"] },
    { word: "Autocratic", phonetic: "/ˌɔː.təˈkræt.ɪk/", meaning: "Relating to a ruler with absolute power", example: "The autocratic leader suppressed dissent.", synonyms: ["dictatorial", "authoritarian", "despotic"] },
    { word: "Propaganda", phonetic: "/ˌprɒp.əˈɡæn.də/", meaning: "Biased information used to promote a political cause", example: "The regime spread propaganda through state media.", synonyms: ["disinformation", "publicity", "agitation"] },
    { word: "Oligarchy", phonetic: "/ˈɒl.ɪ.ɡɑːr.ki/", meaning: "A small group of people having control of a country or organization", example: "Critics called the system an oligarchy of the wealthy.", synonyms: ["elite rule", "plutocracy", "aristocracy"] },
    { word: "Magnate", phonetic: "/ˈmæɡ.neɪt/", meaning: "A wealthy and influential person, especially in business", example: "The media magnate owns dozens of newspapers.", synonyms: ["tycoon", "mogul", "baron"] },
  ],
  [
    { word: "Itinerary", phonetic: "/aɪˈtɪn.ər.ər.i/", meaning: "A planned route or journey", example: "The tour itinerary includes five cities.", synonyms: ["schedule", "plan", "route"] },
    { word: "Archipelago", phonetic: "/ˌɑːr.kɪˈpel.ə.ɡoʊ/", meaning: "A group of islands", example: "Indonesia is the world's largest archipelago.", synonyms: ["island chain", "island group"] },
    { word: "Topography", phonetic: "/təˈpɒɡ.rə.fi/", meaning: "The arrangement of natural and artificial physical features of an area", example: "The region's topography makes farming difficult.", synonyms: ["terrain", "landscape", "geography"] },
    { word: "Nomadic", phonetic: "/noʊˈmæd.ɪk/", meaning: "Living the life of a nomad; wandering", example: "The nomadic tribes followed seasonal grazing patterns.", synonyms: ["wandering", "roaming", "migratory"] },
    { word: "Meridian", phonetic: "/məˈrɪd.i.ən/", meaning: "A circle of constant longitude passing through a given place", example: "The prime meridian passes through Greenwich.", synonyms: ["longitude line", "line of longitude"] },
  ],
  [
    { word: "Etymology", phonetic: "/ˌet.ɪˈmɒl.ə.dʒi/", meaning: "The study of the origin of words and their meanings", example: "The etymology of 'salary' traces back to salt.", synonyms: ["word history", "derivation", "origin"] },
    { word: "Syntax", phonetic: "/ˈsɪn.tæks/", meaning: "The arrangement of words to create well-formed sentences", example: "Correct syntax is essential in programming.", synonyms: ["grammar", "structure", "arrangement"] },
    { word: "Lexicon", phonetic: "/ˈlek.sɪ.kɒn/", meaning: "The vocabulary of a person, language, or branch of knowledge", example: "The word entered the tech lexicon quickly.", synonyms: ["vocabulary", "dictionary", "glossary"] },
    { word: "Colloquial", phonetic: "/kəˈloʊ.kwi.əl/", meaning: "Used in ordinary or familiar conversation; informal", example: "'Gonna' is a colloquial contraction of 'going to'.", synonyms: ["informal", "conversational", "casual"] },
    { word: "Semantics", phonetic: "/sɪˈmæn.tɪks/", meaning: "The branch of linguistics concerned with meaning", example: "The debate was largely about semantics.", synonyms: ["meaning", "interpretation", "significance"] },
  ],
  [
    { word: "Asymptotic", phonetic: "/ˌæs.ɪmpˈtɒt.ɪk/", meaning: "Approaching a value or curve arbitrarily closely", example: "The function has asymptotic behavior near zero.", synonyms: ["approaching", "converging", "limiting"] },
    { word: "Stochastic", phonetic: "/stəˈkæs.tɪk/", meaning: "Randomly determined; having a random probability distribution", example: "The model uses stochastic processes for simulation.", synonyms: ["random", "probabilistic", "chance-based"] },
    { word: "Permutation", phonetic: "/ˌpɜːr.mjuˈteɪ.ʃən/", meaning: "Each of several possible ways of arranging a set of things", example: "There are 120 permutations of five items.", synonyms: ["arrangement", "combination", "variation"] },
    { word: "Theorem", phonetic: "/ˈθɪər.əm/", meaning: "A general proposition proved by a chain of reasoning", example: "Pythagoras's theorem is fundamental to geometry.", synonyms: ["principle", "law", "rule"] },
    { word: "Heuristic", phonetic: "/hjʊˈrɪs.tɪk/", meaning: "Enabling discovery or learning; a practical approach", example: "We used a heuristic method to find an approximate solution.", synonyms: ["rule of thumb", "practical", "trial-and-error"] },
  ],
  [
    { word: "Bilateral", phonetic: "/baɪˈlæt.ər.əl/", meaning: "Having or relating to two sides; affecting both sides", example: "The bilateral trade agreement boosted both economies.", synonyms: ["two-sided", "mutual", "reciprocal"] },
    { word: "Embargo", phonetic: "/ɪmˈbɑːr.ɡoʊ/", meaning: "An official ban on trade or other commercial activity", example: "The embargo restricted oil exports from the country.", synonyms: ["ban", "prohibition", "restriction"] },
    { word: "Sanction", phonetic: "/ˈsæŋk.ʃən/", meaning: "A threatened penalty for disobeying a law or rule", example: "International sanctions were imposed on the regime.", synonyms: ["penalty", "restriction", "punishment"] },
    { word: "Détente", phonetic: "/deɪˈtɑːnt/", meaning: "The easing of hostility or strained relations between countries", example: "The summit marked a period of détente between the superpowers.", synonyms: ["relaxation", "easing", "thaw"] },
    { word: "Multilateral", phonetic: "/ˌmʌl.tiˈlæt.ər.əl/", meaning: "Agreed upon or participated in by three or more parties", example: "Multilateral cooperation is key to solving climate change.", synonyms: ["many-sided", "joint", "collective"] },
  ],
  [
    { word: "Melancholy", phonetic: "/ˈmel.ən.kɒl.i/", meaning: "A deep, pensive sadness", example: "The autumn landscape filled her with melancholy.", synonyms: ["sadness", "sorrow", "wistfulness"] },
    { word: "Exuberant", phonetic: "/ɪɡˈzjuː.bər.ənt/", meaning: "Filled with lively energy and excitement", example: "The exuberant crowd cheered wildly.", synonyms: ["enthusiastic", "vibrant", "buoyant"] },
    { word: "Serene", phonetic: "/sɪˈriːn/", meaning: "Calm, peaceful, and untroubled", example: "The lake at dawn was perfectly serene.", synonyms: ["tranquil", "peaceful", "placid"] },
    { word: "Tenacious", phonetic: "/tɪˈneɪ.ʃəs/", meaning: "Tending to keep a firm hold; persistent", example: "Her tenacious spirit never let her give up.", synonyms: ["persistent", "determined", "dogged"] },
    { word: "Ominous", phonetic: "/ˈɒm.ɪ.nəs/", meaning: "Giving the impression that something bad is going to happen", example: "Dark clouds gathered in an ominous sky.", synonyms: ["threatening", "menacing", "foreboding"] },
  ],
  [
    { word: "Consciousness", phonetic: "/ˈkɒn.ʃəs.nəs/", meaning: "The state of being aware of one's own existence and surroundings", example: "The nature of consciousness remains a mystery.", synonyms: ["awareness", "sentience", "perception"] },
    { word: "Solipsism", phonetic: "/ˈsɒl.ɪp.sɪz.əm/", meaning: "The view that the self is all that can be known to exist", example: "Solipsism is an extreme philosophical position.", synonyms: ["egocentrism", "subjectivism"] },
    { word: "Phenomenology", phonetic: "/fɪˌnɒm.ɪˈnɒl.ə.dʒi/", meaning: "The study of the structures of experience and consciousness", example: "Husserl is the founder of phenomenology.", synonyms: ["study of experience", "experiential analysis"] },
    { word: "Qualia", phonetic: "/ˈkwɑː.li.ə/", meaning: "The internal, subjective qualities of conscious experiences", example: "The redness of red is an example of qualia.", synonyms: ["subjective experience", "sensory quality"] },
    { word: "Determinism", phonetic: "/dɪˈtɜːr.mɪ.nɪz.əm/", meaning: "The doctrine that all events are determined by causes external to the will", example: "Determinism challenges the notion of free will.", synonyms: ["fatalism", "predestination", "causalism"] },
  ],
  [
    { word: "Verisimilitude", phonetic: "/ˌver.ɪ.sɪˈmɪl.ɪ.tjuːd/", meaning: "The appearance of being true or real", example: "The novel's verisimilitude made it utterly compelling.", synonyms: ["realism", "believability", "authenticity"] },
    { word: "Sycophant", phonetic: "/ˈsɪk.ə.fænt/", meaning: "A person who acts obsequiously to gain advantage", example: "The CEO was surrounded by sycophants.", synonyms: ["flatterer", "yes-man", "toady"] },
    { word: "Recalcitrant", phonetic: "/rɪˈkæl.sɪ.trənt/", meaning: "Having an obstinately uncooperative attitude", example: "The recalcitrant employee refused to follow the new policy.", synonyms: ["stubborn", "defiant", "rebellious"] },
    { word: "Perspicacious", phonetic: "/ˌpɜːr.spɪˈkeɪ.ʃəs/", meaning: "Having a ready insight into and understanding of things", example: "A perspicacious investor saw the opportunity early.", synonyms: ["shrewd", "perceptive", "astute"] },
    { word: "Obfuscate", phonetic: "/ˈɒb.fʌ.skeɪt/", meaning: "Make obscure, unclear, or unintelligible", example: "Legal jargon can obfuscate the true meaning.", synonyms: ["confuse", "obscure", "muddle"] },
  ],
  [
    { word: "Quintessential", phonetic: "/ˌkwɪn.tɪˈsen.ʃəl/", meaning: "Representing the most perfect or typical example", example: "Paris is the quintessential romantic city.", synonyms: ["ultimate", "definitive", "archetypal"] },
    { word: "Serendipity", phonetic: "/ˌser.ənˈdɪp.ɪ.ti/", meaning: "The occurrence of events by chance in a happy or beneficial way", example: "Finding that book was pure serendipity.", synonyms: ["luck", "fortune", "happy accident"] },
    { word: "Magnanimous", phonetic: "/mæɡˈnæn.ɪ.məs/", meaning: "Very generous or forgiving, especially toward a rival", example: "She was magnanimous in victory.", synonyms: ["generous", "noble", "gracious"] },
    { word: "Transcendent", phonetic: "/trænˈsen.dənt/", meaning: "Surpassing the ordinary; exceptional", example: "The performance was a transcendent experience.", synonyms: ["supreme", "extraordinary", "sublime"] },
    { word: "Apotheosis", phonetic: "/əˌpɒθ.iˈoʊ.sɪs/", meaning: "The highest point in the development of something; culmination", example: "The film represents the apotheosis of his career.", synonyms: ["pinnacle", "peak", "culmination"] },
  ],
];

const DAY_THEMES = [
  "Everyday Power Words", "Intellectual Edge", "Business & Professional", "Emotional Intelligence",
  "Persuasion & Rhetoric", "Critical Thinking", "Leadership & Strategy", "Writing & Expression",
  "Science & Innovation", "Finance & Economics", "Philosophy & Ethics", "Psychology & Behavior",
  "Law & Governance", "Technology & Digital", "Nature & Environment", "Culture & Society",
  "Conflict & Resolution", "Medicine & Health", "Architecture & Design", "Astronomy & Space",
  "Music & Arts", "Power & Influence", "Travel & Geography", "Linguistics & Language",
  "Mathematics & Logic", "Diplomacy & Relations", "Emotional & Descriptive", "Philosophy of Mind",
  "Advanced Vocabulary", "Mastery Words"
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ─── localStorage helpers ───
const STORAGE_KEY = "vocabtrainer-progress";

const loadProgress = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
};

const saveProgress = (data) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) { console.error("Save failed:", e); }
};

const getDefaultProgress = () => ({
  currentDay: 1,
  streak: 0,
  lastPracticeDate: null,
  dayResults: {},
  masteredWords: [],
  reviewQueue: [],
  totalTimeSpent: 0,
  startDate: new Date().toISOString(),
});

// ─── Progress Ring ───
const ProgressRing = ({ progress, size = 120, stroke = 8, color = "#E8C547" }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - progress * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
    </svg>
  );
};

// ─── Home Screen ───
const HomeScreen = ({ progress, onStartDay, onReview }) => {
  const today = progress.currentDay;
  const mastered = progress.masteredWords.length;
  const daysCompleted = Object.keys(progress.dayResults).length;
  const overallProgress = daysCompleted / 30;

  return (
    <div style={{ padding: "32px 24px", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 14, letterSpacing: 3, color: "#E8C547", fontFamily: "'Cormorant Garamond', serif", textTransform: "uppercase", marginBottom: 8 }}>
          30-Day Vocabulary
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 300, margin: 0, fontFamily: "'Cormorant Garamond', serif", color: "#F5F0E8" }}>
          Word Mastery
        </h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 40, position: "relative" }}>
        <ProgressRing progress={overallProgress} size={160} stroke={6} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
          <div style={{ fontSize: 40, fontWeight: 300, color: "#F5F0E8", fontFamily: "'Cormorant Garamond', serif" }}>{daysCompleted}</div>
          <div style={{ fontSize: 11, color: "#8A8578", letterSpacing: 2, textTransform: "uppercase" }}>of 30 days</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        {[
          { label: "Streak", value: `${progress.streak}d`, icon: "🔥" },
          { label: "Mastered", value: mastered, icon: "✦" },
          { label: "Practiced", value: `${Math.round(progress.totalTimeSpent / 60)}m`, icon: "◷" },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: "rgba(232,197,71,0.04)", border: "1px solid rgba(232,197,71,0.1)",
            borderRadius: 12, padding: "16px 12px", textAlign: "center"
          }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 300, color: "#F5F0E8", fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "#8A8578", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {today <= 30 && (
        <button onClick={() => onStartDay(today)} style={{
          width: "100%", background: "linear-gradient(135deg, #E8C547 0%, #D4A843 100%)",
          border: "none", borderRadius: 16, padding: "28px 24px", cursor: "pointer",
          textAlign: "left", marginBottom: 16, position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, background: "rgba(255,255,255,0.1)", borderRadius: "50%" }} />
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(30,28,24,0.6)", marginBottom: 4 }}>Day {today} of 30</div>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#1E1C18", fontFamily: "'Cormorant Garamond', serif", marginBottom: 6 }}>{DAY_THEMES[today - 1]}</div>
          <div style={{ fontSize: 13, color: "rgba(30,28,24,0.7)" }}>5 new words · ~30 min practice</div>
          <div style={{ marginTop: 12, fontSize: 13, fontWeight: 600, color: "#1E1C18", display: "flex", alignItems: "center", gap: 6 }}>
            Start Today's Lesson <span style={{ fontSize: 18 }}>→</span>
          </div>
        </button>
      )}

      {progress.reviewQueue.length > 0 && (
        <button onClick={onReview} style={{
          width: "100%", background: "transparent", border: "1px solid rgba(232,197,71,0.2)",
          borderRadius: 16, padding: "20px 24px", cursor: "pointer", textAlign: "left", marginBottom: 24, color: "#F5F0E8"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>Review Queue</div>
              <div style={{ fontSize: 12, color: "#8A8578", marginTop: 2 }}>{progress.reviewQueue.length} words to revisit</div>
            </div>
            <span style={{ fontSize: 20, color: "#E8C547" }}>↻</span>
          </div>
        </button>
      )}

      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8A8578", marginBottom: 12 }}>Your Journey</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
          {Array.from({ length: 30 }, (_, i) => {
            const day = i + 1;
            const result = progress.dayResults[day];
            const isCurrent = day === today;
            const isLocked = day > today;
            const score = result ? result.score / result.total : 0;
            return (
              <button key={day} onClick={() => !isLocked && onStartDay(day)} disabled={isLocked} style={{
                width: "100%", aspectRatio: "1", borderRadius: 10, border: isCurrent ? "2px solid #E8C547" : "1px solid rgba(255,255,255,0.06)",
                background: result ? (score >= 0.8 ? "rgba(76,175,80,0.15)" : "rgba(232,197,71,0.1)") : "rgba(255,255,255,0.02)",
                cursor: isLocked ? "default" : "pointer", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", opacity: isLocked ? 0.3 : 1, gap: 2, padding: 0
              }}>
                <span style={{ fontSize: 13, fontWeight: isCurrent ? 600 : 400, color: isCurrent ? "#E8C547" : "#8A8578" }}>{day}</span>
                {result && <span style={{ fontSize: 9, color: score >= 0.8 ? "#4CAF50" : "#E8C547" }}>{Math.round(score * 100)}%</span>}
              </button>
            );
          })}
        </div>
      </div>

      {today > 30 && (
        <div style={{ textAlign: "center", marginTop: 40, padding: 32, background: "rgba(232,197,71,0.06)", borderRadius: 16 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
          <div style={{ fontSize: 24, fontFamily: "'Cormorant Garamond', serif", color: "#E8C547", fontWeight: 300 }}>Program Complete!</div>
          <div style={{ fontSize: 13, color: "#8A8578", marginTop: 8 }}>You mastered {mastered} out of 150 words in {Math.round(progress.totalTimeSpent / 60)} minutes.</div>
        </div>
      )}
    </div>
  );
};

// ─── Exercise Modes ───
const MODES = ["learn", "match", "fill", "quiz", "recap"];

const LearnMode = ({ words, onComplete }) => {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const w = words[idx];

  const next = () => {
    if (idx < words.length - 1) { setIdx(idx + 1); setFlipped(false); }
    else onComplete();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ fontSize: 11, letterSpacing: 2, color: "#8A8578", textTransform: "uppercase", marginBottom: 24 }}>Learn · {idx + 1} of {words.length}</div>
      <div onClick={() => setFlipped(!flipped)} style={{
        background: flipped ? "rgba(232,197,71,0.06)" : "rgba(255,255,255,0.03)",
        border: "1px solid rgba(232,197,71,0.15)", borderRadius: 20, padding: "40px 28px", cursor: "pointer", minHeight: 220,
        display: "flex", flexDirection: "column", justifyContent: "center", transition: "all 0.3s ease"
      }}>
        <div style={{ fontSize: 32, fontWeight: 300, fontFamily: "'Cormorant Garamond', serif", color: "#F5F0E8", marginBottom: 8 }}>{w.word}</div>
        <div style={{ fontSize: 14, color: "#8A8578", marginBottom: 16, fontStyle: "italic" }}>{w.phonetic}</div>
        {flipped && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ fontSize: 16, color: "#E8C547", marginBottom: 12, lineHeight: 1.5 }}>{w.meaning}</div>
            <div style={{ fontSize: 14, color: "#A09A8E", fontStyle: "italic", marginBottom: 12 }}>"{w.example}"</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {w.synonyms.map((s, i) => (
                <span key={i} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "rgba(232,197,71,0.08)", color: "#C4B156" }}>{s}</span>
              ))}
            </div>
          </div>
        )}
        {!flipped && <div style={{ fontSize: 13, color: "#6A6560", marginTop: 8 }}>Tap to reveal</div>}
      </div>
      <button onClick={next} style={{
        marginTop: 24, padding: "14px 48px", background: "#E8C547", color: "#1E1C18",
        border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer"
      }}>
        {idx < words.length - 1 ? "Next Word" : "Continue →"}
      </button>
    </div>
  );
};

const MatchMode = ({ words, onComplete }) => {
  const [pairs] = useState(() => {
    const ws = shuffle(words.map(w => ({ id: w.word + "-w", text: w.word, type: "word", pair: w.word })));
    const ms = shuffle(words.map(w => ({ id: w.word + "-m", text: w.meaning.length > 50 ? w.meaning.slice(0, 47) + "..." : w.meaning, type: "meaning", pair: w.word })));
    return { words: ws, meanings: ms };
  });
  const [selected, setSelected] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [wrong, setWrong] = useState(null);
  const [score, setScore] = useState(0);

  const handleClick = (item) => {
    if (matched.has(item.pair)) return;
    if (!selected) { setSelected(item); }
    else if (selected.type === item.type) { setSelected(item); }
    else {
      if (selected.pair === item.pair) {
        const newMatched = new Set([...matched, item.pair]);
        setMatched(newMatched);
        setScore(score + 1);
        setSelected(null);
        if (newMatched.size === words.length) setTimeout(() => onComplete(score + 1, words.length), 500);
      } else {
        setWrong(item.id);
        setTimeout(() => { setWrong(null); setSelected(null); }, 600);
      }
    }
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ fontSize: 11, letterSpacing: 2, color: "#8A8578", textTransform: "uppercase", marginBottom: 8, textAlign: "center" }}>Match · Pair words with meanings</div>
      <div style={{ fontSize: 13, textAlign: "center", color: "#6A6560", marginBottom: 24 }}>{matched.size} of {words.length} matched</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {pairs.words.map(w => (
            <button key={w.id} onClick={() => handleClick(w)} disabled={matched.has(w.pair)} style={{
              padding: "14px 12px", borderRadius: 12, border: selected?.id === w.id ? "2px solid #E8C547" : "1px solid rgba(255,255,255,0.08)",
              background: matched.has(w.pair) ? "rgba(76,175,80,0.12)" : wrong === w.id ? "rgba(244,67,54,0.12)" : "rgba(255,255,255,0.03)",
              color: matched.has(w.pair) ? "#4CAF50" : "#F5F0E8", cursor: matched.has(w.pair) ? "default" : "pointer",
              fontSize: 15, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, textAlign: "center",
              opacity: matched.has(w.pair) ? 0.5 : 1, transition: "all 0.2s ease"
            }}>{w.text}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {pairs.meanings.map(m => (
            <button key={m.id} onClick={() => handleClick(m)} disabled={matched.has(m.pair)} style={{
              padding: "14px 12px", borderRadius: 12, border: selected?.id === m.id ? "2px solid #E8C547" : "1px solid rgba(255,255,255,0.08)",
              background: matched.has(m.pair) ? "rgba(76,175,80,0.12)" : wrong === m.id ? "rgba(244,67,54,0.12)" : "rgba(255,255,255,0.03)",
              color: matched.has(m.pair) ? "#4CAF50" : "#C4B889", cursor: matched.has(m.pair) ? "default" : "pointer",
              fontSize: 12, textAlign: "center", lineHeight: 1.4, opacity: matched.has(m.pair) ? 0.5 : 1, transition: "all 0.2s ease"
            }}>{m.text}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

const FillMode = ({ words, onComplete }) => {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const w = words[idx];
  const isCorrect = input.trim().toLowerCase() === w.word.toLowerCase();

  const check = () => { if (isCorrect) setScore(score + 1); setRevealed(true); };
  const next = () => {
    if (idx < words.length - 1) { setIdx(idx + 1); setInput(""); setRevealed(false); }
    else onComplete(score, words.length);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ fontSize: 11, letterSpacing: 2, color: "#8A8578", textTransform: "uppercase", marginBottom: 24 }}>Fill In · {idx + 1} of {words.length}</div>
      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: "28px 24px", marginBottom: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 15, color: "#E8C547", marginBottom: 16, lineHeight: 1.5 }}>{w.meaning}</div>
        <div style={{ fontSize: 14, color: "#8A8578", fontStyle: "italic" }}>"{w.example.replace(new RegExp(w.word, 'gi'), '_____')}"</div>
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !revealed && check()}
        placeholder="Type the word..." disabled={revealed} style={{
          width: "100%", padding: "14px 20px", borderRadius: 12, fontSize: 18,
          background: revealed ? (isCorrect ? "rgba(76,175,80,0.1)" : "rgba(244,67,54,0.1)") : "rgba(255,255,255,0.05)",
          border: revealed ? (isCorrect ? "2px solid #4CAF50" : "2px solid #F44336") : "1px solid rgba(255,255,255,0.1)",
          color: "#F5F0E8", textAlign: "center", fontFamily: "'Cormorant Garamond', serif", outline: "none", boxSizing: "border-box"
        }} />
      {revealed && !isCorrect && <div style={{ marginTop: 12, fontSize: 15, color: "#E8C547" }}>Correct answer: <strong>{w.word}</strong></div>}
      <button onClick={revealed ? next : check} style={{
        marginTop: 20, padding: "14px 48px", background: "#E8C547", color: "#1E1C18",
        border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer"
      }}>{revealed ? (idx < words.length - 1 ? "Next →" : "Continue →") : "Check"}</button>
    </div>
  );
};

const QuizMode = ({ words, onComplete }) => {
  const [questions] = useState(() => words.map(w => {
    const wrongOpts = shuffle(WORD_BANK.flat().filter(x => x.word !== w.word).map(x => x.meaning)).slice(0, 3);
    return { word: w, options: shuffle([w.meaning, ...wrongOpts]), correct: w.meaning };
  }));
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const q = questions[idx];

  const choose = (opt) => { if (chosen !== null) return; setChosen(opt); if (opt === q.correct) setScore(s => s + 1); };
  const next = () => {
    if (idx < questions.length - 1) { setIdx(idx + 1); setChosen(null); }
    else onComplete(score, words.length);
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ fontSize: 11, letterSpacing: 2, color: "#8A8578", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>Quiz · {idx + 1} of {questions.length}</div>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 28, fontFamily: "'Cormorant Garamond', serif", color: "#F5F0E8", fontWeight: 300 }}>{q.word.word}</div>
        <div style={{ fontSize: 13, color: "#6A6560", marginTop: 4 }}>{q.word.phonetic}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt, i) => {
          const isCorrect = opt === q.correct;
          const isChosen = chosen === opt;
          let bg = "rgba(255,255,255,0.03)", border = "1px solid rgba(255,255,255,0.08)";
          if (chosen !== null) {
            if (isCorrect) { bg = "rgba(76,175,80,0.12)"; border = "2px solid #4CAF50"; }
            else if (isChosen) { bg = "rgba(244,67,54,0.12)"; border = "2px solid #F44336"; }
          }
          return (
            <button key={i} onClick={() => choose(opt)} style={{
              padding: "16px 20px", borderRadius: 12, background: bg, border,
              color: chosen !== null && isCorrect ? "#4CAF50" : "#C4B889",
              cursor: chosen !== null ? "default" : "pointer", fontSize: 14, textAlign: "left", lineHeight: 1.4, transition: "all 0.2s ease"
            }}>
              <span style={{ color: "#6A6560", marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>
              {opt.length > 70 ? opt.slice(0, 67) + "..." : opt}
            </button>
          );
        })}
      </div>
      {chosen !== null && (
        <button onClick={next} style={{
          marginTop: 24, width: "100%", padding: "14px", background: "#E8C547", color: "#1E1C18",
          border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer"
        }}>{idx < questions.length - 1 ? "Next Question →" : "See Results →"}</button>
      )}
    </div>
  );
};

const RecapScreen = ({ words, scores, timeSpent, onFinish }) => {
  const totalScore = Object.values(scores).reduce((s, v) => s + (v?.score || 0), 0);
  const totalPossible = Object.values(scores).reduce((s, v) => s + (v?.total || 0), 0);
  const pct = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

  return (
    <div style={{ textAlign: "center", padding: "32px 0" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{pct >= 80 ? "🌟" : pct >= 50 ? "💪" : "📚"}</div>
      <div style={{ fontSize: 28, fontFamily: "'Cormorant Garamond', serif", color: "#F5F0E8", fontWeight: 300, marginBottom: 8 }}>
        {pct >= 80 ? "Excellent!" : pct >= 50 ? "Good Progress!" : "Keep Practicing!"}
      </div>
      <div style={{ fontSize: 48, color: "#E8C547", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>{pct}%</div>
      <div style={{ fontSize: 13, color: "#8A8578", marginBottom: 32 }}>{totalScore} of {totalPossible} correct · {Math.round(timeSpent / 60)} min spent</div>
      <div style={{ textAlign: "left", marginBottom: 32 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#8A8578", textTransform: "uppercase", marginBottom: 12 }}>Today's Words</div>
        {words.map((w, i) => (
          <div key={i} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 16, fontFamily: "'Cormorant Garamond', serif", color: "#F5F0E8" }}>{w.word}</span>
              <span style={{ fontSize: 12, color: "#8A8578" }}>{w.phonetic}</span>
            </div>
            <div style={{ fontSize: 13, color: "#A09A8E", marginTop: 4 }}>{w.meaning}</div>
          </div>
        ))}
      </div>
      <button onClick={onFinish} style={{
        padding: "16px 48px", background: "#E8C547", color: "#1E1C18",
        border: "none", borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: "pointer"
      }}>Back to Home</button>
    </div>
  );
};

// ─── Day Session ───
const DaySession = ({ day, onComplete, onBack }) => {
  const words = WORD_BANK[day - 1];
  const [modeIdx, setModeIdx] = useState(0);
  const [scores, setScores] = useState({});
  const [startTime] = useState(Date.now());
  const mode = MODES[modeIdx];
  const progressPct = modeIdx / MODES.length;

  const handleModeComplete = (score, total) => {
    if (score !== undefined) setScores(prev => ({ ...prev, [mode]: { score, total } }));
    if (modeIdx < MODES.length - 1) setModeIdx(modeIdx + 1);
  };

  const handleFinish = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const totalScore = Object.values(scores).reduce((s, v) => s + (v?.score || 0), 0);
    const totalPossible = Object.values(scores).reduce((s, v) => s + (v?.total || 0), 0);
    onComplete(day, { score: totalScore, total: totalPossible, timeSpent });
  };

  return (
    <div style={{ padding: "24px", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#8A8578", cursor: "pointer", fontSize: 14, padding: 0 }}>← Back</button>
        <span style={{ fontSize: 12, color: "#8A8578", letterSpacing: 1 }}>Day {day} · {DAY_THEMES[day - 1]}</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginBottom: 24 }}>
        <div style={{ height: "100%", width: `${progressPct * 100}%`, background: "#E8C547", borderRadius: 2, transition: "width 0.4s ease" }} />
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
        {MODES.slice(0, -1).map((m, i) => (
          <div key={m} style={{
            fontSize: 11, padding: "4px 12px", borderRadius: 20,
            background: i === modeIdx ? "rgba(232,197,71,0.15)" : "transparent",
            color: i === modeIdx ? "#E8C547" : i < modeIdx ? "#4CAF50" : "#6A6560",
            letterSpacing: 1, textTransform: "uppercase", fontWeight: i === modeIdx ? 600 : 400
          }}>{i < modeIdx ? "✓ " : ""}{m}</div>
        ))}
      </div>
      {mode === "learn" && <LearnMode words={words} onComplete={() => handleModeComplete()} />}
      {mode === "match" && <MatchMode words={words} onComplete={(s, t) => handleModeComplete(s, t)} />}
      {mode === "fill" && <FillMode words={words} onComplete={(s, t) => handleModeComplete(s, t)} />}
      {mode === "quiz" && <QuizMode words={words} onComplete={(s, t) => handleModeComplete(s, t)} />}
      {mode === "recap" && <RecapScreen words={words} scores={scores} timeSpent={Math.round((Date.now() - startTime) / 1000)} onFinish={handleFinish} />}
    </div>
  );
};

// ─── Main App ───
export default function App() {
  const [progress, setProgress] = useState(null);
  const [screen, setScreen] = useState("home");
  const [activeDay, setActiveDay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      const lastDate = saved.lastPracticeDate;
      if (lastDate) {
        const diffDays = Math.floor((new Date() - new Date(lastDate)) / (1000 * 60 * 60 * 24));
        if (diffDays > 1) saved.streak = 0;
      }
      setProgress(saved);
    } else {
      setProgress(getDefaultProgress());
    }
    setLoading(false);
  }, []);

  const handleStartDay = (day) => { setActiveDay(day); setScreen("day"); };

  const handleDayComplete = (day, result) => {
    const updated = {
      ...progress,
      dayResults: { ...progress.dayResults, [day]: { ...result, completedAt: new Date().toISOString() } },
      currentDay: Math.max(progress.currentDay, day + 1),
      totalTimeSpent: progress.totalTimeSpent + result.timeSpent,
      lastPracticeDate: new Date().toISOString(),
      streak: (() => {
        const lastDate = progress.lastPracticeDate;
        if (!lastDate) return 1;
        const diffDays = Math.floor((new Date() - new Date(lastDate)) / (1000 * 60 * 60 * 24));
        return diffDays <= 1 ? progress.streak + (diffDays === 1 ? 1 : 0) : 1;
      })(),
    };
    const words = WORD_BANK[day - 1];
    const scorePct = result.total > 0 ? result.score / result.total : 0;
    if (scorePct >= 0.8) {
      updated.masteredWords = [...new Set([...updated.masteredWords, ...words.map(w => w.word)])];
    } else {
      updated.reviewQueue = [...new Set([...updated.reviewQueue, ...words.filter(w => !updated.masteredWords.includes(w.word)).map(w => w.word)])];
    }
    setProgress(updated);
    saveProgress(updated);
    setScreen("home");
  };

  if (loading || !progress) {
    return (
      <div style={{ minHeight: "100vh", background: "#1A1814", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", color: "#E8C547", fontSize: 18 }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #1A1814 0%, #0F0E0C 100%)", color: "#F5F0E8", fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; padding: 0; background: #1A1814; overscroll-behavior: none; }
        input::placeholder { color: #6A6560; }
        button { font-family: 'DM Sans', sans-serif; -webkit-tap-highlight-color: transparent; }
      `}</style>

      {screen === "home" && <HomeScreen progress={progress} onStartDay={handleStartDay} onReview={() => handleStartDay(progress.currentDay > 1 ? progress.currentDay - 1 : 1)} />}
      {screen === "day" && activeDay && <DaySession day={activeDay} onComplete={handleDayComplete} onBack={() => setScreen("home")} />}
    </div>
  );
}
