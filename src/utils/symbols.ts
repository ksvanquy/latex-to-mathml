import { MathMLElementType } from '../types';

/**
 * LaTeX operators mapping to MathML
 */
export const LATEX_OPERATORS: Record<string, string> = {
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '∕',
  '=': '=',
  '<': '<',
  '>': '>',
  '\\leq': '≤',
  '\\geq': '≥',
  '\\neq': '≠',
  '\\approx': '≈',
  '\\pm': '±',
  '\\mp': '∓',
  '\\times': '×',
  '\\div': '÷',
  '\\cdot': '·',
  '\\circ': '∘',
  '\\bullet': '•',
  '\\oplus': '⊕',
  '\\ominus': '⊖',
  '\\otimes': '⊗',
  '\\oslash': '⊘',
  '\\odot': '⊙',
  '\\bigcirc': '○',
  '\\dagger': '†',
  '\\ddagger': '‡',
  '\\lhd': '⊲',
  '\\rhd': '⊳',
  '\\unlhd': '⊴',
  '\\unrhd': '⊵',
  '\\triangleleft': '◁',
  '\\triangleright': '▷',
  '\\trianglelefteq': '⊴',
  '\\trianglerighteq': '⊵',
};

/**
 * LaTeX functions mapping
 */
export const LATEX_FUNCTIONS: Record<string, string> = {
  '\\sin': 'sin',
  '\\cos': 'cos',
  '\\tan': 'tan',
  '\\cot': 'cot',
  '\\sec': 'sec',
  '\\csc': 'csc',
  '\\arcsin': 'arcsin',
  '\\arccos': 'arccos',
  '\\arctan': 'arctan',
  '\\sinh': 'sinh',
  '\\cosh': 'cosh',
  '\\tanh': 'tanh',
  '\\coth': 'coth',
  '\\log': 'log',
  '\\ln': 'ln',
  '\\exp': 'exp',
  '\\lim': 'lim',
  '\\max': 'max',
  '\\min': 'min',
  '\\inf': 'inf',
  '\\sup': 'sup',
  '\\gcd': 'gcd',
  '\\lcm': 'lcm',
  '\\det': 'det',
  '\\dim': 'dim',
  '\\ker': 'ker',
  '\\deg': 'deg',
  '\\arg': 'arg',
  '\\mod': 'mod',
};

/**
 * Greek letters mapping
 */
export const GREEK_LETTERS: Record<string, string> = {
  '\\alpha': 'α',
  '\\beta': 'β',
  '\\gamma': 'γ',
  '\\delta': 'δ',
  '\\epsilon': 'ε',
  '\\varepsilon': 'ε',
  '\\zeta': 'ζ',
  '\\eta': 'η',
  '\\theta': 'θ',
  '\\vartheta': 'ϑ',
  '\\iota': 'ι',
  '\\kappa': 'κ',
  '\\lambda': 'λ',
  '\\mu': 'μ',
  '\\nu': 'ν',
  '\\xi': 'ξ',
  '\\pi': 'π',
  '\\rho': 'ρ',
  '\\varrho': 'ϱ',
  '\\sigma': 'σ',
  '\\varsigma': 'ς',
  '\\tau': 'τ',
  '\\upsilon': 'υ',
  '\\phi': 'φ',
  '\\varphi': 'φ',
  '\\chi': 'χ',
  '\\psi': 'ψ',
  '\\omega': 'ω',
  '\\Gamma': 'Γ',
  '\\Delta': 'Δ',
  '\\Theta': 'Θ',
  '\\Lambda': 'Λ',
  '\\Xi': 'Ξ',
  '\\Pi': 'Π',
  '\\Sigma': 'Σ',
  '\\Upsilon': 'Υ',
  '\\Phi': 'Φ',
  '\\Psi': 'Ψ',
  '\\Omega': 'Ω',
};

/**
 * Special symbols mapping
 */
export const SPECIAL_SYMBOLS: Record<string, string> = {
  '\\infty': '∞',
  '\\partial': '∂',
  '\\nabla': '∇',
  '\\forall': '∀',
  '\\exists': '∃',
  '\\nexists': '∄',
  '\\emptyset': '∅',
  '\\varnothing': '∅',
  '\\in': '∈',
  '\\notin': '∉',
  '\\ni': '∋',
  '\\notni': '∌',
  '\\subset': '⊂',
  '\\supset': '⊃',
  '\\subseteq': '⊆',
  '\\supseteq': '⊇',
  '\\cap': '∩',
  '\\cup': '∪',
  '\\sqcap': '⊓',
  '\\sqcup': '⊔',
  '\\wedge': '∧',
  '\\vee': '∨',
  '\\neg': '¬',
  '\\top': '⊤',
  '\\bot': '⊥',
  '\\vdash': '⊢',
  '\\dashv': '⊣',
  '\\models': '⊨',
  '\\mid': '∣',
  '\\parallel': '∥',
  '\\nparallel': '∦',
  '\\perp': '⊥',
  '\\angle': '∠',
  '\\measuredangle': '∡',
  '\\sphericalangle': '∢',
  '\\triangle': '△',
  '\\square': '□',
  '\\diamond': '◇',
  '\\circle': '○',
  '\\ell': 'ℓ',
  '\\Re': 'ℜ',
  '\\Im': 'ℑ',
  '\\wp': '℘',
  '\\aleph': 'ℵ',
  '\\beth': 'ℶ',
  '\\gimel': 'ℷ',
  '\\daleth': 'ℸ',
};

/**
 * Check if a LaTeX command is an operator
 */
export function isOperator(command: string): boolean {
  return command in LATEX_OPERATORS;
}

/**
 * Check if a LaTeX command is a function
 */
export function isFunction(command: string): boolean {
  return command in LATEX_FUNCTIONS;
}

/**
 * Check if a LaTeX command is a Greek letter
 */
export function isGreekLetter(command: string): boolean {
  return command in GREEK_LETTERS;
}

/**
 * Check if a LaTeX command is a special symbol
 */
export function isSpecialSymbol(command: string): boolean {
  return command in SPECIAL_SYMBOLS;
}

/**
 * Get MathML representation of a LaTeX command
 */
export function getMathMLSymbol(command: string): string | null {
  if (isOperator(command)) return LATEX_OPERATORS[command];
  if (isFunction(command)) return LATEX_FUNCTIONS[command];
  if (isGreekLetter(command)) return GREEK_LETTERS[command];
  if (isSpecialSymbol(command)) return SPECIAL_SYMBOLS[command];
  return null;
} 