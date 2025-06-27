/**
 * Superscript and Subscript Parser
 */

import {
  LaTeXToken,
  MathMLNode,
  ParseContext,
  ConversionOptions,
} from '../../core/types';
import { MATHML_ELEMENTS } from '../../core/constants';

export class SuperscriptSubscriptParser {
  /**
   * Parse a superscript
   */
  public parseSuperscript(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    context.position++; // Consume ^ token

    // Get the base expression (previous token)
    const baseToken = context.tokens[context.position - 2];
    if (!baseToken) {
      throw new Error('No base expression for superscript');
    }

    // Parse the superscript expression
    const superscriptToken = context.tokens[context.position];
    if (!superscriptToken) {
      throw new Error('Expected superscript expression');
    }

    // For now, create a simple superscript
    // In a full implementation, this would parse the entire superscript expression
    const base = this.createText(baseToken.value);
    const sup = this.createText(superscriptToken.value);
    context.position++;

    return this.createElement(MATHML_ELEMENTS.MSUP, {}, [base, sup]);
  }

  /**
   * Parse a subscript
   */
  public parseSubscript(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    context.position++; // Consume _ token

    // Get the base expression (previous token)
    const baseToken = context.tokens[context.position - 2];
    if (!baseToken) {
      throw new Error('No base expression for subscript');
    }

    // Parse the subscript expression
    const subscriptToken = context.tokens[context.position];
    if (!subscriptToken) {
      throw new Error('Expected subscript expression');
    }

    // For now, create a simple subscript
    // In a full implementation, this would parse the entire subscript expression
    const base = this.createText(baseToken.value);
    const sub = this.createText(subscriptToken.value);
    context.position++;

    return this.createElement(MATHML_ELEMENTS.MSUB, {}, [base, sub]);
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
