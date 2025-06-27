/**
 * Command Parser - Handles LaTeX commands
 */

import {
  LaTeXToken,
  MathMLNode,
  ParseContext,
  ConversionOptions,
  CommandHandler,
  CommandRegistry,
} from '../core/types';
import { LATEX_COMMANDS, MATHML_ELEMENTS } from '../core/constants';

export class CommandParser {
  private commandRegistry: CommandRegistry;

  constructor() {
    this.commandRegistry = this.initializeCommandRegistry();
  }

  /**
   * Parse a LaTeX command
   */
  public parseCommand(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    const token = context.tokens[context.position];
    if (!token || token.type !== 'command') {
      throw new Error('Expected command token');
    }

    const command = token.value;
    const handler = this.commandRegistry[command];

    if (handler) {
      context.position++; // Consume the command token
      return handler(context, options);
    } else {
      if (options.strictMode) {
        throw new Error(`Unknown command: ${command}`);
      }
      // Return as text if unknown command is allowed
      context.position++;
      return this.createTextNode(command);
    }
  }

  /**
   * Initialize the command registry with all supported commands
   */
  private initializeCommandRegistry(): CommandRegistry {
    return {
      // Greek letters
      [LATEX_COMMANDS.ALPHA]: this.createGreekLetter.bind(this, 'α'),
      [LATEX_COMMANDS.BETA]: this.createGreekLetter.bind(this, 'β'),
      [LATEX_COMMANDS.GAMMA]: this.createGreekLetter.bind(this, 'γ'),
      [LATEX_COMMANDS.DELTA]: this.createGreekLetter.bind(this, 'δ'),
      [LATEX_COMMANDS.EPSILON]: this.createGreekLetter.bind(this, 'ε'),
      [LATEX_COMMANDS.ZETA]: this.createGreekLetter.bind(this, 'ζ'),
      [LATEX_COMMANDS.ETA]: this.createGreekLetter.bind(this, 'η'),
      [LATEX_COMMANDS.THETA]: this.createGreekLetter.bind(this, 'θ'),
      [LATEX_COMMANDS.IOTA]: this.createGreekLetter.bind(this, 'ι'),
      [LATEX_COMMANDS.KAPPA]: this.createGreekLetter.bind(this, 'κ'),
      [LATEX_COMMANDS.LAMBDA]: this.createGreekLetter.bind(this, 'λ'),
      [LATEX_COMMANDS.MU]: this.createGreekLetter.bind(this, 'μ'),
      [LATEX_COMMANDS.NU]: this.createGreekLetter.bind(this, 'ν'),
      [LATEX_COMMANDS.XI]: this.createGreekLetter.bind(this, 'ξ'),
      [LATEX_COMMANDS.OMICRON]: this.createGreekLetter.bind(this, 'ο'),
      [LATEX_COMMANDS.PI]: this.createGreekLetter.bind(this, 'π'),
      [LATEX_COMMANDS.RHO]: this.createGreekLetter.bind(this, 'ρ'),
      [LATEX_COMMANDS.SIGMA]: this.createGreekLetter.bind(this, 'σ'),
      [LATEX_COMMANDS.TAU]: this.createGreekLetter.bind(this, 'τ'),
      [LATEX_COMMANDS.UPSILON]: this.createGreekLetter.bind(this, 'υ'),
      [LATEX_COMMANDS.PHI]: this.createGreekLetter.bind(this, 'φ'),
      [LATEX_COMMANDS.CHI]: this.createGreekLetter.bind(this, 'χ'),
      [LATEX_COMMANDS.PSI]: this.createGreekLetter.bind(this, 'ψ'),
      [LATEX_COMMANDS.OMEGA]: this.createGreekLetter.bind(this, 'ω'),

      // Capital Greek letters
      [LATEX_COMMANDS.ALPHA_CAP]: this.createGreekLetter.bind(this, 'Α'),
      [LATEX_COMMANDS.BETA_CAP]: this.createGreekLetter.bind(this, 'Β'),
      [LATEX_COMMANDS.GAMMA_CAP]: this.createGreekLetter.bind(this, 'Γ'),
      [LATEX_COMMANDS.DELTA_CAP]: this.createGreekLetter.bind(this, 'Δ'),
      [LATEX_COMMANDS.EPSILON_CAP]: this.createGreekLetter.bind(this, 'Ε'),
      [LATEX_COMMANDS.ZETA_CAP]: this.createGreekLetter.bind(this, 'Ζ'),
      [LATEX_COMMANDS.ETA_CAP]: this.createGreekLetter.bind(this, 'Η'),
      [LATEX_COMMANDS.THETA_CAP]: this.createGreekLetter.bind(this, 'Θ'),
      [LATEX_COMMANDS.IOTA_CAP]: this.createGreekLetter.bind(this, 'Ι'),
      [LATEX_COMMANDS.KAPPA_CAP]: this.createGreekLetter.bind(this, 'Κ'),
      [LATEX_COMMANDS.LAMBDA_CAP]: this.createGreekLetter.bind(this, 'Λ'),
      [LATEX_COMMANDS.MU_CAP]: this.createGreekLetter.bind(this, 'Μ'),
      [LATEX_COMMANDS.NU_CAP]: this.createGreekLetter.bind(this, 'Ν'),
      [LATEX_COMMANDS.XI_CAP]: this.createGreekLetter.bind(this, 'Ξ'),
      [LATEX_COMMANDS.OMICRON_CAP]: this.createGreekLetter.bind(this, 'Ο'),
      [LATEX_COMMANDS.PI_CAP]: this.createGreekLetter.bind(this, 'Π'),
      [LATEX_COMMANDS.RHO_CAP]: this.createGreekLetter.bind(this, 'Ρ'),
      [LATEX_COMMANDS.SIGMA_CAP]: this.createGreekLetter.bind(this, 'Σ'),
      [LATEX_COMMANDS.TAU_CAP]: this.createGreekLetter.bind(this, 'Τ'),
      [LATEX_COMMANDS.UPSILON_CAP]: this.createGreekLetter.bind(this, 'Υ'),
      [LATEX_COMMANDS.PHI_CAP]: this.createGreekLetter.bind(this, 'Φ'),
      [LATEX_COMMANDS.CHI_CAP]: this.createGreekLetter.bind(this, 'Χ'),
      [LATEX_COMMANDS.PSI_CAP]: this.createGreekLetter.bind(this, 'Ψ'),
      [LATEX_COMMANDS.OMEGA_CAP]: this.createGreekLetter.bind(this, 'Ω'),

      // Mathematical operators
      [LATEX_COMMANDS.SUM]: this.createOperator.bind(this, '∑'),
      [LATEX_COMMANDS.PROD]: this.createOperator.bind(this, '∏'),
      [LATEX_COMMANDS.INT]: this.createOperator.bind(this, '∫'),
      [LATEX_COMMANDS.LIM]: this.createOperator.bind(this, 'lim'),
      [LATEX_COMMANDS.INF]: this.createOperator.bind(this, '∞'),
      [LATEX_COMMANDS.PARTIAL]: this.createOperator.bind(this, '∂'),
      [LATEX_COMMANDS.NABLA]: this.createOperator.bind(this, '∇'),

      // Fractions and roots
      [LATEX_COMMANDS.FRAC]: this.parseFraction.bind(this),
      [LATEX_COMMANDS.SQRT]: this.parseSqrt.bind(this),
      [LATEX_COMMANDS.ROOT]: this.parseRoot.bind(this),

      // Text formatting
      [LATEX_COMMANDS.TEXT]: this.parseText.bind(this),
      [LATEX_COMMANDS.MATHBF]: this.parseBold.bind(this),
      [LATEX_COMMANDS.MATHIT]: this.parseItalic.bind(this),
      [LATEX_COMMANDS.MATHRM]: this.parseRoman.bind(this),
      [LATEX_COMMANDS.MATHSF]: this.parseSansSerif.bind(this),
      [LATEX_COMMANDS.MATHTT]: this.parseTypewriter.bind(this),
      [LATEX_COMMANDS.MATHCAL]: this.parseCalligraphic.bind(this),
      [LATEX_COMMANDS.MATHBB]: this.parseBlackboard.bind(this),

      // Spacing
      [LATEX_COMMANDS.QUAD]: this.createSpace.bind(this, '1em'),
      [LATEX_COMMANDS.QQUAD]: this.createSpace.bind(this, '2em'),
      [LATEX_COMMANDS.SPACE]: this.createSpace.bind(this, '0.25em'),

      // Relations
      [LATEX_COMMANDS.NEQ]: this.createOperator.bind(this, '≠'),
      [LATEX_COMMANDS.LEQ]: this.createOperator.bind(this, '≤'),
      [LATEX_COMMANDS.GEQ]: this.createOperator.bind(this, '≥'),
      [LATEX_COMMANDS.APPROX]: this.createOperator.bind(this, '≈'),
      [LATEX_COMMANDS.SIM]: this.createOperator.bind(this, '∼'),
      [LATEX_COMMANDS.CONG]: this.createOperator.bind(this, '≅'),
      [LATEX_COMMANDS.EQUIV]: this.createOperator.bind(this, '≡'),

      // Logic
      [LATEX_COMMANDS.AND]: this.createOperator.bind(this, '∧'),
      [LATEX_COMMANDS.OR]: this.createOperator.bind(this, '∨'),
      [LATEX_COMMANDS.NOT]: this.createOperator.bind(this, '¬'),
      [LATEX_COMMANDS.IMPLIES]: this.createOperator.bind(this, '⟹'),
      [LATEX_COMMANDS.IFF]: this.createOperator.bind(this, '⟺'),
      [LATEX_COMMANDS.FORALL]: this.createOperator.bind(this, '∀'),
      [LATEX_COMMANDS.EXISTS]: this.createOperator.bind(this, '∃'),

      // Set theory
      [LATEX_COMMANDS.IN]: this.createOperator.bind(this, '∈'),
      [LATEX_COMMANDS.NOTIN]: this.createOperator.bind(this, '∉'),
      [LATEX_COMMANDS.SUBSET]: this.createOperator.bind(this, '⊂'),
      [LATEX_COMMANDS.SUPERSET]: this.createOperator.bind(this, '⊃'),
      [LATEX_COMMANDS.SUBSETEQ]: this.createOperator.bind(this, '⊆'),
      [LATEX_COMMANDS.SUPERSETEQ]: this.createOperator.bind(this, '⊇'),
      [LATEX_COMMANDS.CUP]: this.createOperator.bind(this, '∪'),
      [LATEX_COMMANDS.CAP]: this.createOperator.bind(this, '∩'),
      [LATEX_COMMANDS.SETMINUS]: this.createOperator.bind(this, '∖'),
      [LATEX_COMMANDS.EMPTYSET]: this.createOperator.bind(this, '∅'),

      // Other operators
      [LATEX_COMMANDS.CDOT]: this.createOperator.bind(this, '·'),
      [LATEX_COMMANDS.TIMES]: this.createOperator.bind(this, '×'),
      [LATEX_COMMANDS.DIV]: this.createOperator.bind(this, '÷'),
      [LATEX_COMMANDS.PM]: this.createOperator.bind(this, '±'),
      [LATEX_COMMANDS.MP]: this.createOperator.bind(this, '∓'),
    };
  }

