/**
 * Validator - Main validation orchestrator
 */

import { MathMLNode } from '../core/types';
import { InputValidator } from './validation/input-validator';
import { SyntaxValidator } from './validation/syntax-validator';
import { ASTValidator } from './validation/ast-validator';
import { MathMLStructureValidator } from './validation/mathml-structure-validator';

export class Validator {
  private inputValidator: InputValidator;
  private syntaxValidator: SyntaxValidator;
  private astValidator: ASTValidator;
  private mathmlStructureValidator: MathMLStructureValidator;

  constructor() {
    this.inputValidator = new InputValidator();
    this.syntaxValidator = new SyntaxValidator();
    this.astValidator = new ASTValidator();
    this.mathmlStructureValidator = new MathMLStructureValidator();
  }

  /**
   * Validate LaTeX input string
   */
  public validateInput(latex: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Basic input validation
    const inputResult = this.inputValidator.validateInput(latex);
    if (!inputResult.isValid) {
      return inputResult;
    }

    // Syntax validation
    const commandErrors = this.syntaxValidator.validateCommandSyntax(latex);
    const environmentErrors =
      this.syntaxValidator.validateEnvironmentSyntax(latex);
    errors.push(...commandErrors, ...environmentErrors);

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate MathML AST
   */
  public validateAST(ast: MathMLNode): { isValid: boolean; errors: string[] } {
    return this.astValidator.validateAST(ast);
  }

  /**
   * Validate MathML structure
   */
  public validateMathMLStructure(ast: MathMLNode): {
    isValid: boolean;
    errors: string[];
  } {
    return this.mathmlStructureValidator.validateMathMLStructure(ast);
  }
}
