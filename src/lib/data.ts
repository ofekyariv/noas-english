// All exercise data for Noa's English study website
// Extracted from worksheets and study plan document

export interface Module {
  id: string;
  title: string;
  titleHe: string;
  emoji: string;
  description: string;
  descriptionHe: string;
  color: string; // tailwind gradient
}

export const modules: Module[] = [
  {
    id: "letters",
    title: "Letter Explorer",
    titleHe: "חקר אותיות",
    emoji: "🔤",
    description: "Learn letters and their sounds",
    descriptionHe: "למדי אותיות והצלילים שלהן",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "cvc",
    title: "Word Builder",
    titleHe: "בונה מילים",
    emoji: "🧱",
    description: "Build 3-letter words",
    descriptionHe: "בני מילים של 3 אותיות",
    color: "from-orange-400 to-amber-500",
  },
  {
    id: "magic-e",
    title: "Magic E",
    titleHe: "ה-E הקסומה",
    emoji: "✨",
    description: "See how silent E changes words",
    descriptionHe: "ראי איך E שקטה משנה מילים",
    color: "from-purple-400 to-violet-500",
  },
  {
    id: "digraphs",
    title: "Sound Pairs",
    titleHe: "צמדי צלילים",
    emoji: "🎵",
    description: "Two letters, one sound",
    descriptionHe: "שתי אותיות, צליל אחד",
    color: "from-teal-400 to-cyan-500",
  },
  {
    id: "colors",
    title: "Colors",
    titleHe: "צבעים",
    emoji: "🎨",
    description: "Learn all the colors",
    descriptionHe: "למדי את כל הצבעים",
    color: "from-red-400 to-yellow-500",
  },
  {
    id: "numbers",
    title: "Numbers",
    titleHe: "מספרים",
    emoji: "🔢",
    description: "Count from 1 to 20",
    descriptionHe: "ספרי מ-1 עד 20",
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: "pronouns",
    title: "Pronouns",
    titleHe: "כינויי גוף",
    emoji: "👋",
    description: "He, She, It, They...",
    descriptionHe: "הוא, היא, זה, הם...",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: "am-is-are",
    title: "Am / Is / Are",
    titleHe: "הפועל BE",
    emoji: "📝",
    description: "I am, She is, They are",
    descriptionHe: "I am, She is, They are",
    color: "from-sky-400 to-blue-500",
  },
  {
    id: "prepositions",
    title: "In / On / Under",
    titleHe: "מילות יחס",
    emoji: "📦",
    description: "Where are things?",
    descriptionHe: "איפה הדברים?",
    color: "from-lime-400 to-green-500",
  },
  {
    id: "reading",
    title: "Reading Corner",
    titleHe: "פינת קריאה",
    emoji: "📖",
    description: "Read stories and answer questions",
    descriptionHe: "קראי סיפורים וענִי על שאלות",
    color: "from-fuchsia-400 to-pink-500",
  },
];

// Module 1: Letters
export const letterExercises = {
  letters: ["T", "E", "Y", "B", "V", "U", "D", "S", "K", "F", "H", "C", "J"],
  matchToWord: [
    { image: "🐶", word: "dog", correctLetter: "d", options: ["b", "d", "p"] },
    { image: "🐰", word: "rabbit", correctLetter: "r", options: ["r", "s", "g"] },
    { image: "🌸", word: "flower", correctLetter: "f", options: ["f", "u", "p"] },
    { image: "🎂", word: "cake", correctLetter: "c", options: ["a", "c", "n"] },
    { image: "🕷️", word: "spider", correctLetter: "s", options: ["s", "m", "l"] },
    { image: "🍔", word: "hamburger", correctLetter: "h", options: ["h", "o", "u"] },
    { image: "🍎", word: "apple", correctLetter: "a", options: ["g", "a", "e"] },
    { image: "🍋", word: "lemon", correctLetter: "l", options: ["l", "d", "a"] },
    { image: "🌙", word: "moon", correctLetter: "m", options: ["r", "n", "m"] },
    { image: "👦", word: "boy", correctLetter: "b", options: ["q", "b", "s"] },
    { image: "🎸", word: "guitar", correctLetter: "g", options: ["g", "s", "j"] },
    { image: "🥚", word: "egg", correctLetter: "e", options: ["e", "f", "c"] },
    { image: "🌴", word: "tree", correctLetter: "t", options: ["t", "d", "k"] },
    { image: "🚗", word: "car", correctLetter: "c", options: ["a", "c", "g"] },
  ],
};

