/**
 * Math Operators LaTeX Commands
 */

// Mathematical operators
export const MATH_OPERATORS = {
  SUM: '\\sum',
  PROD: '\\prod',
  INT: '\\int',
  LIM: '\\lim',
  INF: '\\infty',
  PARTIAL: '\\partial',
  NABLA: '\\nabla',
} as const;

// Fractions and roots
export const FRACTIONS_ROOTS_COMMANDS = {
  FRAC: '\\frac',
  SQRT: '\\sqrt',
  ROOT: '\\root',
} as const;

// Subscripts and superscripts
export const SUBSCRIPTS_SUPERSCRIPTS = {
  SUB: '_',
  SUP: '^',
} as const;

// Braces and brackets
export const BRACES_BRACKETS = {
  LEFT: '\\left',
  RIGHT: '\\right',
} as const;

// Environments
export const ENVIRONMENTS = {
  BEGIN: '\\begin',
  END: '\\end',
} as const;

// Text formatting
export const TEXT_FORMATTING = {
  TEXT: '\\text',
  MATHBF: '\\mathbf',
  MATHIT: '\\mathit',
  MATHRM: '\\mathrm',
  MATHSF: '\\mathsf',
  MATHTT: '\\mathtt',
  MATHCAL: '\\mathcal',
  MATHBB: '\\mathbb',
} as const;

// Spacing
export const SPACING = {
  QUAD: '\\quad',
  QQUAD: '\\qquad',
  SPACE: '\\ ',
  COMMA: ',',
  SEMICOLON: ';',
  COLON: ':',
} as const;

// Delimiters
export const DELIMITERS = {
  LPAREN: '(',
  RPAREN: ')',
  LBRACKET: '[',
  RBRACKET: ']',
  LBRACE: '{',
  RBRACE: '}',
  LANGLE: '\\langle',
  RANGLE: '\\rangle',
  LPIPE: '\\left|',
  RPIPE: '\\right|',
} as const;
