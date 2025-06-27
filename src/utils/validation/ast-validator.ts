/**
 * AST Validation - MathML AST validation
 */

import { MathMLNode } from '../../core/types';

export class ASTValidator {
  /**
   * Validate MathML AST
   */
  public validateAST(ast: MathMLNode): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    try {
      this.validateNode(ast, errors);
    } catch (error) {
      errors.push(
        `AST validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate a single AST node
   */
  private validateNode(node: MathMLNode, errors: string[]): void {
    if (!node) {
      errors.push('Node is null or undefined');
      return;
    }

    if (typeof node !== 'object') {
      errors.push('Node must be an object');
      return;
    }

    if (node.type === 'text') {
      this.validateTextNode(node, errors);
    } else if (node.type === 'element') {
      this.validateElementNode(node, errors);
    } else {
      errors.push(`Unknown node type: ${(node as any).type}`);
    }
  }

  /**
   * Validate text node
   */
  private validateTextNode(node: MathMLNode, errors: string[]): void {
    if (typeof node.content !== 'string') {
      errors.push('Text node content must be a string');
    }

    if (node.name || node.attributes || node.children) {
      errors.push('Text node should not have name, attributes, or children');
    }
  }

  /**
   * Validate element node
   */
  private validateElementNode(node: MathMLNode, errors: string[]): void {
    if (!node.name) {
      errors.push('Element node must have a name');
      return;
    }

    if (typeof node.name !== 'string') {
      errors.push('Element name must be a string');
      return;
    }

    // Validate element name
    if (!this.isValidElementName(node.name)) {
      errors.push(`Invalid element name: ${node.name}`);
    }

    // Validate attributes
    if (node.attributes) {
      this.validateAttributes(node.attributes, errors);
    }

    // Validate children
    if (node.children) {
      if (!Array.isArray(node.children)) {
        errors.push('Children must be an array');
      } else {
        for (let i = 0; i < node.children.length; i++) {
          try {
            this.validateNode(node.children[i], errors);
          } catch (error) {
            errors.push(
              `Error validating child ${i}: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
          }
        }
      }
    }

    // Validate content
    if (node.content && node.type === 'element') {
      errors.push('Element node should not have content property');
    }
  }

  /**
   * Validate attributes
   */
  private validateAttributes(
    attributes: Record<string, string>,
    errors: string[]
  ): void {
    for (const [key, value] of Object.entries(attributes)) {
      if (typeof key !== 'string') {
        errors.push('Attribute key must be a string');
      }

      if (typeof value !== 'string') {
        errors.push(`Attribute value for '${key}' must be a string`);
      }

      if (!this.isValidAttributeName(key)) {
        errors.push(`Invalid attribute name: ${key}`);
      }

      if (!this.isValidAttributeValue(value)) {
        errors.push(`Invalid attribute value for '${key}': ${value}`);
      }
    }
  }

  /**
   * Check if element name is valid
   */
  private isValidElementName(name: string): boolean {
    // Basic validation: element name should be a valid XML name
    return /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(name);
  }

  /**
   * Check if attribute name is valid
   */
  private isValidAttributeName(name: string): boolean {
    // Basic validation: attribute name should be a valid XML name
    return /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(name);
  }

  /**
   * Check if attribute value is valid
   */
  private isValidAttributeValue(value: string): boolean {
    // Basic validation: attribute value should not contain unescaped quotes
    return !value.includes('"') || value.includes('&quot;');
  }
}
