/**
 * Expression Parser - Main expression parsing orchestrator
 */

import {
  LaTeXToken,
  MathMLNode,
  ParseContext,
  ConversionOptions,
} from '../core/types';
import { MATHML_ELEMENTS } from '../core/constants';
import { BasicExpressionParser } from './expressions/basic-expressions';
import { BracketExpressionParser } from './expressions/bracket-expressions';
import { SuperscriptSubscriptParser } from './expressions/superscript-subscript';

export class ExpressionParser {
  private basicParser: BasicExpressionParser;
  private bracketParser: BracketExpressionParser;
  private supSubParser: SuperscriptSubscriptParser;

  constructor() {
    this.basicParser = new BasicExpressionParser();
    this.bracketParser = new BracketExpressionParser();
    this.supSubParser = new SuperscriptSubscriptParser();
  }

  /**
   * Parse a mathematical expression
   */
  public parseExpression(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    const children: MathMLNode[] = [];

    while (context.position < context.tokens.length) {
      const token = context.tokens[context.position];

      if (!token) break;

      let node: MathMLNode;

      switch (token.type) {
        case 'command':
          node = this.parseCommand(context, options);
          break;
        case 'symbol':
          node = this.basicParser.parseSymbol(context, options);
          break;
        case 'number':
          node = this.basicParser.parseNumber(context, options);
          break;
        case 'brace':
          node = this.bracketParser.parseBrace(context, options);
          break;
        case 'bracket':
          node = this.bracketParser.parseBracket(context, options);
          break;
        default:
          // Skip unknown tokens
          context.position++;
          continue;
      }

      if (node) {
        children.push(node);
      }
    }

    if (children.length === 0) {
      return this.createText('');
    }

    if (children.length === 1) {
      return children[0];
    }

    // Wrap multiple children in a row
    return this.createElement(MATHML_ELEMENTS.MROW, {}, children);
  }

  /**
   * Parse a command
   */
  private parseCommand(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    const token: LaTeXToken = context.tokens[context.position];
    if (!token || token.type !== 'command') {
      throw new Error('Expected command token');
    }

    // Log command parsing for debugging
    if (options.debugMode) {
      console.log(
        `Parsing command: ${token.value} at position ${token.position}`
      );
    }

    // Handle special commands
    switch (token.value) {
      case '\\begin':
        return this.parseEnvironment(context, options);
      case '\\left':
        return this.parseLeftDelimiter(context, options);
      case '\\right':
        return this.parseRightDelimiter(context, options);
      case '^':
        return this.supSubParser.parseSuperscript(context, options);
      case '_':
        return this.supSubParser.parseSubscript(context, options);
      default:
        // Handle other commands
        context.position++;
        return this.createText(token.value);
    }
  }

  /**
   * Parse environment (placeholder)
   */
  private parseEnvironment(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log environment parsing for debugging
    if (options.debugMode) {
      console.log(`Parsing environment at position ${context.position}`);
    }

    context.position++;

    // Create a placeholder element with debug information
    const placeholder = this.createElement(
      'mtext',
      {
        'data-type': 'environment-placeholder',
        'data-position': context.position.toString(),
      },
      [this.createText('\\begin{...}')]
    );

    return placeholder;
  }

  /**
   * Parse left delimiter (placeholder)
   */
  private parseLeftDelimiter(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log left delimiter parsing for debugging
    if (options.debugMode) {
      console.log(`Parsing left delimiter at position ${context.position}`);
    }

    context.position++;

    // Create a placeholder element with debug information
    const placeholder = this.createElement(
      'mo',
      {
        'data-type': 'left-delimiter',
        'data-position': context.position.toString(),
      },
      [this.createText('\\left')]
    );

    return placeholder;
  }

  /**
   * Parse right delimiter (placeholder)
   */
  private parseRightDelimiter(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log right delimiter parsing for debugging
    if (options.debugMode) {
      console.log(`Parsing right delimiter at position ${context.position}`);
    }

    context.position++;

    // Create a placeholder element with debug information
    const placeholder = this.createElement(
      'mo',
      {
        'data-type': 'right-delimiter',
        'data-position': context.position.toString(),
      },
      [this.createText('\\right')]
    );

    return placeholder;
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
