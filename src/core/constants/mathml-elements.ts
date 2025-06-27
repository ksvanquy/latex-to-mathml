/**
 * MathML Elements Constants
 */

// Basic presentation markup
export const BASIC_PRESENTATION = {
  MATH: 'math',
  MROW: 'mrow',
  MI: 'mi',
  MO: 'mo',
  MN: 'mn',
  MTEXT: 'mtext',
} as const;

// Fractions and roots
export const FRACTIONS_ROOTS = {
  MFRAC: 'mfrac',
  MSQRT: 'msqrt',
  MROOT: 'mroot',
} as const;

// Script and limit elements
export const SCRIPTS_LIMITS = {
  MSUB: 'msub',
  MSUP: 'msup',
  MSUBSUP: 'msubsup',
  MUNDER: 'munder',
  MOVER: 'mover',
  MUNDEROVER: 'munderover',
} as const;

// Tables and matrices
export const TABLES_MATRICES = {
  MTABLE: 'mtable',
  MTR: 'mtr',
  MTD: 'mtd',
} as const;

// Fencing and spacing
export const FENCING_SPACING = {
  MFENCED: 'mfenced',
  MSPACE: 'mspace',
} as const;

// Additional presentation markup
export const ADDITIONAL_PRESENTATION = {
  MGLYPH: 'mglyph',
  MSTYLE: 'mstyle',
  MPADDED: 'mpadded',
  MPHANTOM: 'mphantom',
} as const;

// Script and limit elements (advanced)
export const SCRIPT_LIMITS_ADVANCED = {
  MSCARRIES: 'mscarries',
  MSCARRY: 'mscarry',
  MSGROUP: 'msgroup',
  MSLINE: 'msline',
} as const;

// Tabular math
export const TABULAR_MATH = {
  MLABELEDTR: 'mlabeledtr',
  MALIGNGROUP: 'maligngroup',
  MALIGNMARK: 'malignmark',
} as const;

// Elementary math
export const ELEMENTARY_MATH = {
  MLONGDIV: 'mlongdiv',
} as const;

// Enlivening expressions
export const ENLIVENING_EXPRESSIONS = {
  MSEMANTICS: 'msemantics',
  MANNOTATION: 'mannotation',
  MACTION: 'maction',
} as const;

// Combine all MathML elements
export const MATHML_ELEMENTS = {
  ...BASIC_PRESENTATION,
  ...FRACTIONS_ROOTS,
  ...SCRIPTS_LIMITS,
  ...TABLES_MATRICES,
  ...FENCING_SPACING,
  ...ADDITIONAL_PRESENTATION,
  ...SCRIPT_LIMITS_ADVANCED,
  ...TABULAR_MATH,
  ...ELEMENTARY_MATH,
  ...ENLIVENING_EXPRESSIONS,
} as const;
