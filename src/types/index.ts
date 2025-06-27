/**
 * Token types for LaTeX lexer
 */
export enum TokenType {
  IDENTIFIER = 'IDENTIFIER',
  NUMBER = 'NUMBER',
  OPERATOR = 'OPERATOR',
  COMMAND = 'COMMAND',
  LEFT_BRACE = 'LEFT_BRACE',
  RIGHT_BRACE = 'RIGHT_BRACE',
  SUPERSCRIPT = 'SUPERSCRIPT',
  SUBSCRIPT = 'SUBSCRIPT',
  WHITESPACE = 'WHITESPACE',
  EOF = 'EOF',
}

/**
 * Token structure
 */
export interface Token {
  type: TokenType;
  value: string;
  position: number;
  line: number;
  column: number;
}

/**
 * AST Node types
 */
export enum NodeType {
  EXPRESSION = 'EXPRESSION',
  IDENTIFIER = 'IDENTIFIER',
  NUMBER = 'NUMBER',
  OPERATOR = 'OPERATOR',
  FRACTION = 'FRACTION',
  SUPERSCRIPT = 'SUPERSCRIPT',
  SUBSCRIPT = 'SUBSCRIPT',
  SQUARE_ROOT = 'SQUARE_ROOT',
  ROOT = 'ROOT',
  FUNCTION = 'FUNCTION',
  GROUP = 'GROUP',
}

/**
 * AST Node structure
 */
export interface ASTNode {
  type: NodeType;
  value?: string;
  children?: ASTNode[];
  position?: number;
}

/**
 * MathML element types
 */
export enum MathMLElementType {
  MATH = 'math',
  MROW = 'mrow',
  MI = 'mi',
  MN = 'mn',
  MO = 'mo',
  MFRAC = 'mfrac',
  MSUP = 'msup',
  MSUB = 'msub',
  MSUBSUP = 'msubsup',
  MSQRT = 'msqrt',
  MROOT = 'mroot',
  MTEXT = 'mtext',
  MSPACE = 'mspace',
}

/**
 * MathML element structure
 */
export interface MathMLElement {
  type: MathMLElementType;
  content?: string;
  children?: MathMLElement[];
  attributes?: Record<string, string>;
}

/**
 * Conversion options
 */
export interface ConversionOptions {
  displayMode?: boolean;
  validateMathML?: boolean;
  prettyPrint?: boolean;
  namespace?: string;
}

/**
 * Conversion result
 */
export interface ConversionResult {
  mathml: string;
  success: boolean;
  errors?: string[];
  warnings?: string[];
} 