import { Token, TokenType } from '../types';

/**
 * LaTeX Lexer - converts LaTeX string into tokens
 */
export class LatexLexer {
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
   * Tokenize the entire input
   */
  public tokenize(): Token[] {
    const tokens: Token[] = [];
    
    while (this.position < this.input.length) {
      const token = this.nextToken();
      if (token.type !== TokenType.WHITESPACE) {
        tokens.push(token);
      }
    }
    
    tokens.push({
      type: TokenType.EOF,
      value: '',
      position: this.position,
      line: this.line,
      column: this.column,
    });
    
    return tokens;
  }

  /**
   * Get the next token
   */
  private nextToken(): Token {
    this.skipWhitespace();
    
    if (this.position >= this.input.length) {
      return {
        type: TokenType.EOF,
        value: '',
        position: this.position,
        line: this.line,
        column: this.column,
      };
    }

    const char = this.input[this.position];
    const startPosition = this.position;
    const startLine = this.line;
    const startColumn = this.column;

    // Handle backslash commands
    if (char === '\\') {
      return this.readCommand();
    }

    // Handle braces
    if (char === '{') {
      this.advance();
      return {
        type: TokenType.LEFT_BRACE,
        value: '{',
        position: startPosition,
        line: startLine,
        column: startColumn,
      };
    }

    if (char === '}') {
      this.advance();
      return {
        type: TokenType.RIGHT_BRACE,
        value: '}',
        position: startPosition,
        line: startLine,
        column: startColumn,
      };
    }

    // Handle superscript
    if (char === '^') {
      this.advance();
      return {
        type: TokenType.SUPERSCRIPT,
        value: '^',
        position: startPosition,
        line: startLine,
        column: startColumn,
      };
    }

    // Handle subscript
    if (char === '_') {
      this.advance();
      return {
        type: TokenType.SUBSCRIPT,
        value: '_',
        position: startPosition,
        line: startLine,
        column: startColumn,
      };
    }

    // Handle numbers
    if (this.isDigit(char)) {
      return this.readNumber();
    }

    // Handle operators
    if (this.isOperator(char)) {
      return this.readOperator();
    }

    // Handle identifiers (variables, functions)
    if (this.isLetter(char)) {
      return this.readIdentifier();
    }

    // Handle unknown characters as identifiers
    this.advance();
    return {
      type: TokenType.IDENTIFIER,
      value: char,
      position: startPosition,
      line: startLine,
      column: startColumn,
    };
  }

  /**
   * Read a LaTeX command (starts with backslash)
   */
  private readCommand(): Token {
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
      type: TokenType.COMMAND,
      value: '\\' + command,
      position: startPosition,
      line: startLine,
      column: startColumn,
    };
  }

  /**
   * Read a number
   */
  private readNumber(): Token {
    const startPosition = this.position;
    const startLine = this.line;
    const startColumn = this.column;
    
    let number = '';
    let hasDecimal = false;
    
    while (this.position < this.input.length) {
      const char = this.input[this.position];
      
      if (this.isDigit(char)) {
        number += char;
        this.advance();
      } else if (char === '.' && !hasDecimal) {
        number += char;
        hasDecimal = true;
        this.advance();
      } else {
        break;
      }
    }
    
    return {
      type: TokenType.NUMBER,
      value: number,
      position: startPosition,
      line: startLine,
      column: startColumn,
    };
  }

  /**
   * Read an operator
   */
  private readOperator(): Token {
    const startPosition = this.position;
    const startLine = this.line;
    const startColumn = this.column;
    
    const operator = this.input[this.position];
    this.advance();
    
    return {
      type: TokenType.OPERATOR,
      value: operator,
      position: startPosition,
      line: startLine,
      column: startColumn,
    };
  }

  /**
   * Read an identifier
   */
  private readIdentifier(): Token {
    const startPosition = this.position;
    const startLine = this.line;
    const startColumn = this.column;
    
    let identifier = '';
    
    while (
      this.position < this.input.length &&
      (this.isLetter(this.input[this.position]) ||
        this.isDigit(this.input[this.position]))
    ) {
      identifier += this.input[this.position];
      this.advance();
    }
    
    return {
      type: TokenType.IDENTIFIER,
      value: identifier,
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
    if (this.position < this.input.length) {
      if (this.input[this.position] === '\n') {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
      this.position++;
    }
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
   * Check if character is an operator
   */
  private isOperator(char: string): boolean {
    return /[+\-*/=<>]/.test(char);
  }

  /**
   * Check if character is whitespace
   */
  private isWhitespace(char: string): boolean {
    return /\s/.test(char);
  }
} 