  /**
   * Create a Greek letter
   */
  private createGreekLetter(letter: string): MathMLNode {
    return this.createElement(MATHML_ELEMENTS.MI, {}, [
      this.createText(letter),
    ]);
  }

  /**
   * Create an operator
   */
  private createOperator(operator: string): MathMLNode {
    return this.createElement(MATHML_ELEMENTS.MO, {}, [
      this.createText(operator),
    ]);
  }

  /**
   * Create a space element
   */
  private createSpace(width: string): MathMLNode {
    return this.createElement(MATHML_ELEMENTS.MSPACE, { width });
  }

  /**
   * Create a text node
   */
  private createTextNode(content: string): MathMLNode {
    return this.createElement(MATHML_ELEMENTS.MTEXT, {}, [
      this.createText(content),
    ]);
  }

  /**
   * Parse fraction
   */
  private parseFraction(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log parsing context for debugging
    if (options.debugMode) {
      console.log(`Parsing fraction at position ${context.position}`);
    }

    // Implementation for fraction parsing
    const mfrac = this.createElement(MATHML_ELEMENTS.MFRAC);

    // Add context information as attributes if in debug mode
    if (options.debugMode) {
      mfrac.attributes = {
        'data-parse-position': context.position.toString(),
        'data-parse-context': 'fraction',
      };
    }

    return mfrac;
  }

