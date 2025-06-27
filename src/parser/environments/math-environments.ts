/**
 * Mathematical Environment Handlers
 */

import { MathMLNode, ParseContext, ConversionOptions, EnvironmentHandler } from '../../core/types';
import { MATHML_ELEMENTS } from '../../core/constants';
import { BaseEnvironmentParser } from './base-environment-parser';

export class MathEnvironmentParser extends BaseEnvironmentParser {
  /**
   * Parse equation environment
   */
  public parseEquation(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'equation');
    const mathElement = this.createElement(MATHML_ELEMENTS.MATH, {
      display: 'block',
      xmlns: 'http://www.w3.org/1998/Math/MathML'
    });
    
    if (content) {
      this.addChild(mathElement, content);
    }
    
    return mathElement;
  }

  /**
   * Parse align environment
   */
  public parseAlign(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'align');
    return this.createElement(MATHML_ELEMENTS.MTABLE, {
      display: 'block',
      columnalign: 'left'
    }, content ? [content] : []);
  }

  /**
   * Parse gather environment
   */
  public parseGather(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'gather');
    return this.createElement(MATHML_ELEMENTS.MTABLE, {
      display: 'block',
      columnalign: 'center'
    }, content ? [content] : []);
  }

  /**
   * Parse multline environment
   */
  public parseMultline(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'multline');
    return this.createElement(MATHML_ELEMENTS.MTABLE, {
      display: 'block',
      columnalign: 'left'
    }, content ? [content] : []);
  }

  /**
   * Parse split environment
   */
  public parseSplit(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'split');
    return this.createElement(MATHML_ELEMENTS.MTABLE, {
      display: 'block',
      columnalign: 'left'
    }, content ? [content] : []);
  }

  /**
   * Parse cases environment
   */
  public parseCases(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'cases');
    return this.createElement(MATHML_ELEMENTS.MTABLE, {
      display: 'block',
      columnalign: 'left'
    }, content ? [content] : []);
  }

  /**
   * Parse matrix environment
   */
  public parseMatrix(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'matrix');
    return this.createElement(MATHML_ELEMENTS.MTABLE, {
      display: 'inline'
    }, content ? [content] : []);
  }

  /**
   * Parse pmatrix environment
   */
  public parsePmatrix(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'pmatrix');
    const fenced = this.createElement(MATHML_ELEMENTS.MFENCED, {
      open: '(',
      close: ')'
    });
    
    if (content) {
      this.addChild(fenced, content);
    }
    
    return fenced;
  }

  /**
   * Parse bmatrix environment
   */
  public parseBmatrix(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'bmatrix');
    const fenced = this.createElement(MATHML_ELEMENTS.MFENCED, {
      open: '[',
      close: ']'
    });
    
    if (content) {
      this.addChild(fenced, content);
    }
    
    return fenced;
  }

  /**
   * Parse vmatrix environment
   */
  public parseVmatrix(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'vmatrix');
    const fenced = this.createElement(MATHML_ELEMENTS.MFENCED, {
      open: '|',
      close: '|'
    });
    
    if (content) {
      this.addChild(fenced, content);
    }
    
    return fenced;
  }

  /**
   * Parse array environment
   */
  public parseArray(context: ParseContext, options: ConversionOptions): MathMLNode {
    const content = this.parseEnvironmentContent(context, 'array');
    return this.createElement(MATHML_ELEMENTS.MTABLE, {
      display: 'inline'
    }, content ? [content] : []);
  }
} 