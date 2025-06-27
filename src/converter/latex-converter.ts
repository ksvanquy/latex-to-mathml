/**
 * LaTeX to MathML Converter - Main conversion class
 */

import { ConversionOptions, ConversionResult, MathMLNode } from '../core/types';
import { LaTeXParser } from '../parser/parser';
import { MathMLGenerator } from '../generator/mathml-generator';
import { ErrorHandler } from '../utils/error-handler';
import { Validator } from '../utils/validator';
import { ConversionMethods } from './conversion-methods';
import { UtilityMethods } from './utility-methods';

export class LaTeXConverter {
  private parser: LaTeXParser;
  private generator: MathMLGenerator;
  private errorHandler: ErrorHandler;
  private validator: Validator;
  private conversionMethods: ConversionMethods;
  private utilityMethods: UtilityMethods;

  constructor() {
    this.parser = new LaTeXParser();
    this.generator = new MathMLGenerator();
    this.errorHandler = new ErrorHandler();
    this.validator = new Validator();
    this.conversionMethods = new ConversionMethods(
      this.parser,
      this.generator,
      this.errorHandler
    );
    this.utilityMethods = new UtilityMethods(
      this.parser,
      this.generator,
      this.errorHandler
    );
  }

  /**
   * Convert LaTeX string to MathML
   */
  public convert(
    latex: string,
    options: ConversionOptions = {}
  ): ConversionResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Validate input
      const validationResult = this.validator.validateInput(latex);
      if (!validationResult.isValid) {
        errors.push(...validationResult.errors);
        return {
          mathml: '',
          errors,
          warnings,
        };
      }

      // Parse LaTeX to AST
      const ast = this.parser.parse(latex, options);

      // Validate AST
      const astValidation = this.validator.validateAST(ast);
      if (!astValidation.isValid) {
        errors.push(...astValidation.errors);
        return {
          mathml: '',
          errors,
          warnings,
        };
      }

      // Generate MathML
      const result = this.generator.generate(ast, {
        displayMode: options.displayMode || false,
      });

      // Combine errors and warnings
      errors.push(...result.errors);
      warnings.push(...result.warnings);

      return {
        mathml: result.mathml,
        errors,
        warnings,
      };
    } catch (error) {
      const errorMessage = this.errorHandler.handleError(error);
      errors.push(errorMessage);

      return {
        mathml: '',
        errors,
        warnings,
      };
    }
  }

  /**
   * Convert LaTeX to MathML with display mode
   */
  public convertDisplay(
    latex: string,
    options: ConversionOptions = {}
  ): ConversionResult {
    return this.convert(latex, { ...options, displayMode: true });
  }

  /**
   * Convert LaTeX to MathML with inline mode
   */
  public convertInline(
    latex: string,
    options: ConversionOptions = {}
  ): ConversionResult {
    return this.convert(latex, { ...options, displayMode: false });
  }

  /**
   * Convert LaTeX to HTML with embedded MathML
   */
  public convertToHTML(
    latex: string,
    options: ConversionOptions & { title?: string } = {}
  ): ConversionResult {
    return this.conversionMethods.convertToHTML(latex, options);
  }

  /**
   * Convert LaTeX to SVG
   */
  public convertToSVG(
    latex: string,
    options: ConversionOptions & { width?: number; height?: number } = {}
  ): ConversionResult {
    return this.conversionMethods.convertToSVG(latex, options);
  }

  /**
   * Convert LaTeX to complete MathML document
   */
  public convertToDocument(
    latex: string,
    options: ConversionOptions = {}
  ): ConversionResult {
    return this.conversionMethods.convertToDocument(latex, options);
  }

  /**
   * Validate LaTeX input without converting
   */
  public validate(latex: string): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Validate input
      const validationResult = this.validator.validateInput(latex);
      if (!validationResult.isValid) {
        errors.push(...validationResult.errors);
        return { isValid: false, errors, warnings };
      }

      // Try to parse
      const ast = this.parser.parse(latex, { strictMode: true });

      // Validate AST
      const astValidation = this.validator.validateAST(ast);
      if (!astValidation.isValid) {
        errors.push(...astValidation.errors);
        return { isValid: false, errors, warnings };
      }

      return { isValid: true, errors, warnings };
    } catch (error) {
      const errorMessage = this.errorHandler.handleError(error);
      errors.push(errorMessage);
      return { isValid: false, errors, warnings };
    }
  }

  /**
   * Parse LaTeX to AST
   */
  public parse(latex: string, options: ConversionOptions = {}): MathMLNode {
    return this.utilityMethods.parse(latex, options);
  }

  /**
   * Generate MathML from AST
   */
  public generate(
    ast: MathMLNode,
    options: ConversionOptions = {}
  ): ConversionResult {
    return this.utilityMethods.generate(ast, options);
  }

  /**
   * Pretty print MathML
   */
  public prettyPrint(
    latex: string,
    options: ConversionOptions = {}
  ): ConversionResult {
    return this.utilityMethods.prettyPrint(latex, options);
  }

  /**
   * Minify MathML
   */
  public minify(
    latex: string,
    options: ConversionOptions = {}
  ): ConversionResult {
    return this.utilityMethods.minify(latex, options);
  }

  /**
   * Get supported LaTeX commands
   */
  public getSupportedCommands(): string[] {
    return this.utilityMethods.getSupportedCommands();
  }

  /**
   * Get supported LaTeX environments
   */
  public getSupportedEnvironments(): string[] {
    return this.utilityMethods.getSupportedEnvironments();
  }

  /**
   * Get package version
   */
  public getVersion(): string {
    return this.utilityMethods.getVersion();
  }

  /**
   * Get package information
   */
  public getInfo(): { name: string; version: string; description: string } {
    return this.utilityMethods.getInfo();
  }
}
