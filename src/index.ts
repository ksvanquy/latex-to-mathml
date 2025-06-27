/**
 * LaTeX to MathML Converter
 * A TypeScript library to convert LaTeX mathematical expressions to MathML 3.0
 */

// Core exports
export { LaTeXConverter } from './converter/latex-converter';
export { LaTeXParser } from './parser/parser';
export { LaTeXLexer } from './parser/lexer';
export { MathMLGenerator } from './generator/mathml-generator';

// Type exports
export type {
  LaTeXToken,
  MathMLNode,
  ParseContext,
  ConversionOptions,
  ConversionResult,
  CommandHandler,
  CommandRegistry,
  EnvironmentHandler,
  EnvironmentRegistry,
} from './core/types';

// Utility exports
export { ErrorHandler } from './utils/error-handler';
export { Validator } from './utils/validator';

// Constants exports
export {
  MATHML_NAMESPACE,
  LATEX_COMMANDS,
  MATHML_ELEMENTS,
  ERROR_MESSAGES,
  WARNING_MESSAGES,
} from './core/constants';

// Import types for convenience functions
import { LaTeXConverter } from './converter/latex-converter';
import type { ConversionOptions, ConversionResult } from './core/types';

// Main converter instance
const converter = new LaTeXConverter();

// Convenience functions
export const convert = (
  latex: string,
  options?: ConversionOptions
): ConversionResult => converter.convert(latex, options);
export const convertDisplay = (
  latex: string,
  options?: ConversionOptions
): ConversionResult => converter.convertDisplay(latex, options);
export const convertInline = (
  latex: string,
  options?: ConversionOptions
): ConversionResult => converter.convertInline(latex, options);
export const convertToHTML = (
  latex: string,
  options?: ConversionOptions & { title?: string }
): ConversionResult => converter.convertToHTML(latex, options);
export const convertToSVG = (
  latex: string,
  options?: ConversionOptions & { width?: number; height?: number }
): ConversionResult => converter.convertToSVG(latex, options);
export const convertToDocument = (
  latex: string,
  options?: ConversionOptions
): ConversionResult => converter.convertToDocument(latex, options);
export const validate = (
  latex: string
): { isValid: boolean; errors: string[]; warnings: string[] } =>
  converter.validate(latex);
export const prettyPrint = (
  latex: string,
  options?: ConversionOptions
): ConversionResult => converter.prettyPrint(latex, options);
export const minify = (
  latex: string,
  options?: ConversionOptions
): ConversionResult => converter.minify(latex, options);

// Library information
export const getVersion = (): string => converter.getVersion();
export const getInfo = (): {
  name: string;
  version: string;
  description: string;
} => converter.getInfo();
export const getSupportedCommands = (): string[] =>
  converter.getSupportedCommands();
export const getSupportedEnvironments = (): string[] =>
  converter.getSupportedEnvironments();

// Default export
export default converter;
