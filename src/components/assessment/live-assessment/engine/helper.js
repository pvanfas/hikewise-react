import cloneDeep from "lodash.clonedeep";

const tabs = [
  { name: "Personality", key: "personality", isDone: false, isActive: true },
  {
    name: "Aptitude",
    key: "aptitude",
    categories: [],
    isDone: false,
    isActive: false,
  },
  { name: "Interest", key: "interest", isDone: false, isActive: false },
  { name: "WVP", key: "wvp", isDone: false, isActive: false },
  { name: "EQ", key: "eq", isDone: false, isActive: false },
];

export const _ArrLangs = [
  { label: "English", value: "EN" },
  { label: "Hindi", value: "HI" },
  { label: "Malayalam", value: "ML" },
  { label: "Tamil", value: "TA" },
  { label: "Kannada", value: "KN" },
  { label: "Telugu", value: "TE" },
  { label: "Marathi", value: "MR" },
  { label: "Bengali", value: "BN" },
  { label: "Gujarati", value: "GU" },
  { label: "Punjabi", value: "PA" },
  { label: "Odia", value: "OD" },
  { label: "Assamese", value: "AS" },
  { label: "Urdu", value: "UR" },
];

export const LangMapping = {
  EN: "English",
  HI: "Hindi",
  TA: "Tamil",
  KN: "Kannada",
  TE: "Telugu",
  MR: "Marathi",
  BN: "Bengali",
  GU: "Gujarati",
  PA: "Punjabi",
  OD: "Odia",
  AS: "Assamese",
  UR: "Urdu",
  ML: "Malayalam",
};

export function getTabsForTest(testType) {
  const tabsCloned = cloneDeep(tabs);
  tabsCloned[1].categories = getAptiCategories(testType);

  if (testType === "RISE") return tabsCloned.slice(0, 3);
  else if (testType === "SAIL") return tabsCloned.slice(0, 4);
  else if (testType === "REDESIGN") return tabsCloned;
  else if (testType === "REDESIGN_PLUS") return tabsCloned;
  else return tabsCloned.slice(0);
}