// Module 2: CVC Words
export const cvcWords = {
  a: ["mat", "sat", "cat", "bat"],
  e: ["pen", "hen", "ten", "men", "red", "bed"],
  i: ["pig", "wig", "fin", "fit", "hit"],
  o: ["box", "fox", "mop", "top", "pop"],
  u: ["bug", "hug", "rug", "bus", "sun"],
};

// Module 3: Magic E
export const magicEPairs = [
  { without: "cap", with: "cape" },
  { without: "kit", with: "kite" },
  { without: "tap", with: "tape" },
  { without: "pin", with: "pine" },
  { without: "hop", with: "hope" },
  { without: "cub", with: "cube" },
  { without: "can", with: "cane" },
  { without: "bit", with: "bite" },
];

// Module 4: Digraphs
export const digraphs = {
  basic: [
    { digraph: "ch", word: "chair", emoji: "🪑" },
    { digraph: "sh", word: "ship", emoji: "🚢" },
    { digraph: "th", word: "this", emoji: "👉" },
    { digraph: "ph", word: "phone", emoji: "📱" },
  ],
  ee: [
    { word: "tree", emoji: "🌳" },
    { word: "sheep", emoji: "🐑" },
    { word: "teeth", emoji: "🦷" },
    { word: "wheel", emoji: "☸️" },
    { word: "green", emoji: "💚" },
    { word: "coffee", emoji: "☕" },
    { word: "bee", emoji: "🐝" },
    { word: "jeep", emoji: "🚙" },
  ],
};

// Module 5: Colors
export const colorExercises = {
  colors: [
    { name: "red", hex: "#EF4444" },
    { name: "blue", hex: "#3B82F6" },
    { name: "green", hex: "#22C55E" },
    { name: "yellow", hex: "#EAB308" },
    { name: "black", hex: "#1F2937" },
    { name: "white", hex: "#F9FAFB" },
    { name: "brown", hex: "#92400E" },
    { name: "pink", hex: "#EC4899" },
    { name: "orange", hex: "#F97316" },
    { name: "purple", hex: "#A855F7" },
    { name: "grey", hex: "#9CA3AF" },
  ],
  popsicleQuiz: [
    { color: "#EF4444", correct: "red", options: ["red", "blue", "pink"] },
    { color: "#3B82F6", correct: "blue", options: ["brown", "black", "blue"] },
    { color: "#F97316", correct: "orange", options: ["orange", "white", "green"] },
    { color: "#EC4899", correct: "pink", options: ["yellow", "pink", "purple"] },
    { color: "#F9FAFB", correct: "white", options: ["black", "grey", "white"] },
    { color: "#EAB308", correct: "yellow", options: ["orange", "yellow", "red"] },
    { color: "#22C55E", correct: "green", options: ["green", "red", "grey"] },
    { color: "#A855F7", correct: "purple", options: ["purple", "brown", "blue"] },
  ],
  sentences: [
    { sentence: "The ball is ___.", answer: "red", emoji: "🔴" },
    { sentence: "The dog is ___.", answer: "brown", emoji: "🐕" },
    { sentence: "The sun is ___.", answer: "yellow", emoji: "☀️" },
    { sentence: "The frog is ___.", answer: "green", emoji: "🐸" },
    { sentence: "The rabbit is ___.", answer: "grey", emoji: "🐰" },
    { sentence: "The cow is ___ and ___.", answer: "black and white", emoji: "🐄" },
  ],
};

// Module 6: Numbers
export const numberWords = [
  "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
  "eighteen", "nineteen", "twenty",
];

