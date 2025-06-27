/**
 * Functions LaTeX Commands
 */

// Trigonometric functions
export const TRIG_FUNCTIONS = {
  SIN: '\\sin',
  COS: '\\cos',
  TAN: '\\tan',
  CSC: '\\csc',
  SEC: '\\sec',
  COT: '\\cot',
  ARCSIN: '\\arcsin',
  ARCCOS: '\\arccos',
  ARCTAN: '\\arctan',
  SINH: '\\sinh',
  COSH: '\\cosh',
  TANH: '\\tanh',
} as const;

// Logarithmic functions
export const LOG_FUNCTIONS = {
  LOG: '\\log',
  LN: '\\ln',
  LG: '\\lg',
} as const;

// Other common functions
export const OTHER_FUNCTIONS = {
  EXP: '\\exp',
  DET: '\\det',
  DIM: '\\dim',
  KER: '\\ker',
  MAX: '\\max',
  MIN: '\\min',
  INF: '\\inf',
  SUP: '\\sup',
  LIMINF: '\\liminf',
  LIMSUP: '\\limsup',
  ARG: '\\arg',
  DEG: '\\deg',
  GCD: '\\gcd',
  LCM: '\\lcm',
} as const;

// Calculus
export const CALCULUS = {
  DERIV: '\\frac{d}{dx}',
  PARTIAL_DERIV: '\\frac{\\partial}{\\partial x}',
  INTEGRAL: '\\int',
  DOUBLE_INTEGRAL: '\\iint',
  TRIPLE_INTEGRAL: '\\iiint',
  CONTOUR_INTEGRAL: '\\oint',
} as const;

// Operators
export const OPERATORS = {
  OPLUS: '\\oplus',
  OMINUS: '\\ominus',
  OTIMES: '\\otimes',
  OSLASH: '\\oslash',
  BIGOPLUS: '\\bigoplus',
  BIGOTIMES: '\\bigotimes',
  BIGCUP: '\\bigcup',
  BIGCAP: '\\bigcap',
} as const;

// Accents
export const ACCENTS = {
  HAT: '\\hat',
  WIDEHAT: '\\widehat',
  BAR: '\\bar',
  OVERLINE: '\\overline',
  VEC: '\\vec',
  OVERRIGHTARROW: '\\overrightarrow',
  DOT_ACCENT: '\\dot',
  DDOT: '\\ddot',
  TILDE_ACCENT: '\\tilde',
  WIDETILDE: '\\widetilde',
  ACUTE: '\\acute',
  GRAVE: '\\grave',
} as const;

// Brackets
export const BRACKETS = {
  LCEIL: '\\lceil',
  RCEIL: '\\rceil',
  LFLOOR: '\\lfloor',
  RFLOOR: '\\rfloor',
  ULCORNER: '\\ulcorner',
  URCORNER: '\\urcorner',
  LLCORNER: '\\llcorner',
  LRCORNER: '\\lrcorner',
} as const;

// Other common symbols
export const COMMON_SYMBOLS = {
  DOT_SYMBOL: '.',
  CDOT: '\\cdot',
  TIMES: '\\times',
  DIV: '\\div',
  PM: '\\pm',
  MP: '\\mp',
  DEGREE: '\\degree',
  PERCENT: '\\%',
  DOLLAR: '\\$',
  HASH: '\\#',
  AMPERSAND: '\\&',
  UNDERSCORE: '\\_',
  CARET: '\\^{}',
  TILDE_SYMBOL: '\\~{}',
  BACKSLASH: '\\backslash',
} as const;
 