function getAptiCategories(testType) {
  switch (testType) {
    case "RISE":
      return [
        {
          name: "Numerical Aptitude",
          subcategories: [
            { name: "Computation", isDone: false, isActive: false },
            { name: "Arithmetic Reasoning", isDone: false, isActive: false },
            { name: "Number Series", isDone: false, isActive: false },
            { name: "Number Puzzles", isDone: false, isActive: false },
          ],
        },
        {
          name: "Abstract Reasoning",
          subcategories: [
            { name: "Analogy", isDone: false, isActive: false },
            { name: "Repeating Patterns", isDone: false, isActive: false },
            { name: "Growing Patterns", isDone: false, isActive: false },
            { name: "Reducing Patterns", isDone: false, isActive: false },
            { name: "Abstract Classification", isDone: false, isActive: false },
          ],
        },
        {
          name: "Verbal Aptitude",
          subcategories: [
            { name: "Selecting Words", isDone: false, isActive: false },
            { name: "Antonyms", isDone: false, isActive: false },
            { name: "Spellings", isDone: false, isActive: false },
            { name: "Synonyms", isDone: false, isActive: false },
            { name: "Sentence Formation", isDone: false, isActive: false },
          ],
        },
        {
          name: "Mechanical Reasoning",
          subcategories: [
            { name: "Tools Analogy", isDone: false, isActive: false },
            { name: "Mechanical Aptitude", isDone: false, isActive: false },
          ],
        },
        {
          name: "Spatial Aptitude",
          subcategories: [
            { name: "Matching Pieces and Parts", isDone: false, isActive: false },
            { name: "Understanding Patterns", isDone: false, isActive: false },
            { name: "Visual Estimation", isDone: false, isActive: false },
            { name: "Mirror Image", isDone: false, isActive: false },
          ],
        },

        {
          name: "Perceptual Aptitude",
          subcategories: [
            { name: "Analogy Figures", isDone: false, isActive: false },
            { name: "Perceptual Speed", isDone: false, isActive: false },
            { name: "Analogy Codes", isDone: false, isActive: false },
            { name: "Alpha Numeric Series", isDone: false, isActive: false },
            { name: "Perceptual Classification", isDone: false, isActive: false },
            { name: "Perceptual Series Completion", isDone: false, isActive: false },
          ],
        },
      ];

    case "SAIL":
      return [
        {
          name: "Numerical Aptitude",
          subcategories: [
            { name: "Computation", isDone: false, isActive: false },
            { name: "Arithmetic Reasoning", isDone: false, isActive: false },
            { name: "Number Series", isDone: false, isActive: false },
            { name: "Number Puzzles", isDone: false, isActive: false },
          ],
        },
        {
          name: "Abstract Reasoning",
          subcategories: [
            { name: "Abstract Series Completion", isDone: false, isActive: false },
            { name: "Symbol Analogies", isDone: false, isActive: false },
            { name: "Pattern Comparison", isDone: false, isActive: false },
          ],
        },
        {
          name: "Verbal Aptitude",
          subcategories: [
            { name: "Selecting Words", isDone: false, isActive: false },
            { name: "Sentence Correction", isDone: false, isActive: false },
            { name: "Spellings", isDone: false, isActive: false },
            { name: "One Word Substitutes", isDone: false, isActive: false },
            { name: "Ordering of Words", isDone: false, isActive: false },
          ],
        },
        {
          name: "Mechanical Reasoning",
          subcategories: [
            { name: "Tools Analogy", isDone: false, isActive: false },
            { name: "Mechanical Aptitude", isDone: false, isActive: false },
          ],
        },
        {
          name: "Spatial Aptitude",
          subcategories: [
            { name: "Matching Pieces and Parts", isDone: false, isActive: false },
            { name: "Understanding Patterns", isDone: false, isActive: false },
            { name: "Construction of Squares", isDone: false, isActive: false },
            { name: "Mirror Image", isDone: false, isActive: false },
          ],
        },
        {
          name: "Perceptual Aptitude",
          subcategories: [
            { name: "Perceptual Series Completion", isDone: false, isActive: false },
            { name: "Perceptual Speed", isDone: false, isActive: false },
            { name: "Checking Information", isDone: false, isActive: false },
            { name: "Working with Diagrams", isDone: false, isActive: false },
            { name: "Analogical Reasoning", isDone: false, isActive: false },
          ],
        },
      ];

    case "REDESIGN":
    case "REDESIGN_PLUS":
      return [
        {
          name: "Numerical Aptitude",
          subcategories: [
            { name: "Computation", isDone: false, isActive: false },
            { name: "Arithmetic Reasoning", isDone: false, isActive: false },
            { name: "Number Series", isDone: false, isActive: false },
            { name: "Number Puzzles", isDone: false, isActive: false },
          ],
        },
        {
          name: "Abstract Reasoning",
          subcategories: [
            { name: "Abstract Series Completion", isDone: false, isActive: false },
            { name: "Symbol Analogies", isDone: false, isActive: false },
            { name: "Pattern Comparison", isDone: false, isActive: false },
          ],
        },
        {
          name: "Verbal Aptitude",
          subcategories: [
            { name: "Selecting Words", isDone: false, isActive: false },
            { name: "Sentence Correction", isDone: false, isActive: false },
            { name: "Spellings", isDone: false, isActive: false },
            { name: "Completing Statements", isDone: false, isActive: false },
            { name: "Sentence Formation", isDone: false, isActive: false },
          ],
        },
        {
          name: "Mechanical Reasoning",
          subcategories: [
            { name: "Tools Analogy", isDone: false, isActive: false },
            { name: "Mechanical Aptitude", isDone: false, isActive: false },
          ],
        },
        {
          name: "Spatial Aptitude",
          subcategories: [
            { name: "Rotated Blocks", isDone: false, isActive: false },
            { name: "Matching Pieces and Parts", isDone: false, isActive: false },
            { name: "Understanding Patterns", isDone: false, isActive: false },
            { name: "Mirror Image", isDone: false, isActive: false },
          ],
        },
        {
          name: "Perceptual Aptitude",
          subcategories: [
            { name: "Perceptual Series Completion", isDone: false, isActive: false },
            { name: "Perceptual Speed", isDone: false, isActive: false },
            { name: "Checking Information", isDone: false, isActive: false },
            { name: "Working with Diagrams", isDone: false, isActive: false },
            { name: "Analogical Reasoning", isDone: false, isActive: false },
          ],
        },
      ];

    default:
      return [];
  }
}
