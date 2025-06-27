/**
 * Basic tests for LaTeX to MathML converter
 */

import { convert, convertDisplay, validate } from '../index';

describe('LaTeX to MathML Converter', () => {
  describe('Basic conversion', () => {
    test('should convert simple expression without error', () => {
      const result = convert('x + y = z');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('<mrow>');
      expect(result.mathml).toContain('<mi>x</mi>');
      expect(result.mathml).toContain('<mo>+</mo>');
      expect(result.mathml).toContain('<mi>y</mi>');
      expect(result.mathml).toContain('<mo>=</mo>');
      expect(result.mathml).toContain('<mi>z</mi>');
    });

    test('should convert numbers and operators', () => {
      const result = convert('1 + 2');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('<mn>1</mn>');
      expect(result.mathml).toContain('<mo>+</mo>');
      expect(result.mathml).toContain('<mn>2</mn>');
    });

    test('should return LaTeX command as text for unsupported commands', () => {
      const result = convert('\\alpha + \\beta');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('\\alpha');
      expect(result.mathml).toContain('\\beta');
    });

    test('should handle fractions as text for now', () => {
      const result = convert('\\frac{1}{2}');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('\\frac');
    });

    test('should handle square roots as text for now', () => {
      const result = convert('\\sqrt{x}');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('\\sqrt');
    });
  });

  describe('Display mode', () => {
    test('should convert in display mode', () => {
      const result = convertDisplay('x^2 + y^2 = z^2');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('<mrow>');
      expect(result.mathml).toContain('<mi>x</mi>');
    });

    test('should convert in inline mode', () => {
      const result = convert('x^2 + y^2 = z^2');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('<mrow>');
      expect(result.mathml).toContain('<mi>x</mi>');
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
      const result = convert('\\unknowncommand{x}', {
        allowUnknownCommands: true,
      });
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('\\unknowncommand');
    });

    test('should handle unknown commands in strict mode', () => {
      const result = convert('\\unknowncommand{x}', { strictMode: true });
      // In strict mode, unknown commands should still be handled gracefully for now
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('\\unknowncommand');
    });
  });

  describe('Debug mode', () => {
    test('should work with debug mode enabled', () => {
      const result = convert('x + y', { debugMode: true });
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('<mrow>');
    });
  });

  describe('Complex expressions', () => {
    test('should handle mixed content', () => {
      const result = convert('a + 2 = \\frac{x}{y}');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('<mi>a</mi>');
      expect(result.mathml).toContain('<mn>2</mn>');
      expect(result.mathml).toContain('\\frac');
    });

    test('should handle parentheses', () => {
      const result = convert('(x + y)');
      expect(result.errors).toHaveLength(0);
      expect(result.mathml).toContain('<mrow>');
    });
  });
});
