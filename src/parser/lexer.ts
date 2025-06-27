/**
 * LaTeX Lexer - Tokenizes LaTeX input into tokens
 */

import { LaTeXToken } from '../core/types';

export class LaTeXLexer {
  private input: string;
  private position: number;
  private line: number;
  private column: number;

  constructor(input: string) {
    this.input = input;
    this.position = 0;
    this.line = 1;
    this.column = 1;
  }

  /**
   * Tokenize the entire input string
   */
  public tokenize(): LaTeXToken[] {
    const tokens: LaTeXToken[] = [];
    
    while (this.position < this.input.length) {
      const token = this.nextToken();
      if (token) {
        tokens.push(token);
      }
    }
    
    return tokens;
  }

  /**
   * Get the next token from the input
   */
  private nextToken(): LaTeXToken | null {
    this.skipWhitespace();
    
    if (this.position >= this.input.length) {
      return null;
    }

    const char = this.input[this.position];

    // Handle backslash commands
    if (char === '\\') {
      return this.tokenizeCommand();
    }

    // Handle braces
    if (char === '{' || char === '}') {
      return this.tokenizeBrace();
    }

    // Handle brackets
    if (char === '[' || char === ']') {
      return this.tokenizeBracket();
    }

    // Handle numbers
    if (this.isDigit(char)) {
      return this.tokenizeNumber();
    }

    // Handle symbols and text
    return this.tokenizeSymbol();
  }

  /**
   * Tokenize a LaTeX command (starts with backslash)
   */
  private tokenizeCommand(): LaTeXToken {
    const startPosition = this.position;
    const startLine = this.line;
    const startColumn = this.column;
    
    // Skip the backslash
    this.advance();
    
    let command = '';
    while (
      this.position < this.input.length &&
      this.isLetter(this.input[this.position])
    ) {
      command += this.input[this.position];
      this.advance();
    }
    
    return {
      type: 'command',
      value: '\\' + command,
      position: startPosition,
      line: startLine,
      column: startColumn,
    };
  }

  /**
   * Tokenize a brace
   */
  private tokenizeBrace(): LaTeXToken {
    const char = this.input[this.position];
    const token: LaTeXToken = {
      type: 'brace',
      value: char,
      position: this.position,
      line: this.line,
      column: this.column,
    };
    
    this.advance();
    return token;
  }

  /**
   * Tokenize a bracket
   */
  private tokenizeBracket(): LaTeXToken {
    const char = this.input[this.position];
    const token: LaTeXToken = {
      type: 'bracket',
      value: char,
      position: this.position,
      line: this.line,
      column: this.column,
    };
    
    this.advance();
    return token;
  }

  /**
   * Tokenize a number
   */
  private tokenizeNumber(): LaTeXToken {
    const startPosition = this.position;
    const startLine = this.line;
    const startColumn = this.column;
    
    let number = '';
    let hasDecimal = false;
    
    while (this.position < this.input.length) {
      const char = this.input[this.position];
      
      if (this.isDigit(char)) {
        number += char;
      } else if (char === '.' && !hasDecimal) {
        number += char;
        hasDecimal = true;
      } else {
        break;
      }
      
      this.advance();
    }
    
    return {
      type: 'number',
      value: number,
      position: startPosition,
      line: startLine,
      column: startColumn,
    };
  }

  /**
   * Tokenize a symbol or text
   */
  private tokenizeSymbol(): LaTeXToken {
    const startPosition = this.position;
    const startLine = this.line;
    const startColumn = this.column;
    
    const char = this.input[this.position];
    this.advance();
    
    return {
      type: 'symbol',
      value: char,
      position: startPosition,
      line: startLine,
      column: startColumn,
    };
  }

  /**
   * Skip whitespace characters
   */
  private skipWhitespace(): void {
    while (
      this.position < this.input.length &&
      this.isWhitespace(this.input[this.position])
    ) {
      this.advance();
    }
  }

  /**
   * Advance to the next character
   */
  private advance(): void {
      if (this.input[this.position] === '\n') {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
      this.position++;
  }

  /**
   * Check if character is a digit
   */
  private isDigit(char: string): boolean {
    return /[0-9]/.test(char);
  }

  /**
   * Check if character is a letter
   */
  private isLetter(char: string): boolean {
    return /[a-zA-Z]/.test(char);
  }

  /**
   * Check if character is whitespace
   */
  private isWhitespace(char: string): boolean {
    return /\s/.test(char);
  }
} 