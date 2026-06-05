import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ---------------- HELPERS ---------------- */

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

/* ---------------- STATIC BOOK QUESTIONS ---------------- */

const staticBookQuestions = [
  {
    type: "mcq",
    question: "Leaves are green in colour due to the presence of ____.",
    options: ["stomata", "chlorophyll", "carbon dioxide", "oxygen"],
    answer: "chlorophyll"
  },
  {
    type: "mcq",
    question: "Which part of the plant is responsible for carrying out photosynthesis?",
    options: ["Leaves", "Flowers", "Roots", "Bark"],
    answer: "Leaves"
  },
  {
    type: "mcq",
    question: "Which of the following is a function of flowers in plants?",
    options: [
      "To produce food for the plant",
      "To attract insects and birds",
      "To absorb water",
      "To store nutrients"
    ],
    answer: "To attract insects and birds"
  },
  {
    type: "mcq",
    question: "Which is the correct sequence in a food chain?",
    options: [
      "Sun → Carnivores → Herbivores → Plants",
      "Plants → Sun → Carnivores → Herbivores",
      "Carnivores → Sun → Plants → Herbivores",
      "Sun → Plants → Herbivores → Carnivores"
    ],
    answer: "Sun → Plants → Herbivores → Carnivores"
  },
  {
    type: "mcq",
    question:
      "Which of the following is an example of how plants benefit from animals in the food chain?",
    options: [
      "Plants get oxygen from animals to breathe",
      "Plants depend on animals for food",
      "Animals help plants by pollinating flowers",
      "Plants get carbon dioxide from animals to breathe"
    ],
    answer: "Animals help plants by pollinating flowers"
  },
  {
    type: "fill",
    question: "_____ is the underground part of a plant.",
    options: ["Root", "Stem"],
    answer: "Root"
  },
  {
    type: "fill",
    question: "The _____ supports the plant above the ground.",
    options: ["petiole", "stem"],
    answer: "stem"
  },
  {
    type: "fill",
    question: "Chlorophyll imparts _____ colour to the plant.",
    options: ["red", "green"],
    answer: "green"
  },
  {
    type: "fill",
    question: "Plants give us _____ to breathe.",
    options: ["oxygen", "carbon dioxide"],
    answer: "oxygen"
  },
  {
    type: "fill",
    question: "Plants release _____ as a by-product during photosynthesis.",
    options: ["oxygen", "carbon dioxide"],
    answer: "oxygen"
  },
  {
    type: "match",
    question: "Match: Photosynthesis",
    options: [
      "Attaches the leaf to the stem",
      "Transport substances",
      "Main vein of a leaf",
      "Preparation of food by the plants",
      "Green pigment"
    ],
    answer: "Preparation of food by the plants"
  },
  {
    type: "match",
    question: "Match: Chlorophyll",
    options: [
      "Attaches the leaf to the stem",
      "Transport substances",
      "Main vein of a leaf",
      "Preparation of food by the plants",
      "Green pigment"
    ],
    answer: "Green pigment"
  },
  {
    type: "match",
    question: "Match: Veins",
    options: [
      "Attaches the leaf to the stem",
      "Transport substances",
      "Main vein of a leaf",
      "Preparation of food by the plants",
      "Green pigment"
    ],
    answer: "Transport substances"
  },
  {
    type: "match",
    question: "Match: Midrib",
    options: [
      "Attaches the leaf to the stem",
      "Transport substances",
      "Main vein of a leaf",
      "Preparation of food by the plants",
      "Green pigment"
    ],
    answer: "Main vein of a leaf"
  },
  {
    type: "match",
    question: "Match: Petiole",
    options: [
      "Attaches the leaf to the stem",
      "Transport substances",
      "Main vein of a leaf",
      "Preparation of food by the plants",
      "Green pigment"
    ],
    answer: "Attaches the leaf to the stem"
  },
  {
    type: "truefalse",
    question: "Taproots grow deep into the ground.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    type: "truefalse",
    question: "Most plants bear flowers which grow into fruits.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    type: "truefalse",
    question: "New plants grow from flowers.",
    options: ["True", "False"],
    answer: "False"
  },
  {
    type: "truefalse",
    question:
      "Iodine changes the colour of a leaf containing starch to red.",
    options: ["True", "False"],
    answer: "False"
  },
  {
    type: "truefalse",
    question: "Animals do not depend on plants for food.",
    options: ["True", "False"],
    answer: "False"
  },
  {
    type: "truefalse",
    question:
      "In a food chain, one organism is the food for another organism.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    type: "mcq",
    question:
      "Which of the following is a limiting factor for plant growth in the desert region?",
    options: ["Sunlight", "Water", "Carbon dioxide", "Oxygen"],
    answer: "Water"
  },
  {
    type: "mcq",
    question: "Trees absorb _____ from the air.",
    options: ["oxygen", "carbon dioxide", "nitrogen", "helium"],
    answer: "carbon dioxide"
  },
{
  type: "assertion",
  question:
    "Assertion (A): Birds lay eggs, and the eggs are incubated until they hatch.Reason (R): Most birds sit on their eggs to keep them warm, which helps the development of the embryo inside the egg.",
  options: [
    "Both A and R are true, and R is the correct explanation of A.",
    "Both A and R are true, but R is NOT the correct explanation of A.",
    "A is true, but R is false.",
    "A is false, but R is true."
  ],
  answer:
    "Both A and R are true, and R is the correct explanation of A."
},
{
  type: "assertion",
  question:
    "Assertion (A): The life cycle of grasshoppers and cockroaches involves three stages.Reason (R): The nymphs closely resemble their parents but lack wings.",
  options: [
    "Both A and R are true, and R is the correct explanation of A.",
    "Both A and R are true, but R is NOT the correct explanation of A.",
    "A is true, but R is false.",
    "A is false, but R is true."
  ],
  answer:
    "Both A and R are true, and R is the correct explanation of A."
}
];
const staticBookQuestions2 = [
  {
    type: "mcq",
    question: "Which of these plants floats on water?",
    options: ["Duckweed", "Moss", "Water lily", "Hydrilla"],
    answer: "Duckweed"
  },
  {
    type: "mcq",
    question: "Which of the following is a xerophyte?",
    options: ["Cactus", "Teak", "Pine", "Maple"],
    answer: "Cactus"
  },
  {
    type: "mcq",
    question: "Plants that are adapted to grow in deserts have ________.",
    options: ["spines", "thin stem", "short roots", "many leaves"],
    answer: "spines"
  },
  {
    type: "mcq",
    question: "Which of the following plants does not grow on mountains and hills?",
    options: ["Vallisneria", "Pine", "Cedar", "Spruce"],
    answer: "Vallisneria"
  },
  {
    type: "mcq",
    question: "Which of the following is an example of a non-green plant?",
    options: ["Cedar", "Coralroot", "Venus flytrap", "Oak"],
    answer: "Coralroot"
  },

  {
    type: "mcq",
    question: "Arrowhead is an example of ________ plant.",
    options: ["floating", "emergent", "underwater", "desert"],
    answer: "emergent"
  },
  {
    type: "mcq",
    question: "Mountain plants have ________ leaves.",
    options: ["broad", "needle-like", "round", "curved"],
    answer: "needle-like"
  },
  {
    type: "mcq",
    question: "Mangroves grow in ________.",
    options: ["deserts", "marshy areas", "mountains", "plains"],
    answer: "marshy areas"
  },
  {
    type: "mcq",
    question: "________ traps and eats insects.",
    options: ["Cactus", "Pitcher plant", "Oak", "Mango tree"],
    answer: "Pitcher plant"
  },
  {
    type: "mcq",
    question: "Non-green plants do not have ________.",
    options: ["chlorophyll", "stems", "roots", "flowers"],
    answer: "chlorophyll"
  },
  {
    type: "mcq",
    question: "Cuscuta is a ________ plant.",
    options: ["parasitic", "non-green", "aquatic", "mountain"],
    answer: "parasitic"
  },

  {
    type: "mcq",
    question: "Prickly pear is a ________.",
    options: ["mountain plant", "plain plant", "desert plant", "aquatic plant"],
    answer: "desert plant"
  },
  {
    type: "mcq",
    question: "Pines are examples of ________.",
    options: ["mountain plants", "desert plants", "mangroves", "aquatic plants"],
    answer: "mountain plants"
  },
  {
    type: "mcq",
    question: "Banyan grows mainly in ________.",
    options: ["mountains", "plains", "deserts", "marshes"],
    answer: "plains"
  },
  {
    type: "mcq",
    question: "Rhizophora is a type of ________.",
    options: ["mangrove", "desert plant", "mountain plant", "floating plant"],
    answer: "mangrove"
  },
  {
    type: "mcq",
    question: "Venus flytrap is an example of ________.",
    options: ["desert plant", "aquatic plant", "insectivorous plant", "mountain plant"],
    answer: "insectivorous plant"
  },

  {
    type: "mcq",
    question: "What feature should be added to house emergent plants?",
    options: [
      "A patch of sand at one corner",
      "A patch of clay soil with water covering its surface",
      "A patch with dead tree trunks",
      "A shallow pool of water"
    ],
    answer: "A patch of clay soil with water covering its surface"
  },

  {
    type: "truefalse",
    question: "Duckweed is a floating plant.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    type: "truefalse",
    question: "Terrestrial plants can grow both on land and in water.",
    options: ["True", "False"],
    answer: "False"
  },
  {
    type: "truefalse",
    question: "Desert plants have thin stems.",
    options: ["True", "False"],
    answer: "False"
  },
  {
    type: "truefalse",
    question: "The leaves of deciduous trees are shed in autumn.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    type: "truefalse",
    question: "Plants growing in coastal areas cannot survive in water.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "mcq",
    question: "Plants having cones with seeds instead of flowers are called ________.",
    options: ["Conifers", "Mangroves", "Creepers", "Shrubs"],
    answer: "Conifers"
  },
  {
    type: "mcq",
    question: "Plants that trap and eat insects are called ________.",
    options: ["Parasitic plants", "Insectivorous plants", "Aquatic plants", "Non-green plants"],
    answer: "Insectivorous plants"
  },
  {
    type: "mcq",
    question: "Plants that remain completely submerged in water are called ________.",
    options: ["Floating plants", "Underwater plants", "Desert plants", "Mountain plants"],
    answer: "Underwater plants"
  },
  {
    type: "mcq",
    question: "Plants that absorb food from dead plants and animals are called ________.",
    options: ["Saprophytes", "Parasites", "Shrubs", "Hydrophytes"],
    answer: "Saprophytes"
  },
  {
    type: "mcq",
    question: "Plants that grow on other plants and often harm them are called ________.",
    options: ["Aquatic plants", "Parasitic plants", "Mountain plants", "Floating plants"],
    answer: "Parasitic plants"
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Floating plants can float in both fresh water and sea water. Reason (R): Floating plants either have air filled inside their stems or they have very small and light weight stems.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Prickly pear belongs to a plant type called xerophytes. Reason (R): The stem is green, thick and fleshy in appearance.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): A Venus flytrap has two lobes with hair-like spikes on either sides. Reason (R): A Venus flytrap is a parasitic plant.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "A is true, but R is false."
  }
];
/* ---------------- RANDOM STATIC QUESTION ---------------- */
const staticBookQuestions3 = [
  {
    type: "mcq",
    question: "Identify the animal that does not reproduce by laying eggs.",
    options: ["Housefly", "Deer", "Butterfly", "Fish"],
    answer: "Deer"
  },
  {
    type: "mcq",
    question: "What do we call the jelly-like white substance present inside an egg shell?",
    options: ["Albumen", "Yolk", "Egg shell", "Embryo"],
    answer: "Albumen"
  },
  {
    type: "mcq",
    question: "What do we call the process of shedding old skin by animals?",
    options: ["Incubation", "Metamorphosis", "Moulting", "Life cycle"],
    answer: "Moulting"
  },
  {
    type: "mcq",
    question: "Identify the egg-laying animal from the following.",
    options: ["Hippopotamus", "Zebra", "Frog", "Cat"],
    answer: "Frog"
  },
  {
    type: "mcq",
    question: "In which of these animals does the development of the young one take place inside the mother’s body?",
    options: ["Grasshopper", "Housefly", "Rabbit", "Lizard"],
    answer: "Rabbit"
  },
{
  type: "mcq",
  question: "Birds reproduce by ________.",
  options: ["laying eggs", "giving birth", "budding", "splitting"],
  answer: "laying eggs"
},
{
  type: "mcq",
  question: "The large cluster of frog’s eggs is called ________.",
  options: ["nest", "spawn", "cocoon", "hive"],
  answer: "spawn"
},
{
  type: "mcq",
  question: "Lizards lay their eggs ________.",
  options: ["in water", "on trees", "on the ground", "inside nests"],
  answer: "on the ground"
},
{
  type: "mcq",
  question: "Animals that feed their young ones with their own milk are called ________.",
  options: ["reptiles", "birds", "mammals", "amphibians"],
  answer: "mammals"
},
{
  type: "mcq",
  question: "Mammals breathe with the help of ________.",
  options: ["gills", "skin", "lungs", "fins"],
  answer: "lungs"
},
  {
    type: "mcq",
    question: "A farmer sees his birds sitting on their eggs most of the time. What is this behaviour called?",
    options: ["Migration", "Incubation", "Hibernation", "Mating"],
    answer: "Incubation"
  },
  {
    type: "mcq",
    question: "Why do birds sit on their eggs?",
    options: [
      "To migrate",
      "To keep them warm so they hatch",
      "To sleep",
      "To find food"
    ],
    answer: "To keep them warm so they hatch"
  },
  {
    type: "mcq",
    question: "Which statement is true about the life cycle of frogs and fish?",
    options: [
      "Only frogs undergo metamorphosis",
      "Fish undergo metamorphosis",
      "The yolk provides no nutrients",
      "Fish undergo metamorphosis like frogs"
    ],
    answer: "Only frogs undergo metamorphosis"
  },
  {
    type: "mcq",
    question: "Which stage comes after the caterpillar in a butterfly’s life cycle?",
    options: ["Egg", "Pupa", "Larva", "Adult Butterfly"],
    answer: "Pupa"
  },
  {
    type: "truefalse",
    question: "All animals reproduce by laying eggs.",
     options: ["True", "False"],
    answer: "False"
  },
  {
    type: "truefalse",
    question: "Mammals such as dolphins come up to the surface of water to breathe in air.",
     options: ["True", "False"],
    answer: "True"
  },
  {
    type: "truefalse",
    question: "A tadpole looks similar to an adult frog.",
     options: ["True", "False"],
    answer: "False"
  },
  {
    type: "truefalse",
    question: "The nymphs closely resemble their parent, but do not have wings.",
     options: ["True", "False"],
    answer: "True"
  },
  
 {
  type: "assertion",
  question:
    "Assertion (A): Birds lay eggs, and the eggs are incubated until they hatch. Reason (R): Most birds sit on their eggs to keep them warm, which helps the development of the embryo inside the egg.",
  options: [
    "Both A and R are true, and R is the correct explanation of A.",
    "Both A and R are true, but R is NOT the correct explanation of A.",
    "A is true, but R is false.",
    "A is false, but R is true."
  ],
  answer:
    "Both A and R are true, and R is the correct explanation of A."
},
{
  type: "assertion",
  question:
    "Assertion (A): The life cycle of grasshoppers and cockroaches involves three stages. Reason (R): The nymphs closely resemble their parents but lack wings.",
  options: [
    "Both A and R are true, and R is the correct explanation of A.",
    "Both A and R are true, but R is NOT the correct explanation of A.",
    "A is true, but R is false.",
    "A is false, but R is true."
  ],
  answer:
    "Both A and R are true, and R is the correct explanation of A."
}
];
const staticBookQuestions4 = [
  {
    type: "mcq",
    question: "An animal has black skin under its white fur. The black skin helps it absorb and retain heat from the sun in cold environments. Which animal is it?",
    options: ["Chameleon", "Polar bear", "Lizard", "Crocodile"],
    answer: "Polar bear"
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Hookworms live inside the body of the host. Reason (R): Parasites depend on their host organisms for survival, nourishment and reproduction.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Birds move to a different place during a certain season. Reason (R): Migration is inherently risky, due to predation.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, but R is NOT the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Meerkats have light-coloured fur to protect themselves from predators. Reason (R): The light colour helps desert animals camouflage with the sandy surroundings.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Green algae grow on the fur of the sloths. Reason (R): Green algae produce oxygen which helps sloths to breathe.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "A is true, but R is false."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Bats are the only mammals that can fly. Reason (R): Bats have specially adapted wings made up of a thin membrane of skin stretched between their elongated fingers.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Snakes undergo a form of hibernation during the winter, similar to mammals. Reason (R): During the winter, snakes reduce their need for food.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "mcq",
    question: "Identify the animal that sleeps throughout the summer months.",
    options: ["Bear", "Snail", "Rabbit", "Frog"],
    answer: "Snail"
  },

  {
    type: "mcq",
    question: "Aquatic animals respire mostly through their ________.",
    options: ["skin", "lungs", "gills", "lungs and skin"],
    answer: "gills"
  },

  {
    type: "mcq",
    question: "Identify the parasite that lives on the surface of the host’s body.",
    options: ["Roundworm", "Hookworm", "Lice", "Tapeworm"],
    answer: "Lice"
  },

  {
    type: "mcq",
    question: "Identify the animal that cannot protect itself by camouflaging.",
    options: ["Chameleon", "Tiger", "Monkey", "Polar bear"],
    answer: "Monkey"
  },

  {
    type: "mcq",
    question: "Identify the extinct animal from the following.",
    options: ["Giant panda", "Indian rhinoceros", "Dodo", "Tiger"],
    answer: "Dodo"
  },

  {
    type: "fillblank",
    question: "A polar bear has ________ to keep it warm.",
    options: ["blubber", "flesh"],
    answer: "blubber"
  },

  {
    type: "fillblank",
    question: "Winter sleep is also called ________.",
    options: ["hibernation", "aestivation"],
    answer: "hibernation"
  },

  {
    type: "fillblank",
    question: "Eagle is an example of an ________ animal.",
    options: ["aerial", "arboreal"],
    answer: "aerial"
  },

  {
    type: "fillblank",
    question: "Koala bear is ________ animal.",
    options: ["an arboreal", "a terrestrial"],
    answer: "an arboreal"
  },

  {
    type: "fillblank",
    question: "Crow is ________.",
    options: ["a herbivore", "an omnivore"],
    answer: "an omnivore"
  },


  {
    type: "truefalse",
    question: "All terrestrial animals undergo aestivation.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "truefalse",
    question: "The thick fur of the yak helps in protecting it from the cold weather.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question: "Insects such as butterflies have thin, papery wings that help them to fly.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question: "Amphibians breathe through lungs as well as moist skin.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question: "A bear is an example of a herbivore.",
    options: ["True", "False"],
    answer: "False"
  }
];
const staticBookQuestions5 = [
  {
    type: "mcq",
    question: "Which of these is a type of blood vessel?",
    options: ["Veins", "Capillaries", "Arteries", "All of these"],
    answer: "All of these"
  },

  {
    type: "mcq",
    question:
      "Which blood vessel carries blood from the different parts of the body back to the heart?",
    options: ["Artery", "Vein", "Capillary", "Heart"],
    answer: "Vein"
  },

  {
    type: "mcq",
    question:
      "The function of the excretory system is to remove ________.",
    options: ["saliva", "waste", "blood", "water"],
    answer: "waste"
  },

  {
    type: "mcq",
    question: "Which of these is an organ of the excretory system?",
    options: ["Blood vessel", "Urinary bladder", "Heart", "Blood"],
    answer: "Urinary bladder"
  },

  {
    type: "mcq",
    question: "Ureters carry wastes from the ________.",
    options: [
      "kidneys to the blood vessel",
      "heart to the blood vessel",
      "kidneys to the urinary bladder",
      "urinary bladder to the kidneys"
    ],
    answer: "kidneys to the urinary bladder"
  },

  {
    type: "fillblank",
    question: "The heart pumps ________ to all the organs.",
    options: ["wastes", "blood", "urine", "air"],
    answer: "blood"
  },

  {
    type: "fillblank",
    question:
      "The ________ system removes wastes from the body.",
    options: ["excretory", "circulatory", "digestive", "respiratory"],
    answer: "excretory"
  },

  {
    type: "fillblank",
    question: "________ filter waste from the body.",
    options: ["Heart", "Kidneys", "Lungs", "Stomach"],
    answer: "Kidneys"
  },

  {
    type: "fillblank",
    question:
      "________ are the tubes that connect the kidneys to the urinary bladder.",
    options: ["Urethra", "Ureters", "Veins", "Arteries"],
    answer: "Ureters"
  },

  {
    type: "fillblank",
    question: "Urine gets stored in the ________.",
    options: ["urinary bladder", "kidneys", "heart", "lungs"],
    answer: "urinary bladder"
  },

  {
    type: "truefalse",
    question:
      "Circulatory system removes wastes in the form of urine from the body.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "truefalse",
    question:
      "The heart pumps blood into the blood vessels.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question:
      "Blood vessels carry blood to only the hands and legs in the body.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "truefalse",
    question: "Our body has only one kidney.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "truefalse",
    question:
      "Kidneys act as a filter to remove wastes from the body.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "shortanswer",
    question: "The smallest of all blood vessels.",
    options: ["Arteries", "Veins", "Capillaries", "Heart"],
    answer: "Capillaries"
  },

  {
    type: "shortanswer",
    question:
      "Blood vessels that carry blood from different organs back to the heart.",
    options: ["Arteries", "Veins", "Capillaries", "Ureters"],
    answer: "Veins"
  },

  {
    type: "shortanswer",
    question:
      "Bean-shaped structures that act like filters to collect harmful wastes.",
    options: ["Heart", "Lungs", "Kidneys", "Bladder"],
    answer: "Kidneys"
  },

  {
    type: "shortanswer",
    question:
      "The tubes that carry wastes from the kidneys to the urinary bladder.",
    options: ["Arteries", "Veins", "Ureters", "Capillaries"],
    answer: "Ureters"
  },

  {
    type: "shortanswer",
    question: "The body part where urine is stored.",
    options: ["Kidneys", "Heart", "Urinary bladder", "Lungs"],
    answer: "Urinary bladder"
  },

  {
    type: "reasoning",
    question:
      "Why is the urinary bladder an important organ of the excretory system?",
    options: [
      "It pumps blood",
      "It stores urine until removed",
      "It carries oxygen",
      "It digests food"
    ],
    answer:
      "It stores urine until removed"
  },

  {
    type: "reasoning",
    question:
      "Why is a network of thin blood vessels found throughout the body?",
    options: [
      "To digest food",
      "To transport blood to all body parts",
      "To produce urine",
      "To store wastes"
    ],
    answer:
      "To transport blood to all body parts"
  },

  {
    type: "reasoning",
    question:
      "Why do capillaries form the junction between arteries and veins?",
    options: [
      "They store blood",
      "They pump blood",
      "They connect arteries and veins",
      "They remove urine"
    ],
    answer:
      "They connect arteries and veins"
  },

  {
    type: "reasoning",
    question:
      "Why is the excretory system essential in the body?",
    options: [
      "It removes harmful wastes",
      "It pumps blood",
      "It helps digestion",
      "It helps movement"
    ],
    answer:
      "It removes harmful wastes"
  },

  {
    type: "reasoning",
    question:
      "Why is blood considered as the medium of circulation in the body?",
    options: [
      "It stores food",
      "It transports substances",
      "It forms bones",
      "It produces urine"
    ],
    answer:
      "It transports substances"
  },

  {
    type: "shortanswer",
    question:
      "Name the organs of the circulatory system.",
    options: [
      "Heart, blood and blood vessels",
      "Kidneys and bladder",
      "Lungs and stomach",
      "Brain and nerves"
    ],
    answer:
      "Heart, blood and blood vessels"
  },

  {
    type: "shortanswer",
    question:
      "What is the role of kidney in our body?",
    options: [
      "Pump blood",
      "Filter wastes and extra water",
      "Digest food",
      "Help breathing"
    ],
    answer:
      "Filter wastes and extra water"
  },

  {
    type: "shortanswer",
    question:
      "Name the three types of blood vessels.",
    options: [
      "Arteries, veins and capillaries",
      "Heart, lungs and kidneys",
      "Blood, urine and plasma",
      "Veins, bladder and ureters"
    ],
    answer:
      "Arteries, veins and capillaries"
  },

  {
    type: "shortanswer",
    question:
      "Name the organs of the excretory system.",
    options: [
      "Kidneys, ureters, urinary bladder and urethra",
      "Heart, blood and vessels",
      "Lungs and trachea",
      "Brain and spinal cord"
    ],
    answer:
      "Kidneys, ureters, urinary bladder and urethra"
  },

  {
    type: "longanswer",
    question: "Write a note on blood vessels.",
    options: [
      "They carry blood throughout the body",
      "They digest food",
      "They produce urine",
      "They store oxygen"
    ],
    answer:
      "They carry blood throughout the body"
  },

  {
    type: "longanswer",
    question:
      "Describe the organs and functions of the human excretory system.",
    options: [
      "They remove wastes from the body",
      "They help digestion only",
      "They produce blood",
      "They help movement"
    ],
    answer:
      "They remove wastes from the body"
  },

  {
    type: "mcq",
    question:
      "A patient experiences leg swelling, fatigue and poor circulation. The doctor suspects a problem with blood flow back to the heart. Which part of the circulatory system is most likely affected?",
    options: ["Arteries", "Capillaries", "Veins", "Heart"],
    answer: "Veins"
  },

  {
    type: "mcq",
    question:
      "A man has severe lower abdominal pain, nausea, vomiting and is unable to urinate. A blockage in the urinary system is suspected. Which part is most likely blocked?",
    options: ["Kidneys", "Ureters", "Bladder", "Urethra"],
    answer: "Urethra"
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Arteries are responsible for carrying oxygenated blood away from the heart to various parts of the body. Reason (R): Arteries are thick-walled vessels that can withstand high pressure as they carry blood pumped directly from the heart.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): The urethra carries urine from the kidneys to the bladder for storage. Reason (R): The urethra is responsible for excreting urine from the body after it is stored in the bladder.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer: "A is false, but R is true."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): The ureters carry urine from the kidneys to the bladder. Reason (R): The ureters are large tubes that help move urine quickly from the kidneys.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, but R is NOT the correct explanation of A."
  }
];
const staticBookQuestions6 = [
  {
    type: "mcq",
    question:
      "Which of these is essential for people who do more physical work?",
    options: ["Proteins", "Carbohydrates", "Vitamins", "Roughage"],
    answer: "Carbohydrates"
  },

  {
    type: "mcq",
    question: "Proteins are also known as ________.",
    options: [
      "iron-rich food",
      "body-building food",
      "fibre-rich food",
      "None of these"
    ],
    answer: "body-building food"
  },

  {
    type: "mcq",
    question:
      "Which of these, when eaten in excess, increases the body weight?",
    options: ["Fats", "Proteins", "Carbohydrates", "Vitamins"],
    answer: "Fats"
  },

  {
    type: "mcq",
    question:
      "Drying is a method of preserving food by ________.",
    options: [
      "adding salt",
      "adding sugar",
      "freezing",
      "removing water"
    ],
    answer: "removing water"
  },

  {
    type: "mcq",
    question: "Which of these is an edible root?",
    options: ["Radish", "Spinach", "Celery", "Cauliflower"],
    answer: "Radish"
  },

  {
    type: "mcq",
    question: "Which of these comes from a plant source?",
    options: ["Clove", "Honey", "Eggs", "Milk"],
    answer: "Clove"
  },

  {
    type: "fillblank",
    question:
      "Food contains ________ which help us to grow and stay healthy.",
    options: ["nutrients", "preservatives", "chemicals", "fats"],
    answer: "nutrients"
  },

  {
    type: "fillblank",
    question:
      "Food items that are rich in ________ are called energy-giving foods.",
    options: ["carbohydrates", "vitamins", "minerals", "water"],
    answer: "carbohydrates"
  },

  {
    type: "fillblank",
    question:
      "Oil, butter, ghee, cream and cheese are rich in ________.",
    options: ["proteins", "fats", "vitamins", "roughage"],
    answer: "fats"
  },

  {
    type: "fillblank",
    question:
      "Roughage is the ________ present in some green vegetables, fruits and cereals.",
    options: ["fibre", "nutrient", "protein", "mineral"],
    answer: "fibre"
  },

  {
    type: "fillblank",
    question:
      "The process of treating food to prevent it from getting spoilt is called ________.",
    options: ["balanced diet", "preservation", "digestion", "cooking"],
    answer: "preservation"
  },

  {
    type: "fillblank",
    question: "We eat the ________ of celery as food.",
    options: ["root", "stalk", "flower", "seed"],
    answer: "stalk"
  },

  {
    type: "fillblank",
    question:
      "________ is a method of cooking that involves cooking food in an oven with dry heat.",
    options: ["steaming", "baking", "boiling", "frying"],
    answer: "baking"
  },

  {
    type: "fillblank",
    question:
      "The primary taste sensation associated with lemons is ________.",
    options: ["sour", "bitter", "sweet", "salty"],
    answer: "sour"
  },

  {
    type: "shortanswer",
    question:
      "The diet that contains all the nutrients in the right proportion.",
    options: [
      "Balanced diet",
      "Junk food",
      "Preserved food",
      "Fast food"
    ],
    answer: "Balanced diet"
  },

  {
    type: "shortanswer",
    question:
      "People in arid regions prefer these foods.",
    options: [
      "Fresh foods",
      "Frozen foods",
      "Preserved foods",
      "Raw foods"
    ],
    answer: "Preserved foods"
  },

  {
    type: "shortanswer",
    question:
      "The fibre present in some green vegetables, fruits and cereals.",
    options: ["Protein", "Roughage", "Vitamin", "Mineral"],
    answer: "Roughage"
  },

  {
    type: "shortanswer",
    question:
      "Substances in food that help the body to grow and stay healthy.",
    options: ["Nutrients", "Preservatives", "Spices", "Sugars"],
    answer: "Nutrients"
  },

  {
    type: "reasoning",
    question:
      "Why does our body need fats in small amounts?",
    options: [
      "Too much fat may cause obesity",
      "Fats are not useful",
      "Fats reduce energy",
      "Fats stop digestion"
    ],
    answer:
      "Too much fat may cause obesity"
  },

  {
    type: "reasoning",
    question:
      "Why should one not skip eating roughage in their diet?",
    options: [
      "It helps digestion",
      "It increases body fat",
      "It gives sweet taste",
      "It stores energy"
    ],
    answer:
      "It helps digestion"
  },

  {
    type: "reasoning",
    question:
      "Why can tomatoes be stored in air-tight containers?",
    options: [
      "To prevent spoilage",
      "To increase sweetness",
      "To make them dry",
      "To improve colour"
    ],
    answer:
      "To prevent spoilage"
  },

  {
    type: "reasoning",
    question:
      "Why must we include fruits and vegetables in our diet?",
    options: [
      "They provide vitamins and fibre",
      "They contain only fats",
      "They reduce digestion",
      "They spoil quickly"
    ],
    answer:
      "They provide vitamins and fibre"
  },

  {
    type: "reasoning",
    question:
      "Why do we need minerals such as calcium and iron?",
    options: [
      "For bones and blood formation",
      "For sweetness",
      "For food preservation",
      "For taste only"
    ],
    answer:
      "For bones and blood formation"
  },

  {
    type: "shortanswer",
    question: "What are carbohydrates?",
    options: [
      "Energy-giving nutrients",
      "Body-building foods",
      "Disease-causing substances",
      "Waste products"
    ],
    answer:
      "Energy-giving nutrients"
  },

  {
    type: "shortanswer",
    question:
      "Why do athletes need more carbohydrates than a person sitting in an office?",
    options: [
      "They need more energy",
      "They need less food",
      "They sleep more",
      "They drink more water"
    ],
    answer:
      "They need more energy"
  },

  {
    type: "shortanswer",
    question: "What is the role of roughage?",
    options: [
      "Helps in digestion",
      "Stores fats",
      "Builds muscles",
      "Improves taste"
    ],
    answer:
      "Helps in digestion"
  },

  {
    type: "shortanswer",
    question: "Why is water essential in our diet?",
    options: [
      "Helps digestion and removal of wastes",
      "Only adds taste",
      "Builds bones",
      "Stores energy"
    ],
    answer:
      "Helps digestion and removal of wastes"
  },

  {
    type: "shortanswer",
    question: "What is a balanced diet?",
    options: [
      "Diet with all nutrients in right proportion",
      "Only protein diet",
      "Only liquid diet",
      "Only fruits diet"
    ],
    answer:
      "Diet with all nutrients in right proportion"
  },

  {
    type: "shortanswer",
    question:
      "Analyze the different tastes associated with different types of food.",
    options: [
      "Sweet, sour, salty, bitter and spicy",
      "Hot and cold only",
      "Dry and wet only",
      "Soft and hard only"
    ],
    answer:
      "Sweet, sour, salty, bitter and spicy"
  },

  {
    type: "shortanswer",
    question:
      "Differentiate between cooked and uncooked food. Propose different methods of cooking with an example.",
    options: [
      "Cooked food uses heat; uncooked food is raw",
      "Cooked food is always sweet",
      "Uncooked food is unhealthy",
      "Both are same"
    ],
    answer:
      "Cooked food uses heat; uncooked food is raw"
  },

  {
    type: "longanswer",
    question:
      "Name the different food groups. Explain proteins and vitamins with examples.",
    options: [
      "Proteins help growth and vitamins prevent diseases",
      "Proteins spoil food",
      "Vitamins increase fat",
      "Food groups are not important"
    ],
    answer:
      "Proteins help growth and vitamins prevent diseases"
  },

  {
    type: "longanswer",
    question:
      "Name the different ways of preserving food and give examples for each.",
    options: [
      "Drying, salting, refrigeration and pickling",
      "Only boiling",
      "Only frying",
      "Only steaming"
    ],
    answer:
      "Drying, salting, refrigeration and pickling"
  },

  {
    type: "longanswer",
    question:
      "What factors influence the food choices of individuals, and how do these vary based on climate, weather, regions and lifestyle?",
    options: [
      "Climate, culture and lifestyle affect food choices",
      "Only weather matters",
      "Only taste matters",
      "Food choices never change"
    ],
    answer:
      "Climate, culture and lifestyle affect food choices"
  },

  {
    type: "mcq",
    question:
      "Varun's mother took part in a cooking competition. She was required to prepare one food item using steaming method and another using baking method. Which food items should she choose?",
    options: [
      "Cake and Vada",
      "Momos and Cake",
      "Chapathi and French fries",
      "Poori and Momos"
    ],
    answer: "Momos and Cake"
  },

  {
    type: "mcq",
    question:
      "Suppose your teacher conducts a food tasting activity using blindfolds. She gives you lemon juice first, followed by bitter gourd juice and then sugar syrup. In what order will you arrange the flavours?",
    options: [
      "Salty, bitter, sour",
      "Bitter, sour, sweet",
      "Sour, bitter, sweet",
      "Sour, spicy, sweet"
    ],
    answer: "Sour, bitter, sweet"
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Orange fruit is always preferred to be eaten along with the peel. Reason (R): Orange is a good source of vitamin C.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer: "A is false, but R is true."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): We eat beetroot because it is nutritious. Reason (R): Beetroot plant stores food in its roots.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, but R is NOT the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): People residing in the hot regions of Rajasthan consume fewer fresh vegetables than those residing in the cold regions of Kerala. Reason (R): People in Rajasthan do not like to grow vegetables.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer: "A is true, but R is false."
  }
];
const staticBookQuestions7 = [
  {
    type: "mcq",
    question: "Which teeth help in holding and tearing the food?",
    options: ["Incisors", "Canines", "Premolars", "Molars"],
    answer: "Canines"
  },

  {
    type: "mcq",
    question: "Toothache can be avoided by ________.",
    options: [
      "eating very little sweets",
      "brushing teeth regularly",
      "eating lots of salads and drinking lots of milk",
      "All of these"
    ],
    answer: "All of these"
  },

  {
    type: "mcq",
    question: "The organ(s) of the digestive system is/are ________.",
    options: ["pancreas", "large intestine", "liver", "All of these"],
    answer: "All of these"
  },

  {
    type: "mcq",
    question:
      "Which organ produces acid and digestive juices to digest food?",
    options: ["Liver", "Intestine", "Stomach", "Food pipe"],
    answer: "Stomach"
  },

  {
    type: "mcq",
    question:
      "The microbes that can be of different shapes are ________.",
    options: ["bacteria", "protozoa", "viruses", "fungi"],
    answer: "bacteria"
  },

  {
    type: "fillblank",
    question:
      "There are ________ teeth in the permanent set.",
    options: ["16", "32", "20", "28"],
    answer: "32"
  },

  {
    type: "fillblank",
    question:
      "The part of the tooth inside the gums is called the ________.",
    options: ["crown", "root", "neck", "enamel"],
    answer: "root"
  },

  {
    type: "fillblank",
    question:
      "From the stomach, the remaining undigested food is pushed into a long coiled tube called the ________.",
    options: ["small intestine", "large intestine", "food pipe", "mouth"],
    answer: "small intestine"
  },

  {
    type: "fillblank",
    question:
      "Typhoid and tetanus are caused by ________.",
    options: ["protozoa", "bacteria", "fungi", "viruses"],
    answer: "bacteria"
  },

  {
    type: "fillblank",
    question:
      "________ grow mainly on dead and decaying matter.",
    options: ["Fungi", "Viruses", "Bacteria", "Protozoa"],
    answer: "Fungi"
  },

  {
    type: "truefalse",
    question:
      "Milk teeth are formed after the permanent teeth fall off.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "truefalse",
    question:
      "Digestion is the breaking down of food into smaller particles.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question:
      "Saliva is a digestive juice secreted in the mouth.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question:
      "The undigested food is stored in the stomach.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "truefalse",
    question:
      "Microbes cannot be seen with the naked eye.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "shortanswer",
    question: "The first set of teeth.",
    options: ["Permanent teeth", "Milk teeth", "Canines", "Molars"],
    answer: "Milk teeth"
  },

  {
    type: "shortanswer",
    question:
      "The hard, white outer covering of the tooth.",
    options: ["Pulp", "Dentine", "Enamel", "Root"],
    answer: "Enamel"
  },

  {
    type: "shortanswer",
    question:
      "The structures in the mouth that produce saliva.",
    options: ["Salivary glands", "Taste buds", "Molars", "Tongue"],
    answer: "Salivary glands"
  },

  {
    type: "shortanswer",
    question:
      "Tiny living beings that can only be seen under a microscope.",
    options: ["Animals", "Microbes", "Plants", "Birds"],
    answer: "Microbes"
  },

  {
    type: "shortanswer",
    question:
      "Microbes that help in making bread.",
    options: ["Viruses", "Protozoa", "Fungi", "Bacteria"],
    answer: "Fungi"
  },

  {
    type: "reasoning",
    question:
      "Why are milk teeth also called temporary teeth?",
    options: [
      "They fall off and are replaced",
      "They are made of milk",
      "They never fall off",
      "They are stronger than permanent teeth"
    ],
    answer:
      "They fall off and are replaced"
  },

  {
    type: "reasoning",
    question:
      "Why do carnivores have longer and sharper canines?",
    options: [
      "To grind food",
      "To tear and hold flesh",
      "To drink water",
      "To chew leaves"
    ],
    answer:
      "To tear and hold flesh"
  },

  {
    type: "reasoning",
    question:
      "Why does rice taste sweet when chewed?",
    options: [
      "Because saliva changes starch into sugar",
      "Because rice contains salt",
      "Because teeth produce sugar",
      "Because rice absorbs water"
    ],
    answer:
      "Because saliva changes starch into sugar"
  },

  {
    type: "reasoning",
    question:
      "Why is drinking milk good for teeth?",
    options: [
      "Milk contains calcium",
      "Milk contains fat only",
      "Milk weakens teeth",
      "Milk changes tooth colour"
    ],
    answer:
      "Milk contains calcium"
  },

  {
    type: "reasoning",
    question:
      "Why can microbes not be seen with the naked eye?",
    options: [
      "They are too tiny",
      "They are colourless",
      "They live only in water",
      "They move very fast"
    ],
    answer:
      "They are too tiny"
  },

  {
    type: "shortanswer",
    question: "Name the parts of a tooth.",
    options: [
      "Crown, neck and root",
      "Enamel, pulp and bone",
      "Mouth, tongue and gums",
      "Canine, molar and premolar"
    ],
    answer:
      "Crown, neck and root"
  },

  {
    type: "shortanswer",
    question:
      "List the organs of the digestive system.",
    options: [
      "Mouth, food pipe, stomach, small intestine and large intestine",
      "Heart, lungs and kidneys",
      "Brain and nerves",
      "Bones and muscles"
    ],
    answer:
      "Mouth, food pipe, stomach, small intestine and large intestine"
  },

  {
    type: "shortanswer",
    question:
      "What is the function of the stomach in the digestive system?",
    options: [
      "Produces acid and digestive juices",
      "Pumps blood",
      "Stores urine",
      "Helps breathing"
    ],
    answer:
      "Produces acid and digestive juices"
  },

  {
    type: "shortanswer",
    question:
      "What are germs? Give an example.",
    options: [
      "Harmful microbes that cause diseases",
      "Helpful insects",
      "Healthy foods",
      "Plant roots"
    ],
    answer:
      "Harmful microbes that cause diseases"
  },

  {
    type: "shortanswer",
    question:
      "What are the different shapes of bacteria?",
    options: [
      "Rod-shaped, round or spiral",
      "Square and triangle",
      "Only round",
      "Only rod-shaped"
    ],
    answer:
      "Rod-shaped, round or spiral"
  },

  {
    type: "longanswer",
    question:
      "Describe the structure of a tooth with the help of a diagram.",
    options: [
      "A tooth has crown, neck and root",
      "A tooth has only enamel",
      "A tooth has no root",
      "Teeth are made of muscles"
    ],
    answer:
      "A tooth has crown, neck and root"
  },

  {
    type: "longanswer",
    question:
      "Name the different types of teeth and write their functions.",
    options: [
      "Incisors cut, canines tear, premolars crush and molars grind",
      "All teeth do the same work",
      "Molars tear food",
      "Canines grind food"
    ],
    answer:
      "Incisors cut, canines tear, premolars crush and molars grind"
  },

  {
    type: "longanswer",
    question:
      "List four ways by which we can take care of our teeth.",
    options: [
      "Brush twice daily and avoid too many sweets",
      "Eat chocolates daily",
      "Never brush teeth",
      "Drink soft drinks often"
    ],
    answer:
      "Brush twice daily and avoid too many sweets"
  },

  {
    type: "longanswer",
    question:
      "How are microbes useful to us?",
    options: [
      "They help make curd, bread and medicines",
      "They only cause diseases",
      "They destroy food always",
      "They cannot help humans"
    ],
    answer:
      "They help make curd, bread and medicines"
  },

  {
    type: "mcq",
    question:
      "Lina learns that bacteria are single-celled organisms with different shapes like rod-shaped, round or spiral. What is true about bacteria?",
    options: [
      "Bacteria are made of multiple cells.",
      "Bacteria can only be seen without a microscope.",
      "Bacteria are single-celled and can have different shapes.",
      "Bacteria are only found inside the human body."
    ],
    answer:
      "Bacteria are single-celled and can have different shapes."
  },

  {
    type: "mcq",
    question:
      "Which of the following is an example of a harmful effect of microbes?",
    options: [
      "Bacteria help in making curd.",
      "Viruses cause diseases like flu and chickenpox.",
      "Fungi help in making bread.",
      "Protozoa help in breaking down dead matter."
    ],
    answer:
      "Viruses cause diseases like flu and chickenpox."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): The digestion of food starts in the mouth, where teeth chew the food and saliva breaks down starch into sugar, making the food taste sweet. Reason (R): Saliva, produced by salivary glands, helps in moistening the food, making it easy to swallow and turning it into a soft, moist mass called the bolus.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, but R is NOT the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Canines are used for tearing and holding food. Reason (R): There are four canines in total, two in the upper jaw and two in the lower jaw, and they are positioned next to the incisors.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, but R is NOT the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): The crown is the visible part of the tooth above the gums. Reason (R): The enamel is the hardest part of the tooth, providing protection to the tooth's structure.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, but R is NOT the correct explanation of A."
  }
];
const staticBookQuestions8 = [
  {
    type: "fillblank",
    question:
      "Early humans used to cover their body with ________.",
    options: ["animal skins", "cotton fabric", "silk clothes", "uniforms"],
    answer: "animal skins"
  },

  {
    type: "fillblank",
    question:
      "Clothes that tell us what work we do are called ________.",
    options: ["uniforms", "identifications", "fabrics", "costumes"],
    answer: "uniforms"
  },

  {
    type: "fillblank",
    question:
      "Once the fabric is made, it is ________ to make new clothes.",
    options: ["knitted", "stitched", "dyed", "washed"],
    answer: "stitched"
  },

  {
    type: "fillblank",
    question:
      "Fibres obtained from plants and animals are called ________ fibres.",
    options: ["natural", "human-made", "synthetic", "plastic"],
    answer: "natural"
  },

  {
    type: "fillblank",
    question:
      "Clothes made of a particular quality prevent ________.",
    options: ["dust", "infection", "washing", "colour fading"],
    answer: "infection"
  },

  {
    type: "mcq",
    question:
      "What is the main material used in handloom weaving?",
    options: ["Plastic", "Metal", "Fabric", "Yarn"],
    answer: "Yarn"
  },

  {
    type: "mcq",
    question:
      "Which of these is not a type of embroidery stitch?",
    options: [
      "Cross-stitch",
      "Chain stitch",
      "Block stitch",
      "Satin stitch"
    ],
    answer: "Block stitch"
  },

  {
    type: "mcq",
    question:
      "Which of these is a synthetic fibre made from petroleum-based chemicals?",
    options: ["Cotton", "Silk", "Wool", "Polyester"],
    answer: "Polyester"
  },

  {
    type: "mcq",
    question: "What is a fibre?",
    options: [
      "An insect found in fabrics",
      "A long, thin strand rolled into yarn",
      "A dye used to colour fabrics",
      "A measurement unit for fabric thickness"
    ],
    answer: "A long, thin strand rolled into yarn"
  },

  {
    type: "mcq",
    question: "What is block printing?",
    options: [
      "Printing documents using a wooden block",
      "Printing with carved wooden blocks",
      "A type of screen printing",
      "Printing using metal blocks"
    ],
    answer: "Printing with carved wooden blocks"
  },

  {
    type: "reasoning",
    question:
      "Why are the clothes worn by people of Kashmir and Kerala different?",
    options: [
      "Because the climates are different",
      "Because they dislike similar clothes",
      "Because cotton is unavailable",
      "Because they wear uniforms"
    ],
    answer:
      "Because the climates are different"
  },

  {
    type: "reasoning",
    question:
      "Why do firefighters wear a specific kind of clothes?",
    options: [
      "To look stylish",
      "To protect themselves from heat and fire",
      "To stay cool in summer",
      "To avoid washing clothes"
    ],
    answer:
      "To protect themselves from heat and fire"
  },

  {
    type: "reasoning",
    question:
      "Why are moth balls kept between clothes?",
    options: [
      "To add colour",
      "To make clothes softer",
      "To protect clothes from insects",
      "To remove wrinkles"
    ],
    answer:
      "To protect clothes from insects"
  },

  {
    type: "reasoning",
    question:
      "Why should silk clothes not be soaked in hot water?",
    options: [
      "Hot water damages silk fibres",
      "Hot water changes colour only",
      "Silk absorbs water quickly",
      "Silk becomes heavier"
    ],
    answer:
      "Hot water damages silk fibres"
  },

  {
    type: "reasoning",
    question:
      "Why is rayon different from cotton?",
    options: [
      "Rayon is synthetic while cotton is natural",
      "Rayon is made from animals",
      "Cotton is synthetic",
      "Both are exactly the same"
    ],
    answer:
      "Rayon is synthetic while cotton is natural"
  },

  {
    type: "shortanswer",
    question: "Why do we wear clothes?",
    options: [
      "To protect our body from weather and dust",
      "Only for fashion",
      "Only for school",
      "To make fabrics"
    ],
    answer:
      "To protect our body from weather and dust"
  },

  {
    type: "shortanswer",
    question:
      "How did early humans cover themselves?",
    options: [
      "With leaves, bark and animal skins",
      "With polyester clothes",
      "With uniforms",
      "With woollen sweaters"
    ],
    answer:
      "With leaves, bark and animal skins"
  },

  {
    type: "shortanswer",
    question:
      "What are fibres? Name the two types of fibres.",
    options: [
      "Thin strands used to make yarn; natural and synthetic",
      "Types of insects",
      "Food items",
      "Colours used in fabrics"
    ],
    answer:
      "Thin strands used to make yarn; natural and synthetic"
  },

  {
    type: "mcq",
    question:
      "Maya has a busy job and chooses clothes made of synthetic fibres. What is the most likely reason for her choice?",
    options: [
      "Synthetic fibres are easily broken down by nature.",
      "Synthetic fibres are expensive.",
      "Synthetic fibres require frequent washing.",
      "Synthetic fibres are wrinkle-free and easy to maintain."
    ],
    answer:
      "Synthetic fibres are wrinkle-free and easy to maintain."
  },

  {
    type: "mcq",
    question:
      "Rahul lives in a very hot city. He goes to football practice every day. What kind of clothes should he wear to stay cool under the sun?",
    options: [
      "Woollen sweater with muffler",
      "Dark-coloured polyester shirt and pant",
      "Light-coloured cotton shirt and shorts",
      "Dark-coloured hoodie and jeans"
    ],
    answer:
      "Light-coloured cotton shirt and shorts"
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Knitting and weaving are both ways to make fabrics but knitting makes more flexible fabric than weaving. Reason (R): Knitting involves looping yarn together, while weaving uses two sets of yarns crossed over each other.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): People wear different types of clothes in different regions. Reason (R): Every region has their own colour codes and types of clothes.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, but R is NOT the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Most teachers wear sarees or salwar suits, while air hostesses wear knee-length skirts. Reason (R): People wear different clothes for different jobs to show what work they do.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  }
];
const staticBookQuestions9 = [
  {
    type: "fillblank",
    question:
      "________ are water bodies that are surrounded by land on all sides.",
    options: ["Rivers", "Lakes", "Oceans", "Streams"],
    answer: "Lakes"
  },

  {
    type: "fillblank",
    question:
      "The diseases that spread through ________ are known as waterborne diseases.",
    options: ["water", "air", "soil", "food"],
    answer: "water"
  },

  {
    type: "fillblank",
    question:
      "________ was used to store rainwater in the Thar desert region of Rajasthan.",
    options: ["Jhalara", "Taanka", "Canal", "Pond"],
    answer: "Taanka"
  },

  {
    type: "fillblank",
    question:
      "Water kept in a broad vessel evaporates ________ than the water in a narrow vessel.",
    options: ["faster", "slower", "equally", "less"],
    answer: "faster"
  },

  {
    type: "fillblank",
    question:
      "In ________ technique, plants are watered using narrow tubes and this water is directly delivered at the base of the plant.",
    options: ["rainwater harvesting", "drip irrigation", "sprinkler system", "filtration"],
    answer: "drip irrigation"
  },

  {
    type: "mcq",
    question:
      "Land breeze blows during which of the following times?",
    options: ["Morning", "Daytime", "Noon", "Night-time"],
    answer: "Night-time"
  },

  {
    type: "mcq",
    question:
      "Which of the following is not a waterborne disease?",
    options: ["Typhoid", "Asthma", "Diarrhoea", "Cholera"],
    answer: "Asthma"
  },

  {
    type: "mcq",
    question:
      "What is the process in which water vapour changes into water on cooling?",
    options: ["Evaporation", "Condensation", "Melting", "Freezing"],
    answer: "Condensation"
  },

  {
    type: "mcq",
    question:
      "What is the process in which water changes into water vapour?",
    options: [
      "Condensation",
      "Sedimentation",
      "Evaporation",
      "Decantation"
    ],
    answer: "Evaporation"
  },

  {
    type: "mcq",
    question:
      "Which of the following processes cannot be used to purify water with insoluble impurities?",
    options: [
      "Sedimentation",
      "Filtration",
      "Decantation",
      "Boiling"
    ],
    answer: "Boiling"
  },

  {
    type: "fillblank",
    question:
      "________ are traditional floodwater harvesting systems indigenous to South Bihar.",
    options: ["Johads", "Ahar pynes", "Taankas", "Canals"],
    answer: "Ahar pynes"
  },

  {
    type: "fillblank",
    question:
      "Water evaporates ________ in places with less humidity.",
    options: ["faster", "slower", "equally", "less"],
    answer: "faster"
  },

  {
    type: "fillblank",
    question:
      "Movement of cool air from land towards the sea is known as ________ breeze.",
    options: ["land", "sea", "cool", "warm"],
    answer: "land"
  },

  {
    type: "fillblank",
    question:
      "Moving air is called ________.",
    options: ["clouds", "wind", "vapour", "rain"],
    answer: "wind"
  },

  {
    type: "fillblank",
    question:
      "The process in which the insoluble impurities settle down at the bottom of a liquid is known as ________.",
    options: ["sedimentation", "decantation", "evaporation", "filtration"],
    answer: "sedimentation"
  },

  {
    type: "truefalse",
    question:
      "Different places have different weather conditions.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question:
      "At night, the sea cools down faster than the land.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "truefalse",
    question:
      "Lakes and ponds get their water from the ground water.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "mcq",
    question:
      "Your mother has collected rainwater, but since it was raining with wind, the water contains fallen leaves. What steps should be followed to purify the water?",
    options: [
      "Boiling and then filtration",
      "Decantation and then sedimentation",
      "Chlorination and then decantation",
      "Filtration and then boiling"
    ],
    answer: "Filtration and then boiling"
  },

  {
    type: "assertion",
    question:
      "Assertion (A): In seashores, the direction of the wind changes between the day and night. Reason (R): The direction of wind changes due to the Earth's rotation.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer: "A is true, but R is false."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Boiled water is safe for drinking. Reason (R): Boiling water kills bacteria and harmful germs in the water.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Protecting lakes is important for local communities. Reason (R): Protecting lakes ensures clean and safe water for the people, animals and plants.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Evaporation is the process in which water changes from liquid to solid. Reason (R): Heat from the sun causes water to evaporate and rise into the air as water vapour.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer: "A is false, but R is true."
  }
];
const staticBookQuestions10 = [
  {
    type: "fillblank",
    question:
      "A ________ is a natural object that revolves around the sun but does not belong to the category of planets.",
    options: ["satellite", "dwarf planet", "star", "asteroid"],
    answer: "dwarf planet"
  },

  {
    type: "fillblank",
    question:
      "We see different seasons because of the Earth's ________.",
    options: ["revolution", "rotation", "tilt", "orbit"],
    answer: "revolution"
  },

  {
    type: "fillblank",
    question:
      "The pits on the surface of the moon are called ________.",
    options: ["craters", "valleys", "mountains", "oceans"],
    answer: "craters"
  },

  {
    type: "fillblank",
    question:
      "The angle of tilt of the Earth's axis is ________.",
    options: ["23.5°", "45.5°", "90°", "12.5°"],
    answer: "23.5°"
  },

  {
    type: "fillblank",
    question:
      "The Earth completes one rotation in ________.",
    options: ["a day", "an hour", "a week", "a month"],
    answer: "a day"
  },

  {
    type: "fillblank",
    question:
      "It takes about ________ months to change the season from summer to winter in a particular region on the Earth.",
    options: ["six", "three", "nine", "twelve"],
    answer: "six"
  },

  {
    type: "mcq",
    question: "The sun is a ________.",
    options: ["planet", "satellite", "star", "dwarf planet"],
    answer: "star"
  },

  {
    type: "mcq",
    question:
      "Which is the nearest planet to the sun?",
    options: ["Venus", "Mercury", "Neptune", "Mars"],
    answer: "Mercury"
  },

  {
    type: "mcq",
    question:
      "Which is the biggest planet in the solar system?",
    options: ["Mars", "Jupiter", "Saturn", "Pluto"],
    answer: "Jupiter"
  },

  {
    type: "mcq",
    question:
      "Which planet has a prominent ring system around it?",
    options: ["Mars", "Jupiter", "Saturn", "Uranus"],
    answer: "Saturn"
  },

  {
    type: "mcq",
    question:
      "Which among the following is a satellite?",
    options: ["Sun", "Mercury", "Moon", "Pluto"],
    answer: "Moon"
  },

  {
    type: "truefalse",
    question: "Mars is called the red planet.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question:
      "Moon is the artificial satellite of the Earth.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "truefalse",
    question:
      "Uranus is the farthest planet from the sun.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "truefalse",
    question: "Neptune is a dwarf planet.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "truefalse",
    question:
      "Saturn is the second-largest planet of the solar system.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "shortanswer",
    question:
      "The smallest planet in the solar system.",
    options: ["Mercury", "Mars", "Venus", "Earth"],
    answer: "Mercury"
  },

  {
    type: "shortanswer",
    question:
      "The planet on which life exists.",
    options: ["Mars", "Earth", "Venus", "Jupiter"],
    answer: "Earth"
  },

  {
    type: "shortanswer",
    question:
      "The natural satellite of the Earth.",
    options: ["Sun", "Moon", "Mars", "Pluto"],
    answer: "Moon"
  },

  {
    type: "shortanswer",
    question:
      "The first artificial satellite sent into space by India.",
    options: ["Aryabhata", "INSAT", "Chandrayaan", "Sputnik"],
    answer: "Aryabhata"
  },

  {
    type: "shortanswer",
    question:
      "An imaginary line that divides the Earth into two equal halves.",
    options: ["Equator", "Axis", "Orbit", "Latitude"],
    answer: "Equator"
  },

  {
    type: "reasoning",
    question:
      "Why is Venus also called the morning star or evening star?",
    options: [
      "It appears very bright in the sky",
      "It is the biggest planet",
      "It has rings around it",
      "It is closest to the sun"
    ],
    answer:
      "It appears very bright in the sky"
  },

  {
    type: "reasoning",
    question:
      "Why does the atmosphere act like a blanket around the Earth?",
    options: [
      "It maintains suitable temperature",
      "It changes seasons",
      "It creates mountains",
      "It stops Earth's rotation"
    ],
    answer:
      "It maintains suitable temperature"
  },

  {
    type: "reasoning",
    question:
      "Why is life not possible on the Earth's moon?",
    options: [
      "It has no air and water",
      "It is too close to Earth",
      "It has too many plants",
      "It has strong winds"
    ],
    answer:
      "It has no air and water"
  },

  {
    type: "reasoning",
    question:
      "Why is Mars also called the red planet?",
    options: [
      "Due to iron oxide on its surface",
      "Because it is very hot",
      "Because of red clouds",
      "Because it reflects red light"
    ],
    answer:
      "Due to iron oxide on its surface"
  },

  {
    type: "reasoning",
    question:
      "Why do we not see any stars in the sky during daytime?",
    options: [
      "The bright sunlight hides them",
      "Stars disappear during day",
      "Clouds cover all stars",
      "Stars move away from Earth"
    ],
    answer:
      "The bright sunlight hides them"
  },

  {
    type: "mcq",
    question:
      "A satellite in space sends signals that help people make phone calls and watch television. Which type of satellite is this?",
    options: [
      "Natural Satellite",
      "Artificial Satellite",
      "Moon",
      "Pluto"
    ],
    answer: "Artificial Satellite"
  },

  {
    type: "mcq",
    question:
      "One evening, Anish noticed fallen leaves and the weather felt cooler but not as cold as winter. Which season could it be?",
    options: ["Summer", "Winter", "Autumn", "Spring"],
    answer: "Autumn"
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Eid-al-Fitr is not celebrated on a fixed date of the calendar year. Reason (R): Eid-al-Fitr is determined by the sighting of the new phase of the Moon.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): When India is experiencing summer, Australia will be experiencing winter. Reason (R): Because of the tilt of the Earth's axis, the sun's rays directly fall either on the Northern hemisphere or the Southern hemisphere.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): The temperature on the moon goes to extremes. It can either rise to 117 °C at noon or can come down to -173 °C at night. Reason (R): Moon has an atmosphere to protect itself from very hot or cold conditions.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer: "A is true, but R is false."
  }
];
const staticBookQuestions11 = [
  {
    type: "fillblank",
    question:
      "________ trees in large numbers is called afforestation.",
    options: ["Planting", "Destroying", "Cutting", "Burning"],
    answer: "Planting"
  },

  {
    type: "fillblank",
    question:
      "Forest fires are caused during the ________ months.",
    options: ["winter", "summer", "rainy", "spring"],
    answer: "summer"
  },

  {
    type: "fillblank",
    question:
      "The World Environment Day is celebrated each year on ________.",
    options: ["5 June", "15 August", "26 January", "1 May"],
    answer: "5 June"
  },

  {
    type: "fillblank",
    question:
      "In India, we have a tree-planting festival called ________ which is celebrated every year in July.",
    options: ["Vana Mahotsava", "World Environment Day", "Earth Day", "Green Festival"],
    answer: "Vana Mahotsava"
  },

  {
    type: "mcq",
    question:
      "Trees make our surroundings clean and ________.",
    options: ["green", "blue", "grey", "white"],
    answer: "green"
  },

  {
    type: "mcq",
    question:
      "Which of the following is not obtained from trees?",
    options: ["Timber", "Firewood", "Medicines", "Plastic"],
    answer: "Plastic"
  },

  {
    type: "mcq",
    question:
      "Roots of trees hold the soil and prevent ________.",
    options: [
      "afforestation",
      "deforestation",
      "soil erosion",
      "flooding"
    ],
    answer: "soil erosion"
  },

  {
    type: "mcq",
    question:
      "Which of the following is not an effect of deforestation?",
    options: [
      "Air becomes impure",
      "Less rainfall",
      "Increase in wild animals population",
      "Loss of homes for wild animals"
    ],
    answer: "Increase in wild animals population"
  },

  {
    type: "mcq",
    question:
      "What happens when trees are cut down in forests?",
    options: [
      "Tribal people gain more food.",
      "The tribal people lose their sources of food and livelihood.",
      "More resources become available for tribal people.",
      "The tribal people gain access to more land for farming."
    ],
    answer:
      "The tribal people lose their sources of food and livelihood."
  },

  {
    type: "truefalse",
    question:
      "Only people in the villages use trees.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "truefalse",
    question:
      "Trees are home for many animals.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question:
      "Trees help in the formation of rain.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question:
      "We should not waste paper.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question:
      "Vana Mahotsava is celebrated in December.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "shortanswer",
    question:
      "Roots of trees hold this to prevent erosion.",
    options: ["Soil", "Water", "Air", "Leaves"],
    answer: "Soil"
  },

  {
    type: "shortanswer",
    question:
      "Cutting down trees in large numbers.",
    options: ["Afforestation", "Deforestation", "Cultivation", "Harvesting"],
    answer: "Deforestation"
  },

  {
    type: "mcq",
    question:
      "Mitran's family earns their livelihood by producing forest-based products. Which of the following might not belong to them?",
    options: [
      "Bamboo baskets",
      "Plastic plates",
      "Pattals",
      "Firewood"
    ],
    answer: "Plastic plates"
  },

  {
    type: "mcq",
    question:
      "Chipko movement was a forest conservation movement, in which people hugged the trees. Why did they do so?",
    options: [
      "To follow a tradition",
      "To show love for nature",
      "To protect trees from wild animals",
      "To protect trees from being cut down"
    ],
    answer:
      "To protect trees from being cut down"
  },

  {
    type: "mcq",
    question:
      "What are the causes of deforestation?",
    options: [
      "Planting more trees",
      "Agricultural expansion",
      "Infrastructure development",
      "Urbanisation"
    ],
    answer: "Urbanisation"
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Planting more trees prevent soil erosion. Reason (R): Destroying forests by cutting down a large number of trees is called deforestation.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, but R is NOT the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Sacred groves are protected, and the cutting of trees is prohibited. Reason (R): Local communities believe that sacred groves hold religious cultural significance.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  }
];
const staticBookQuestions12 = [
  {
    type: "fillblank",
    question:
      "The natural breakdown of rocks is known as ________.",
    options: ["weathering", "soil erosion", "decomposition", "sedimentation"],
    answer: "weathering"
  },

  {
    type: "fillblank",
    question:
      "Growing different types of crops on the same farmland in the successive seasons is called ________.",
    options: ["terrace farming", "crop rotation", "mulching", "ploughing"],
    answer: "crop rotation"
  },

  {
    type: "fillblank",
    question:
      "The bottom layer of the soil is called ________.",
    options: ["topsoil", "bedrock", "subsoil", "humus"],
    answer: "bedrock"
  },

  {
    type: "fillblank",
    question:
      "The dark brown substance formed due to the decay of dead plants and animals is ________.",
    options: ["humus", "soil creatures", "clay", "sand"],
    answer: "humus"
  },

  {
    type: "fillblank",
    question:
      "Soil erosion ________ the soil quality.",
    options: ["reduces", "increases", "improves", "protects"],
    answer: "reduces"
  },

  {
    type: "mcq",
    question:
      "A farmer is facing poor crop yields year after year because he grows the same crop every year. Which suggestion could solve this problem?",
    options: [
      "Building embankments",
      "Starting terrace farming",
      "Using chemical fertilizers everyday",
      "Practicing crop rotation in the successive seasons"
    ],
    answer:
      "Practicing crop rotation in the successive seasons"
  },

  {
    type: "mcq",
    question:
      "Why is sandy soil easy to erode?",
    options: [
      "It contains bigger particles",
      "It contains fine particles",
      "It drains off water quickly",
      "It holds water tightly"
    ],
    answer: "It contains bigger particles"
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Living organisms such as earthworms help in the formation of humus in soil. Reason (R): Earthworms are called 'farmers' friends' because they move in and out of the soil, which improves air circulation.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, but R is NOT the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Clayey soil is sticky and holds water well. Reason (R): Clay contains very fine particles that are closely packed.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Subsoil is less fertile than topsoil. Reason (R): Subsoil contains very less humus compared to topsoil.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "mcq",
    question:
      "Trees make our surroundings clean and ________.",
    options: ["green", "blue", "grey", "white"],
    answer: "green"
  },

  {
    type: "mcq",
    question:
      "Which of the following is not obtained from trees?",
    options: ["Timber", "Firewood", "Medicines", "Plastic"],
    answer: "Plastic"
  },

  {
    type: "mcq",
    question:
      "Roots of trees hold the soil and prevent ________.",
    options: [
      "afforestation",
      "deforestation",
      "soil erosion",
      "flooding"
    ],
    answer: "soil erosion"
  },

  {
    type: "mcq",
    question:
      "Which of the following is not an effect of deforestation?",
    options: [
      "Air becomes impure",
      "Less rainfall",
      "Increase in wild animals population",
      "Loss of homes for wild animals"
    ],
    answer: "Increase in wild animals population"
  },

  {
    type: "mcq",
    question:
      "What happens when trees are cut down in forests?",
    options: [
      "Tribal people gain more food.",
      "The tribal people lose their sources of food and livelihood.",
      "More resources become available for tribal people.",
      "The tribal people gain access to more land for farming."
    ],
    answer:
      "The tribal people lose their sources of food and livelihood."
  },

  {
    type: "truefalse",
    question:
      "Only people in the villages use trees.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "truefalse",
    question:
      "Trees are home for many animals.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question:
      "Trees help in the formation of rain.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question:
      "We should not waste paper.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question:
      "Vana Mahotsava is celebrated in December.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "shortanswer",
    question:
      "Roots of trees hold this to prevent erosion.",
    options: ["Soil", "Water", "Air", "Leaves"],
    answer: "Soil"
  },

  {
    type: "shortanswer",
    question:
      "Cutting down trees in large numbers.",
    options: ["Afforestation", "Deforestation", "Cultivation", "Harvesting"],
    answer: "Deforestation"
  }
];
const staticBookQuestions13 = [
  {
    type: "mcq",
    question:
      "Imagine your mother is making lemon juice and she asks you why sugar is not seen in the juice while pulps of lemon are seen. What is the correct reason?",
    options: [
      "Sugar dissolves in water",
      "Water and sugar are of the same colour",
      "Sugar is invisible in nature",
      "Sugar dries up when lemon is added"
    ],
    answer: "Sugar dissolves in water"
  },

  {
    type: "mcq",
    question:
      "Which of these can be obtained when we burn a bunch of newspapers?",
    options: ["Smoke", "Ash", "Water", "Gases"],
    answer: "Ash"
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Water is called a 'Universal solvent'. Reason (R): Water can dissolve most solutes.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): The cooling down of steam is an example of physical change. Reason (R): This is an irreversible process.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer: "A is true, but R is false."
  },

  {
    type: "assertion",
    question:
      "Assertion (A): Fireworks show a chemical change. Reason (R): Fireworks release light, sound and gases which are irreversible.",
    options: [
      "Both A and R are true, and R is the correct explanation of A.",
      "Both A and R are true, but R is NOT the correct explanation of A.",
      "A is true, but R is false.",
      "A is false, but R is true."
    ],
    answer:
      "Both A and R are true, and R is the correct explanation of A."
  },

  {
    type: "mcq",
    question:
      "Which of the following is an example of a physical change?",
    options: [
      "Burning paper",
      "Rusting of iron",
      "Melting of ice",
      "Baking a cake"
    ],
    answer: "Melting of ice"
  },

  {
    type: "mcq",
    question:
      "Which of the following is NOT a characteristic of a physical change?",
    options: [
      "The substance changes its appearance or state",
      "A new substance is formed",
      "The change is often reversible",
      "No new substance is formed"
    ],
    answer: "A new substance is formed"
  },

  {
    type: "mcq",
    question:
      "Which of the following is an example of a chemical change?",
    options: [
      "Freezing water",
      "Tearing paper",
      "Burning a candle",
      "Dissolving sugar in tea"
    ],
    answer: "Burning a candle"
  },

  {
    type: "mcq",
    question:
      "What do we call a liquid in which a solute dissolves?",
    options: ["Solute", "Solvent", "Solution", "Solid"],
    answer: "Solvent"
  },

  {
    type: "mcq",
    question:
      "What is the name of the substance that gets dissolved in a liquid?",
    options: ["Solvent", "Water", "Solution", "Solute"],
    answer: "Solute"
  },

  {
    type: "truefalse",
    question:
      "Boiling water is an example of a physical change.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question:
      "Solute particles are too large to fit between the solvent particles.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "truefalse",
    question:
      "Water is known as a universal solvent.",
    options: ["True", "False"],
    answer: "True"
  },

  {
    type: "truefalse",
    question:
      "Tearing paper is a chemical change.",
    options: ["True", "False"],
    answer: "False"
  },

  {
    type: "reasoning",
    question:
      "Why is the burning of paper a chemical change?",
    options: [
      "It forms new substances like ash and smoke",
      "It only changes shape",
      "It can be reversed easily",
      "It produces only heat"
    ],
    answer:
      "It forms new substances like ash and smoke"
  },

  {
    type: "reasoning",
    question:
      "Why are physical changes reversible?",
    options: [
      "No new substance is formed",
      "New substances are always formed",
      "The substance disappears completely",
      "Heat is never used"
    ],
    answer:
      "No new substance is formed"
  },

  {
    type: "reasoning",
    question:
      "Why does heating increase the solubility of a liquid?",
    options: [
      "Particles move faster and dissolve more solute",
      "Heating removes the solvent",
      "Heating freezes the solution",
      "Particles stop moving"
    ],
    answer:
      "Particles move faster and dissolve more solute"
  },

  {
    type: "reasoning",
    question:
      "Why is water called a universal solvent?",
    options: [
      "It can dissolve many substances",
      "It is found only in rivers",
      "It has no colour",
      "It is always hot"
    ],
    answer:
      "It can dissolve many substances"
  },

  {
    type: "shortanswer",
    question:
      "What happens when you heat a piece of ice? Is it a physical or chemical change, and why?",
    options: [
      "Ice melts into water and it is a physical change",
      "Ice burns and forms ash",
      "Ice changes into gas permanently",
      "Ice disappears completely"
    ],
    answer:
      "Ice melts into water and it is a physical change"
  },

  {
    type: "shortanswer",
    question:
      "What are the ways to increase the solubility of a solid in a liquid?",
    options: [
      "Heating, stirring and crushing",
      "Cooling and freezing",
      "Removing the solvent",
      "Keeping it still"
    ],
    answer:
      "Heating, stirring and crushing"
  },

  {
    type: "shortanswer",
    question:
      "What is the difference between a solute and a solvent?",
    options: [
      "A solute dissolves in a solvent",
      "A solvent dissolves in a solute",
      "Both are always solids",
      "Both are always gases"
    ],
    answer:
      "A solute dissolves in a solvent"
  },

  {
    type: "shortanswer",
    question:
      "What happens when a solute dissolves in a solvent?",
    options: [
      "The solute spreads evenly to form a solution",
      "The solvent disappears",
      "The solute becomes solid again",
      "Nothing changes"
    ],
    answer:
      "The solute spreads evenly to form a solution"
  }
];