  /**
   * Parse square root
   */
  private parseSqrt(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log parsing context for debugging
    if (options.debugMode) {
      console.log(`Parsing sqrt at position ${context.position}`);
    }

    const msqrt = this.createElement(MATHML_ELEMENTS.MSQRT);

    // Add context information as attributes if in debug mode
    if (options.debugMode) {
      msqrt.attributes = {
        'data-parse-position': context.position.toString(),
        'data-parse-context': 'sqrt',
      };
    }

    return msqrt;
  }

  /**
   * Parse root
   */
  private parseRoot(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log parsing context for debugging
    if (options.debugMode) {
      console.log(`Parsing root at position ${context.position}`);
    }

    const mroot = this.createElement(MATHML_ELEMENTS.MROOT);

    // Add context information as attributes if in debug mode
    if (options.debugMode) {
      mroot.attributes = {
        'data-parse-position': context.position.toString(),
        'data-parse-context': 'root',
      };
    }

    return mroot;
  }

  /**
   * Parse text
   */
  private parseText(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log parsing context for debugging
    if (options.debugMode) {
      console.log(`Parsing text at position ${context.position}`);
    }

    const mtext = this.createElement(MATHML_ELEMENTS.MTEXT);

    // Add context information as attributes if in debug mode
    if (options.debugMode) {
      mtext.attributes = {
        'data-parse-position': context.position.toString(),
        'data-parse-context': 'text',
      };
    }

    return mtext;
  }

