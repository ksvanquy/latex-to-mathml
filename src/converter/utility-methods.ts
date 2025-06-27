/**
 * Utility Methods - Helper methods for the converter
 */

import { ConversionOptions, ConversionResult, MathMLNode } from '../core/types';
import { LaTeXParser } from '../parser/parser';
import { MathMLGenerator } from '../generator/mathml-generator';
import { ErrorHandler } from '../utils/error-handler';

export class UtilityMethods {
  private parser: LaTeXParser;
  private generator: MathMLGenerator;
  private errorHandler: ErrorHandler;

  constructor(
    parser: LaTeXParser,
    generator: MathMLGenerator,
    errorHandler: ErrorHandler
  ) {
    this.parser = parser;
    this.generator = generator;
    this.errorHandler = errorHandler;
  }

  /**
   * Parse LaTeX to AST
   */
  public parse(latex: string, options: ConversionOptions = {}): MathMLNode {
    return this.parser.parse(latex, options);
  }

  /**
   * Generate MathML from AST
   */
  public generate(
    ast: MathMLNode,
    options: ConversionOptions = {}
  ): ConversionResult {
    return this.generator.generate(ast, options);
  }

  /**
   * Pretty print MathML
   */
  public prettyPrint(
    latex: string,
    options: ConversionOptions = {}
  ): ConversionResult {
    try {
      const ast = this.parser.parse(latex, options);
      const result = this.generator.generate(ast, options);

      return {
        mathml: result.mathml,
        errors: result.errors,
        warnings: result.warnings,
      };
    } catch (error) {
      const errorMessage = this.errorHandler.handleError(error);
      return {
        mathml: '',
        errors: [errorMessage],
        warnings: [],
      };
    }
  }

  /**
   * Minify MathML
   */
  public minify(
    latex: string,
    options: ConversionOptions = {}
  ): ConversionResult {
    try {
      const ast = this.parser.parse(latex, options);
      const result = this.generator.generate(ast, options);

      return {
        mathml: result.mathml,
        errors: result.errors,
        warnings: result.warnings,
      };
    } catch (error) {
      const errorMessage = this.errorHandler.handleError(error);
      return {
        mathml: '',
        errors: [errorMessage],
        warnings: [],
      };
    }
  }

  /**
   * Get supported LaTeX commands
   */
  public getSupportedCommands(): string[] {
    return [
      '\\alpha',
      '\\beta',
      '\\gamma',
      '\\delta',
      '\\epsilon',
      '\\frac',
      '\\sqrt',
      '\\sum',
      '\\int',
      '\\lim',
      '\\sin',
      '\\cos',
      '\\tan',
      '\\log',
      '\\exp',
      // Add more commands as needed
    ];
  }

  /**
   * Get supported LaTeX environments
   */
  public getSupportedEnvironments(): string[] {
    return [
      'equation',
      'align',
      'gather',
      'matrix',
      'array',
      'cases',
      'split',
      'multline',
      'eqnarray',
      // Add more environments as needed
    ];
  }

  /**
   * Get package version
   */
  public getVersion(): string {
    return '1.0.0';
  }

  /**
   * Get package information
   */
  public getInfo(): { name: string; version: string; description: string } {
    return {
      name: 'latex-to-mathml',
      version: this.getVersion(),
      description: 'A professional LaTeX to MathML converter',
    };
  }
}
