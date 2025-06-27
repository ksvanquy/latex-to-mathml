/**
 * Basic Expressions Parser - Handles symbols, numbers, and basic elements
 */

import {
  LaTeXToken,
  MathMLNode,
  ParseContext,
  ConversionOptions,
} from '../../core/types';
import { MATHML_ELEMENTS } from '../../core/constants';

export class BasicExpressionParser {
  /**
   * Parse a symbol
   */
  public parseSymbol(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    const token: LaTeXToken = context.tokens[context.position];
    if (!token || token.type !== 'symbol') {
      throw new Error('Expected symbol token');
    }

    // Log symbol parsing for debugging
    if (options.debugMode) {
      console.log(
        `Parsing symbol: ${token.value} at position ${token.position}`
      );
    }

    context.position++;

    // Check if it's a mathematical operator
    if (this.isOperator(token.value)) {
      const element = this.createElement(MATHML_ELEMENTS.MO, {}, [
        this.createText(token.value),
      ]);

      // Add debug information if enabled
      if (options.debugMode) {
        element.attributes = {
          ...element.attributes,
          'data-symbol-type': 'operator',
          'data-parse-position': token.position.toString(),
        };
      }

      return element;
    }

    // Check if it's a variable (letter)
    if (this.isVariable(token.value)) {
      const element = this.createElement(MATHML_ELEMENTS.MI, {}, [
        this.createText(token.value),
      ]);

      // Add debug information if enabled
      if (options.debugMode) {
        element.attributes = {
          ...element.attributes,
          'data-symbol-type': 'variable',
          'data-parse-position': token.position.toString(),
        };
      }

      return element;
    }

    // Default to text
    const element = this.createElement(MATHML_ELEMENTS.MTEXT, {}, [
      this.createText(token.value),
    ]);

    // Add debug information if enabled
    if (options.debugMode) {
      element.attributes = {
        ...element.attributes,
        'data-symbol-type': 'text',
        'data-parse-position': token.position.toString(),
      };
    }

    return element;
  }

  /**
   * Parse a number
   */
  public parseNumber(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    const token: LaTeXToken = context.tokens[context.position];
    if (!token || token.type !== 'number') {
      throw new Error('Expected number token');
    }

    // Log number parsing for debugging
    if (options.debugMode) {
      console.log(
        `Parsing number: ${token.value} at position ${token.position}`
      );
    }

    context.position++;

    const element = this.createElement(MATHML_ELEMENTS.MN, {}, [
      this.createText(token.value),
    ]);

    // Add debug information if enabled
    if (options.debugMode) {
      element.attributes = {
        ...element.attributes,
        'data-number-value': token.value,
        'data-parse-position': token.position.toString(),
      };
    }

    return element;
  }

  /**
   * Check if symbol is an operator
   */
  private isOperator(symbol: string): boolean {
    const operators = [
      '+',
      '-',
      '*',
      '/',
      '=',
      '<',
      '>',
      '≤',
      '≥',
      '≠',
      '≈',
      '±',
      '∓',
      '×',
      '÷',
      '⋅',
      '∘',
      '⊕',
      '⊗',
    ];
    return operators.includes(symbol);
  }

  /**
   * Check if symbol is a variable (letter)
   */
  private isVariable(symbol: string): boolean {
    return /^[a-zA-Z]$/.test(symbol);
  }

  /**
   * Create an element node
   */
  private createElement(
    name: string,
    attributes: Record<string, string> = {},
    children: MathMLNode[] = []
  ): MathMLNode {
    return {
      type: 'element',
      name,
      attributes,
      children,
    };
  }

  /**
   * Create a text node
   */
  private createText(content: string): MathMLNode {
    return {
      type: 'text',
      content,
    };
  }
}
