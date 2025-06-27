/**
 * MathML Structure Validation - MathML-specific structure validation
 */

import { MathMLNode } from '../../core/types';

export class MathMLStructureValidator {
  /**
   * Validate MathML structure
   */
  public validateMathMLStructure(ast: MathMLNode): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check if root element is math
    if (ast.type !== 'element' || ast.name !== 'math') {
      errors.push('Root element must be <math>');
      return { isValid: false, errors };
    }

    // Check for xmlns attribute
    if (
      !ast.attributes?.xmlns ||
      ast.attributes.xmlns !== 'http://www.w3.org/1998/Math/MathML'
    ) {
      errors.push('Math element must have xmlns attribute');
    }

    // Validate children
    if (ast.children) {
      for (const child of ast.children) {
        this.validateMathMLElement(child, errors);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate MathML element
   */
  private validateMathMLElement(node: MathMLNode, errors: string[]): void {
    if (node.type !== 'element') {
      errors.push('MathML element must be an element node');
      return;
    }

    // Check if element name is valid MathML
    const validMathMLElements = [
      'math',
      'mrow',
      'mi',
      'mo',
      'mn',
      'mtext',
      'mfrac',
      'msqrt',
      'mroot',
      'msub',
      'msup',
      'msubsup',
      'munder',
      'mover',
      'munderover',
      'mtable',
      'mtr',
      'mtd',
      'mfenced',
      'mglyph',
      'mspace',
      'mstyle',
      'mpadded',
      'mphantom',
      'mscarries',
      'mscarry',
      'msgroup',
      'msline',
      'mlabeledtr',
      'maligngroup',
      'malignmark',
      'mlongdiv',
      'msemantics',
      'mannotation',
      'maction',
    ];

    if (!validMathMLElements.includes(node.name || '')) {
      errors.push(`Invalid MathML element: ${node.name}`);
      return;
    }

    // Validate element-specific requirements
    this.validateElementRequirements(node, errors);

    // Validate children recursively
    if (node.children) {
      for (const child of node.children) {
        this.validateMathMLElement(child, errors);
      }
    }
  }

  /**
   * Validate element-specific requirements
   */
  private validateElementRequirements(
    node: MathMLNode,
    errors: string[]
  ): void {
    const name = node.name || '';
    const children = node.children || [];

    // Check specific element requirements
    switch (name) {
      case 'mfrac':
        if (children.length !== 2) {
          errors.push('<mfrac> must have exactly 2 children');
        }
        break;

      case 'msub':
      case 'msup':
        if (children.length !== 2) {
          errors.push(`<${name}> must have exactly 2 children`);
        }
        break;

      case 'msubsup':
        if (children.length !== 3) {
          errors.push('<msubsup> must have exactly 3 children');
        }
        break;

      case 'munder':
      case 'mover':
        if (children.length !== 2) {
          errors.push(`<${name}> must have exactly 2 children`);
        }
        break;

      case 'munderover':
        if (children.length !== 3) {
          errors.push('<munderover> must have exactly 3 children');
        }
        break;

      case 'mtable':
        if (children.length === 0) {
          errors.push('<mtable> must have at least one child');
        }
        break;

      case 'mtr':
        if (children.length === 0) {
          errors.push('<mtr> must have at least one child');
        }
        break;
    }
  }
}
