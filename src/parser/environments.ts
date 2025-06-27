/**
 * Environment Parser - Handles LaTeX environments
 */

import {
  LaTeXToken,
  MathMLNode,
  ParseContext,
  ConversionOptions,
  EnvironmentHandler,
  EnvironmentRegistry,
} from '../core/types';
import { MathEnvironmentParser } from './environments/math-environments';
import { DocumentEnvironmentParser } from './environments/document-environments';
import { TextEnvironmentParser } from './environments/text-environments';

export class EnvironmentParser {
  private environmentRegistry: EnvironmentRegistry;
  private mathParser: MathEnvironmentParser;
  private documentParser: DocumentEnvironmentParser;
  private textParser: TextEnvironmentParser;

  constructor() {
    this.mathParser = new MathEnvironmentParser();
    this.documentParser = new DocumentEnvironmentParser();
    this.textParser = new TextEnvironmentParser();
    this.environmentRegistry = this.initializeEnvironmentRegistry();
  }

  /**
   * Parse a LaTeX environment
   */
  public parseEnvironment(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log environment parsing for debugging
    if (options.debugMode) {
      console.log(`Parsing environment at position ${context.position}`);
    }

    // Expect \begin{environment}
    const beginToken: LaTeXToken = context.tokens[context.position];
    if (
      !beginToken ||
      beginToken.type !== 'command' ||
      beginToken.value !== '\\begin'
    ) {
      throw new Error('Expected \\begin command');
    }

    context.position++; // Consume \begin

    // Expect opening brace
    const openBrace: LaTeXToken = context.tokens[context.position];
    if (!openBrace || openBrace.type !== 'brace' || openBrace.value !== '{') {
      throw new Error('Expected opening brace after \\begin');
    }

    context.position++; // Consume opening brace

    // Get environment name
    const envNameToken: LaTeXToken = context.tokens[context.position];
    if (!envNameToken || envNameToken.type !== 'symbol') {
      throw new Error('Expected environment name');
    }

    const environmentName = envNameToken.value;
    context.position++; // Consume environment name

    // Expect closing brace
    const closeBrace: LaTeXToken = context.tokens[context.position];
    if (
      !closeBrace ||
      closeBrace.type !== 'brace' ||
      closeBrace.value !== '}'
    ) {
      throw new Error('Expected closing brace after environment name');
    }

    context.position++; // Consume closing brace

    // Find the handler for this environment
    const handler: EnvironmentHandler | undefined =
      this.environmentRegistry[environmentName];
    if (!handler) {
      if (options.strictMode) {
        throw new Error(`Unknown environment: ${environmentName}`);
      }
      // Return as generic element if unknown environment is allowed
      return this.createGenericEnvironment(environmentName, context, options);
    }

    // Parse the environment content
    return handler(context, options);
  }

