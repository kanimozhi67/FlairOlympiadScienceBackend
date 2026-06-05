// fractionQuizController.js

import { v4 as uuidv4 } from "uuid";
import Quiz from "../models/Quiz.js";
import UserProgress from "../models/UserProgress.js";

// QUIZ DATA
const quizData = [
  {
  question: "What do stomata help plants to do?",
  options: ["Make flowers", "Breathe", "Grow roots", "Store seeds"],
  answer: "Breathe",
  explanation:
    "Stomata are tiny openings on leaves that help plants to breathe."
},

{
  question: "What do the midrib and veins transport?",
  options: [
    "Seeds and flowers",
    "Water and minerals",
    "Sunlight and air",
    "Fruits and nectar"
  ],
  answer: "Water and minerals",
  explanation:
    "The midrib and veins transport water and minerals to and from the leaf."
},

{
  question: "Which plants store food in their leaves?",
  options: [
    "Rose and jasmine",
    "Fenugreek, mint and spinach",
    "Cactus and lotus",
    "Mango and coconut"
  ],
  answer: "Fenugreek, mint and spinach",
  explanation:
    "Plants such as fenugreek, mint and spinach store food in their leaves."
},

{
  question: "Where do flowers blossom from?",
  options: ["Roots", "Seeds", "Buds", "Leaves"],
  answer: "Buds",
  explanation:
    "Flowers blossom from buds."
},

{
  question: "What do most flowers become?",
  options: ["Roots", "Fruits", "Leaves", "Branches"],
  answer: "Fruits",
  explanation:
    "Most flowers become fruits that contain seeds."
},

{
  question: "What attracts insects, animals and birds to flowers?",
  options: ["Roots", "Leaves", "Nectar", "Seeds"],
  answer: "Nectar",
  explanation:
    "Flowers produce nectar, a sweet liquid that attracts insects and birds."
},

{
  question: "Which flowers are eaten as food?",
  options: [
    "Rose and jasmine",
    "Lotus and lily",
    "Cauliflower and broccoli",
    "Tulip and orchid"
  ],
  answer: "Cauliflower and broccoli",
  explanation:
    "Cauliflower and broccoli are flowers that are eaten as food."
},

{
  question: "Which flower is known for its sweet fragrance?",
  options: ["Rose", "Sunflower", "Cactus", "Lotus"],
  answer: "Rose",
  explanation:
    "Roses are known for their sweet fragrance."
},

{
  question: "Which flower has a calming fragrance used in aromatherapy?",
  options: ["Lavender", "Rose", "Daisy", "Marigold"],
  answer: "Lavender",
  explanation:
    "Lavender flowers have a calming fragrance and are used in aromatherapy."
},

{
  question: "Which plant produces a foul odour?",
  options: ["Rose", "Lavender", "Skunk cabbage", "Tulip"],
  answer: "Skunk cabbage",
  explanation:
    "Skunk cabbage produces a foul odour."
},

{
  question: "Where can flowers grow naturally?",
  options: [
    "Only in gardens",
    "Only in nurseries",
    "Forests, meadows and mountains",
    "Only near rivers"
  ],
  answer: "Forests, meadows and mountains",
  explanation:
    "Flowers can grow naturally in forests, meadows and mountains."
},

{
  question: "Which flowers bloom during spring?",
  options: [
    "Sunflowers and marigolds",
    "Daffodils and cherry blossoms",
    "Roses and hydrangeas",
    "Tulips and orchids"
  ],
  answer: "Daffodils and cherry blossoms",
  explanation:
    "Daffodils and cherry blossoms bloom during spring."
},

{
  question: "Which flowers bloom during summer?",
  options: [
    "Daffodils and lilies",
    "Cherry blossoms and roses",
    "Sunflowers and marigolds",
    "Hydrangeas and irises"
  ],
  answer: "Sunflowers and marigolds",
  explanation:
    "Sunflowers and marigolds bloom during summer."
},

{
  question: "What are flowers called that bloom throughout the year?",
  options: [
    "Seasonal flowers",
    "Wild flowers",
    "Perennial flowers",
    "Forest flowers"
  ],
  answer: "Perennial flowers",
  explanation:
    "Flowers that bloom throughout the year are called perennial flowers."
},

{
  question: "What does the lotus flower do at night?",
  options: [
    "Changes colour",
    "Drops its petals",
    "Closes its petals",
    "Produces seeds"
  ],
  answer: "Closes its petals",
  explanation:
    "The lotus flower closes its petals at night to protect itself."
},

{
  question: "Why do we use flowers during festivals?",
  options: [
    "To make food",
    "To decorate homes",
    "To grow fruits",
    "To store seeds"
  ],
  answer: "To decorate homes",
  explanation:
    "Flowers are used to decorate homes and celebrate festivals."
},

{
  question: "Which flowers are commonly used to make garlands?",
  options: [
    "Cactus and fern",
    "Marigolds and lilies",
    "Mango and rose",
    "Tulips and lavender"
  ],
  answer: "Marigolds and lilies",
  explanation:
    "Marigolds and lilies are commonly used to make garlands."
},

{
  question: "What is inside a seed?",
  options: [
    "A flower",
    "A fruit",
    "A baby plant",
    "A root"
  ],
  answer: "A baby plant",
  explanation:
    "A seed contains a baby plant inside it."
},

{
  question: "What does a seed store for the baby plant?",
  options: ["Water", "Air", "Food", "Sunlight"],
  answer: "Food",
  explanation:
    "A seed stores food for the baby plant."
},

{
  question: "Which fruit has many seeds?",
  options: ["Mango", "Coconut", "Watermelon", "Peach"],
  answer: "Watermelon",
  explanation:
    "Watermelon contains many seeds."
},

{
  question: "Which fruit usually has one seed?",
  options: ["Orange", "Watermelon", "Mango", "Papaya"],
  answer: "Mango",
  explanation:
    "Mango usually has one seed."
},

{
  question: "What are seeds of rice, wheat and maize called?",
  options: ["Pulses", "Spices", "Cereals", "Fruits"],
  answer: "Cereals",
  explanation:
    "Seeds of rice, wheat and maize are called cereals."
},

{
  question: "What are seeds of bengal gram, chickpeas and lentils called?",
  options: ["Flowers", "Pulses", "Cereals", "Spices"],
  answer: "Pulses",
  explanation:
    "Seeds of bengal gram, chickpeas and lentils are called pulses."
},

{
  question: "Which spices are also seeds?",
  options: [
    "Pepper and cumin",
    "Rose and lavender",
    "Rice and wheat",
    "Spinach and mint"
  ],
  answer: "Pepper and cumin",
  explanation:
    "Pepper and cumin are seeds used as spices."
},

{
  question: "Which part of the plant is called the kitchen of the plant?",
  options: ["Root", "Stem", "Leaf", "Flower"],
  answer: "Leaf",
  explanation:
    "Leaves prepare food for the plant, so they are called the kitchen of the plant."
},
  {
    question: "Which part of a leaf attaches it to the stem?",
    options: ["Midrib", "Stalk", "Veins", "Stomata"],
    answer: "Stalk",
    explanation:
      "The stalk is the part of the leaf that connects the leaf to the stem."
  },

  {
    question: "What is the flat green part of the leaf called?",
    options: ["Leaf blade", "Midrib", "Vein", "Root"],
    answer: "Leaf blade",
    explanation:
      "The flat broad part of the leaf is called the leaf blade."
  },

  {
    question: "What is the thick vein in the middle of the leaf called?",
    options: ["Stem", "Leaf blade", "Midrib", "Stalk"],
    answer: "Midrib",
    explanation:
      "The thick central vein running through the leaf is called the midrib."
  },

  {
    question: "Which tiny openings are present on leaves?",
    options: ["Roots", "Veins", "Stomata", "Branches"],
    answer: "Stomata",
    explanation:
      "Stomata are tiny openings on leaves that help in gas exchange."
  },

  {
    question: "What gives leaves their green colour?",
    options: ["Glucose", "Starch", "Chlorophyll", "Oxygen"],
    answer: "Chlorophyll",
    explanation:
      "Chlorophyll is the green pigment present in leaves."
  },

  {
    question: "What is photosynthesis?",
    options: [
      "Process of absorbing water",
      "Process of making food using sunlight",
      "Process of breathing",
      "Process of storing food"
    ],
    answer: "Process of making food using sunlight",
    explanation:
      "Photosynthesis is the process by which green plants make food using sunlight."
  },

  {
    question: "Which gas do plants take in during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: "Carbon dioxide",
    explanation:
      "Plants take in carbon dioxide from the air during photosynthesis."
  },

  {
    question: "Which gas do plants release during photosynthesis?",
    options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Helium"],
    answer: "Oxygen",
    explanation:
      "Plants release oxygen into the air during photosynthesis."
  },

  {
    question: "What is the source of energy for photosynthesis?",
    options: ["Moonlight", "Sunlight", "Electricity", "Wind"],
    answer: "Sunlight",
    explanation:
      "Plants use sunlight as the energy source for photosynthesis."
  },

  {
    question: "Which part of the plant absorbs water from the soil?",
    options: ["Leaf", "Flower", "Root", "Fruit"],
    answer: "Root",
    explanation:
      "Roots absorb water and minerals from the soil."
  }
];
const quizData2 = [
  {
    question: "What are plants that grow on land called?",
    options: ["Aquatic plants", "Terrestrial plants", "Floating plants", "Underwater plants"],
    answer: "Terrestrial plants",
    explanation:
      "Plants that grow on land are called terrestrial plants."
  },
  {
    question: "What are plants that live in water called?",
    options: ["Mountain plants", "Desert plants", "Aquatic plants", "Plain plants"],
    answer: "Aquatic plants",
    explanation:
      "Plants that live in water are called aquatic plants."
  },
  {
    question: "What is adaptation in plants?",
    options: [
      "Changing colour every day",
      "Making flowers quickly",
      "Special changes to survive in surroundings",
      "Growing without water"
    ],
    answer: "Special changes to survive in surroundings",
    explanation:
      "Adaptations are special changes that help plants survive in their environment."
  },
  {
    question: "Which plants are commonly found on hills and mountains?",
    options: ["Conifers", "Creepers", "Aquatic plants", "Desert plants"],
    answer: "Conifers",
    explanation:
      "Cone-shaped trees like pine and fir found on hills are called conifers."
  },
  {
    question: "Why do conifer trees have a conical shape?",
    options: [
      "To store food",
      "To absorb sunlight",
      "To shed snow easily",
      "To attract birds"
    ],
    answer: "To shed snow easily",
    explanation:
      "The conical shape helps snow slide off easily."
  },
  {
    question: "What type of leaves do conifers have?",
    options: ["Broad leaves", "Round leaves", "Needle-like leaves", "Curly leaves"],
    answer: "Needle-like leaves",
    explanation:
      "Conifers have long and thin needle-like leaves."
  },
  {
    question: "Why do conifer leaves have a waxy coating?",
    options: [
      "To attract insects",
      "To reduce water loss",
      "To make leaves colourful",
      "To grow faster"
    ],
    answer: "To reduce water loss",
    explanation:
      "The waxy coating helps conifers retain water."
  },
  {
    question: "Which of these is an example of a conifer?",
    options: ["Mango", "Lotus", "Pine", "Rose"],
    answer: "Pine",
    explanation:
      "Pine is a cone-shaped conifer tree found in mountains."
  },
  {
    question: "Which of these plants is commonly found in plains?",
    options: ["Cactus", "Neem", "Hydrilla", "Duckweed"],
    answer: "Neem",
    explanation:
      "Neem trees grow well in plains."
  },
  {
    question: "Why do plants in plains have many branches and leaves?",
    options: [
      "Because they have enough space to grow",
      "Because they grow underwater",
      "Because they store snow",
      "Because they have no roots"
    ],
    answer: "Because they have enough space to grow",
    explanation:
      "Plants in plains have enough space for spreading branches and leaves."
  },
  {
    question: "Which of these plants grows in deserts?",
    options: ["Lotus", "Cactus", "Oak", "Duckweed"],
    answer: "Cactus",
    explanation:
      "Cactus is adapted to survive in dry desert conditions."
  },
  {
    question: "Why do cacti have spines instead of leaves?",
    options: [
      "To reduce water loss",
      "To make food",
      "To absorb sunlight",
      "To float on water"
    ],
    answer: "To reduce water loss",
    explanation:
      "Spines help cactus reduce water loss in hot deserts."
  },
  {
    question: "What helps desert plants store water?",
    options: [
      "Fleshy stems",
      "Tiny flowers",
      "Thin roots",
      "Dry leaves"
    ],
    answer: "Fleshy stems",
    explanation:
      "Many desert plants store water in their fleshy stems."
  },
  {
    question: "Why do desert plants have long roots?",
    options: [
      "To hold flowers",
      "To absorb sunlight",
      "To reach deep water underground",
      "To grow quickly"
    ],
    answer: "To reach deep water underground",
    explanation:
      "Long roots help desert plants find water deep underground."
  },
  {
    question: "Which special plants grow in marshy areas?",
    options: ["Mangroves", "Cactus", "Rose", "Tulip"],
    answer: "Mangroves",
    explanation:
      "Mangroves grow in wet marshy areas near the sea."
  },
  {
    question: "What are the special roots of mangroves called?",
    options: ["Tap roots", "Fibrous roots", "Breathing roots", "Water roots"],
    answer: "Breathing roots",
    explanation:
      "Mangroves have breathing roots called pneumatophores."
  },
  {
    question: "Why do mangroves grow roots above the ground?",
    options: [
      "To absorb oxygen",
      "To catch insects",
      "To make flowers",
      "To float on water"
    ],
    answer: "To absorb oxygen",
    explanation:
      "Mangrove roots grow above the soil to take in oxygen."
  },
  {
    question: "What are trees called that shed leaves during autumn or winter?",
    options: ["Evergreen trees", "Floating plants", "Deciduous trees", "Underwater plants"],
    answer: "Deciduous trees",
    explanation:
      "Trees that lose leaves in a particular season are called deciduous trees."
  },
  {
    question: "Which of these is a deciduous tree?",
    options: ["Teak", "Mahogany", "Rosewood", "Pine"],
    answer: "Teak",
    explanation:
      "Teak is a deciduous tree."
  },
  {
    question: "What are trees called that remain green throughout the year?",
    options: ["Deciduous trees", "Evergreen trees", "Shrubs", "Climbers"],
    answer: "Evergreen trees",
    explanation:
      "Evergreen trees do not shed all their leaves at once."
  },
  {
    question: "Which of these is an evergreen tree?",
    options: ["Sal", "Maple", "Mahogany", "Teak"],
    answer: "Mahogany",
    explanation:
      "Mahogany is an evergreen tree."
  },
  {
    question: "Which type of water plants float freely on water?",
    options: ["Fixed plants", "Floating plants", "Underwater plants", "Desert plants"],
    answer: "Floating plants",
    explanation:
      "Floating plants stay on the surface of water."
  },
  {
    question: "Which of these is a floating plant?",
    options: ["Lotus", "Hydrilla", "Duckweed", "Oak"],
    answer: "Duckweed",
    explanation:
      "Duckweed is a floating water plant."
  },
  {
    question: "Do floating plants have roots fixed in soil?",
    options: ["Yes", "No", "Only in winter", "Only in rivers"],
    answer: "No",
    explanation:
      "Floating plants do not have roots fixed in the soil."
  },
  {
    question: "Which plants have roots fixed in muddy pond bottoms?",
    options: ["Floating plants", "Fixed plants", "Desert plants", "Mountain plants"],
    answer: "Fixed plants",
    explanation:
      "Fixed plants like lotus grow with roots fixed in mud."
  },
  {
    question: "Which of these is a fixed water plant?",
    options: ["Lotus", "Duckweed", "Cactus", "Pine"],
    answer: "Lotus",
    explanation:
      "Lotus is a fixed aquatic plant."
  },
  {
    question: "Where are stomata found in fixed water plants?",
    options: [
      "Lower surface of leaves",
      "Roots",
      "Upper surface of leaves",
      "Stem"
    ],
    answer: "Upper surface of leaves",
    explanation:
      "The stomata are on the upper surface to help in gas exchange."
  },
  {
    question: "Which plants grow completely underwater?",
    options: ["Floating plants", "Fixed plants", "Underwater plants", "Shrubs"],
    answer: "Underwater plants",
    explanation:
      "Underwater plants remain fully submerged in water."
  },
  {
    question: "Which of these is an underwater plant?",
    options: ["Hydrilla", "Rose", "Neem", "Lotus"],
    answer: "Hydrilla",
    explanation:
      "Hydrilla grows completely underwater."
  },
  {
    question: "How do underwater plants absorb gases?",
    options: [
      "Through flowers",
      "Through roots only",
      "Through their whole body surface",
      "Through fruits"
    ],
    answer: "Through their whole body surface",
    explanation:
      "Underwater plants absorb gases through their entire body."
  },
  {
    question: "What are insect-eating plants called?",
    options: [
      "Aquatic plants",
      "Conifers",
      "Insectivorous plants",
      "Deciduous plants"
    ],
    answer: "Insectivorous plants",
    explanation:
      "Plants that feed on insects are called insectivorous plants."
  },
  {
    question: "Why do insectivorous plants eat insects?",
    options: [
      "For taste",
      "Because soil lacks nutrients",
      "To store water",
      "To grow taller"
    ],
    answer: "Because soil lacks nutrients",
    explanation:
      "These plants grow in nutrient-poor soil and get nutrients from insects."
  },
  {
    question: "Which insectivorous plant snaps shut to catch insects?",
    options: ["Rose", "Venus flytrap", "Oak", "Cactus"],
    answer: "Venus flytrap",
    explanation:
      "The Venus flytrap closes its leaves when insects land on it."
  },
  {
    question: "Which of these is an insectivorous plant?",
    options: ["Pitcher plant", "Mango tree", "Teak tree", "Grass"],
    answer: "Pitcher plant",
    explanation:
      "Pitcher plant is an insectivorous plant."
  }
];
const quizData3 = [
  {
    question: "What is the total time period for which an organism lives called?",
    options: ["Incubation", "Metamorphosis", "Life span", "Life cycle"],
    answer: "Life span",
    explanation: "The total time period for which an organism lives is called its life span."
  },
  {
    question: "Which animals reproduce by laying eggs?",
    options: ["Mammals", "Egg-laying animals", "Reptiles", "Birds"],
    answer: "Egg-laying animals",
    explanation: "Animals that reproduce by laying eggs are called egg-laying animals."
  },
  {
    question: "What covers the body of birds?",
    options: ["Hair", "Scales", "Feathers", "Fur"],
    answer: "Feathers",
    explanation: "Birds have wings and a body covered with feathers."
  },
  {
    question: "Why do birds sit on their eggs?",
    options: ["To clean them", "To hatch them", "To keep them warm", "To hide them"],
    answer: "To keep them warm",
    explanation: "Birds sit on their eggs to keep them warm until they hatch."
  },
  {
    question: "What is the process of keeping eggs warm called?",
    options: ["Hatching", "Incubation", "Metamorphosis", "Molting"],
    answer: "Incubation",
    explanation: "The process in which the parent sits on eggs to keep them warm is called incubation."
  },
  {
    question: "Which part of an egg contains fat?",
    options: ["Shell", "Albumen", "Yolk", "Embryo"],
    answer: "Yolk",
    explanation: "The yolk contains fat and is the source of food for the embryo."
  },
  {
    question: "What helps an embryo to nourish inside a bird’s egg?",
    options: ["Shell", "Yolk", "Albumen", "Feathers"],
    answer: "Yolk",
    explanation: "An embryo gets nourishment from the yolk inside the egg."
  },
  {
    question: "Which animal breathes through gills?",
    options: ["Bird", "Fish", "Frog", "Lizard"],
    answer: "Fish",
    explanation: "Fish live in water and breathe through gills."
  },
  {
    question: "What is the baby stage of a frog called?",
    options: ["Larva", "Tadpole", "Pupa", "Caterpillar"],
    answer: "Tadpole",
    explanation: "The young stage of a frog is called a tadpole."
  },
  {
    question: "What is metamorphosis?",
    options: [
      "Sleeping during winter",
      "The process of breathing",
      "The change from young form to adult",
      "Laying eggs"
    ],
    answer: "The change from young form to adult",
    explanation: "Metamorphosis is the process of change from birth to becoming an adult."
  },
  {
    question: "Which animals have dry skin covered with scales?",
    options: ["Birds", "Mammals", "Reptiles", "Fish"],
    answer: "Reptiles",
    explanation: "Reptiles have dry skin covered with scales."
  },
  {
    question: "Which reptile can also lay eggs but does not give parental care?",
    options: ["Fish", "Bird", "Lizard", "Frog"],
    answer: "Lizard",
    explanation: "Lizards lay eggs but usually do not give parental care."
  },
  {
    question: "What are animals with three body parts and six legs called?",
    options: ["Birds", "Mammals", "Insects", "Reptiles"],
    answer: "Insects",
    explanation: "Insects have three body parts and six legs."
  },
  {
    question: "What is the young one of a butterfly called?",
    options: ["Pupa", "Larva", "Tadpole", "Cub"],
    answer: "Larva",
    explanation: "The larva of a butterfly is called a caterpillar."
  },
  {
    question: "What stage comes after larva in the butterfly life cycle?",
    options: ["Egg", "Adult butterfly", "Pupa", "Tadpole"],
    answer: "Pupa",
    explanation: "The butterfly changes from larva to pupa before becoming an adult."
  },
  {
    question: "Animals that give birth to young ones are called?",
    options: ["Birds", "Reptiles", "Mammals", "Insects"],
    answer: "Mammals",
    explanation: "Animals that give birth to young ones are called mammals."
  },
  {
    question: "Which mammal can fly?",
    options: ["Dog", "Bat", "Lion", "Elephant"],
    answer: "Bat",
    explanation: "A bat is a flying mammal."
  },
  {
    question: "How do mammals keep their babies warm?",
    options: ["With feathers", "With scales", "By covering them with fur", "By laying eggs"],
    answer: "By covering them with fur",
    explanation: "Mammals keep their babies warm by covering them with fur."
  }
];
const quizData4 = [
  {
    question: "What are animals called that eat only plants and plant products?",
    options: ["Carnivores", "Omnivores", "Herbivores", "Scavengers"],
    answer: "Herbivores",
    explanation:
      "Herbivores are animals that eat only plants and plant products."
  },
  {
    question: "Which of these is a herbivore?",
    options: ["Lion", "Tiger", "Cow", "Wolf"],
    answer: "Cow",
    explanation:
      "Cows eat only plants and are herbivores."
  },
  {
    question: "What type of teeth do herbivores use for grinding plants?",
    options: ["Canines", "Molars", "Incisors", "Tusks"],
    answer: "Molars",
    explanation:
      "Herbivores have flat molars for grinding plants."
  },
  {
    question: "Which teeth help herbivores bite plants?",
    options: ["Molars", "Canines", "Incisors", "Fangs"],
    answer: "Incisors",
    explanation:
      "Sharp front teeth called incisors help herbivores bite plants."
  },
  {
    question: "What are animals called that eat only the flesh of other animals?",
    options: ["Herbivores", "Omnivores", "Carnivores", "Parasites"],
    answer: "Carnivores",
    explanation:
      "Carnivores eat the flesh of other animals."
  },
  {
    question: "Which of these is a carnivore?",
    options: ["Rabbit", "Deer", "Tiger", "Buffalo"],
    answer: "Tiger",
    explanation:
      "Tigers eat the flesh of other animals."
  },
  {
    question: "Which teeth are most important for carnivores?",
    options: ["Molars", "Incisors", "Canines", "Premolars"],
    answer: "Canines",
    explanation:
      "Carnivores use long and sharp canines to tear flesh."
  },
  {
    question: "Why do carnivores have sharp canine teeth?",
    options: [
      "To chew grass",
      "To tear flesh",
      "To drink water",
      "To crack seeds"
    ],
    answer: "To tear flesh",
    explanation:
      "Sharp canine teeth help carnivores tear meat."
  },
  {
    question: "What are animals called that eat both plants and animals?",
    options: ["Carnivores", "Omnivores", "Herbivores", "Scavengers"],
    answer: "Omnivores",
    explanation:
      "Omnivores eat both plants and the flesh of animals."
  },
  {
    question: "Which of these is an omnivore?",
    options: ["Bear", "Deer", "Rabbit", "Goat"],
    answer: "Bear",
    explanation:
      "Bears eat both plants and animals."
  },
  {
    question: "What type of molars do omnivores have?",
    options: ["Sharp and thin", "Broad and flat", "Tiny and pointed", "Curved and long"],
    answer: "Broad and flat",
    explanation:
      "Omnivores have broad, flat molars for grinding many types of food."
  },
  {
    question: "What are animals called that feed on dead animals?",
    options: ["Herbivores", "Omnivores", "Scavengers", "Parasites"],
    answer: "Scavengers",
    explanation:
      "Scavengers eat dead and leftover animals."
  },
  {
    question: "Which of these is a scavenger?",
    options: ["Cow", "Vulture", "Rabbit", "Elephant"],
    answer: "Vulture",
    explanation:
      "Vultures feed on dead animals and are scavengers."
  },
  {
    question: "Why are scavengers important?",
    options: [
      "They grow plants",
      "They clean the environment",
      "They store water",
      "They make nests"
    ],
    answer: "They clean the environment",
    explanation:
      "Scavengers help clean the environment by eating dead animals."
  },
  {
    question: "What are animals called that live on or inside other animals for food?",
    options: ["Scavengers", "Carnivores", "Parasites", "Herbivores"],
    answer: "Parasites",
    explanation:
      "Parasites depend on other living animals for food."
  },
  {
    question: "Which of these is a parasite?",
    options: ["Mosquito", "Tiger", "Cow", "Eagle"],
    answer: "Mosquito",
    explanation:
      "Mosquitoes feed on the blood of other animals."
  },
  {
    question: "How do parasites usually feed?",
    options: [
      "Using claws",
      "Using wings",
      "Using suckers or sucking tubes",
      "Using shells"
    ],
    answer: "Using suckers or sucking tubes",
    explanation:
      "Parasites use suckers or sucking tubes to feed on blood."
  },
  {
    question: "What is migration in animals?",
    options: [
      "Sleeping during winter",
      "Changing colour",
      "Moving from one place to another regularly",
      "Growing new teeth"
    ],
    answer: "Moving from one place to another regularly",
    explanation:
      "Migration is when animals move regularly to find better conditions."
  },
  {
    question: "Why do some animals migrate?",
    options: [
      "To find food and shelter",
      "To grow faster",
      "To change colour",
      "To lose weight"
    ],
    answer: "To find food and shelter",
    explanation:
      "Animals migrate to warmer places in search of food and shelter."
  },
  {
    question: "Which of these is a migratory animal?",
    options: ["Siberian crane", "Cow", "Rabbit", "Dog"],
    answer: "Siberian crane",
    explanation:
      "Siberian cranes travel long distances during migration."
  },
  {
    question: "What is camouflaging?",
    options: [
      "Sleeping in caves",
      "Changing food habits",
      "Blending with surroundings",
      "Growing shells"
    ],
    answer: "Blending with surroundings",
    explanation:
      "Camouflaging helps animals hide by blending with their surroundings."
  },
  {
    question: "Which animal is famous for camouflaging?",
    options: ["Chameleon", "Buffalo", "Horse", "Camel"],
    answer: "Chameleon",
    explanation:
      "Chameleons can blend with their surroundings."
  },
  {
    question: "Why do animals use camouflage?",
    options: [
      "To fly faster",
      "To protect themselves from enemies",
      "To swim better",
      "To store food"
    ],
    answer: "To protect themselves from enemies",
    explanation:
      "Camouflage helps animals avoid being seen by predators."
  },
  {
    question: "Which animals have protective spines?",
    options: ["Porcupines", "Elephants", "Cows", "Monkeys"],
    answer: "Porcupines",
    explanation:
      "Porcupines have sharp spines for protection."
  },
  {
    question: "What do porcupines use their spines for?",
    options: [
      "Swimming",
      "Digging",
      "Defence",
      "Flying"
    ],
    answer: "Defence",
    explanation:
      "Porcupines raise their spines to defend themselves."
  },
  {
    question: "Which animals have hard shells for protection?",
    options: ["Turtles", "Lions", "Deer", "Foxes"],
    answer: "Turtles",
    explanation:
      "Turtles have hard shells that protect their soft bodies."
  },
  {
    question: "What is the purpose of a turtle's shell?",
    options: [
      "To help it fly",
      "To help it run",
      "To protect its body",
      "To catch insects"
    ],
    answer: "To protect its body",
    explanation:
      "The hard shell acts as a protective covering."
  },
  {
    question: "Which animals have strong legs to escape predators?",
    options: ["Kangaroos", "Snails", "Fish", "Penguins"],
    answer: "Kangaroos",
    explanation:
      "Kangaroos use their strong legs to run and escape danger."
  },
  {
    question: "Why do deer have strong legs?",
    options: [
      "To climb trees",
      "To escape predators quickly",
      "To swim underwater",
      "To dig holes"
    ],
    answer: "To escape predators quickly",
    explanation:
      "Strong legs help deer run fast from predators."
  },
  {
    question: "What is a life cycle?",
    options: [
      "A type of food chain",
      "The stages a living thing goes through in life",
      "A way animals sleep",
      "A kind of shelter"
    ],
    answer: "The stages a living thing goes through in life",
    explanation:
      "A life cycle includes the stages of growth, development, and reproduction."
  },
  {
    question: "Which stages are found in the life cycle of a cockroach?",
    options: [
      "Egg, larva, pupa, adult",
      "Egg, nymph, adult",
      "Seed, plant, flower",
      "Egg, baby, cocoon"
    ],
    answer: "Egg, nymph, adult",
    explanation:
      "Cockroaches have three stages: egg, nymph, and adult."
  },
  {
    question: "Which insect has four stages in its life cycle?",
    options: ["Butterfly", "Cockroach", "Grasshopper", "Mosquito"],
    answer: "Butterfly",
    explanation:
      "Butterflies go through egg, larva, pupa, and adult stages."
  },
  {
    question: "What is the second stage in a butterfly's life cycle?",
    options: ["Egg", "Pupa", "Larva", "Adult"],
    answer: "Larva",
    explanation:
      "The larva stage comes after the egg stage."
  },
  {
    question: "What is the resting stage in the butterfly life cycle called?",
    options: ["Larva", "Adult", "Pupa", "Nymph"],
    answer: "Pupa",
    explanation:
      "The pupa stage is the resting stage before becoming an adult butterfly."
  },
  {
    question: "Why do animals need to complete their life cycle?",
    options: [
      "To change colour",
      "To survive and reproduce",
      "To migrate",
      "To hibernate"
    ],
    answer: "To survive and reproduce",
    explanation:
      "Completing the life cycle helps animals grow and reproduce."
  }
];
const quizData5 = [
  {
    question: "What is the main function of the circulatory system?",
    options: [
      "To digest food",
      "To transport nutrients and oxygen",
      "To produce sound",
      "To help us sleep"
    ],
    answer: "To transport nutrients and oxygen",
    explanation:
      "The circulatory system carries oxygen, nutrients, and other important substances throughout the body."
  },
  {
    question: "Which organ pumps blood throughout the body?",
    options: ["Lungs", "Kidney", "Heart", "Liver"],
    answer: "Heart",
    explanation:
      "The heart is a muscular organ that pumps blood through blood vessels."
  },
  {
    question: "What are the main parts of the circulatory system?",
    options: [
      "Heart, blood, blood vessels, and lymph",
      "Bones and muscles",
      "Eyes and ears",
      "Skin and nails"
    ],
    answer: "Heart, blood, blood vessels, and lymph",
    explanation:
      "These are the major components of the circulatory system."
  },
  {
    question: "How many chambers does the human heart have?",
    options: ["Two", "Three", "Four", "Five"],
    answer: "Four",
    explanation:
      "The human heart has four chambers: two atria and two ventricles."
  },
  {
    question: "What are the upper chambers of the heart called?",
    options: ["Ventricles", "Auricles", "Capillaries", "Valves"],
    answer: "Auricles",
    explanation:
      "The two upper chambers of the heart are called auricles or atria."
  },
  {
    question: "What are the lower chambers of the heart called?",
    options: ["Atria", "Auricles", "Ventricles", "Veins"],
    answer: "Ventricles",
    explanation:
      "The lower chambers of the heart are called ventricles."
  },
  {
    question: "What is double circulation?",
    options: [
      "Blood flows through the heart twice",
      "Two hearts working together",
      "Blood moving in circles",
      "Blood stopping in the lungs"
    ],
    answer: "Blood flows through the heart twice",
    explanation:
      "In double circulation, blood passes through the heart two times in one complete cycle."
  },
  {
    question: "Why is double circulation important?",
    options: [
      "It mixes oxygenated and deoxygenated blood",
      "It provides a steady supply of oxygenated blood",
      "It slows blood flow",
      "It reduces oxygen in the body"
    ],
    answer: "It provides a steady supply of oxygenated blood",
    explanation:
      "Double circulation ensures tissues receive oxygen-rich blood continuously."
  },
  {
    question: "What is blood considered in the body?",
    options: ["An organ", "A tissue", "A bone", "A muscle"],
    answer: "A tissue",
    explanation:
      "Blood is a fluid connective tissue."
  },
  {
    question: "What is the liquid part of blood called?",
    options: ["Platelets", "Plasma", "RBC", "WBC"],
    answer: "Plasma",
    explanation:
      "Plasma is the fluid part of blood and contains mostly water."
  },
  {
    question: "What percentage of plasma is water?",
    options: ["20%", "50%", "70%", "90%"],
    answer: "90%",
    explanation:
      "Plasma is made up of about 90% water."
  },
  {
    question: "Which blood cells carry oxygen?",
    options: [
      "White blood cells",
      "Platelets",
      "Red blood cells",
      "Plasma"
    ],
    answer: "Red blood cells",
    explanation:
      "Red blood cells transport oxygen to different parts of the body."
  },
  {
    question: "What is another name for red blood cells?",
    options: [
      "Leukocytes",
      "Thrombocytes",
      "Erythrocytes",
      "Nephrons"
    ],
    answer: "Erythrocytes",
    explanation:
      "Red blood cells are also called erythrocytes."
  },
  {
    question: "What is the function of white blood cells?",
    options: [
      "Carry oxygen",
      "Help digestion",
      "Fight germs and infections",
      "Store nutrients"
    ],
    answer: "Fight germs and infections",
    explanation:
      "White blood cells protect the body from harmful microorganisms."
  },
  {
    question: "What is another name for white blood cells?",
    options: [
      "Erythrocytes",
      "Leukocytes",
      "Platelets",
      "Plasma"
    ],
    answer: "Leukocytes",
    explanation:
      "White blood cells are also known as leukocytes."
  },
  {
    question: "Which blood component helps in clotting?",
    options: ["Plasma", "RBC", "Platelets", "WBC"],
    answer: "Platelets",
    explanation:
      "Platelets help stop bleeding by forming clots."
  },
  {
    question: "What are platelets also called?",
    options: [
      "Leukocytes",
      "Thrombocytes",
      "Erythrocytes",
      "Nephrons"
    ],
    answer: "Thrombocytes",
    explanation:
      "Platelets are also called thrombocytes."
  },
  {
    question: "What are blood vessels?",
    options: [
      "Digestive organs",
      "Pathways through which blood flows",
      "Bones in the body",
      "Air sacs in lungs"
    ],
    answer: "Pathways through which blood flows",
    explanation:
      "Blood vessels carry blood throughout the body."
  },
  {
    question: "Which blood vessels carry blood away from the heart?",
    options: ["Veins", "Capillaries", "Arteries", "Nephrons"],
    answer: "Arteries",
    explanation:
      "Arteries transport blood away from the heart."
  },
  {
    question: "What type of blood do arteries usually carry?",
    options: [
      "Deoxygenated blood",
      "Oxygenated blood",
      "Dirty blood",
      "No blood"
    ],
    answer: "Oxygenated blood",
    explanation:
      "Most arteries carry oxygen-rich blood."
  },
  {
    question: "Which artery carries deoxygenated blood?",
    options: [
      "Coronary artery",
      "Pulmonary artery",
      "Renal artery",
      "Aorta"
    ],
    answer: "Pulmonary artery",
    explanation:
      "The pulmonary artery carries deoxygenated blood to the lungs."
  },
  {
    question: "Which blood vessels carry blood toward the heart?",
    options: ["Arteries", "Veins", "Capillaries", "Nephrons"],
    answer: "Veins",
    explanation:
      "Veins return blood back to the heart."
  },
  {
    question: "What type of blood do veins usually carry?",
    options: [
      "Oxygenated blood",
      "Deoxygenated blood",
      "No blood",
      "Pure water"
    ],
    answer: "Deoxygenated blood",
    explanation:
      "Most veins carry oxygen-poor blood."
  },
  {
    question: "Which veins carry oxygenated blood?",
    options: [
      "Pulmonary veins",
      "Coronary veins",
      "Renal veins",
      "Jugular veins"
    ],
    answer: "Pulmonary veins",
    explanation:
      "Pulmonary veins carry oxygen-rich blood from the lungs to the heart."
  },
  {
    question: "Define capillaries.",
    options: [
      "Large muscles of the heart",
      "Tiny blood vessels connecting arteries and veins",
      "Air tubes in lungs",
      "Digestive organs"
    ],
    answer: "Tiny blood vessels connecting arteries and veins",
    explanation:
      "Capillaries are very small blood vessels where exchange of gases and nutrients occurs."
  },
  {
    question: "What is lymph?",
    options: [
      "A type of bone",
      "A colourless tissue fluid",
      "A digestive juice",
      "A nerve cell"
    ],
    answer: "A colourless tissue fluid",
    explanation:
      "Lymph is a colourless fluid that transports fats and nutrients."
  },
  {
    question: "Which system produces lymph?",
    options: [
      "Digestive system",
      "Respiratory system",
      "Lymphatic system",
      "Skeletal system"
    ],
    answer: "Lymphatic system",
    explanation:
      "The lymphatic system produces and transports lymph."
  },
  {
    question: "Which system removes waste products from the body?",
    options: [
      "Circulatory system",
      "Digestive system",
      "Excretory system",
      "Nervous system"
    ],
    answer: "Excretory system",
    explanation:
      "The excretory system removes waste products from the body."
  },
  {
    question: "Which organs filter blood and produce urine?",
    options: ["Lungs", "Kidneys", "Heart", "Liver"],
    answer: "Kidneys",
    explanation:
      "Kidneys filter waste from blood and form urine."
  },
  {
    question: "What shape are the kidneys?",
    options: ["Round", "Square", "Bean-shaped", "Triangle"],
    answer: "Bean-shaped",
    explanation:
      "Kidneys are bean-shaped organs."
  },
  {
    question: "What are the functional units of the kidneys called?",
    options: ["Alveoli", "Nephrons", "Capillaries", "Neurons"],
    answer: "Nephrons",
    explanation:
      "Nephrons are the functional units that filter blood."
  },
  {
    question: "What is the cup-like structure in a nephron called?",
    options: [
      "Loop of Henle",
      "Bowman’s capsule",
      "Renal pelvis",
      "Ureter"
    ],
    answer: "Bowman’s capsule",
    explanation:
      "Bowman’s capsule surrounds the glomerulus."
  },
  {
    question: "What is the function of the ureters?",
    options: [
      "Store urine",
      "Carry urine from kidneys to bladder",
      "Pump blood",
      "Filter blood"
    ],
    answer: "Carry urine from kidneys to bladder",
    explanation:
      "Ureters transport urine from the kidneys to the urinary bladder."
  },
  {
    question: "Which organ stores urine?",
    options: ["Kidney", "Liver", "Urinary bladder", "Heart"],
    answer: "Urinary bladder",
    explanation:
      "The urinary bladder stores urine until it is removed."
  },
  {
    question: "What is the process of emptying the bladder called?",
    options: ["Digestion", "Respiration", "Micturition", "Circulation"],
    answer: "Micturition",
    explanation:
      "Micturition is the act of urination."
  },
  {
    question: "Which tube carries urine out of the body?",
    options: ["Ureter", "Urethra", "Artery", "Vein"],
    answer: "Urethra",
    explanation:
      "The urethra helps expel urine from the body."
  },
  {
    question: "What is the major excretory product in humans?",
    options: ["Ammonia", "Uric acid", "Urea", "Carbon dioxide"],
    answer: "Urea",
    explanation:
      "Humans mainly excrete nitrogenous waste in the form of urea."
  },
  {
    question: "Which excretory product is mainly removed by the lungs?",
    options: ["Salt", "Urea", "Carbon dioxide", "Sugar"],
    answer: "Carbon dioxide",
    explanation:
      "The lungs remove carbon dioxide during breathing."
  }
];
const quizData6 = [
  {
    question: "Why do we need food?",
    options: [
      "To make toys",
      "To get energy and stay healthy",
      "To change our height daily",
      "To sleep all day"
    ],
    answer: "To get energy and stay healthy",
    explanation:
      "Food gives us energy, helps us grow, and protects us from diseases."
  },
  {
    question: "Which organ keeps beating even while we sleep?",
    options: ["Liver", "Heart", "Kidney", "Stomach"],
    answer: "Heart",
    explanation:
      "The heart keeps pumping blood even when we are asleep."
  },
  {
    question: "What are the useful substances in food called?",
    options: ["Fibres", "Nutrients", "Juices", "Sugars"],
    answer: "Nutrients",
    explanation:
      "Nutrients are substances in food that help our body function properly."
  },
  {
    question: "Which nutrient gives us energy?",
    options: ["Proteins", "Vitamins", "Carbohydrates", "Minerals"],
    answer: "Carbohydrates",
    explanation:
      "Carbohydrates are energy-giving nutrients."
  },
  {
    question: "Foods rich in carbohydrates are called ______ foods.",
    options: ["Protective", "Body-building", "Energy-giving", "Cooling"],
    answer: "Energy-giving",
    explanation:
      "Carbohydrates provide energy to our body."
  },
  {
    question: "Which of these foods is rich in carbohydrates?",
    options: ["Rice", "Fish", "Butter", "Cheese"],
    answer: "Rice",
    explanation:
      "Rice is a carbohydrate-rich food."
  },
  {
    question: "Which nutrient is the richest source of energy?",
    options: ["Proteins", "Vitamins", "Fats", "Minerals"],
    answer: "Fats",
    explanation:
      "Fats provide more energy than carbohydrates."
  },
  {
    question: "What else do fats help our body do?",
    options: [
      "Change colour",
      "Keep the body warm",
      "Make bones shorter",
      "Improve hearing"
    ],
    answer: "Keep the body warm",
    explanation:
      "Fats help keep our body warm."
  },
  {
    question: "Which of these foods contains fats?",
    options: ["Butter", "Spinach", "Orange", "Rice"],
    answer: "Butter",
    explanation:
      "Butter is rich in fats."
  },
  {
    question: "What can happen if we eat too much fat?",
    options: [
      "We become taller quickly",
      "We may become overweight",
      "We stop growing",
      "We become cold"
    ],
    answer: "We may become overweight",
    explanation:
      "Too much fat can lead to obesity and health problems."
  },
  {
    question: "Which nutrient helps in body growth and repair?",
    options: ["Proteins", "Carbohydrates", "Water", "Roughage"],
    answer: "Proteins",
    explanation:
      "Proteins help build muscles and repair body tissues."
  },
  {
    question: "Foods rich in proteins are called ______ foods.",
    options: ["Energy-giving", "Cooling", "Body-building", "Protective"],
    answer: "Body-building",
    explanation:
      "Proteins help build and repair the body."
  },
  {
    question: "Which of these foods is rich in proteins?",
    options: ["Eggs", "Sugar", "Honey", "Butter"],
    answer: "Eggs",
    explanation:
      "Eggs are rich in proteins."
  },
  {
    question: "Why are proteins especially important for children?",
    options: [
      "They help children sleep",
      "They help in growth and development",
      "They make food sweet",
      "They prevent sweating"
    ],
    answer: "They help in growth and development",
    explanation:
      "Growing children need proteins for proper development."
  },
  {
    question: "What do vitamins help our body do?",
    options: [
      "Fight diseases",
      "Change hair colour",
      "Store fat",
      "Reduce height"
    ],
    answer: "Fight diseases",
    explanation:
      "Vitamins help protect the body from diseases."
  },
  {
    question: "Foods rich in vitamins are called ______ foods.",
    options: ["Body-building", "Protective", "Heavy", "Energy-giving"],
    answer: "Protective",
    explanation:
      "Vitamins protect our body from illnesses."
  },
  {
    question: "Which vitamin keeps our eyes and skin healthy?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
    answer: "Vitamin A",
    explanation:
      "Vitamin A helps keep eyes and skin healthy."
  },
  {
    question: "Which food is a good source of Vitamin A?",
    options: ["Carrot", "Fish", "Butter", "Rice"],
    answer: "Carrot",
    explanation:
      "Carrots are rich in Vitamin A."
  },
  {
    question: "Which vitamin helps keep bones and teeth healthy?",
    options: ["Vitamin B", "Vitamin C", "Vitamin D", "Vitamin E"],
    answer: "Vitamin D",
    explanation:
      "Vitamin D helps maintain strong bones and teeth."
  },
  {
    question: "How does our body naturally make Vitamin D?",
    options: [
      "By drinking juice",
      "By exposure to sunlight",
      "By eating sweets",
      "By sleeping"
    ],
    answer: "By exposure to sunlight",
    explanation:
      "Our body produces Vitamin D when exposed to sunlight."
  },
  {
    question: "Which vitamin helps in blood clotting?",
    options: ["Vitamin A", "Vitamin K", "Vitamin C", "Vitamin E"],
    answer: "Vitamin K",
    explanation:
      "Vitamin K helps blood clot properly."
  },
  {
    question: "Which mineral helps in making blood and carrying oxygen?",
    options: ["Calcium", "Iron", "Iodine", "Phosphorus"],
    answer: "Iron",
    explanation:
      "Iron helps in the production of blood."
  },
  {
    question: "Which food is rich in iron?",
    options: ["Spinach", "Candy", "Butter", "Ice cream"],
    answer: "Spinach",
    explanation:
      "Green leafy vegetables like spinach are rich in iron."
  },
  {
    question: "Which mineral is important for strong bones and teeth?",
    options: ["Iron", "Iodine", "Calcium", "Salt"],
    answer: "Calcium",
    explanation:
      "Calcium helps make bones and teeth strong."
  },
  {
    question: "Which foods are good sources of calcium?",
    options: ["Milk and cheese", "Chocolates", "Soft drinks", "Chips"],
    answer: "Milk and cheese",
    explanation:
      "Dairy products are rich in calcium."
  },
  {
    question: "Which mineral is commonly obtained from iodized salt?",
    options: ["Iron", "Calcium", "Iodine", "Phosphorus"],
    answer: "Iodine",
    explanation:
      "Iodized salt provides iodine."
  },
  {
    question: "Why is water important for our body?",
    options: [
      "It helps digestion and controls body temperature",
      "It changes skin colour",
      "It grows hair faster",
      "It hardens bones"
    ],
    answer: "It helps digestion and controls body temperature",
    explanation:
      "Water helps in digestion, waste removal, and temperature control."
  },
  {
    question: "How many glasses of water should we drink daily?",
    options: ["1-2", "3-4", "8-10", "15-20"],
    answer: "8-10",
    explanation:
      "We should drink around 8-10 glasses of water daily."
  },
  {
    question: "What is roughage also called?",
    options: ["Protein", "Dietary fibre", "Mineral", "Fat"],
    answer: "Dietary fibre",
    explanation:
      "Roughage is also known as dietary fibre."
  },
  {
    question: "Where is roughage mainly found?",
    options: [
      "Candies and chocolates",
      "Cereals, fruits, and vegetables",
      "Butter and oil",
      "Fish and meat"
    ],
    answer: "Cereals, fruits, and vegetables",
    explanation:
      "Roughage is found in plant foods like fruits and vegetables."
  },
  {
    question: "Why is roughage important?",
    options: [
      "It gives maximum energy",
      "It helps easy bowel movement",
      "It strengthens nails",
      "It changes body colour"
    ],
    answer: "It helps easy bowel movement",
    explanation:
      "Roughage helps prevent constipation and aids digestion."
  },
  {
    question: "What is food preservation?",
    options: [
      "Cooking food quickly",
      "Keeping food fresh for longer",
      "Growing vegetables",
      "Cutting food into pieces"
    ],
    answer: "Keeping food fresh for longer",
    explanation:
      "Food preservation helps keep food safe and fresh."
  },
  {
    question: "Which method of food preservation uses low temperature?",
    options: ["Drying", "Salting", "Freezing", "Heating"],
    answer: "Freezing",
    explanation:
      "Freezing slows the growth of bacteria."
  },
  {
    question: "What happens during drying of food?",
    options: [
      "Extra sugar is added",
      "Moisture is removed",
      "Water is poured in",
      "Food is frozen"
    ],
    answer: "Moisture is removed",
    explanation:
      "Removing moisture prevents bacteria from growing."
  },
  {
    question: "Why is salt used to preserve food?",
    options: [
      "It changes food colour",
      "It removes moisture and stops bacteria growth",
      "It sweetens food",
      "It freezes food"
    ],
    answer: "It removes moisture and stops bacteria growth",
    explanation:
      "Salt prevents bacteria from surviving in food."
  },
  {
    question: "Which of these can act as a food preservative?",
    options: ["Vinegar", "Mud", "Soap", "Sand"],
    answer: "Vinegar",
    explanation:
      "Vinegar helps preserve food by preventing bacterial growth."
  },
  {
    question: "Which nutrient helps protect the body from diseases?",
    options: ["Vitamins", "Fats", "Carbohydrates", "Sugars"],
    answer: "Vitamins",
    explanation:
      "Vitamins are protective nutrients."
  },
  {
    question: "Which nutrient helps repair body damage?",
    options: ["Proteins", "Fats", "Water", "Salt"],
    answer: "Proteins",
    explanation:
      "Proteins help repair body tissues and muscles."
  }
];
const quizData7 = [
  {
    question: "What are teeth?",
    options: [
      "Soft muscles in the mouth",
      "Hard structures used for chewing",
      "Bones in the hand",
      "Parts of the stomach"
    ],
    answer: "Hard structures used for chewing",
    explanation:
      "Teeth are hard structures that help us chew food and speak clearly."
  },
  {
    question: "How many sets of teeth do humans have in their lifetime?",
    options: ["One", "Two", "Three", "Four"],
    answer: "Two",
    explanation:
      "Humans have two sets of teeth: temporary teeth and permanent teeth."
  },
  {
    question: "What is another name for temporary teeth?",
    options: ["Adult teeth", "Wisdom teeth", "Milk teeth", "Sharp teeth"],
    answer: "Milk teeth",
    explanation:
      "Temporary teeth are also called milk teeth or baby teeth."
  },
  {
    question: "How many milk teeth do most people have?",
    options: ["20", "24", "28", "32"],
    answer: "20",
    explanation:
      "Most children have 20 milk teeth."
  },
  {
    question: "At what age do milk teeth usually start appearing?",
    options: [
      "At birth",
      "Around six months",
      "At five years",
      "At ten years"
    ],
    answer: "Around six months",
    explanation:
      "Milk teeth usually begin to appear when a baby is around six months old."
  },
  {
    question: "At what age do permanent teeth usually begin to appear?",
    options: [
      "Around one year",
      "Around three years",
      "Around six years",
      "Around fifteen years"
    ],
    answer: "Around six years",
    explanation:
      "Permanent teeth begin to come in around the age of six."
  },
  {
    question: "How many permanent teeth does an adult usually have?",
    options: ["20", "24", "28", "32"],
    answer: "32",
    explanation:
      "Adults usually have 32 permanent teeth."
  },
  {
    question: "Why are permanent teeth important?",
    options: [
      "They help us jump",
      "They are meant to last for life",
      "They help us sleep",
      "They disappear quickly"
    ],
    answer: "They are meant to last for life",
    explanation:
      "Permanent teeth are stronger and meant to last throughout life."
  },
  {
    question: "Which type of teeth are sharp and flat at the front?",
    options: ["Canines", "Molars", "Premolars", "Incisors"],
    answer: "Incisors",
    explanation:
      "Incisors are the sharp, flat teeth at the front of the mouth."
  },
  {
    question: "What do incisors help us do?",
    options: [
      "Grind food",
      "Bite food",
      "Swallow water",
      "Speak loudly"
    ],
    answer: "Bite food",
    explanation:
      "Incisors help us bite into food."
  },
  {
    question: "How many incisors do humans usually have?",
    options: ["4", "6", "8", "10"],
    answer: "8",
    explanation:
      "Humans usually have eight incisors: four on top and four on the bottom."
  },
  {
    question: "Which teeth are pointy and next to the incisors?",
    options: ["Molars", "Canines", "Premolars", "Wisdom teeth"],
    answer: "Canines",
    explanation:
      "Canines are the pointy teeth beside the incisors."
  },
  {
    question: "What do canines help us do?",
    options: [
      "Tear and grip food",
      "Brush teeth",
      "Swallow food",
      "Drink water"
    ],
    answer: "Tear and grip food",
    explanation:
      "Canines help tear and grip food."
  },
  {
    question: "How many canines do humans usually have?",
    options: ["2", "4", "6", "8"],
    answer: "4",
    explanation:
      "Humans have four canines: two on top and two on the bottom."
  },
  {
    question: "Which teeth are found behind the canines?",
    options: ["Incisors", "Premolars", "Wisdom teeth", "Baby teeth"],
    answer: "Premolars",
    explanation:
      "Premolars are located behind the canines."
  },
  {
    question: "What is the function of premolars?",
    options: [
      "Cut food",
      "Tear food",
      "Crush and grind food",
      "Hold the tongue"
    ],
    answer: "Crush and grind food",
    explanation:
      "Premolars help crush and grind food."
  },
  {
    question: "Which are the largest teeth at the back of the mouth?",
    options: ["Incisors", "Canines", "Premolars", "Molars"],
    answer: "Molars",
    explanation:
      "Molars are the big, flat teeth at the back of the mouth."
  },
  {
    question: "What do molars help us do?",
    options: [
      "Cut food",
      "Tear food",
      "Crush and grind food",
      "Taste food"
    ],
    answer: "Crush and grind food",
    explanation:
      "Molars help crush and grind food during chewing."
  },
  {
    question: "How many molars do humans usually have?",
    options: ["4", "8", "12", "16"],
    answer: "12",
    explanation:
      "Humans usually have twelve molars."
  },
  {
    question: "What is the visible white part of the tooth called?",
    options: ["Root", "Pulp", "Crown", "Dentin"],
    answer: "Crown",
    explanation:
      "The crown is the visible part of the tooth above the gums."
  },
  {
    question: "What covers the crown of the tooth?",
    options: ["Pulp", "Blood", "Enamel", "Gum"],
    answer: "Enamel",
    explanation:
      "The crown is covered by enamel."
  },
  {
    question: "What is enamel?",
    options: [
      "The softest material in the body",
      "A type of blood vessel",
      "The hardest material in the body",
      "A chewing muscle"
    ],
    answer: "The hardest material in the body",
    explanation:
      "Enamel is the hardest substance in the human body."
  },
  {
    question: "Which layer lies beneath the enamel?",
    options: ["Root", "Pulp", "Dentin", "Gum"],
    answer: "Dentin",
    explanation:
      "Dentin is the layer found beneath the enamel."
  },
  {
    question: "What does dentin do?",
    options: [
      "Helps the tooth grow hair",
      "Supports the enamel",
      "Changes tooth colour",
      "Produces saliva"
    ],
    answer: "Supports the enamel",
    explanation:
      "Dentin supports the enamel and gives shape to the tooth."
  },
  {
    question: "Which part of the tooth is hidden below the gums?",
    options: ["Crown", "Enamel", "Root", "Dentin"],
    answer: "Root",
    explanation:
      "The root is below the gumline and holds the tooth in place."
  },
  {
    question: "What is found inside the tooth?",
    options: ["Air", "Pulp", "Sand", "Water"],
    answer: "Pulp",
    explanation:
      "The pulp is the soft living part inside the tooth."
  },
  {
    question: "What does the pulp contain?",
    options: [
      "Seeds and fibres",
      "Blood vessels and nerves",
      "Hair and nails",
      "Bones and muscles"
    ],
    answer: "Blood vessels and nerves",
    explanation:
      "The pulp contains blood vessels and nerves."
  },
  {
    question: "What causes tooth decay?",
    options: [
      "Clean water",
      "Exercise",
      "Acids formed by bacteria and sugar",
      "Fresh air"
    ],
    answer: "Acids formed by bacteria and sugar",
    explanation:
      "Bacteria combine with sugars to produce acids that damage teeth."
  },
  {
    question: "What are tiny holes in teeth caused by decay called?",
    options: ["Roots", "Cavities", "Pulp", "Layers"],
    answer: "Cavities",
    explanation:
      "Cavities are small holes formed in teeth due to decay."
  },
  {
    question: "What can happen if cavities are not treated?",
    options: [
      "Teeth become stronger",
      "Pain or infection may occur",
      "Teeth become shiny",
      "Hair starts growing"
    ],
    answer: "Pain or infection may occur",
    explanation:
      "Untreated cavities can grow larger and cause pain or infection."
  },
  {
    question: "How many times should we brush our teeth each day?",
    options: ["Once", "Twice", "Five times", "Only at night"],
    answer: "Twice",
    explanation:
      "We should brush our teeth at least twice a day."
  },
  {
    question: "Why is flossing important?",
    options: [
      "It colours teeth",
      "It removes food particles between teeth",
      "It sharpens teeth",
      "It makes teeth bigger"
    ],
    answer: "It removes food particles between teeth",
    explanation:
      "Flossing cleans areas where a toothbrush cannot reach."
  },
  {
    question: "Which foods can contribute to tooth decay?",
    options: [
      "Fruits and vegetables",
      "Milk and cheese",
      "Sugary and sticky foods",
      "Leafy greens"
    ],
    answer: "Sugary and sticky foods",
    explanation:
      "Sugary foods can help bacteria produce harmful acids."
  },
  {
    question: "Which foods are good for healthy teeth?",
    options: [
      "Candies and soda",
      "Milk and cheese",
      "Sticky sweets",
      "Chocolate bars"
    ],
    answer: "Milk and cheese",
    explanation:
      "Milk and cheese contain calcium that helps keep teeth strong."
  },
  {
    question: "Why are regular dental visits important?",
    options: [
      "To colour teeth",
      "To keep teeth healthy and detect problems early",
      "To remove all teeth",
      "To make teeth smaller"
    ],
    answer: "To keep teeth healthy and detect problems early",
    explanation:
      "Dentists help clean teeth and check for oral health problems."
  },
  {
    question: "What are wisdom teeth also called?",
    options: [
      "Baby teeth",
      "Third molars",
      "Front teeth",
      "Milk teeth"
    ],
    answer: "Third molars",
    explanation:
      "Wisdom teeth are also known as third molars."
  },
  {
    question: "What is the process of breaking down food into smaller pieces called?",
    options: ["Respiration", "Digestion", "Circulation", "Excretion"],
    answer: "Digestion",
    explanation:
      "Digestion is the process of breaking down food into smaller substances to release energy."
  },
  {
    question: "Which system is responsible for digestion?",
    options: ["Respiratory system", "Digestive system", "Nervous system", "Circulatory system"],
    answer: "Digestive system",
    explanation:
      "The digestive system helps break down and process food."
  },
  {
    question: "Where does digestion begin?",
    options: ["Stomach", "Small intestine", "Mouth", "Large intestine"],
    answer: "Mouth",
    explanation:
      "Digestion starts in the mouth when food is chewed and mixed with saliva."
  },
  {
    question: "What do the sharp teeth at the front help us do?",
    options: ["Grind food", "Swallow food", "Cut food", "Taste food"],
    answer: "Cut food",
    explanation:
      "Sharp front teeth help cut food into smaller pieces."
  },
  {
    question: "What do the flat teeth at the back help us do?",
    options: ["Cut food", "Grind food", "Smell food", "Swallow food"],
    answer: "Grind food",
    explanation:
      "Flat teeth grind food into smaller pieces."
  },
  {
    question: "What mixes with food in the mouth during chewing?",
    options: ["Blood", "Saliva", "Bile", "Sweat"],
    answer: "Saliva",
    explanation:
      "Saliva mixes with food and helps in digestion."
  },
  {
    question: "What does saliva help break down?",
    options: ["Proteins", "Fats", "Starch", "Vitamins"],
    answer: "Starch",
    explanation:
      "Saliva helps break down starch into simpler sugars."
  },
  {
    question: "Which organ helps mix saliva with food?",
    options: ["Teeth", "Tongue", "Liver", "Stomach"],
    answer: "Tongue",
    explanation:
      "The tongue helps mix saliva with food."
  },
  {
    question: "Through which tube does food travel from the mouth to the stomach?",
    options: ["Windpipe", "Food pipe", "Large intestine", "Pancreas"],
    answer: "Food pipe",
    explanation:
      "Food travels through the oesophagus or food pipe to the stomach."
  },
  {
    question: "What is another name for the food pipe?",
    options: ["Rectum", "Oesophagus", "Trachea", "Duodenum"],
    answer: "Oesophagus",
    explanation:
      "The oesophagus is also called the food pipe."
  },
  {
    question: "What is the stomach like?",
    options: ["A hard bone", "A muscular bag", "A blood vessel", "A thin wire"],
    answer: "A muscular bag",
    explanation:
      "The stomach is a muscular bag where food is churned."
  },
  {
    question: "What happens to food inside the stomach?",
    options: [
      "It becomes cold",
      "It is mixed with digestive juices",
      "It turns into bones",
      "It is removed immediately"
    ],
    answer: "It is mixed with digestive juices",
    explanation:
      "Digestive juices in the stomach help break down food."
  },
  {
    question: "Which type of digestion begins in the stomach?",
    options: ["Fat digestion", "Protein digestion", "Vitamin digestion", "Mineral digestion"],
    answer: "Protein digestion",
    explanation:
      "Protein digestion starts in the stomach."
  },
  {
    question: "Which acid is present in the stomach?",
    options: ["Citric acid", "Hydrochloric acid", "Acetic acid", "Lactic acid"],
    answer: "Hydrochloric acid",
    explanation:
      "Hydrochloric acid helps in digestion inside the stomach."
  },
  {
    question: "What is partly digested food mixed with stomach acid called?",
    options: ["Saliva", "Bile", "Chyme", "Plasma"],
    answer: "Chyme",
    explanation:
      "Food mixed with stomach acid is called chyme."
  },
  {
    question: "Which organ produces bile?",
    options: ["Pancreas", "Stomach", "Liver", "Kidney"],
    answer: "Liver",
    explanation:
      "The liver produces bile."
  },
  {
    question: "What does bile help digest?",
    options: ["Proteins", "Fats", "Sugars", "Vitamins"],
    answer: "Fats",
    explanation:
      "Bile helps in the digestion of fats."
  },
  {
    question: "Where is bile stored?",
    options: ["Pancreas", "Gallbladder", "Stomach", "Rectum"],
    answer: "Gallbladder",
    explanation:
      "Bile is stored in the gallbladder."
  },
  {
    question: "Which organ produces digestive juices for carbohydrates, fats, and proteins?",
    options: ["Liver", "Pancreas", "Oesophagus", "Rectum"],
    answer: "Pancreas",
    explanation:
      "The pancreas makes digestive juices for breaking down food."
  },
  {
    question: "Where does food go after leaving the stomach?",
    options: ["Large intestine", "Mouth", "Small intestine", "Rectum"],
    answer: "Small intestine",
    explanation:
      "Food enters the small intestine after the stomach."
  },
  {
    question: "What type of tube is the small intestine?",
    options: ["Short and straight", "Long and curled", "Hard and thick", "Flat and wide"],
    answer: "Long and curled",
    explanation:
      "The small intestine is a long and curled tube."
  },
  {
    question: "Which of these is a part of the small intestine?",
    options: ["Rectum", "Jejunum", "Gallbladder", "Anus"],
    answer: "Jejunum",
    explanation:
      "Jejunum is one of the three parts of the small intestine."
  },
  {
    question: "Where is digestion completed?",
    options: ["Mouth", "Stomach", "Small intestine", "Large intestine"],
    answer: "Small intestine",
    explanation:
      "Digestion is completed in the small intestine."
  },
  {
    question: "What absorbs nutrients from digested food?",
    options: ["Bones", "Blood vessels", "Teeth", "Lungs"],
    answer: "Blood vessels",
    explanation:
      "Tiny blood vessels in the small intestine absorb nutrients."
  },
  {
    question: "What happens to undigested food after the small intestine?",
    options: [
      "It enters the lungs",
      "It moves to the large intestine",
      "It returns to the mouth",
      "It becomes blood"
    ],
    answer: "It moves to the large intestine",
    explanation:
      "Undigested food moves into the large intestine."
  },
  {
    question: "How is the large intestine different from the small intestine?",
    options: [
      "It is longer and thinner",
      "It is wider and shorter",
      "It has no function",
      "It produces saliva"
    ],
    answer: "It is wider and shorter",
    explanation:
      "The large intestine is wider and shorter than the small intestine."
  },
  {
    question: "What is the main job of the large intestine?",
    options: [
      "Pump blood",
      "Absorb extra water",
      "Make saliva",
      "Digest proteins only"
    ],
    answer: "Absorb extra water",
    explanation:
      "The large intestine absorbs extra water from undigested food."
  },
  {
    question: "What does the large intestine form from undigested food?",
    options: ["Saliva", "Bile", "Stool", "Chyme"],
    answer: "Stool",
    explanation:
      "The large intestine forms stool or semi-solid waste."
  },
  {
    question: "Where is solid waste stored before leaving the body?",
    options: ["Stomach", "Pancreas", "Rectum", "Mouth"],
    answer: "Rectum",
    explanation:
      "Solid waste is stored in the rectum before removal."
  },
  {
    question: "Through which opening is waste removed from the body?",
    options: ["Nose", "Mouth", "Anus", "Ear"],
    answer: "Anus",
    explanation:
      "Waste leaves the body through the anus."
  },
  {
    question: "Why does saliva make food easier to swallow?",
    options: [
      "It cools the food",
      "It softens the food",
      "It changes food colour",
      "It removes nutrients"
    ],
    answer: "It softens the food",
    explanation:
      "Saliva softens food and makes swallowing easier."
  },
  {
    question: "How long does food usually remain in the stomach?",
    options: [
      "1 to 4 hours",
      "10 minutes",
      "12 hours",
      "24 hours"
    ],
    answer: "1 to 4 hours",
    explanation:
      "Food usually stays in the stomach for about 1 to 4 hours."
  },
  {
    question: "What carries nutrients to different parts of the body?",
    options: ["Bones", "Blood vessels", "Hair", "Teeth"],
    answer: "Blood vessels",
    explanation:
      "Blood vessels carry absorbed nutrients throughout the body."
  }
];
const quizData8 = [
  {
    question: "Why are clothes important for us?",
    options: [
      "They help us fly",
      "They protect our body",
      "They help us swim",
      "They grow food"
    ],
    answer: "They protect our body",
    explanation:
      "Clothes protect our body from dirt, weather, and other harmful things."
  },
  {
    question: "What can clean clothes help us avoid?",
    options: ["Hunger", "Sickness", "Sleep", "Rain"],
    answer: "Sickness",
    explanation:
      "Clean clothes help prevent germs from reaching our skin."
  },
  {
    question: "We choose clothes mainly according to the ______.",
    options: ["Food we eat", "Weather and climate", "Colour of shoes", "Time of day"],
    answer: "Weather and climate",
    explanation:
      "We wear clothes based on the weather and climate to stay comfortable."
  },
  {
    question: "What type of clothes do we wear in summer?",
    options: [
      "Thick woollen clothes",
      "Heavy coats",
      "Light cotton clothes",
      "Leather jackets"
    ],
    answer: "Light cotton clothes",
    explanation:
      "Cotton clothes are light and keep us cool in summer."
  },
  {
    question: "Why are cotton clothes suitable for summer?",
    options: [
      "They trap heat",
      "They absorb sweat",
      "They are waterproof",
      "They are very heavy"
    ],
    answer: "They absorb sweat",
    explanation:
      "Cotton absorbs sweat and keeps us cool and comfortable."
  },
  {
    question: "Why do cotton clothes feel cool in summer?",
    options: [
      "They are dark coloured",
      "They allow air to pass through",
      "They are thick",
      "They stop sweating"
    ],
    answer: "They allow air to pass through",
    explanation:
      "Tiny holes in cotton fabric allow air to move freely."
  },
  {
    question: "What type of clothes do we wear in winter?",
    options: [
      "Cotton clothes",
      "Silk clothes",
      "Woollen clothes",
      "Raincoats"
    ],
    answer: "Woollen clothes",
    explanation:
      "Woollen clothes help keep our body warm in winter."
  },
  {
    question: "How do woollen clothes keep us warm?",
    options: [
      "They absorb water",
      "They trap body heat",
      "They allow cold air inside",
      "They become wet quickly"
    ],
    answer: "They trap body heat",
    explanation:
      "Woollen clothes trap body heat and prevent it from escaping."
  },
  {
    question: "What do we wear during the rainy season to stay dry?",
    options: ["Sweaters", "Raincoats", "Scarves", "Cotton shirts"],
    answer: "Raincoats",
    explanation:
      "Raincoats protect us from rainwater."
  },
  {
    question: "Which material is commonly used to make raincoats?",
    options: ["Cotton", "Wool", "Polythene", "Silk"],
    answer: "Polythene",
    explanation:
      "Polythene does not absorb water, so it is used for raincoats."
  },
  {
    question: "What footwear helps keep our feet dry during rain?",
    options: ["Sandals", "Leather shoes", "Gumboots", "Slippers"],
    answer: "Gumboots",
    explanation:
      "Gumboots are rubber shoes used during rainy weather."
  },
  {
    question: "What are fibres?",
    options: [
      "Small stones",
      "Thin, long, flexible structures",
      "Pieces of metal",
      "Types of buttons"
    ],
    answer: "Thin, long, flexible structures",
    explanation:
      "Fibres are thin and flexible structures like threads or hairs."
  },
  {
    question: "What are fibres used to make?",
    options: ["Yarns", "Shoes", "Bricks", "Glass"],
    answer: "Yarns",
    explanation:
      "Fibres are converted into yarns."
  },
  {
    question: "What are yarns used to make?",
    options: ["Fabrics", "Plates", "Pencils", "Bags only"],
    answer: "Fabrics",
    explanation:
      "Yarns are woven or knitted into fabrics."
  },
  {
    question: "What are fabrics used for?",
    options: [
      "Making clothes",
      "Cooking food",
      "Growing plants",
      "Cleaning roads"
    ],
    answer: "Making clothes",
    explanation:
      "Fabrics are materials used for making clothes."
  },
  {
    question: "Which are the two main methods used to make fabrics?",
    options: [
      "Cutting and painting",
      "Weaving and knitting",
      "Boiling and drying",
      "Printing and folding"
    ],
    answer: "Weaving and knitting",
    explanation:
      "Fabrics are mainly made through weaving and knitting."
  },
  {
    question: "What is knitting used to make?",
    options: [
      "Bricks",
      "Socks and sweaters",
      "Glass bottles",
      "Paper bags"
    ],
    answer: "Socks and sweaters",
    explanation:
      "Knitting is used to make items like socks and sweaters."
  },
  {
    question: "What happens in knitting?",
    options: [
      "Loops of yarn are interlocked",
      "Clothes are painted",
      "Fibres are melted",
      "Threads are cut"
    ],
    answer: "Loops of yarn are interlocked",
    explanation:
      "Knitting joins loops of yarn together to make fabric."
  },
  {
    question: "What machines are used in weaving?",
    options: ["Looms", "Fans", "Mixers", "Printers"],
    answer: "Looms",
    explanation:
      "Weaving is done on machines called looms."
  },
  {
    question: "What is weaving?",
    options: [
      "Making cloth by arranging yarns together",
      "Colouring fabric",
      "Washing clothes",
      "Cutting threads"
    ],
    answer: "Making cloth by arranging yarns together",
    explanation:
      "Weaving joins two sets of yarns to make fabric."
  },
  {
    question: "How many main types of fibres are there?",
    options: ["One", "Two", "Three", "Four"],
    answer: "Two",
    explanation:
      "The two main types are natural fibres and artificial fibres."
  },
  {
    question: "Which of these is a natural fibre?",
    options: ["Nylon", "Polyester", "Cotton", "Rayon"],
    answer: "Cotton",
    explanation:
      "Cotton is a natural fibre obtained from plants."
  },
  {
    question: "Cotton fibre comes from the ______.",
    options: ["Silkworm", "Cotton plant", "Sheep", "Camel"],
    answer: "Cotton plant",
    explanation:
      "Cotton fibre is obtained from the cotton plant."
  },
  {
    question: "Which plant gives linen fibre?",
    options: ["Jute plant", "Cotton plant", "Flax plant", "Neem plant"],
    answer: "Flax plant",
    explanation:
      "Linen fibre is obtained from the flax plant."
  },
  {
    question: "Which fibre is commonly used for making ropes and bags?",
    options: ["Silk", "Jute", "Rayon", "Nylon"],
    answer: "Jute",
    explanation:
      "Jute is strong and often used to make ropes and bags."
  },
  {
    question: "Which animal produces silk?",
    options: ["Sheep", "Camel", "Silkworm", "Yak"],
    answer: "Silkworm",
    explanation:
      "Silk is obtained from the cocoons made by silkworms."
  },
  {
    question: "Wool is mainly obtained from which animal?",
    options: ["Horse", "Sheep", "Dog", "Rabbit"],
    answer: "Sheep",
    explanation:
      "Wool is commonly obtained from sheep."
  },
  {
    question: "Which of these is an artificial fibre?",
    options: ["Cotton", "Wool", "Polyester", "Silk"],
    answer: "Polyester",
    explanation:
      "Polyester is a man-made or synthetic fibre."
  },
  {
    question: "Where are artificial fibres made?",
    options: ["Forests", "Farms", "Laboratories", "Rivers"],
    answer: "Laboratories",
    explanation:
      "Artificial fibres are made in laboratories using chemicals."
  },
  {
    question: "Which artificial fibre dries quickly?",
    options: ["Cotton", "Silk", "Polyester", "Wool"],
    answer: "Polyester",
    explanation:
      "Synthetic fibres like polyester dry quickly."
  },
  {
    question: "What does biodegradable mean?",
    options: [
      "Can melt in water",
      "Can break down naturally",
      "Can shine in sunlight",
      "Can float in air"
    ],
    answer: "Can break down naturally",
    explanation:
      "Biodegradable materials break down naturally in the environment."
  },
  {
    question: "Which type of fibres are biodegradable?",
    options: [
      "Natural fibres",
      "Artificial fibres",
      "Plastic fibres",
      "Metal fibres"
    ],
    answer: "Natural fibres",
    explanation:
      "Natural fibres decompose naturally in the environment."
  },
  {
    question: "Why are natural fibres comfortable to wear?",
    options: [
      "They are very hard",
      "They do not irritate the skin",
      "They are waterproof",
      "They are shiny"
    ],
    answer: "They do not irritate the skin",
    explanation:
      "Natural fibres feel soft and comfortable on the skin."
  },
  {
    question: "What should we use to wash clothes properly?",
    options: ["Oil", "Soap or detergent", "Sand", "Paint"],
    answer: "Soap or detergent",
    explanation:
      "Soap or detergent removes dirt and stains from clothes."
  },
  {
    question: "Which insects can damage woollen and silk clothes?",
    options: ["Butterflies", "Moths and silverfish", "Ants", "Bees"],
    answer: "Moths and silverfish",
    explanation:
      "Moths and silverfish can spoil woollen and silk clothes."
  },
  {
    question: "What can be used to protect clothes from insects during storage?",
    options: [
      "Mothballs",
      "Water",
      "Sugar",
      "Salt"
    ],
    answer: "Mothballs",
    explanation:
      "Mothballs help keep insects away from clothes."
  },
  {
    question: "Which clothes should usually be dry cleaned?",
    options: [
      "School uniforms",
      "Woollen clothes and silk sarees",
      "Raincoats",
      "Cotton socks"
    ],
    answer: "Woollen clothes and silk sarees",
    explanation:
      "Woollen clothes and silk sarees can get damaged if washed carelessly."
  },
  {
    question: "Why should we check care labels on clothes?",
    options: [
      "To know the price",
      "To follow washing instructions",
      "To change colour",
      "To make clothes smaller"
    ],
    answer: "To follow washing instructions",
    explanation:
      "Care labels give important instructions for washing and caring for clothes."
  }
];
const quizData9 = [
  {
    question: "What is the condition of the atmosphere at a particular time called?",
    options: ["Climate", "Weather", "Season", "Humidity"],
    answer: "Weather",
    explanation: "The condition of the atmosphere at one area at a particular time is called weather."
  },
  {
    question: "Which of the following can describe weather?",
    options: ["Sunny", "Rainy", "Windy", "All of these"],
    answer: "All of these",
    explanation: "Weather can be sunny, rainy, windy, cloudy, or humid."
  },
  {
    question: "What causes changes in weather?",
    options: ["The moon", "The sun", "Mountains", "Plants"],
    answer: "The sun",
    explanation: "Changes in the weather occur due to the sun."
  },
  {
    question: "What is air made up of mainly?",
    options: ["Only oxygen", "Only nitrogen", "Gases", "Water vapour only"],
    answer: "Gases",
    explanation: "Air is a mixture of gases."
  },
  {
    question: "Which gas is present in the highest amount in air?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: "Nitrogen",
    explanation: "Air contains about 78% nitrogen."
  },
  {
    question: "What is moving air called?",
    options: ["Storm", "Breeze", "Wind", "Humidity"],
    answer: "Wind",
    explanation: "Air that is moving across the earth’s surface is called wind."
  },
  {
    question: "What is a light gentle wind called?",
    options: ["Gale", "Storm", "Breeze", "Cyclone"],
    answer: "Breeze",
    explanation: "A light gentle wind is called breeze."
  },
  {
    question: "What is a very strong wind called?",
    options: ["Breeze", "Storm", "Gale", "Mist"],
    answer: "Gale",
    explanation: "A very strong wind is called gale."
  },
  {
    question: "What is humidity?",
    options: [
      "Amount of rainfall",
      "Amount of water vapour in air",
      "Amount of oxygen",
      "Movement of clouds"
    ],
    answer: "Amount of water vapour in air",
    explanation: "Humidity is the amount of water vapour present in air."
  },
  {
    question: "What is the process of water changing into gas on heating called?",
    options: ["Condensation", "Evaporation", "Filtration", "Freezing"],
    answer: "Evaporation",
    explanation: "Evaporation is the process in which water changes into gas on heating."
  },
  {
    question: "Evaporation is faster on a ____ day.",
    options: ["Cold", "Humid", "Windy", "Rainy"],
    answer: "Windy",
    explanation: "Moving air absorbs water vapour quickly, making evaporation faster."
  },
  {
    question: "What is the process of gas changing into water on cooling called?",
    options: ["Melting", "Evaporation", "Condensation", "Boiling"],
    answer: "Condensation",
    explanation: "Condensation happens when water vapour cools and changes into water."
  },
  {
    question: "Rain is formed after which process?",
    options: ["Filtration", "Condensation", "Sedimentation", "Boiling"],
    answer: "Condensation",
    explanation: "Rain forms after water vapour condenses into droplets."
  },
  {
    question: "What are substances present in small quantities in water that make it dirty called?",
    options: ["Minerals", "Impurities", "Crystals", "Nutrients"],
    answer: "Impurities",
    explanation: "Impurities are unwanted substances that make water dirty."
  },
  {
    question: "Which impurities dissolve in water?",
    options: ["Insoluble impurities", "Soluble impurities", "Solid waste", "Dust particles"],
    answer: "Soluble impurities",
    explanation: "Soluble impurities can dissolve in water."
  },
  {
    question: "Which method removes insoluble impurities by settling them at the bottom?",
    options: ["Boiling", "Sedimentation", "Evaporation", "Condensation"],
    answer: "Sedimentation",
    explanation: "Sedimentation allows heavy particles to settle at the bottom."
  },
  {
    question: "Which method removes water from the top after sedimentation?",
    options: ["Filtration", "Decantation", "Boiling", "Chlorination"],
    answer: "Decantation",
    explanation: "Decantation is pouring out clean water from the top layer."
  },
  {
    question: "Which process uses a filter paper or sieve to clean water?",
    options: ["Condensation", "Filtration", "Evaporation", "Melting"],
    answer: "Filtration",
    explanation: "Filtration removes insoluble particles using a filter."
  },
  {
    question: "Why is boiling water useful?",
    options: [
      "It changes color",
      "It kills germs",
      "It adds oxygen",
      "It makes water sweet"
    ],
    answer: "It kills germs",
    explanation: "Boiling water for at least 10 minutes kills most germs."
  },
  {
    question: "Which chemical is commonly added to water to kill germs?",
    options: ["Salt", "Sugar", "Chlorine", "Oil"],
    answer: "Chlorine",
    explanation: "Adding chlorine to water kills germs."
  },
  {
    question: "What is the main source of water on Earth?",
    options: ["Sun", "Rain", "Wind", "Plants"],
    answer: "Rain",
    explanation: "Rain is the main natural source of water."
  },
  {
    question: "Which of the following is a source of water?",
    options: ["River", "Lake", "Pond", "All of these"],
    answer: "All of these",
    explanation: "Rivers, lakes, and ponds are all sources of water."
  },
  {
    question: "What is water found in the atmosphere called?",
    options: ["Steam", "Mist", "Water vapour", "Ice"],
    answer: "Water vapour",
    explanation: "Water found in the atmosphere is called water vapour."
  },

  // Traditional Water Storage Systems
  {
    question: "What is a Jhalara?",
    options: [
      "A traditional stepwell",
      "A type of river",
      "A water purifier",
      "A dam"
    ],
    answer: "A traditional stepwell",
    explanation: "Jhalaras are traditional stepwells used for storing water."
  },
  {
    question: "Which traditional water storage system stores rainwater underground?",
    options: ["Johad", "Taanka", "Ahar", "Pyne"],
    answer: "Taanka",
    explanation: "Taankas are underground tanks used to store rainwater."
  },
  {
    question: "Johads are mainly used for:",
    options: [
      "Storing rainwater",
      "Generating electricity",
      "Cleaning water",
      "Fishing"
    ],
    answer: "Storing rainwater",
    explanation: "Johads are small earthen dams used to collect rainwater."
  },
  {
    question: "Ahar-Pyne system is a traditional water management system of which country?",
    options: ["India", "China", "Japan", "Nepal"],
    answer: "India",
    explanation: "Ahar-Pyne is a traditional irrigation system used in India."
  },
  {
    question: "What is the purpose of traditional water storage systems?",
    options: [
      "Waste disposal",
      "Water conservation",
      "Transport",
      "Mining"
    ],
    answer: "Water conservation",
    explanation: "Traditional systems help conserve and store water."
  },

  // Traditional Water Purification
  {
    question: "Which traditional method uses cloth to clean water?",
    options: ["Boiling", "Cloth filtration", "Chlorination", "Sedimentation"],
    answer: "Cloth filtration",
    explanation: "Cloth filtration removes large impurities from water."
  },
  {
    question: "Which traditional purification method kills germs using heat?",
    options: ["Boiling", "Filtering", "Decantation", "Sedimentation"],
    answer: "Boiling",
    explanation: "Boiling kills harmful germs present in water."
  },
  {
    question: "What is alum traditionally used for in water purification?",
    options: [
      "Adding taste",
      "Settling impurities",
      "Coloring water",
      "Cooling water"
    ],
    answer: "Settling impurities",
    explanation: "Alum helps dirt particles settle at the bottom."
  },
  {
    question: "Why is clean water important?",
    options: [
      "For good health",
      "For growing plants",
      "For cooking",
      "All of these"
    ],
    answer: "All of these",
    explanation: "Clean water is essential for health, cooking, and plants."
  }
];
const quizData10 = [
  {
    question: "What is the family of the Sun, planets, and their satellites called?",
    options: ["Galaxy", "Solar System", "Universe", "Constellation"],
    answer: "Solar System",
    explanation: "The family of the Sun, planets, and their satellites together is called the solar system."
  },
  {
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Earth", "Mercury", "Mars"],
    answer: "Mercury",
    explanation: "Mercury is the closest planet to the Sun."
  },
  {
    question: "Which planet is called the evening star?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Venus",
    explanation: "Venus shines brightly in the night sky and is called the evening star."
  },
  {
    question: "Which planet supports life?",
    options: ["Mars", "Earth", "Saturn", "Neptune"],
    answer: "Earth",
    explanation: "Earth has air, water, and suitable conditions to support life."
  },
  {
    question: "Why is Mars called the red planet?",
    options: ["It is very hot", "It has red soil", "It appears red", "It has red clouds"],
    answer: "It appears red",
    explanation: "Mars is called the red planet because it appears red in color."
  },
  {
    question: "Which is the largest planet in the solar system?",
    options: ["Saturn", "Earth", "Jupiter", "Uranus"],
    answer: "Jupiter",
    explanation: "Jupiter is the largest and fastest spinning planet in the solar system."
  },
  {
    question: "Which planet has beautiful rings around it?",
    options: ["Mars", "Saturn", "Mercury", "Venus"],
    answer: "Saturn",
    explanation: "Saturn is famous for its large rings made of rocks, ice, and dust."
  },
  {
    question: "How many moons does Uranus have?",
    options: ["13", "27", "66", "8"],
    answer: "27",
    explanation: "Uranus has 27 natural satellites or moons."
  },
  {
    question: "Which planet is the farthest from the Sun?",
    options: ["Jupiter", "Neptune", "Saturn", "Mars"],
    answer: "Neptune",
    explanation: "Neptune is the farthest planet in the solar system."
  },
  {
    question: "What is Pluto classified as?",
    options: ["Star", "Planet", "Asteroid", "Dwarf planet"],
    answer: "Dwarf planet",
    explanation: "In 2006, Pluto was classified as a dwarf planet."
  },
  {
    question: "What is a natural satellite?",
    options: ["A man-made object in space", "A star", "A celestial body that revolves around a planet", "A comet"],
    answer: "A celestial body that revolves around a planet",
    explanation: "Natural satellites are celestial bodies that orbit planets."
  },
  {
    question: "Which is Earth's natural satellite?",
    options: ["Mars", "Moon", "Sun", "Venus"],
    answer: "Moon",
    explanation: "The Moon is the natural satellite of Earth."
  },
  {
    question: "What is an artificial satellite?",
    options: ["A natural moon", "A planet", "A human-made object launched into orbit", "A shooting star"],
    answer: "A human-made object launched into orbit",
    explanation: "Artificial satellites are made by humans and launched into Earth's orbit."
  },
  {
    question: "Which was the first artificial satellite launched by Russia?",
    options: ["Aryabhata", "Sputnik 1", "Apollo", "INSAT"],
    answer: "Sputnik 1",
    explanation: "Sputnik 1 was launched by Russia in 1957."
  },
  {
    question: "What is a constellation?",
    options: ["A group of planets", "A group of stars forming a pattern", "A type of galaxy", "A moving comet"],
    answer: "A group of stars forming a pattern",
    explanation: "A constellation is a group of stars that form a shape or pattern in the sky."
  }
];
const quizData11 = [
  {
    question: "What is the process of planting trees in large numbers called?",
    options: ["Afforestation", "Deforestation", "Harvesting", "Cultivation"],
    answer: "Afforestation",
    explanation:
      "Afforestation means planting trees in large numbers to create forests."
  },
  {
    question: "During which season do forest fires mostly occur?",
    options: ["Winter", "Summer", "Rainy", "Spring"],
    answer: "Summer",
    explanation:
      "Forest fires usually happen during the hot and dry summer months."
  },
  {
    question: "When is World Environment Day celebrated?",
    options: ["5 June", "15 August", "1 January", "26 January"],
    answer: "5 June",
    explanation:
      "World Environment Day is celebrated every year on 5 June."
  },
  {
    question: "Which festival in India promotes tree planting?",
    options: ["Vana Mahotsava", "Earth Day", "Diwali", "Holi"],
    answer: "Vana Mahotsava",
    explanation:
      "Vana Mahotsava is a tree-planting festival celebrated in July."
  },
  {
    question: "Trees make our surroundings clean and ____.",
    options: ["Green", "Dusty", "Dry", "Dark"],
    answer: "Green",
    explanation:
      "Trees help keep the environment green and healthy."
  },
  {
    question: "Which of these is NOT obtained from trees?",
    options: ["Timber", "Medicines", "Plastic", "Firewood"],
    answer: "Plastic",
    explanation:
      "Plastic is made from chemicals and not directly obtained from trees."
  },
  {
    question: "Roots of trees help prevent ____.",
    options: ["Flooding", "Soil erosion", "Earthquakes", "Pollution"],
    answer: "Soil erosion",
    explanation:
      "Tree roots hold the soil tightly and prevent it from being washed away."
  },
  {
    question: "Which of these is an effect of deforestation?",
    options: [
      "More rainfall",
      "Cleaner air",
      "Loss of animal homes",
      "Increase in forests"
    ],
    answer: "Loss of animal homes",
    explanation:
      "Cutting trees destroys the natural habitat of animals."
  },
  {
    question: "What is deforestation?",
    options: [
      "Growing crops",
      "Planting trees",
      "Cutting down trees in large numbers",
      "Cleaning forests"
    ],
    answer: "Cutting down trees in large numbers",
    explanation:
      "Deforestation means removing forests by cutting down many trees."
  },
  {
    question: "Trees help in the formation of ____.",
    options: ["Rain", "Snow", "Dust", "Smoke"],
    answer: "Rain",
    explanation:
      "Trees release water vapour which helps in rainfall formation."
  },
  {
    question: "Why should we avoid wasting paper?",
    options: [
      "It increases pollution",
      "Paper is expensive",
      "Paper comes from trees",
      "It smells bad"
    ],
    answer: "Paper comes from trees",
    explanation:
      "Saving paper helps save trees and forests."
  },
  {
    question: "What happens to tribal people when forests are cut down?",
    options: [
      "They get more jobs",
      "They lose food and livelihood",
      "They get more forests",
      "Nothing changes"
    ],
    answer: "They lose food and livelihood",
    explanation:
      "Tribal people depend on forests for food, shelter, and livelihood."
  },
  {
    question: "Which movement involved people hugging trees to save them?",
    options: [
      "Chipko Movement",
      "Green Revolution",
      "Quit India Movement",
      "Forest Festival"
    ],
    answer: "Chipko Movement",
    explanation:
      "In the Chipko Movement, people hugged trees to stop them from being cut."
  },
  {
    question: "Why are sacred groves protected?",
    options: [
      "They are playgrounds",
      "They are used for farming",
      "They have religious importance",
      "They contain factories"
    ],
    answer: "They have religious importance",
    explanation:
      "Sacred groves are protected because people consider them culturally and religiously important."
  },
  {
    question: "Which activity helps conserve forests?",
    options: [
      "Cutting trees",
      "Burning forests",
      "Planting more trees",
      "Throwing waste"
    ],
    answer: "Planting more trees",
    explanation:
      "Planting trees helps increase forest cover and protect nature."
  },
  {
    question: "What do cover crops help prevent?",
    options: ["Floods", "Soil erosion", "Earthquakes", "Volcanoes"],
    answer: "Soil erosion",
    explanation:
      "Cover crops protect soil from being washed or blown away."
  },
  {
    question: "Which of these animals may lose its home due to deforestation?",
    options: ["Tiger", "Fish", "Whale", "Octopus"],
    answer: "Tiger",
    explanation:
      "Forest animals like tigers lose their habitat when trees are cut down."
  },
  {
    question: "What is one benefit of trees?",
    options: [
      "They increase pollution",
      "They produce oxygen",
      "They dry rivers",
      "They destroy soil"
    ],
    answer: "They produce oxygen",
    explanation:
      "Trees produce oxygen which is essential for living beings."
  },
  {
    question: "Which of these products can be made from bamboo?",
    options: [
      "Plastic toys",
      "Steel rods",
      "Bamboo baskets",
      "Glass bottles"
    ],
    answer: "Bamboo baskets",
    explanation:
      "Bamboo is commonly used to make baskets and handicrafts."
  },
  {
    question: "What should we do to protect forests?",
    options: [
      "Cut more trees",
      "Use more paper",
      "Plant and protect trees",
      "Burn dry leaves"
    ],
    answer: "Plant and protect trees",
    explanation:
      "Protecting forests and planting trees helps conserve the environment."
  }
];
const quizData12 = [
  {
    question: "What is the uppermost layer of the Earth called?",
    options: ["Rock", "Soil", "Sand", "Water"],
    answer: "Soil",
    explanation:
      "Soil is the uppermost layer of the Earth's surface."
  },
  {
    question: "What is soil made of?",
    options: [
      "Only rocks",
      "Only water",
      "Minerals, organic matter, water, and air",
      "Only dead plants"
    ],
    answer: "Minerals, organic matter, water, and air",
    explanation:
      "Soil contains minerals, remains of plants and animals, water, and air."
  },
  {
    question: "Which of these is a living component of soil?",
    options: ["Quartz", "Clay", "Earthworm", "Rock"],
    answer: "Earthworm",
    explanation:
      "Earthworms are living organisms found in soil."
  },
  {
    question: "Which of these is a non-living component of soil?",
    options: ["Bacteria", "Fungi", "Quartz", "Insects"],
    answer: "Quartz",
    explanation:
      "Quartz is a mineral and a non-living part of soil."
  },
  {
    question: "Why is soil called porous?",
    options: [
      "It is colourful",
      "It has tiny pores or spaces",
      "It is always wet",
      "It is very hard"
    ],
    answer: "It has tiny pores or spaces",
    explanation:
      "Soil contains tiny pores that allow air and water to move through it."
  },
  {
    question: "What moves through the tiny pores in soil?",
    options: [
      "Only sunlight",
      "Only insects",
      "Water and air",
      "Only rocks"
    ],
    answer: "Water and air",
    explanation:
      "The pores in soil allow water and air to pass through."
  },
  {
    question: "Why do plants need soil?",
    options: [
      "To make noise",
      "To get nutrients and water",
      "To change colour",
      "To produce heat"
    ],
    answer: "To get nutrients and water",
    explanation:
      "Plants absorb water and minerals from the soil through their roots."
  },
  {
    question: "What part of the plant absorbs water from the soil?",
    options: ["Leaves", "Flowers", "Roots", "Stem"],
    answer: "Roots",
    explanation:
      "Roots absorb water and nutrients from the soil."
  },
  {
    question: "How does soil help small organisms?",
    options: [
      "It gives them wings",
      "It provides shelter and food",
      "It changes their colour",
      "It makes them fly"
    ],
    answer: "It provides shelter and food",
    explanation:
      "Soil acts as a habitat for insects, worms, and microorganisms."
  },
  {
    question: "Why is soil important for farmers?",
    options: [
      "It helps make machines",
      "It supports crop growth",
      "It creates electricity",
      "It stores sunlight"
    ],
    answer: "It supports crop growth",
    explanation:
      "Fertile soil provides nutrients needed for growing crops."
  },
  {
    question: "What is the first step in soil formation?",
    options: [
      "Plant growth",
      "Rock breakdown",
      "Rainfall",
      "Flooding"
    ],
    answer: "Rock breakdown",
    explanation:
      "Soil forms when rocks break into smaller particles."
  },
  {
    question: "What is the breakdown of rocks called?",
    options: ["Condensation", "Weathering", "Melting", "Evaporation"],
    answer: "Weathering",
    explanation:
      "Weathering is the process of breaking rocks into smaller pieces."
  },
  {
    question: "Which natural factor helps in weathering?",
    options: [
      "Television",
      "Wind",
      "Plastic",
      "Paint"
    ],
    answer: "Wind",
    explanation:
      "Wind helps break down rocks during weathering."
  },
  {
    question: "What happens to rocks when rainwater freezes in cracks?",
    options: [
      "They melt",
      "The cracks widen",
      "They become softer",
      "They disappear"
    ],
    answer: "The cracks widen",
    explanation:
      "Freezing water expands and widens rock cracks."
  },
  {
    question: "What mixes with rock particles to form fertile soil?",
    options: [
      "Plastic waste",
      "Metal pieces",
      "Organic matter",
      "Glass"
    ],
    answer: "Organic matter",
    explanation:
      "Decayed plants and animals mix with rock particles to form soil."
  },
  {
    question: "What are the different layers of soil called?",
    options: ["Levels", "Horizons", "Zones", "Sections"],
    answer: "Horizons",
    explanation:
      "The layers of soil are known as horizons."
  },
  {
    question: "Which soil layer is also called the humus layer?",
    options: [
      "Horizon A",
      "Horizon B",
      "Horizon O",
      "Horizon D"
    ],
    answer: "Horizon O",
    explanation:
      "Horizon O is the humus layer."
  },
  {
    question: "What is humus made of?",
    options: [
      "Metal and sand",
      "Dead plants and animals",
      "Plastic and rocks",
      "Only water"
    ],
    answer: "Dead plants and animals",
    explanation:
      "Humus is formed from decomposed plants and animals."
  },
  {
    question: "Why is the humus layer important?",
    options: [
      "It makes rocks harder",
      "It provides nutrients to plants",
      "It blocks sunlight",
      "It dries the soil"
    ],
    answer: "It provides nutrients to plants",
    explanation:
      "Humus makes the soil fertile and helps plants grow."
  },
  {
    question: "In which soil layer do plants mostly grow their roots?",
    options: [
      "Horizon D",
      "Horizon C",
      "Horizon A",
      "Bedrock"
    ],
    answer: "Horizon A",
    explanation:
      "Topsoil or Horizon A supports plant root growth."
  },
  {
    question: "What is another name for Horizon A?",
    options: ["Subsoil", "Bedrock", "Topsoil", "Regolith"],
    answer: "Topsoil",
    explanation:
      "Horizon A is known as topsoil."
  },
  {
    question: "Why is topsoil good for plants?",
    options: [
      "It is very hard",
      "It contains air and water",
      "It is made of metal",
      "It blocks roots"
    ],
    answer: "It contains air and water",
    explanation:
      "Topsoil is soft and porous, holding air and water for plants."
  },
  {
    question: "Which layer contains rocks, gravel, and stones?",
    options: [
      "Horizon O",
      "Horizon A",
      "Horizon B",
      "Horizon D"
    ],
    answer: "Horizon B",
    explanation:
      "The subsoil layer contains larger rock particles."
  },
  {
    question: "What is another name for Horizon B?",
    options: ["Topsoil", "Humus", "Subsoil", "Bedrock"],
    answer: "Subsoil",
    explanation:
      "Horizon B is called subsoil."
  },
  {
    question: "What is Horizon C also called?",
    options: ["Topsoil", "Humus", "Regolith", "Clay"],
    answer: "Regolith",
    explanation:
      "Horizon C is known as regolith."
  },
  {
    question: "Which soil layer is made of solid rock?",
    options: [
      "Horizon A",
      "Horizon B",
      "Horizon C",
      "Horizon D"
    ],
    answer: "Horizon D",
    explanation:
      "Horizon D is the bedrock layer made of solid rock."
  },
  {
    question: "What is soil erosion?",
    options: [
      "Formation of rocks",
      "Removal of fertile topsoil",
      "Plant growth",
      "Water storage"
    ],
    answer: "Removal of fertile topsoil",
    explanation:
      "Soil erosion removes the fertile upper layer of soil."
  },
  {
    question: "Which natural elements can cause soil erosion?",
    options: [
      "Wind and water",
      "Books and paper",
      "Glass and metal",
      "Plastic and rubber"
    ],
    answer: "Wind and water",
    explanation:
      "Wind and water can wash or blow away soil."
  },
  {
    question: "Why is soil erosion harmful?",
    options: [
      "It improves soil fertility",
      "It makes land less suitable for plants",
      "It creates more rocks",
      "It increases rainfall"
    ],
    answer: "It makes land less suitable for plants",
    explanation:
      "Erosion removes fertile soil needed for plant growth."
  },
  {
    question: "What is soil conservation?",
    options: [
      "Destroying forests",
      "Taking care of soil",
      "Removing plants",
      "Building roads"
    ],
    answer: "Taking care of soil",
    explanation:
      "Soil conservation protects soil from erosion and damage."
  },
  {
    question: "Why are trees important for soil conservation?",
    options: [
      "They change soil colour",
      "Their roots hold the soil together",
      "They remove all water",
      "They stop sunlight"
    ],
    answer: "Their roots hold the soil together",
    explanation:
      "Tree roots help prevent soil from being washed away."
  },
  {
    question: "What can happen if too many animals graze in one area?",
    options: [
      "The soil becomes stronger",
      "The soil becomes bare and erodes easily",
      "More trees grow",
      "The soil turns into rock"
    ],
    answer: "The soil becomes bare and erodes easily",
    explanation:
      "Overgrazing removes grass and exposes the soil."
  },
  {
    question: "What are cover crops?",
    options: [
      "Decorative flowers",
      "Crops planted to protect soil",
      "Plants grown underwater",
      "Trees cut for wood"
    ],
    answer: "Crops planted to protect soil",
    explanation:
      "Cover crops protect soil from wind and rain erosion."
  },
  {
    question: "How do cover crops help the soil?",
    options: [
      "They remove nutrients",
      "They protect soil and add nutrients",
      "They harden the soil",
      "They stop rain completely"
    ],
    answer: "They protect soil and add nutrients",
    explanation:
      "Cover crops reduce erosion and improve soil fertility."
  },
  {
    question: "Why are embankments built along rivers?",
    options: [
      "To increase erosion",
      "To control water flow and protect soil",
      "To stop plant growth",
      "To create deserts"
    ],
    answer: "To control water flow and protect soil",
    explanation:
      "Embankments help prevent flooding and soil erosion near rivers."
  }
];
const quizData13 = [
  {
    question: "What is everything in the world made of?",
    options: ["Energy", "Matter", "Light", "Sound"],
    answer: "Matter",
    explanation:
      "Everything around us is made of matter."
  },
  {
    question: "How many main states of matter are there?",
    options: ["Two", "Three", "Four", "Five"],
    answer: "Three",
    explanation:
      "The three main states of matter are solids, liquids, and gases."
  },
  {
    question: "Which of these is a state of matter?",
    options: ["Heat", "Light", "Solid", "Shadow"],
    answer: "Solid",
    explanation:
      "Solid is one of the three states of matter."
  },
  {
    question: "What are the three states of matter?",
    options: [
      "Hot, cold, warm",
      "Solid, liquid, gas",
      "Heavy, light, medium",
      "Hard, soft, smooth"
    ],
    answer: "Solid, liquid, gas",
    explanation:
      "Matter exists mainly as solids, liquids, and gases."
  },
  {
    question: "What are the two important properties of matter?",
    options: [
      "Colour and taste",
      "Mass and space",
      "Smell and shape",
      "Heat and sound"
    ],
    answer: "Mass and space",
    explanation:
      "All matter has mass and occupies space."
  },
  {
    question: "Which state of matter has a fixed shape and fixed size?",
    options: ["Liquid", "Gas", "Solid", "Vapour"],
    answer: "Solid",
    explanation:
      "Solids have a fixed shape and size."
  },
  {
    question: "How are molecules arranged in solids?",
    options: [
      "Very far apart",
      "Loosely packed",
      "Tightly packed",
      "Floating freely"
    ],
    answer: "Tightly packed",
    explanation:
      "The molecules in solids are packed closely together."
  },
  {
    question: "Can solids flow like liquids?",
    options: ["Yes", "No", "Only when heated", "Only in water"],
    answer: "No",
    explanation:
      "Solids do not flow because their particles are tightly packed."
  },
  {
    question: "Which of these is an example of a solid?",
    options: ["Milk", "Oxygen", "Book", "Juice"],
    answer: "Book",
    explanation:
      "A book is a solid because it has a fixed shape and size."
  },
  {
    question: "Which state of matter takes the shape of its container?",
    options: ["Solid", "Liquid", "Metal", "Rock"],
    answer: "Liquid",
    explanation:
      "Liquids do not have a fixed shape and take the shape of the container."
  },
  {
    question: "Do liquids have a definite volume?",
    options: ["Yes", "No", "Only water does", "Only hot liquids do"],
    answer: "Yes",
    explanation:
      "Liquids have a fixed volume even though their shape changes."
  },
  {
    question: "Why can liquids flow?",
    options: [
      "Their particles are tightly packed",
      "Their particles can move around",
      "They are always hot",
      "They have no particles"
    ],
    answer: "Their particles can move around",
    explanation:
      "The loosely packed particles in liquids can move freely."
  },
  {
    question: "Which of these is an example of a liquid?",
    options: ["Chair", "Rock", "Milk", "Oxygen"],
    answer: "Milk",
    explanation:
      "Milk is a liquid."
  },
  {
    question: "Which state of matter has no fixed shape or volume?",
    options: ["Solid", "Liquid", "Gas", "Ice"],
    answer: "Gas",
    explanation:
      "Gases spread out and fill all available space."
  },
  {
    question: "Can gases be compressed easily?",
    options: ["Yes", "No", "Only oxygen", "Only when frozen"],
    answer: "Yes",
    explanation:
      "Gases can be compressed because their particles are far apart."
  },
  {
    question: "How are molecules arranged in gases?",
    options: [
      "Tightly packed",
      "Closely packed",
      "Far apart",
      "Joined together"
    ],
    answer: "Far apart",
    explanation:
      "Gas particles are spread far apart from each other."
  },
  {
    question: "Which of these is a gas?",
    options: ["Water", "Stone", "Oxygen", "Wood"],
    answer: "Oxygen",
    explanation:
      "Oxygen is a gas present in the air."
  },
  {
    question: "Which gas is invisible to our eyes?",
    options: ["Oxygen", "Milk", "Ice", "Butter"],
    answer: "Oxygen",
    explanation:
      "Most gases like oxygen cannot be seen."
  },
  {
    question: "What is a change of state?",
    options: [
      "Changing colour",
      "Changing one state of matter into another",
      "Breaking an object",
      "Mixing two solids"
    ],
    answer: "Changing one state of matter into another",
    explanation:
      "Heating or cooling can change matter from one state to another."
  },
  {
    question: "What happens when ice melts?",
    options: [
      "It becomes gas",
      "It becomes liquid water",
      "It disappears",
      "It becomes solid metal"
    ],
    answer: "It becomes liquid water",
    explanation:
      "Melting changes a solid into a liquid."
  },
  {
    question: "What happens when water freezes?",
    options: [
      "It turns into gas",
      "It becomes ice",
      "It evaporates",
      "It burns"
    ],
    answer: "It becomes ice",
    explanation:
      "Freezing changes liquid water into solid ice."
  },
  {
    question: "What is the gas form of water called?",
    options: ["Ice", "Steam", "Water vapour", "Mist"],
    answer: "Water vapour",
    explanation:
      "Water vapour is water in gaseous form."
  },
  {
    question: "What happens to particles when matter is heated?",
    options: [
      "They stop moving",
      "They move faster",
      "They disappear",
      "They become smaller"
    ],
    answer: "They move faster",
    explanation:
      "Heating increases the movement of particles."
  },
  {
    question: "What happens to particles when matter is cooled?",
    options: [
      "They move faster",
      "They glow",
      "They slow down",
      "They melt"
    ],
    answer: "They slow down",
    explanation:
      "Cooling reduces the movement of particles."
  },
  {
    question: "What is evaporation?",
    options: [
      "Gas turning into liquid",
      "Solid turning into liquid",
      "Water changing into water vapour",
      "Liquid turning into solid"
    ],
    answer: "Water changing into water vapour",
    explanation:
      "Evaporation changes liquid water into invisible water vapour."
  },
  {
    question: "Why do wet clothes dry in the sun?",
    options: [
      "Because they freeze",
      "Because water evaporates",
      "Because water becomes solid",
      "Because the cloth melts"
    ],
    answer: "Because water evaporates",
    explanation:
      "Heat from the sun causes water in clothes to evaporate."
  },
  {
    question: "What is condensation?",
    options: [
      "Liquid turning into gas",
      "Gas turning into liquid",
      "Solid turning into gas",
      "Solid turning into liquid"
    ],
    answer: "Gas turning into liquid",
    explanation:
      "Condensation happens when a gas cools and becomes a liquid."
  },
  {
    question: "What causes water droplets to form on a cold glass?",
    options: ["Melting", "Freezing", "Condensation", "Burning"],
    answer: "Condensation",
    explanation:
      "Water vapour in the air cools and condenses into droplets."
  },
  {
    question: "What is freezing?",
    options: [
      "Liquid changing into solid",
      "Solid changing into liquid",
      "Gas changing into liquid",
      "Gas changing into solid"
    ],
    answer: "Liquid changing into solid",
    explanation:
      "Freezing changes a liquid into a solid."
  },
  {
    question: "What is melting?",
    options: [
      "Solid changing into liquid",
      "Liquid changing into gas",
      "Gas changing into liquid",
      "Solid changing into gas"
    ],
    answer: "Solid changing into liquid",
    explanation:
      "Melting happens when a solid becomes a liquid."
  },
  {
    question: "Which of these substances can melt when heated?",
    options: ["Chocolate", "Stone wall", "Air", "Smoke"],
    answer: "Chocolate",
    explanation:
      "Chocolate melts when heated."
  },
  {
    question: "What is a physical change?",
    options: [
      "A change that forms a new substance",
      "A change in appearance without changing identity",
      "A change that cannot be reversed",
      "A burning reaction"
    ],
    answer: "A change in appearance without changing identity",
    explanation:
      "Physical changes only affect shape or state, not the substance itself."
  },
  {
    question: "Which of these is a physical change?",
    options: [
      "Burning paper",
      "Cooking vegetables",
      "Freezing water",
      "Baking a cake"
    ],
    answer: "Freezing water",
    explanation:
      "Water changes state but remains water during freezing."
  },
  {
    question: "Are physical changes usually reversible?",
    options: ["Yes", "No", "Only in gases", "Only in solids"],
    answer: "Yes",
    explanation:
      "Most physical changes can be reversed."
  },
  {
    question: "What is a chemical change?",
    options: [
      "A change in size only",
      "A change that forms a new substance",
      "A change in colour only",
      "A change in shape only"
    ],
    answer: "A change that forms a new substance",
    explanation:
      "Chemical changes create new substances with different properties."
  },
  {
    question: "Which of these is a chemical change?",
    options: [
      "Melting ice",
      "Cutting paper",
      "Burning paper",
      "Freezing water"
    ],
    answer: "Burning paper",
    explanation:
      "Burning paper forms new substances like ash and smoke."
  },
  {
    question: "Which of these is another example of a chemical change?",
    options: [
      "Ripening banana",
      "Melting butter",
      "Breaking glass",
      "Freezing juice"
    ],
    answer: "Ripening banana",
    explanation:
      "Ripening changes the banana into a new chemical state."
  },
  {
    question: "Can chemical changes be easily reversed?",
    options: ["Yes", "No", "Only with water", "Only by cooling"],
    answer: "No",
    explanation:
      "Chemical changes usually cannot be reversed easily."
  }
];
// SHUFFLE ARRAY
const shuffleArray = (arr) => {
  const array = [...arr];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [array[i], array[j]] = [
      array[j],
      array[i]
    ];
  }

  return array;
};

