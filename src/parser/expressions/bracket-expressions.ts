/**
 * Bracket Expressions Parser - Handles braces and brackets
 */

import {
  LaTeXToken,
  MathMLNode,
  ParseContext,
  ConversionOptions,
} from '../../core/types';
import { MATHML_ELEMENTS } from '../../core/constants';

export class BracketExpressionParser {
  /**
   * Parse a brace
   */
  public parseBrace(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    const token: LaTeXToken = context.tokens[context.position];
    if (!token || token.type !== 'brace') {
      throw new Error('Expected brace token');
    }

    // Log brace parsing for debugging
    if (options.debugMode) {
      console.log(
        `Parsing brace: ${token.value} at position ${token.position}`
      );
    }

    context.position++;

    if (token.value === '{') {
      // Parse grouped expression
      const children: MathMLNode[] = [];

      while (context.position < context.tokens.length) {
        const nextToken: LaTeXToken = context.tokens[context.position];
        if (
          nextToken &&
          nextToken.type === 'brace' &&
          nextToken.value === '}'
        ) {
          context.position++; // Consume closing brace
          break;
        }

        // This would need to call the main expression parser
        // For now, we'll create a placeholder
        const child = this.createText(nextToken?.value || '');
        if (child) {
          children.push(child);
        }
        context.position++;
      }

      if (children.length === 0) {
        return this.createText('');
      }

      if (children.length === 1) {
        return children[0];
      }

      const element = this.createElement(MATHML_ELEMENTS.MROW, {}, children);

      // Add debug information if enabled
      if (options.debugMode) {
        element.attributes = {
          ...element.attributes,
          'data-brace-type': 'grouping',
          'data-parse-position': token.position.toString(),
        };
      }

      return element;
    } else {
      // Closing brace - should be handled by caller
      return this.createText(token.value);
    }
  }

  /**
   * Parse a bracket
   */
  public parseBracket(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    const token: LaTeXToken = context.tokens[context.position];
    if (!token || token.type !== 'bracket') {
      throw new Error('Expected bracket token');
    }

    // Log bracket parsing for debugging
    if (options.debugMode) {
      console.log(
        `Parsing bracket: ${token.value} at position ${token.position}`
      );
    }

    context.position++;

    if (token.value === '[') {
      // Parse bracketed expression
      const children: MathMLNode[] = [];

      while (context.position < context.tokens.length) {
        const nextToken: LaTeXToken = context.tokens[context.position];
        if (
          nextToken &&
          nextToken.type === 'bracket' &&
          nextToken.value === ']'
        ) {
          context.position++; // Consume closing bracket
          break;
        }

        // This would need to call the main expression parser
        // For now, we'll create a placeholder
        const child = this.createText(nextToken?.value || '');
        if (child) {
          children.push(child);
        }
        context.position++;
      }

      const fenced = this.createElement(
        MATHML_ELEMENTS.MFENCED,
        {
          open: '[',
          close: ']',
        },
        children
      );

      // Add debug information if enabled
      if (options.debugMode) {
        fenced.attributes = {
          ...fenced.attributes,
          'data-bracket-type': 'fenced',
          'data-parse-position': token.position.toString(),
        };
      }

      return fenced;
    } else {
      // Closing bracket - should be handled by caller
      return this.createText(token.value);
    }
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