// Module 7: Pronouns
export const pronounExercises = [
  { label: "a bike", emoji: "🚲", correct: "it", options: ["he", "she", "it", "we"] },
  { label: "Ronen", emoji: "👦", correct: "he", options: ["he", "she", "it", "we"] },
  { label: "a whale", emoji: "🐋", correct: "it", options: ["he", "it", "you", "we"] },
  { label: "Sarit", emoji: "👧", correct: "she", options: ["he", "she", "it", "we"] },
  { label: "Ron and Tom", emoji: "👦👦", correct: "they", options: ["I", "she", "they", "we"] },
  { label: "Sharon and I", emoji: "👫", correct: "we", options: ["he", "they", "you", "we"] },
  { label: "you and Tal", emoji: "🫵", correct: "you", options: ["I", "you", "they", "we"] },
  { label: "the cats", emoji: "🐱🐱", correct: "they", options: ["I", "she", "they", "we"] },
  { label: "monsters", emoji: "👹👹", correct: "they", options: ["you", "they", "we", "he"] },
  { label: "a teacher", emoji: "👩‍🏫", correct: "she", options: ["she", "he", "I", "we"] },
  { label: "Mike", emoji: "👦", correct: "he", options: ["they", "you", "we", "he"] },
  { label: "a bird", emoji: "🐦", correct: "it", options: ["she", "we", "it", "they"] },
];

export const pronounReplace = [
  { original: "The dog is big.", answer: "It is big.", pronoun: "It" },
  { original: "The girl is happy.", answer: "She is happy.", pronoun: "She" },
  { original: "The boys are big.", answer: "They are big.", pronoun: "They" },
  { original: "The cat is small.", answer: "It is small.", pronoun: "It" },
  { original: "Ronen is tall.", answer: "He is tall.", pronoun: "He" },
];

// Module 8: am/is/are
export const beVerbExercises = [
  { sentence: "Monkeys ___ brown.", correct: "are", subject: "Monkeys" },
  { sentence: "The little girl ___ sleeping.", correct: "is", subject: "The little girl" },
  { sentence: "We ___ at the park.", correct: "are", subject: "We" },
  { sentence: "My cat ___ white.", correct: "is", subject: "My cat" },
  { sentence: "I ___ in grade one.", correct: "am", subject: "I" },
  { sentence: "Molly and Jane ___ sisters.", correct: "are", subject: "Molly and Jane" },
  { sentence: "Kim ___ my classmate.", correct: "is", subject: "Kim" },
  { sentence: "It ___ my pet rabbit.", correct: "is", subject: "It" },
  { sentence: "My bike ___ blue.", correct: "is", subject: "My bike" },
  { sentence: "I ___ happy.", correct: "am", subject: "I" },
  { sentence: "She ___ a girl.", correct: "is", subject: "She" },
  { sentence: "They ___ big dogs.", correct: "are", subject: "They" },
];

// Module 9: Prepositions
export interface PrepExercise {
  sentence: string;
  correct: "in" | "on" | "under";
  subject: string;
  object: string;
  objectEmoji: string;
}

export const prepositionExercises: PrepExercise[] = [
  { sentence: "The cat is ___ the table.", correct: "on",    subject: "🐱", object: "table",  objectEmoji: "🪵" },
  { sentence: "The ball is ___ the bed.",  correct: "under", subject: "⚽", object: "bed",    objectEmoji: "🛏️" },
  { sentence: "The dog is ___ the box.",   correct: "in",    subject: "🐶", object: "box",    objectEmoji: "📦" },
  { sentence: "The book is ___ the bag.",  correct: "in",    subject: "📖", object: "bag",    objectEmoji: "🎒" },
  { sentence: "The cat is ___ the chair.", correct: "under", subject: "🐱", object: "chair",  objectEmoji: "🪑" },
  { sentence: "The dog is ___ the bed.",   correct: "on",    subject: "🐶", object: "bed",    objectEmoji: "🛏️" },
  { sentence: "The bird is ___ the tree.", correct: "in",    subject: "🐦", object: "tree",   objectEmoji: "🌳" },
  { sentence: "The toy is ___ the box.",   correct: "in",    subject: "🧸", object: "box",    objectEmoji: "📦" },
  { sentence: "The ball is ___ the chair.", correct: "on",   subject: "⚽", object: "chair",  objectEmoji: "🪑" },
  { sentence: "The cat is ___ the bed.",   correct: "on",    subject: "🐱", object: "bed",    objectEmoji: "🛏️" },
  { sentence: "The dog is ___ the table.", correct: "under", subject: "🐶", object: "table",  objectEmoji: "🪵" },
  { sentence: "The ball is ___ the bag.",  correct: "in",    subject: "⚽", object: "bag",    objectEmoji: "🎒" },
];

