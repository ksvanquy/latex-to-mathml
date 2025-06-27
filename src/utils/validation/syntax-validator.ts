/**
 * Syntax Validation - LaTeX command and environment syntax validation
 */

export class SyntaxValidator {
  /**
   * Validate command syntax
   */
  public validateCommandSyntax(latex: string): string[] {
    const errors: string[] = [];
    const commandRegex = /\\[a-zA-Z]+/g;
    const matches = latex.match(commandRegex);

    if (!matches) return errors;

    for (const match of matches) {
      if (match === '\\') {
        errors.push('Incomplete command at end of input');
        continue;
      }

      if (!this.isValidCommandName(match)) {
        errors.push(`Invalid command name: ${match}`);
      }
    }

    return errors;
  }

  /**
   * Validate environment syntax
   */
  public validateEnvironmentSyntax(latex: string): string[] {
    const errors: string[] = [];
    const beginMatches = latex.match(/\\begin\{([^}]+)\}/g);
    const endMatches = latex.match(/\\end\{([^}]+)\}/g);

    if (!beginMatches && !endMatches) return errors;

    const beginCount = beginMatches ? beginMatches.length : 0;
    const endCount = endMatches ? endMatches.length : 0;

    if (beginCount !== endCount) {
      errors.push('Unmatched \\begin and \\end commands');
      return errors;
    }

    if (beginMatches && endMatches) {
      for (let i = 0; i < beginMatches.length; i++) {
        const beginName = beginMatches[i].match(/\\begin\{([^}]+)\}/)?.[1];
        const endName = endMatches[i].match(/\\end\{([^}]+)\}/)?.[1];

        if (beginName !== endName) {
          errors.push(
            `Environment name mismatch: \\begin{${beginName}} vs \\end{${endName}}`
          );
        }
      }
    }

    // Check for orphaned commands
    const orphanedBegin = latex.match(/\\begin\{[^}]*\}(?!.*\\end\{[^}]*\})/g);
    const orphanedEnd = latex.match(/\\end\{[^}]*\}(?!.*\\begin\{[^}]*\})/g);

    if (orphanedBegin) {
      errors.push('\\begin command without matching \\end');
    }
    if (orphanedEnd) {
      errors.push('\\end command without matching \\begin');
    }

    return errors;
  }

  /**
   * Check if command name is valid
   */
  private isValidCommandName(command: string): boolean {
    // Basic validation: command should start with \ and contain only letters
    return /^\\[a-zA-Z]+$/.test(command);
  }
}
