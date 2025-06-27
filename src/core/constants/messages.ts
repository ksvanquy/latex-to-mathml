/**
 * Error and Warning Messages Constants
 */

// Error messages
export const ERROR_MESSAGES = {
  UNKNOWN_COMMAND: 'Unknown LaTeX command',
  UNKNOWN_ENVIRONMENT: 'Unknown LaTeX environment',
  UNMATCHED_BRACE: 'Unmatched brace',
  UNMATCHED_BRACKET: 'Unmatched bracket',
  INVALID_SYNTAX: 'Invalid LaTeX syntax',
  MISSING_ARGUMENT: 'Missing required argument',
  TOO_MANY_ARGUMENTS: 'Too many arguments',
  INVALID_NUMBER: 'Invalid number format',
  UNEXPECTED_TOKEN: 'Unexpected token',
} as const;

// Warning messages
export const WARNING_MESSAGES = {
  DEPRECATED_COMMAND: 'Deprecated command',
  AMBIGUOUS_SYNTAX: 'Ambiguous syntax',
  UNSUPPORTED_FEATURE: 'Unsupported feature',
  PERFORMANCE_WARNING: 'Performance warning',
} as const;

// Info messages
export const INFO_MESSAGES = {
  CONVERSION_SUCCESS: 'Conversion completed successfully',
  CONVERSION_PARTIAL: 'Conversion completed with warnings',
  VALIDATION_PASSED: 'Validation passed',
  VALIDATION_FAILED: 'Validation failed',
} as const;
