/**
 * Error Analyzers - Error analysis and classification utilities
 */

export class ErrorAnalyzers {
  /**
   * Check if an error is recoverable
   */
  public isRecoverableError(error: Error): boolean {
    const nonRecoverablePatterns = [
      /syntax error/i,
      /invalid syntax/i,
      /unexpected token/i,
      /missing required/i,
      /unmatched/i,
    ];

    return !nonRecoverablePatterns.some((pattern) =>
      pattern.test(error.message)
    );
  }

  /**
   * Get error severity level
   */
  public getErrorSeverity(
    error: Error
  ): 'low' | 'medium' | 'high' | 'critical' {
    const message = error.message.toLowerCase();

    if (message.includes('critical') || message.includes('fatal')) {
      return 'critical';
    }

    if (
      message.includes('syntax error') ||
      message.includes('invalid syntax')
    ) {
      return 'high';
    }

    if (message.includes('warning') || message.includes('deprecated')) {
      return 'low';
    }

    if (message.includes('unknown') || message.includes('unsupported')) {
      return 'medium';
    }

    return 'medium';
  }

  /**
   * Group errors by type
   */
  public groupErrors(errors: Error[]): Record<string, Error[]> {
    const groups: Record<string, Error[]> = {
      syntax: [],
      parsing: [],
      validation: [],
      conversion: [],
      mathml: [],
      other: [],
    };

    for (const error of errors) {
      const message = error.message.toLowerCase();

      if (message.includes('syntax')) {
        groups.syntax.push(error);
      } else if (message.includes('parsing')) {
        groups.parsing.push(error);
      } else if (message.includes('validation')) {
        groups.validation.push(error);
      } else if (message.includes('conversion')) {
        groups.conversion.push(error);
      } else if (message.includes('mathml')) {
        groups.mathml.push(error);
      } else {
        groups.other.push(error);
      }
    }

    return groups;
  }

  /**
   * Get error summary statistics
   */
  public getErrorSummary(errors: Error[]): {
    total: number;
    bySeverity: Record<string, number>;
    byType: Record<string, number>;
  } {
    const bySeverity: Record<string, number> = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
    };

    const byType: Record<string, number> = {
      syntax: 0,
      parsing: 0,
      validation: 0,
      conversion: 0,
      mathml: 0,
      other: 0,
    };

    for (const error of errors) {
      const severity = this.getErrorSeverity(error);
      bySeverity[severity]++;

      const message = error.message.toLowerCase();
      if (message.includes('syntax')) {
        byType.syntax++;
      } else if (message.includes('parsing')) {
        byType.parsing++;
      } else if (message.includes('validation')) {
        byType.validation++;
      } else if (message.includes('conversion')) {
        byType.conversion++;
      } else if (message.includes('mathml')) {
        byType.mathml++;
      } else {
        byType.other++;
      }
    }

    return {
      total: errors.length,
      bySeverity,
      byType,
    };
  }
}
