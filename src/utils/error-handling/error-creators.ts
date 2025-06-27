/**
 * Error Creators - Factory methods for creating different types of errors
 */

export class ErrorCreators {
  /**
   * Create a custom error with context
   */
  public createError(message: string, context?: Record<string, any>): Error {
    const errorMessage = context
      ? `${message} - Context: ${JSON.stringify(context)}`
      : message;

    return new Error(errorMessage);
  }

  /**
   * Create a syntax error
   */
  public createSyntaxError(
    message: string,
    position?: number,
    line?: number,
    column?: number
  ): Error {
    let errorMessage = `Syntax Error: ${message}`;

    if (position !== undefined) {
      errorMessage += ` at position ${position}`;
    }

    if (line !== undefined && column !== undefined) {
      errorMessage += ` (line ${line}, column ${column})`;
    }

    return new Error(errorMessage);
  }

  /**
   * Create a parsing error
   */
  public createParsingError(
    message: string,
    token?: string,
    expected?: string
  ): Error {
    let errorMessage = `Parsing Error: ${message}`;

    if (token && expected) {
      errorMessage += ` - Expected '${expected}' but found '${token}'`;
    } else if (token) {
      errorMessage += ` - Unexpected token: '${token}'`;
    }

    return new Error(errorMessage);
  }

  /**
   * Create a validation error
   */
  public createValidationError(
    message: string,
    field?: string,
    value?: any
  ): Error {
    let errorMessage = `Validation Error: ${message}`;

    if (field) {
      errorMessage += ` - Field: ${field}`;
    }

    if (value !== undefined) {
      errorMessage += ` - Value: ${JSON.stringify(value)}`;
    }

    return new Error(errorMessage);
  }

  /**
   * Create a conversion error
   */
  public createConversionError(
    message: string,
    latex?: string,
    step?: string
  ): Error {
    let errorMessage = `Conversion Error: ${message}`;

    if (step) {
      errorMessage += ` - Step: ${step}`;
    }

    if (latex) {
      const truncatedLatex =
        latex.length > 50 ? latex.substring(0, 50) + '...' : latex;
      errorMessage += ` - LaTeX: "${truncatedLatex}"`;
    }

    return new Error(errorMessage);
  }

  /**
   * Create a MathML generation error
   */
  public createMathMLError(message: string, node?: any): Error {
    let errorMessage = `MathML Generation Error: ${message}`;

    if (node) {
      const nodeInfo =
        typeof node === 'object' ? JSON.stringify(node, null, 2) : String(node);
      errorMessage += ` - Node: ${nodeInfo}`;
    }

    return new Error(errorMessage);
  }
}