const generateRandomQuestion = () => {
  return staticBookQuestions[
    Math.floor(Math.random() * staticBookQuestions.length)
  ];
};
const generateRandomQuestion2 = () => {
  return staticBookQuestions2[
    Math.floor(Math.random() * staticBookQuestions2.length)
  ];
};
const generateRandomQuestion3 = () => {
  return staticBookQuestions3[
    Math.floor(Math.random() * staticBookQuestions3.length)
  ];
};
const generateRandomQuestion4 = () => {
  return staticBookQuestions4[
    Math.floor(Math.random() * staticBookQuestions4.length)
  ];
};
const generateRandomQuestion5 = () => {
  return staticBookQuestions5[
    Math.floor(Math.random() * staticBookQuestions5.length)
  ];
};
const generateRandomQuestion6 = () => {
  return staticBookQuestions6[
    Math.floor(Math.random() * staticBookQuestions6.length)
  ];
};
const generateRandomQuestion7 = () => {
  return staticBookQuestions7[
    Math.floor(Math.random() * staticBookQuestions7.length)
  ];
};
const generateRandomQuestion8 = () => {
  return staticBookQuestions8[
    Math.floor(Math.random() * staticBookQuestions8.length)
  ];
};
const generateRandomQuestion9 = () => {
  return staticBookQuestions9[
    Math.floor(Math.random() * staticBookQuestions9.length)
  ];
};
const generateRandomQuestion10 = () => {
  return staticBookQuestions10[
    Math.floor(Math.random() * staticBookQuestions10.length)
  ];
};
const generateRandomQuestion11 = () => {
  return staticBookQuestions11[
    Math.floor(Math.random() * staticBookQuestions11.length)
  ];
};
const generateRandomQuestion12 = () => {
  return staticBookQuestions12[
    Math.floor(Math.random() * staticBookQuestions12.length)
  ];
};
const generateRandomQuestion13 = () => {
  return staticBookQuestions13[
    Math.floor(Math.random() * staticBookQuestions13.length)
  ];
};

