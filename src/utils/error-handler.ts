/**
 * Error Handler - Main error handling orchestrator
 */

import { ErrorCreators } from './error-handling/error-creators';
import { ErrorAnalyzers } from './error-handling/error-analyzers';

export class ErrorHandler {
  private errorCreators: ErrorCreators;
  private errorAnalyzers: ErrorAnalyzers;

  constructor() {
    this.errorCreators = new ErrorCreators();
    this.errorAnalyzers = new ErrorAnalyzers();
  }

  /**
   * Handle and format errors
   */
  public handleError(error: unknown): string {
    if (error instanceof Error) {
      return this.formatError(error);
    }

    if (typeof error === 'string') {
      return error;
    }

    return 'Unknown error occurred';
  }

  /**
   * Format an Error object into a readable message
   */
  private formatError(error: Error): string {
    const message = error.message;
    const stack = error.stack;

    // Extract line and column information if available
    const locationMatch = message.match(/at position (\d+)/);
    if (locationMatch) {
      const position = parseInt(locationMatch[1], 10);
      return `${message} (position: ${position})`;
    }

    // Extract line and column from stack trace if available
    if (stack) {
      const stackLines = stack.split('\n');
      for (const line of stackLines) {
        const match = line.match(/\((.+):(\d+):(\d+)\)/);
        if (match) {
          const [, file, line, column] = match;
          return `${message} (${file}:${line}:${column})`;
        }
      }
    }

    return message;
  }

  /**
   * Log error with context
   */
  public logError(error: Error, context?: Record<string, any>): void {
    const timestamp = new Date().toISOString();
    const severity = this.errorAnalyzers.getErrorSeverity(error);
    const contextStr = context ? ` - Context: ${JSON.stringify(context)}` : '';

    console.error(
      `[${timestamp}] [${severity.toUpperCase()}] ${error.message}${contextStr}`
    );

    if (error.stack) {
      console.error(error.stack);
    }
  }

  /**
   * Create user-friendly error message
   */
  public createUserFriendlyMessage(error: Error): string {
    const message = error.message.toLowerCase();

    if (message.includes('syntax error')) {
      return 'There is a syntax error in your LaTeX expression. Please check for missing braces, brackets, or invalid commands.';
    }

    if (message.includes('parsing error')) {
      return 'The LaTeX expression could not be parsed. Please verify that all commands and environments are properly formatted.';
    }

    if (message.includes('validation error')) {
      return 'The input contains invalid characters or structure. Please check your LaTeX expression.';
    }

    if (message.includes('conversion error')) {
      return 'An error occurred during conversion. Please try simplifying your expression or check for unsupported features.';
    }

    if (message.includes('mathml generation error')) {
      return 'An error occurred while generating MathML. Please check your LaTeX expression for compatibility.';
    }

    return 'An unexpected error occurred. Please try again or contact support if the problem persists.';
  }

  // Delegate to error creators
  public createError(message: string, context?: Record<string, any>): Error {
    return this.errorCreators.createError(message, context);
  }

  public createSyntaxError(
    message: string,
    position?: number,
    line?: number,
    column?: number
  ): Error {
    return this.errorCreators.createSyntaxError(
      message,
      position,
      line,
      column
    );
  }

  public createParsingError(
    message: string,
    token?: string,
    expected?: string
  ): Error {
    return this.errorCreators.createParsingError(message, token, expected);
  }

  public createValidationError(
    message: string,
    field?: string,
    value?: any
  ): Error {
    return this.errorCreators.createValidationError(message, field, value);
  }

  public createConversionError(
    message: string,
    latex?: string,
    step?: string
  ): Error {
    return this.errorCreators.createConversionError(message, latex, step);
  }

  public createMathMLError(message: string, node?: any): Error {
    return this.errorCreators.createMathMLError(message, node);
  }

  // Delegate to error analyzers
  public isRecoverableError(error: Error): boolean {
    return this.errorAnalyzers.isRecoverableError(error);
  }

  public getErrorSeverity(
    error: Error
  ): 'low' | 'medium' | 'high' | 'critical' {
    return this.errorAnalyzers.getErrorSeverity(error);
  }

  public groupErrors(errors: Error[]): Record<string, Error[]> {
    return this.errorAnalyzers.groupErrors(errors);
  }

  public getErrorSummary(errors: Error[]): {
    total: number;
    bySeverity: Record<string, number>;
    byType: Record<string, number>;
  } {
    return this.errorAnalyzers.getErrorSummary(errors);
  }
}
