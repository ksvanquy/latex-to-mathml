/**
 * Text Environment Handlers
 */

import { MathMLNode, ParseContext, ConversionOptions } from '../../core/types';
import { BaseEnvironmentParser } from './base-environment-parser';

export class TextEnvironmentParser extends BaseEnvironmentParser {
  /**
   * Parse theorem environment
   */
  public parseTheorem(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'theorem');
    return this.createElement('div', {
      class: 'latex-theorem'
    }, content ? [content] : []);
  }

  /**
   * Parse lemma environment
   */
  public parseLemma(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'lemma');
    return this.createElement('div', {
      class: 'latex-lemma'
    }, content ? [content] : []);
  }

  /**
   * Parse proof environment
   */
  public parseProof(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'proof');
    return this.createElement('div', {
      class: 'latex-proof'
    }, content ? [content] : []);
  }

  /**
   * Parse definition environment
   */
  public parseDefinition(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'definition');
    return this.createElement('div', {
      class: 'latex-definition'
    }, content ? [content] : []);
  }

  /**
   * Parse corollary environment
   */
  public parseCorollary(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'corollary');
    return this.createElement('div', {
      class: 'latex-corollary'
    }, content ? [content] : []);
  }

  /**
   * Parse proposition environment
   */
  public parseProposition(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'proposition');
    return this.createElement('div', {
      class: 'latex-proposition'
    }, content ? [content] : []);
  }

  /**
   * Parse remark environment
   */
  public parseRemark(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'remark');
    return this.createElement('div', {
      class: 'latex-remark'
    }, content ? [content] : []);
  }

  /**
   * Parse example environment
   */
  public parseExample(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'example');
    return this.createElement('div', {
      class: 'latex-example'
    }, content ? [content] : []);
  }

  /**
   * Parse exercise environment
   */
  public parseExercise(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'exercise');
    return this.createElement('div', {
      class: 'latex-exercise'
    }, content ? [content] : []);
  }

  /**
   * Parse solution environment
   */
  public parseSolution(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'solution');
    return this.createElement('div', {
      class: 'latex-solution'
    }, content ? [content] : []);
  }

  /**
   * Parse itemize environment
   */
  public parseItemize(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'itemize');
    return this.createElement('ul', {
      class: 'latex-itemize'
    }, content ? [content] : []);
  }

  /**
   * Parse enumerate environment
   */
  public parseEnumerate(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'enumerate');
    return this.createElement('ol', {
      class: 'latex-enumerate'
    }, content ? [content] : []);
  }

  /**
   * Parse description environment
   */
  public parseDescription(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'description');
    return this.createElement('dl', {
      class: 'latex-description'
    }, content ? [content] : []);
  }

  /**
   * Parse center environment
   */
  public parseCenter(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'center');
    return this.createElement('div', {
      class: 'latex-center',
      style: 'text-align: center;'
    }, content ? [content] : []);
  }

  /**
   * Parse flushleft environment
   */
  public parseFlushleft(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'flushleft');
    return this.createElement('div', {
      class: 'latex-flushleft',
      style: 'text-align: left;'
    }, content ? [content] : []);
  }

  /**
   * Parse flushright environment
   */
  public parseFlushright(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'flushright');
    return this.createElement('div', {
      class: 'latex-flushright',
      style: 'text-align: right;'
    }, content ? [content] : []);
  }

  /**
   * Parse quote environment
   */
  public parseQuote(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'quote');
    return this.createElement('blockquote', {
      class: 'latex-quote'
    }, content ? [content] : []);
  }

  /**
   * Parse quotation environment
   */
  public parseQuotation(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'quotation');
    return this.createElement('blockquote', {
      class: 'latex-quotation'
    }, content ? [content] : []);
  }

  /**
   * Parse verse environment
   */
  public parseVerse(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'verse');
    return this.createElement('div', {
      class: 'latex-verse'
    }, content ? [content] : []);
  }
} 