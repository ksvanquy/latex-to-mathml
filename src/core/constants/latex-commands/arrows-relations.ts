/**
 * Arrows and Relations LaTeX Commands
 */

// Arrows
export const ARROWS = {
  ARROW: '\\rightarrow',
  LEFTARROW: '\\leftarrow',
  LRARROW: '\\leftrightarrow',
  RARROW: '\\Rightarrow',
  LRARROW_DOUBLE: '\\Leftrightarrow',
  TO: '\\to',
  GETS: '\\gets',
  LONGLEFTARROW: '\\longleftarrow',
  LONGARROW: '\\longrightarrow',
  LONGLEFTARROW_DOUBLE: '\\longleftrightarrow',
  LEFTARROW_DOUBLE: '\\Leftarrow',
  RIGHTARROW_DOUBLE: '\\Rightarrow',
  LEFTARROW_DOUBLE_BI: '\\Leftrightarrow',
  MAPSTO: '\\mapsto',
  LONGMAPSTO: '\\longmapsto',
} as const;

// Relations
export const RELATIONS = {
  EQ: '=',
  NEQ: '\\neq',
  LT: '<',
  GT: '>',
  LEQ: '\\leq',
  GEQ: '\\geq',
  APPROX: '\\approx',
  SIM: '\\sim',
  CONG: '\\cong',
  EQUIV: '\\equiv',
} as const;

// Logic
export const LOGIC = {
  AND: '\\land',
  OR: '\\lor',
  NOT: '\\neg',
  IMPLIES: '\\implies',
  IFF: '\\iff',
  FORALL: '\\forall',
  EXISTS: '\\exists',
} as const;

// Set theory
export const SET_THEORY = {
  IN: '\\in',
  NOTIN: '\\notin',
  SUBSET: '\\subset',
  SUPERSET: '\\supset',
  SUBSETEQ: '\\subseteq',
  SUPERSETEQ: '\\supseteq',
  CUP: '\\cup',
  CAP: '\\cap',
  SETMINUS: '\\setminus',
  EMPTYSET: '\\emptyset',
} as const;