// GENERATE QUESTIONS
const genQ = async (req, res, data) => {
  try {
    const selected = shuffleArray(data).slice(0, 10);

    const questions = [];

    for (let index = 0; index < selected.length; index++) {
      const q = selected[index];

      const id = uuidv4();

      // SAVE CORRECT ANSWER
     await Quiz.create({
  id,
  answerString: q.answer,
  data: {
    explanation: q.explanation
  },
  createdAt: new Date()
});

      questions.push({
        id,
        step: index + 1,
        question: q.question,
        options: shuffleArray(q.options)
      });
    }

    res.json({
      totalSteps: questions.length,
      questions
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate quiz"
    });
  }
};

// GENERATE QUIZ
export const generategreenplantsquiz = async (req, res) => {
  await genQ(req, res, quizData);
};
export const generategreenplantsquiz2 = async (req, res) => {
  await genQ(req, res, quizData2);
};
export const generategreenplantsquiz3 = async (req, res) => {
  await genQ(req, res, quizData3);
};
export const generategreenplantsquiz4 = async (req, res) => {
  await genQ(req, res, quizData4);
};
export const generategreenplantsquiz5 = async (req, res) => {
  await genQ(req, res, quizData5);
};
export const generategreenplantsquiz6 = async (req, res) => {
  await genQ(req, res, quizData6);
};
export const generategreenplantsquiz7 = async (req, res) => {
  await genQ(req, res, quizData7);
};
export const generategreenplantsquiz8 = async (req, res) => {
  await genQ(req, res, quizData8);
};
export const generategreenplantsquiz9 = async (req, res) => {
  await genQ(req, res, quizData9);
};
export const generategreenplantsquiz10 = async (req, res) => {
  await genQ(req, res, quizData10);
};
export const generategreenplantsquiz11 = async (req, res) => {
  await genQ(req, res, quizData11);
};
export const generategreenplantsquiz12 = async (req, res) => {
  await genQ(req, res, quizData12);
};
export const generategreenplantsquiz13 = async (req, res) => {
  await genQ(req, res, quizData13);
};

// CHECK ANSWERS
export async function checkAnswergp(req, res) {
  try {
    const { userId, answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        error: "Invalid answers format."
      });
    }

    let score = 0;

    const correctAnswers = {};

    for (const q of answers) {
      const original = await Quiz.findOne({
        id: q.id
      });

      if (!original) continue;

      // SUPPORT OLD + NEW DATA
      const correctAnswer =
        original.answerString || original.answer;

      correctAnswers[q.id] = correctAnswer;

      // CHECK ANSWER
      if (
        String(q.answer).trim().toLowerCase() ===
        String(correctAnswer)
          .trim()
          .toLowerCase()
      ) {
        score++;
      }

      // DELETE USED QUIZ
      await Quiz.deleteOne({
        id: q.id
      });
    }

    // SAVE USER PROGRESS
    if (userId) {
      try {
        await UserProgress.create({
          user: userId,
          score,
          date: new Date()
        });
      } catch (err) {
        console.error(
          "Error saving progress:",
          err
        );
      }
    }

    res.json({
      score,
      total: answers.length,
      correctAnswers
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to check answers"
    });
  }
}