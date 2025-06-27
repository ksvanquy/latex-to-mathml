/**
 * MathML Generator - Converts AST to MathML string
 */

import { MathMLNode, ConversionResult } from '../core/types';
import { MATHML_NAMESPACE } from '../core/constants';
import * as xmlbuilder from 'xmlbuilder';

export class MathMLGenerator {
  /**
   * Generate MathML string from AST
   */
  public generate(
    node: MathMLNode,
    options: { displayMode?: boolean; debugMode?: boolean } = {}
  ): ConversionResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Validate node before generation
      const validation = this.validate(node);
      if (!validation.isValid) {
        errors.push(...validation.errors);
        warnings.push(
          'Node validation failed, but attempting to generate MathML anyway'
        );
      }

      const mathmlString = this.generateNode(node, options);

      // Log generation result for debugging
      if (options.debugMode) {
        console.log(`Generated MathML: ${mathmlString.substring(0, 100)}...`);
      }

      return {
        mathml: mathmlString,
        errors,
        warnings,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown error during MathML generation';
      errors.push(errorMessage);

      return {
        mathml: '',
        errors,
        warnings,
      };
    }
  }

  /**
   * Generate MathML string from a single node
   */
  private generateNode(
    node: MathMLNode,
    options: { displayMode?: boolean } = {}
  ): string {
    if (node.type === 'text') {
      return this.escapeXml(node.content || '');
    }

    if (node.type === 'element') {
      return this.generateElement(node, options);
    }

    throw new Error(`Unknown node type: ${(node as any).type}`);
  }

  /**
   * Generate MathML string from an element node
   */
  private generateElement(
    node: MathMLNode,
    options: { displayMode?: boolean } = {}
  ): string {
    if (node.type !== 'element' || !node.name) {
      throw new Error('Invalid element node');
    }

    // Special handling for root math element
    if (node.name === 'math') {
      return this.generateMathElement(node, options);
    }

    // Create XML element
    const element = xmlbuilder.create(node.name);

    // Add attributes
    if (node.attributes) {
      for (const [key, value] of Object.entries(node.attributes)) {
        element.att(key, value);
      }
    }

    // Add children
    if (node.children) {
      for (const child of node.children) {
        const childString = this.generateNode(child, options);
        element.raw(childString);
      }
    }

    return element.end({ pretty: false });
  }

  /**
   * Generate MathML string for the root math element
   */
  private generateMathElement(
    node: MathMLNode,
    options: { displayMode?: boolean } = {}
  ): string {
    if (node.type !== 'element' || node.name !== 'math') {
      throw new Error('Expected math element');
    }

    const element = xmlbuilder.create('math');

    // Add MathML namespace
    element.att('xmlns', MATHML_NAMESPACE);

    // Add display mode attribute
    if (options.displayMode) {
      element.att('display', 'block');
    } else {
      element.att('display', 'inline');
    }

    // Add other attributes
    if (node.attributes) {
      for (const [key, value] of Object.entries(node.attributes)) {
        if (key !== 'xmlns' && key !== 'display') {
          element.att(key, value);
        }
      }
    }

    // Add children
    if (node.children) {
      for (const child of node.children) {
        const childString = this.generateNode(child, options);
        element.raw(childString);
      }
    }

    return element.end({ pretty: false });
  }

  /**
   * Escape XML special characters
   */
  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Generate a complete MathML document
   */
  public generateDocument(
    node: MathMLNode,
    options: { displayMode?: boolean } = {}
  ): string {
    const mathml = this.generateNode(node, options);

    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE math PUBLIC "-//W3C//DTD MathML 3.0//EN" "http://www.w3.org/Math/DTD/mathml3/mathml3.dtd">
${mathml}`;
  }

  /**
   * Generate HTML with embedded MathML
   */
  public generateHTML(
    node: MathMLNode,
    options: { displayMode?: boolean; title?: string } = {}
  ): string {
    const mathml = this.generateNode(node, options);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${options.title || 'LaTeX to MathML'}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.6;
        }
        .math-display {
            text-align: center;
            margin: 20px 0;
        }
        .math-inline {
            display: inline;
        }
    </style>
</head>
<body>
    <div class="${options.displayMode ? 'math-display' : 'math-inline'}">
        ${mathml}
    </div>
</body>
</html>`;
  }

  /**
   * Generate SVG representation of MathML
   */
  public generateSVG(
    node: MathMLNode,
    options: { width?: number; height?: number } = {}
  ): string {
    const mathml = this.generateNode(node);
    const width = options.width || 400;
    const height = options.height || 200;

    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
            ${mathml}
        </div>
    </foreignObject>
</svg>`;
  }

  /**
   * Validate MathML structure
   */
  public validate(node: MathMLNode): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    try {
      this.validateNode(node);
      return { isValid: true, errors: [] };
    } catch (error) {
      errors.push(
        error instanceof Error ? error.message : 'Unknown validation error'
      );
      return { isValid: false, errors };
    }
  }

  /**
   * Validate a single node
   */
  private validateNode(node: MathMLNode): void {
    if (node.type === 'text') {
      // Text nodes are always valid
      return;
    }

    if (node.type === 'element') {
      if (!node.name) {
        throw new Error('Element node must have a name');
      }

      // Validate children
      if (node.children) {
        for (const child of node.children) {
          this.validateNode(child);
        }
      }

      return;
    }

    throw new Error(`Unknown node type: ${(node as any).type}`);
  }

  /**
   * Pretty print MathML with indentation
   */
  public prettyPrint(
    node: MathMLNode,
    options: { displayMode?: boolean } = {}
  ): string {
    const mathml = this.generateNode(node, options);

    // Use xmlbuilder to pretty print
    const doc = xmlbuilder.create('temp');
    doc.raw(mathml);

    return doc.end({ pretty: true, indent: '  ' });
  }

  /**
   * Minify MathML by removing unnecessary whitespace
   */
  public minify(
    node: MathMLNode,
    options: { displayMode?: boolean } = {}
  ): string {
    const mathml = this.generateNode(node, options);

    // Remove unnecessary whitespace
    return mathml.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
  }
}
