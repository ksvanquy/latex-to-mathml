/**
 * LaTeX Commands - Main export file
 */

export * from './latex-commands/greek-letters';
export * from './latex-commands/math-operators';
export * from './latex-commands/arrows-relations';
export * from './latex-commands/functions';

// Combine all commands into a single object for backward compatibility
import {
  GREEK_LETTERS,
  GREEK_LETTERS_CAPITAL,
} from './latex-commands/greek-letters';
import {
  MATH_OPERATORS,
  FRACTIONS_ROOTS_COMMANDS,
  SUBSCRIPTS_SUPERSCRIPTS,
  BRACES_BRACKETS,
  ENVIRONMENTS,
  TEXT_FORMATTING,
  SPACING,
  DELIMITERS,
} from './latex-commands/math-operators';
import {
  ARROWS,
  RELATIONS,
  LOGIC,
  SET_THEORY,
} from './latex-commands/arrows-relations';
import {
  TRIG_FUNCTIONS,
  LOG_FUNCTIONS,
  OTHER_FUNCTIONS,
  CALCULUS,
  OPERATORS,
  ACCENTS,
  BRACKETS,
  COMMON_SYMBOLS,
} from './latex-commands/functions';

export const LATEX_COMMANDS = {
  ...GREEK_LETTERS,
  ...GREEK_LETTERS_CAPITAL,
  ...MATH_OPERATORS,
  ...FRACTIONS_ROOTS_COMMANDS,
  ...SUBSCRIPTS_SUPERSCRIPTS,
  ...BRACES_BRACKETS,
  ...ENVIRONMENTS,
  ...TEXT_FORMATTING,
  ...SPACING,
  ...DELIMITERS,
  ...ARROWS,
  ...RELATIONS,
  ...LOGIC,
  ...SET_THEORY,
  ...TRIG_FUNCTIONS,
  ...LOG_FUNCTIONS,
  ...OTHER_FUNCTIONS,
  ...CALCULUS,
  ...OPERATORS,
  ...ACCENTS,
  ...BRACKETS,
  ...COMMON_SYMBOLS,
} as const;
 