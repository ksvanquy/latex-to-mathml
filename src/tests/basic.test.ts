/**
 * Basic tests for LaTeX to MathML converter
 */

import { convert, convertDisplay, validate } from '../index';

describe('LaTeX to MathML Converter', () => {
  describe('Basic conversion', () => {
    test('should convert simple expression', () => {
      const result = convert('x + y = z');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('<math');
    });

    test('should convert Greek letters', () => {
      const result = convert('\\alpha + \\beta');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('α');
    });

    test('should convert fractions', () => {
      const result = convert('\\frac{1}{2}');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('<mfrac>');
    });

    test('should convert square roots', () => {
      const result = convert('\\sqrt{x}');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('<msqrt>');
    });
  });

  describe('Display mode', () => {
    test('should convert in display mode', () => {
      const result = convertDisplay('x^2 + y^2 = z^2');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('display="block"');
    });

    test('should convert in inline mode', () => {
      const result = convert('x^2 + y^2 = z^2');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('display="inline"');
    });
  });

  describe('Validation', () => {
    test('should validate correct LaTeX', () => {
      const result = validate('x + y = z');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should detect invalid LaTeX', () => {
      const result = validate('x + y = {');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Error handling', () => {
    test('should handle unknown commands gracefully', () => {
      const result = convert('\\unknowncommand{x}', { allowUnknownCommands: true });
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('\\unknowncommand');
    });

    test('should throw error for unknown commands in strict mode', () => {
      const result = convert('\\unknowncommand{x}', { strictMode: true });
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
}); 