  /**
   * Initialize the environment registry with all supported environments
   */
  private initializeEnvironmentRegistry(): EnvironmentRegistry {
    return {
      // Mathematical environments
      equation: (context, options) =>
        this.mathParser.parseEquation(context, options),
      align: (context, options) => this.mathParser.parseAlign(context, options),
      gather: (context, options) =>
        this.mathParser.parseGather(context, options),
      multline: (context, options) =>
        this.mathParser.parseMultline(context, options),
      split: (context, options) => this.mathParser.parseSplit(context, options),
      cases: (context, options) => this.mathParser.parseCases(context, options),
      matrix: (context, options) =>
        this.mathParser.parseMatrix(context, options),
      pmatrix: (context, options) =>
        this.mathParser.parsePmatrix(context, options),
      bmatrix: (context, options) =>
        this.mathParser.parseBmatrix(context, options),
      vmatrix: (context, options) =>
        this.mathParser.parseVmatrix(context, options),
      Vmatrix: (context, options) =>
        this.mathParser.parseVmatrix(context, options),
      array: (context, options) => this.mathParser.parseArray(context, options),

      // Document environments
      tabular: (context, options) =>
        this.documentParser.parseTabular(context, options),
      table: (context, options) =>
        this.documentParser.parseTable(context, options),
      figure: (context, options) =>
        this.documentParser.parseFigure(context, options),
      abstract: (context, options) =>
        this.documentParser.parseAbstract(context, options),
      titlepage: (context, options) =>
        this.documentParser.parseTitlepage(context, options),
      document: (context, options) =>
        this.documentParser.parseDocument(context, options),
      article: (context, options) =>
        this.documentParser.parseArticle(context, options),
      book: (context, options) =>
        this.documentParser.parseBook(context, options),
      report: (context, options) =>
        this.documentParser.parseReport(context, options),
      letter: (context, options) =>
        this.documentParser.parseLetter(context, options),
      minipage: (context, options) =>
        this.documentParser.parseMinipage(context, options),
      picture: (context, options) =>
        this.documentParser.parsePicture(context, options),
      tikzpicture: (context, options) =>
        this.documentParser.parseTikzpicture(context, options),
      pgfpicture: (context, options) =>
        this.documentParser.parsePgfpicture(context, options),

      // Text environments
      theorem: (context, options) =>
        this.textParser.parseTheorem(context, options),
      lemma: (context, options) => this.textParser.parseLemma(context, options),
      proof: (context, options) => this.textParser.parseProof(context, options),
      definition: (context, options) =>
        this.textParser.parseDefinition(context, options),
      corollary: (context, options) =>
        this.textParser.parseCorollary(context, options),
      proposition: (context, options) =>
        this.textParser.parseProposition(context, options),
      remark: (context, options) =>
        this.textParser.parseRemark(context, options),
      example: (context, options) =>
        this.textParser.parseExample(context, options),
      exercise: (context, options) =>
        this.textParser.parseExercise(context, options),
      solution: (context, options) =>
        this.textParser.parseSolution(context, options),
      itemize: (context, options) =>
        this.textParser.parseItemize(context, options),
      enumerate: (context, options) =>
        this.textParser.parseEnumerate(context, options),
      description: (context, options) =>
        this.textParser.parseDescription(context, options),
      center: (context, options) =>
        this.textParser.parseCenter(context, options),
      flushleft: (context, options) =>
        this.textParser.parseFlushleft(context, options),
      flushright: (context, options) =>
        this.textParser.parseFlushright(context, options),
      quote: (context, options) => this.textParser.parseQuote(context, options),
      quotation: (context, options) =>
        this.textParser.parseQuotation(context, options),
      verse: (context, options) => this.textParser.parseVerse(context, options),
    };
  }

  /**
   * Create a generic environment for unknown environments
   */
  private createGenericEnvironment(
    environmentName: string,
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    const content = this.parseEnvironmentContent(context, environmentName);
    return this.createElement(
      'div',
      {
        class: `latex-${environmentName}`,
      },
      content ? [content] : []
    );
  }

  /**
   * Parse environment content until \end{environment}
   */
  private parseEnvironmentContent(
    context: ParseContext,
    environmentName: string
  ): MathMLNode | null {
    const startPosition = context.position;
    const content: MathMLNode[] = [];

    while (context.position < context.tokens.length) {
      const token = context.tokens[context.position];

      if (token.type === 'command' && token.value === '\\end') {
        context.position++; // Consume \end

        // Expect opening brace
        const openBrace = context.tokens[context.position];
        if (
          !openBrace ||
          openBrace.type !== 'brace' ||
          openBrace.value !== '{'
        ) {
          throw new Error('Expected opening brace after \\end');
        }

        context.position++; // Consume opening brace

        // Check environment name
        const endEnvToken = context.tokens[context.position];
        if (
          !endEnvToken ||
          endEnvToken.type !== 'symbol' ||
          endEnvToken.value !== environmentName
        ) {
          throw new Error(
            `Expected environment name '${environmentName}' after \\end`
          );
        }

        context.position++; // Consume environment name

        // Expect closing brace
        const closeBrace = context.tokens[context.position];
        if (
          !closeBrace ||
          closeBrace.type !== 'brace' ||
          closeBrace.value !== '}'
        ) {
          throw new Error('Expected closing brace after environment name');
        }

        context.position++; // Consume closing brace
        break;
      }

      // Parse the current token
      if (token.type === 'command') {
        // Handle commands
        content.push(this.createText(token.value));
      } else if (token.type === 'symbol') {
        content.push(this.createText(token.value));
      } else if (token.type === 'number') {
        content.push(
          this.createElement('mn', {}, [this.createText(token.value)])
        );
      } else {
        content.push(this.createText(token.value));
      }

      context.position++;
    }

    // Use startPosition for debugging or validation
    if (context.position === startPosition) {
      console.warn(
        `No content found in environment ${environmentName} starting at position ${startPosition}`
      );
    }

    if (content.length === 0) {
      return null;
    }

    if (content.length === 1) {
      return content[0];
    }

    // Wrap multiple content items in a row
    return this.createElement('mrow', {}, content);
  }

  /**
   * Helper method to create MathML element
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
   * Helper method to create text node
   */
  private createText(content: string): MathMLNode {
    return {
      type: 'text',
      content,
    };
  }
}
