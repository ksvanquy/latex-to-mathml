/**
 * Document Environment Handlers
 */

import { MathMLNode, ParseContext, ConversionOptions } from '../../core/types';
import { BaseEnvironmentParser } from './base-environment-parser';

export class DocumentEnvironmentParser extends BaseEnvironmentParser {
  /**
   * Parse tabular environment
   */
  public parseTabular(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'tabular');
    return this.createElement('table', {
      class: 'latex-tabular'
    }, content ? [content] : []);
  }

  /**
   * Parse table environment
   */
  public parseTable(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'table');
    return this.createElement('table', {
      class: 'latex-table'
    }, content ? [content] : []);
  }

  /**
   * Parse figure environment
   */
  public parseFigure(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'figure');
    return this.createElement('figure', {
      class: 'latex-figure'
    }, content ? [content] : []);
  }

  /**
   * Parse abstract environment
   */
  public parseAbstract(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'abstract');
    return this.createElement('div', {
      class: 'latex-abstract'
    }, content ? [content] : []);
  }

  /**
   * Parse titlepage environment
   */
  public parseTitlepage(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'titlepage');
    return this.createElement('div', {
      class: 'latex-titlepage'
    }, content ? [content] : []);
  }

  /**
   * Parse document environment
   */
  public parseDocument(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'document');
    return this.createElement('div', {
      class: 'latex-document'
    }, content ? [content] : []);
  }

  /**
   * Parse article environment
   */
  public parseArticle(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'article');
    return this.createElement('article', {
      class: 'latex-article'
    }, content ? [content] : []);
  }

  /**
   * Parse book environment
   */
  public parseBook(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'book');
    return this.createElement('div', {
      class: 'latex-book'
    }, content ? [content] : []);
  }

  /**
   * Parse report environment
   */
  public parseReport(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'report');
    return this.createElement('div', {
      class: 'latex-report'
    }, content ? [content] : []);
  }

  /**
   * Parse letter environment
   */
  public parseLetter(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'letter');
    return this.createElement('div', {
      class: 'latex-letter'
    }, content ? [content] : []);
  }

  /**
   * Parse minipage environment
   */
  public parseMinipage(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'minipage');
    return this.createElement('div', {
      class: 'latex-minipage'
    }, content ? [content] : []);
  }

  /**
   * Parse picture environment
   */
  public parsePicture(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'picture');
    return this.createElement('div', {
      class: 'latex-picture'
    }, content ? [content] : []);
  }

  /**
   * Parse tikzpicture environment
   */
  public parseTikzpicture(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'tikzpicture');
    return this.createElement('div', {
      class: 'latex-tikzpicture'
    }, content ? [content] : []);
  }

  /**
   * Parse pgfpicture environment
   */
  public parsePgfpicture(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'pgfpicture');
    return this.createElement('div', {
      class: 'latex-pgfpicture'
    }, content ? [content] : []);
  }
} 