export const thereIsAreExercises = [
  { sentence: "There ___ a window.", correct: "is" },
  { sentence: "There ___ a clock on the wall.", correct: "is" },
  { sentence: "There ___ shoes on the mat.", correct: "are" },
  { sentence: "There ___ a dog on the floor.", correct: "is" },
  { sentence: "There ___ glasses on the table.", correct: "are" },
  { sentence: "There ___ a bed in the room.", correct: "is" },
  { sentence: "There ___ a flower on the floor.", correct: "is" },
  { sentence: "There ___ a frog on the floor.", correct: "is" },
];

// Module 10: Reading
export const readingPassages = [
  {
    title: "Bob's Box",
    text: "Bob has a box.\nThe box is red.\nBob can sit.\nThe box is big.\nBob sits in the box.",
    questions: [
      { question: 'Bob has a ___.', correct: "box", options: ["fox", "box"] },
      { question: 'Bob can ___.', correct: "sit", options: ["sit", "nap"] },
      { question: 'The box is ___.', correct: "big", options: ["big", "small"] },
    ],
  },
  {
    title: "The Dog",
    text: "The dog is big.\nThe dog is brown.\nThe dog is happy.\nA cat is in the house.\nIt is small.",
    questions: [
      { question: 'The dog is ___.', correct: "big", options: ["big", "small"] },
      { question: 'The dog is ___.', correct: "brown", options: ["brown", "black"] },
      { question: 'The cat is ___.', correct: "small", options: ["big", "small"] },
    ],
  },
];

export const readAndCircle = [
  { sentence: "I see a hat.", correct: "hat", options: ["boot", "horseshoe", "hat"], emojis: ["👢", "🧲", "🤠"] },
  { sentence: "I see a horse.", correct: "horse", options: ["wheel", "guitar", "horse"], emojis: ["☸️", "🎸", "🐴"] },
  { sentence: "I see a snake.", correct: "snake", options: ["snake", "hat", "horse"], emojis: ["🐍", "🤠", "🐴"] },
  { sentence: "I see a boot.", correct: "boot", options: ["cactus", "rope", "boot"], emojis: ["🌵", "🪢", "👢"] },
  { sentence: "I see a cactus.", correct: "cactus", options: ["badge", "cactus", "wheel"], emojis: ["⭐", "🌵", "☸️"] },
];

export const sentenceBuilder = [
  { words: ["The", "dog", "is", "big"], correct: "The dog is big." },
  { words: ["The", "cats", "are", "small"], correct: "The cats are small." },
  { words: ["The", "cat", "is", "black"], correct: "The cat is black." },
  { words: ["It", "is", "small"], correct: "It is small." },
  { words: ["The", "girl", "is", "happy"], correct: "The girl is happy." },
];

// Vocabulary master list for reference/flash cards
export const vocabulary = {
  animals: ["dog", "cat", "cow", "fish", "rabbit", "pig", "frog", "panda", "whale", "bird", "bee", "sheep", "horse", "snake"],
  house: ["house", "table", "school", "class", "teacher", "desk", "chair", "bed", "carpet", "door", "window", "clock", "picture"],
  objects: ["pencil", "pen", "ball", "ring", "sun", "day", "book", "box", "car", "bike", "boot", "hat", "vest"],
  food: ["apple", "banana", "milk", "bread", "chocolate", "coffee"],
  feelings: ["happy", "sad"],
  colors: ["red", "blue", "green", "yellow", "black", "white", "brown", "pink", "orange", "purple", "grey"],
};
