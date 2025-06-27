/**
 * Base Environment Parser - Common functionality for environment parsing
 */

import {
  LaTeXToken,
  MathMLNode,
  ParseContext,
  ConversionOptions,
} from '../../core/types';

export abstract class BaseEnvironmentParser {
  /**
   * Parse environment content until \end{environment}
   */
  protected parseEnvironmentContent(
    context: ParseContext,
    environmentName: string
  ): MathMLNode | null {
    const startPosition = context.position;
    const content: MathMLNode[] = [];

    while (context.position < context.tokens.length) {
      const token: LaTeXToken = context.tokens[context.position];

      if (token.type === 'command' && token.value === '\\end') {
        context.position++; // Consume \end

        // Expect opening brace
        const openBrace: LaTeXToken = context.tokens[context.position];
        if (
          !openBrace ||
          openBrace.type !== 'brace' ||
          openBrace.value !== '{'
        ) {
          throw new Error('Expected opening brace after \\end');
        }

        context.position++; // Consume opening brace

        // Check environment name
        const endEnvToken: LaTeXToken = context.tokens[context.position];
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
        const closeBrace: LaTeXToken = context.tokens[context.position];
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
   * Create a generic environment for unknown environments
   */
  protected createGenericEnvironment(
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
   * Helper method to create MathML element
   */
  protected createElement(
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
  protected createText(content: string): MathMLNode {
    return {
      type: 'text',
      content,
    };
  }

  /**
   * Helper method to add child to element
   */
  protected addChild(parent: MathMLNode, child: MathMLNode): void {
    if (parent.type === 'element' && parent.children) {
      parent.children.push(child);
    }
  }
}
