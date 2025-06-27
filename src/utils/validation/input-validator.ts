/**
 * Input Validation - LaTeX input string validation
 */

export class InputValidator {
  /**
   * Validate LaTeX input string
   */
  public validateInput(latex: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check if input is a string
    if (typeof latex !== 'string') {
      errors.push('Input must be a string');
      return { isValid: false, errors };
    }

    // Check if input is empty
    if (latex.trim().length === 0) {
      errors.push('Input cannot be empty');
      return { isValid: false, errors };
    }

    // Check for null bytes
    if (latex.includes('\0')) {
      errors.push('Input contains null bytes');
      return { isValid: false, errors };
    }

    // Check for invalid Unicode characters
    if (!this.isValidUnicode(latex)) {
      errors.push('Input contains invalid Unicode characters');
      return { isValid: false, errors };
    }

    // Check for balanced braces
    if (!this.hasBalancedBraces(latex)) {
      errors.push('Unmatched braces in LaTeX input');
      return { isValid: false, errors };
    }

    // Check for balanced brackets
    if (!this.hasBalancedBrackets(latex)) {
      errors.push('Unmatched brackets in LaTeX input');
      return { isValid: false, errors };
    }

    // Check for balanced parentheses
    if (!this.hasBalancedParentheses(latex)) {
      errors.push('Unmatched parentheses in LaTeX input');
      return { isValid: false, errors };
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Check if string contains valid Unicode
   */
  private isValidUnicode(str: string): boolean {
    try {
      // Try to encode and decode the string
      const encoded = encodeURIComponent(str);
      const decoded = decodeURIComponent(encoded);
      return decoded === str;
    } catch {
      return false;
    }
  }

  /**
   * Check if string has balanced braces
   */
  private hasBalancedBraces(str: string): boolean {
    let count = 0;
    for (const char of str) {
      if (char === '{') count++;
      if (char === '}') count--;
      if (count < 0) return false;
    }
    return count === 0;
  }

  /**
   * Check if string has balanced brackets
   */
  private hasBalancedBrackets(str: string): boolean {
    let count = 0;
    for (const char of str) {
      if (char === '[') count++;
      if (char === ']') count--;
      if (count < 0) return false;
    }
    return count === 0;
  }

  /**
   * Check if string has balanced parentheses
   */
  private hasBalancedParentheses(str: string): boolean {
    let count = 0;
    for (const char of str) {
      if (char === '(') count++;
      if (char === ')') count--;
      if (count < 0) return false;
    }
    return count === 0;
  }
}