  /**
   * Parse bold text
   */
  private parseBold(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log parsing context for debugging
    if (options.debugMode) {
      console.log(`Parsing bold at position ${context.position}`);
    }

    const mstyle = this.createElement(MATHML_ELEMENTS.MSTYLE, {
      mathvariant: 'bold',
    });

    // Add context information as attributes if in debug mode
    if (options.debugMode) {
      mstyle.attributes = {
        ...mstyle.attributes,
        'data-parse-position': context.position.toString(),
        'data-parse-context': 'bold',
      };
    }

    return mstyle;
  }

  /**
   * Parse italic text
   */
  private parseItalic(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log parsing context for debugging
    if (options.debugMode) {
      console.log(`Parsing italic at position ${context.position}`);
    }

    const mstyle = this.createElement(MATHML_ELEMENTS.MSTYLE, {
      mathvariant: 'italic',
    });

    // Add context information as attributes if in debug mode
    if (options.debugMode) {
      mstyle.attributes = {
        ...mstyle.attributes,
        'data-parse-position': context.position.toString(),
        'data-parse-context': 'italic',
      };
    }

    return mstyle;
  }

  /**
   * Parse roman text
   */
  private parseRoman(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log parsing context for debugging
    if (options.debugMode) {
      console.log(`Parsing roman at position ${context.position}`);
    }

    const mstyle = this.createElement(MATHML_ELEMENTS.MSTYLE, {
      mathvariant: 'normal',
    });

    // Add context information as attributes if in debug mode
    if (options.debugMode) {
      mstyle.attributes = {
        ...mstyle.attributes,
        'data-parse-position': context.position.toString(),
        'data-parse-context': 'roman',
      };
    }

    return mstyle;
  }

  /**
   * Parse sans-serif text
   */
  private parseSansSerif(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log parsing context for debugging
    if (options.debugMode) {
      console.log(`Parsing sans-serif at position ${context.position}`);
    }

    const mstyle = this.createElement(MATHML_ELEMENTS.MSTYLE, {
      mathvariant: 'sans-serif',
    });

    // Add context information as attributes if in debug mode
    if (options.debugMode) {
      mstyle.attributes = {
        ...mstyle.attributes,
        'data-parse-position': context.position.toString(),
        'data-parse-context': 'sans-serif',
      };
    }

    return mstyle;
  }

  /**
   * Parse typewriter text
   */
  private parseTypewriter(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log parsing context for debugging
    if (options.debugMode) {
      console.log(`Parsing typewriter at position ${context.position}`);
    }

    const mstyle = this.createElement(MATHML_ELEMENTS.MSTYLE, {
      mathvariant: 'monospace',
    });

    // Add context information as attributes if in debug mode
    if (options.debugMode) {
      mstyle.attributes = {
        ...mstyle.attributes,
        'data-parse-position': context.position.toString(),
        'data-parse-context': 'typewriter',
      };
    }

    return mstyle;
  }

  /**
   * Parse calligraphic text
   */
  private parseCalligraphic(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log parsing context for debugging
    if (options.debugMode) {
      console.log(`Parsing calligraphic at position ${context.position}`);
    }

    const mstyle = this.createElement(MATHML_ELEMENTS.MSTYLE, {
      mathvariant: 'script',
    });

    // Add context information as attributes if in debug mode
    if (options.debugMode) {
      mstyle.attributes = {
        ...mstyle.attributes,
        'data-parse-position': context.position.toString(),
        'data-parse-context': 'calligraphic',
      };
    }

    return mstyle;
  }

  /**
   * Parse blackboard text
   */
  private parseBlackboard(
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log parsing context for debugging
    if (options.debugMode) {
      console.log(`Parsing blackboard at position ${context.position}`);
    }

    const mstyle = this.createElement(MATHML_ELEMENTS.MSTYLE, {
      mathvariant: 'double-struck',
    });

    // Add context information as attributes if in debug mode
    if (options.debugMode) {
      mstyle.attributes = {
        ...mstyle.attributes,
        'data-parse-position': context.position.toString(),
        'data-parse-context': 'blackboard',
      };
    }

    return mstyle;
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