/* ---------------- GENERATE QUIZ API ---------------- */

/* ---------------- GENERATE QUIZ API ---------------- */

export async function generateQuiz(req, res, generatorFn) {
  const questions = [];

  for (let i = 0; i < 15; i++) {

    // CALL the function
    const q = generatorFn();

    // Safety check
    if (!q) {
      return res.status(500).json({
        error: "Question generator returned undefined"
      });
    }

    const id = uuidv4();

    await Quiz.create({
      id,
      answerStringArr: q,
      createdAt: new Date()
    });

    questions.push({
      id,
      question: q.question,
      options: q.options ? shuffle([...q.options]) : []
    });
  }

  res.json({ questions });
}
export async function generatewsQuiz(req, res) {
  return generateQuiz(req, res, generateRandomQuestion);
}

export async function generatewsQuiz2(req, res) {
  return generateQuiz(req, res, generateRandomQuestion2);
}

export async function generatewsQuiz3(req, res) {
  return generateQuiz(req, res, generateRandomQuestion3);
}
export async function generatewsQuiz4(req, res) {
  return generateQuiz(req, res, generateRandomQuestion4);
}
export async function generatewsQuiz5(req, res) {
  return generateQuiz(req, res, generateRandomQuestion5);
}
export async function generatewsQuiz6(req, res) {
  return generateQuiz(req, res, generateRandomQuestion6);
}
export async function generatewsQuiz7(req, res) {
  return generateQuiz(req, res, generateRandomQuestion7);
}
export async function generatewsQuiz8(req, res) {
  return generateQuiz(req, res, generateRandomQuestion8);
}
export async function generatewsQuiz9(req, res) {
  return generateQuiz(req, res, generateRandomQuestion9);
}
export async function generatewsQuiz10(req, res) {
  return generateQuiz(req, res, generateRandomQuestion10);
}
export async function generatewsQuiz11(req, res) {
  return generateQuiz(req, res, generateRandomQuestion11);
}
export async function generatewsQuiz12(req, res) {
  return generateQuiz(req, res, generateRandomQuestion12);
}
export async function generatewsQuiz13(req, res) {
  return generateQuiz(req, res, generateRandomQuestion13);
}
/* ---------------- CHECK QUIZ API ---------------- */

export async function checkwsQuiz(req, res) {
  const { userId, answers } = req.body;

  let score = 0;

  const correctAnswers = {};

  for (const q of answers) {
    const original = await Quiz.findOne({ id: q.id });

    if (!original) continue;

    const correct = original.answerStringArr.answer;

    correctAnswers[q.id] = correct;

    if (String(q.answer) === String(correct)) {
      score++;
    }

    await Quiz.deleteOne({ id: q.id });
  }

  if (userId) {
    await UserProgress.create({
      user: userId,
      score,
      date: new Date()
    });
  }

  res.json({
    score,
    total: answers.length,
    correctAnswers
  });
}