/**
 * Base Command Parser - Common functionality for command parsing
 */

import { MathMLNode, ParseContext, ConversionOptions } from '../../core/types';

export abstract class BaseCommandParser {
  /**
   * Helper method to create MathML element
   */
  protected createElement(name: string, attributes: Record<string, string> = {}, children: MathMLNode[] = []): MathMLNode {
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