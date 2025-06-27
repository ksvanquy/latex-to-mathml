/**
 * Core types for LaTeX to MathML conversion
 */

export interface LaTeXToken {
  type:
    | 'command'
    | 'symbol'
    | 'text'
    | 'number'
    | 'whitespace'
    | 'brace'
    | 'bracket';
  value: string;
  position: number;
  line: number;
  column: number;
}

export interface MathMLNode {
  type: 'element' | 'text';
  name?: string;
  attributes?: Record<string, string>;
  children?: MathMLNode[];
  content?: string;
}

export interface ParseContext {
  tokens: LaTeXToken[];
  position: number;
  scope: string[];
  environment?: string;
}

export interface ConversionOptions {
  displayMode?: boolean;
  strictMode?: boolean;
  allowUnknownCommands?: boolean;
  preserveWhitespace?: boolean;
  debugMode?: boolean;
}

export interface ConversionResult {
  mathml: string;
  errors: string[];
  warnings: string[];
}

export type CommandHandler = (
  context: ParseContext,
  options: ConversionOptions
) => MathMLNode;

export interface CommandRegistry {
  [command: string]: CommandHandler;
}

export type EnvironmentHandler = (
  context: ParseContext,
  options: ConversionOptions
) => MathMLNode;

export interface EnvironmentRegistry {
  [environment: string]: EnvironmentHandler;
}
