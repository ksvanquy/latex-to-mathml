/**
 * Conversion Methods - Different output format conversions
 */

import { ConversionOptions, ConversionResult, MathMLNode } from '../core/types';
import { LaTeXParser } from '../parser/parser';
import { MathMLGenerator } from '../generator/mathml-generator';
import { ErrorHandler } from '../utils/error-handler';

export class ConversionMethods {
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
   * Convert LaTeX to HTML with embedded MathML
   */
  public convertToHTML(
    latex: string,
    options: ConversionOptions & { title?: string } = {}
  ): ConversionResult {
    try {
      const ast: MathMLNode = this.parser.parse(latex, options);

      // Validate AST before generating HTML
      if (!this.isValidAST(ast)) {
        throw new Error('Invalid AST generated from LaTeX');
      }

      const html = this.generator.generateHTML(ast, {
        displayMode: options.displayMode || false,
        title: options.title,
      });

      return {
        mathml: html,
        errors: [],
        warnings: [],
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
   * Convert LaTeX to SVG
   */
  public convertToSVG(
    latex: string,
    options: ConversionOptions & { width?: number; height?: number } = {}
  ): ConversionResult {
    try {
      const ast: MathMLNode = this.parser.parse(latex, options);

      // Validate AST before generating SVG
      if (!this.isValidAST(ast)) {
        throw new Error('Invalid AST generated from LaTeX');
      }

      const svg = this.generator.generateSVG(ast, {
        width: options.width,
        height: options.height,
      });

      return {
        mathml: svg,
        errors: [],
        warnings: [],
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
   * Convert LaTeX to complete MathML document
   */
  public convertToDocument(
    latex: string,
    options: ConversionOptions = {}
  ): ConversionResult {
    try {
      const ast: MathMLNode = this.parser.parse(latex, options);

      // Validate AST before generating document
      if (!this.isValidAST(ast)) {
        throw new Error('Invalid AST generated from LaTeX');
      }

      const document = this.generator.generateDocument(ast, {
        displayMode: options.displayMode || false,
      });

      return {
        mathml: document,
        errors: [],
        warnings: [],
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
   * Validate AST structure
   */
  private isValidAST(ast: MathMLNode): boolean {
    if (!ast) return false;

    if (ast.type === 'text') {
      return typeof ast.content === 'string';
    }

    if (ast.type === 'element') {
      return typeof ast.name === 'string' && ast.name.length > 0;
    }

    return false;
  }
}
