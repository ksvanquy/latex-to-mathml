/**
 * LaTeX Parser - Parses tokens into Abstract Syntax Tree
 */

import {
  LaTeXToken,
  MathMLNode,
  ParseContext,
  ConversionOptions,
} from '../core/types';
import { LaTeXLexer } from './lexer';
import { CommandParser } from './commands';
import { EnvironmentParser } from './environments';
import { ExpressionParser } from './expressions';

export class LaTeXParser {
  private lexer: LaTeXLexer;
  private commandParser: CommandParser;
  private environmentParser: EnvironmentParser;
  private expressionParser: ExpressionParser;

  constructor() {
    this.lexer = new LaTeXLexer('');
    this.commandParser = new CommandParser();
    this.environmentParser = new EnvironmentParser();
    this.expressionParser = new ExpressionParser();
  }

  /**
   * Parse LaTeX string into MathML AST
   */
  public parse(latex: string, options: ConversionOptions = {}): MathMLNode {
    // Tokenize the input
    this.lexer = new LaTeXLexer(latex);
    const tokens = this.lexer.tokenize();

    // Create parse context
    const context: ParseContext = {
      tokens,
      position: 0,
      scope: [],
    };

    // Parse the expression
    return this.expressionParser.parseExpression(context, options);
  }

  /**
   * Parse a single command
   */
  public parseCommand(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    return this.commandParser.parseCommand(context, options);
  }

  /**
   * Parse an environment
   */
  public parseEnvironment(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    return this.environmentParser.parseEnvironment(context, options);
  }

  /**
   * Get current token without advancing
   */
  public peek(context: ParseContext): LaTeXToken | null {
    if (context.position >= context.tokens.length) {
      return null;
    }
    return context.tokens[context.position];
  }

  /**
   * Get current token and advance
   */
  public consume(context: ParseContext): LaTeXToken | null {
    const token = this.peek(context);
    if (token) {
      context.position++;
    }
    return token;
  }

  /**
   * Check if current token matches expected type and value
   */
  public match(context: ParseContext, type: string, value?: string): boolean {
    const token = this.peek(context);
    if (!token) return false;

    if (token.type !== type) return false;
    if (value !== undefined && token.value !== value) return false;

    return true;
  }

  /**
   * Expect a specific token type and value
   */
  public expect(
    context: ParseContext,
    type: string,
    value?: string
  ): LaTeXToken {
    const token = this.consume(context);
    if (!token) {
      throw new Error(
        `Expected ${type}${value ? ` '${value}'` : ''} but found end of input`
      );
    }

    if (token.type !== type) {
      throw new Error(`Expected ${type} but found ${token.type}`);
    }

    if (value !== undefined && token.value !== value) {
      throw new Error(`Expected '${value}' but found '${token.value}'`);
    }

    return token;
  }

  /**
   * Skip tokens until a specific condition is met
   */
  public skipUntil(
    context: ParseContext,
    predicate: (token: LaTeXToken) => boolean
  ): void {
    while (context.position < context.tokens.length) {
      const token = this.peek(context);
      if (token && predicate(token)) {
        break;
      }
      this.consume(context);
    }
  }

  /**
   * Check if we're at the end of tokens
   */
  public isEOF(context: ParseContext): boolean {
    return context.position >= context.tokens.length;
  }

  /**
   * Get remaining tokens
   */
  public getRemainingTokens(context: ParseContext): LaTeXToken[] {
    return context.tokens.slice(context.position);
  }

  /**
   * Create a MathML element node
   */
  public createElement(
    name: string,
    attributes?: Record<string, string>
  ): MathMLNode {
    return {
      type: 'element',
      name,
      attributes,
      children: [],
    };
  }

  /**
   * Create a MathML text node
   */
  public createText(content: string): MathMLNode {
    return {
      type: 'text',
      content,
    };
  }

  /**
   * Add child to a MathML element
   */
  public addChild(parent: MathMLNode, child: MathMLNode): void {
    if (parent.type === 'element' && parent.children) {
      parent.children.push(child);
    }
  }

  /**
   * Set attribute on a MathML element
   */
  public setAttribute(element: MathMLNode, name: string, value: string): void {
    if (element.type === 'element') {
      if (!element.attributes) {
        element.attributes = {};
      }
      element.attributes[name] = value;
    }
  }
}
