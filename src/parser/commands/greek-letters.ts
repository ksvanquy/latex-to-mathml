/**
 * Greek Letter Command Handlers
 */

import {
  MathMLNode,
  ParseContext,
  ConversionOptions,
  CommandHandler,
} from '../../core/types';
import { LATEX_COMMANDS, MATHML_ELEMENTS } from '../../core/constants';
import { BaseCommandParser } from './base-command-parser';

export class GreekLetterParser extends BaseCommandParser {
  /**
   * Get Greek letter commands registry
   */
  public getGreekLetterCommands(): Record<string, CommandHandler> {
    return {
      // Lowercase Greek letters
      [LATEX_COMMANDS.ALPHA]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('α', context, options),
      [LATEX_COMMANDS.BETA]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('β', context, options),
      [LATEX_COMMANDS.GAMMA]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('γ', context, options),
      [LATEX_COMMANDS.DELTA]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('δ', context, options),
      [LATEX_COMMANDS.EPSILON]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('ε', context, options),
      [LATEX_COMMANDS.ZETA]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('ζ', context, options),
      [LATEX_COMMANDS.ETA]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('η', context, options),
      [LATEX_COMMANDS.THETA]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('θ', context, options),
      [LATEX_COMMANDS.IOTA]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('ι', context, options),
      [LATEX_COMMANDS.KAPPA]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('κ', context, options),
      [LATEX_COMMANDS.LAMBDA]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('λ', context, options),
      [LATEX_COMMANDS.MU]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('μ', context, options),
      [LATEX_COMMANDS.NU]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('ν', context, options),
      [LATEX_COMMANDS.XI]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('ξ', context, options),
      [LATEX_COMMANDS.OMICRON]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('ο', context, options),
      [LATEX_COMMANDS.PI]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('π', context, options),
      [LATEX_COMMANDS.RHO]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('ρ', context, options),
      [LATEX_COMMANDS.SIGMA]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('σ', context, options),
      [LATEX_COMMANDS.TAU]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('τ', context, options),
      [LATEX_COMMANDS.UPSILON]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('υ', context, options),
      [LATEX_COMMANDS.PHI]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('φ', context, options),
      [LATEX_COMMANDS.CHI]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('χ', context, options),
      [LATEX_COMMANDS.PSI]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('ψ', context, options),
      [LATEX_COMMANDS.OMEGA]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('ω', context, options),

      // Capital Greek letters
      [LATEX_COMMANDS.ALPHA_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Α', context, options),
      [LATEX_COMMANDS.BETA_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Β', context, options),
      [LATEX_COMMANDS.GAMMA_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Γ', context, options),
      [LATEX_COMMANDS.DELTA_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Δ', context, options),
      [LATEX_COMMANDS.EPSILON_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Ε', context, options),
      [LATEX_COMMANDS.ZETA_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Ζ', context, options),
      [LATEX_COMMANDS.ETA_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Η', context, options),
      [LATEX_COMMANDS.THETA_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Θ', context, options),
      [LATEX_COMMANDS.IOTA_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Ι', context, options),
      [LATEX_COMMANDS.KAPPA_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Κ', context, options),
      [LATEX_COMMANDS.LAMBDA_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Λ', context, options),
      [LATEX_COMMANDS.MU_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Μ', context, options),
      [LATEX_COMMANDS.NU_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Ν', context, options),
      [LATEX_COMMANDS.XI_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Ξ', context, options),
      [LATEX_COMMANDS.OMICRON_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Ο', context, options),
      [LATEX_COMMANDS.PI_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Π', context, options),
      [LATEX_COMMANDS.RHO_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Ρ', context, options),
      [LATEX_COMMANDS.SIGMA_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Σ', context, options),
      [LATEX_COMMANDS.TAU_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Τ', context, options),
      [LATEX_COMMANDS.UPSILON_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Υ', context, options),
      [LATEX_COMMANDS.PHI_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Φ', context, options),
      [LATEX_COMMANDS.CHI_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Χ', context, options),
      [LATEX_COMMANDS.PSI_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Ψ', context, options),
      [LATEX_COMMANDS.OMEGA_CAP]: (
        context: ParseContext,
        options: ConversionOptions
      ) => this.createGreekLetter('Ω', context, options),
    };
  }

  /**
   * Create a Greek letter
   */
  private createGreekLetter(
    letter: string,
    context: ParseContext,
    options: ConversionOptions
  ): MathMLNode {
    // Log Greek letter creation for debugging
    if (options.debugMode) {
      console.log(
        `Creating Greek letter: ${letter} at position ${context.position}`
      );
    }

    const element = this.createElement(MATHML_ELEMENTS.MI, {}, [
      this.createText(letter),
    ]);

    // Add debug information if enabled
    if (options.debugMode) {
      element.attributes = {
        ...element.attributes,
        'data-greek-letter': letter,
        'data-parse-position': context.position.toString(),
      };
    }

    return element;
  }
}
