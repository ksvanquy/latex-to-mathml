# LaTeX to MathML Converter

A professional TypeScript library to convert LaTeX mathematical expressions to MathML 3.0 with a modular architecture and comprehensive error handling.

## Features

- **Complete LaTeX Support**: Convert LaTeX mathematical expressions to MathML 3.0
- **Modular Architecture**: Clean separation of concerns with each file under 200 lines
- **Professional Error Handling**: Comprehensive error reporting and validation
- **Multiple Output Formats**: MathML, HTML, SVG, and document formats
- **TypeScript Support**: Full type safety and IntelliSense support
- **Extensible**: Easy to add new commands and environments
- **Validation**: Input validation and AST structure validation
- **Performance**: Optimized parsing and generation

## Installation

```bash
npm install latex-to-mathml
```

## Quick Start

```typescript
import { convert, convertDisplay, convertInline } from 'latex-to-mathml';

// Convert inline math
const result = convertInline('x^2 + y^2 = z^2');
console.log(result.mathml);

// Convert display math
const displayResult = convertDisplay('\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}');
console.log(displayResult.mathml);

// Convert with options
const resultWithOptions = convert('\\alpha + \\beta', {
  displayMode: true,
  strictMode: false,
  allowUnknownCommands: true
});
```

## API Reference

### Main Functions

#### `convert(latex: string, options?: ConversionOptions): ConversionResult`
Convert LaTeX to MathML with default settings.

#### `convertDisplay(latex: string, options?: ConversionOptions): ConversionResult`
Convert LaTeX to MathML in display mode.

#### `convertInline(latex: string, options?: ConversionOptions): ConversionResult`
Convert LaTeX to MathML in inline mode.

#### `convertToHTML(latex: string, options?: ConversionOptions & { title?: string }): ConversionResult`
Convert LaTeX to HTML with embedded MathML.

#### `convertToSVG(latex: string, options?: ConversionOptions & { width?: number; height?: number }): ConversionResult`
Convert LaTeX to SVG representation.

#### `convertToDocument(latex: string, options?: ConversionOptions): ConversionResult`
Convert LaTeX to complete MathML document.

#### `validate(latex: string): { isValid: boolean; errors: string[]; warnings: string[] }`
Validate LaTeX input without converting.

#### `prettyPrint(latex: string, options?: ConversionOptions): ConversionResult`
Generate pretty-printed MathML.

#### `minify(latex: string, options?: ConversionOptions): ConversionResult`
Generate minified MathML.

### Options

```typescript
interface ConversionOptions {
  displayMode?: boolean;        // Display or inline mode
  strictMode?: boolean;         // Strict parsing mode
  allowUnknownCommands?: boolean; // Allow unknown commands
  preserveWhitespace?: boolean; // Preserve whitespace
}
```

### Result

```typescript
interface ConversionResult {
  mathml: string;      // Generated MathML string
  errors: string[];    // Array of error messages
  warnings: string[];  // Array of warning messages
}
```

## Supported LaTeX Features

### Greek Letters
- `\alpha`, `\beta`, `\gamma`, `\delta`, `\epsilon`
- `\Alpha`, `\Beta`, `\Gamma`, `\Delta`, `\Epsilon`
- And all other Greek letters

### Mathematical Operators
- `\sum`, `\prod`, `\int`, `\lim`, `\infty`
- `\partial`, `\nabla`, `\pm`, `\mp`
- `\times`, `\div`, `\cdot`

### Fractions and Roots
- `\frac{numerator}{denominator}`
- `\sqrt{expression}`
- `\root{index}{expression}`

### Subscripts and Superscripts
- `x^2` for superscripts
- `x_2` for subscripts
- `x^2_3` for both

### Text Formatting
- `\text{text}`
- `\mathbf{bold}`
- `\mathit{italic}`
- `\mathrm{roman}`
- `\mathsf{sans-serif}`
- `\mathtt{typewriter}`
- `\mathcal{calligraphic}`
- `\mathbb{blackboard}`

### Environments
- `equation`, `align`, `gather`
- `matrix`, `pmatrix`, `bmatrix`, `vmatrix`
- `array`, `tabular`
- `theorem`, `lemma`, `proof`
- `itemize`, `enumerate`
- And many more...

### Relations and Logic
- `=`, `\neq`, `<`, `>`, `\leq`, `\geq`
- `\approx`, `\sim`, `\cong`, `\equiv`
- `\land`, `\lor`, `\neg`, `\implies`, `\iff`
- `\forall`, `\exists`

### Set Theory
- `\in`, `\notin`, `\subset`, `\supset`
- `\subseteq`, `\supseteq`, `\cup`, `\cap`
- `\setminus`, `\emptyset`

## Architecture

The library follows a modular architecture with clear separation of concerns:

```
src/
├── core/           # Core types and constants
│   ├── types.ts    # TypeScript interfaces
│   └── constants.ts # LaTeX commands and MathML elements
├── parser/         # LaTeX parsing
│   ├── lexer.ts    # Tokenization
│   ├── parser.ts   # Main parser
│   ├── commands.ts # Command parsing
│   ├── environments.ts # Environment parsing
│   └── expressions.ts # Expression parsing
├── generator/      # MathML generation
│   └── mathml-generator.ts # AST to MathML conversion
├── converter/      # Main conversion logic
│   └── latex-converter.ts # High-level converter
├── utils/          # Utilities
│   ├── error-handler.ts # Error handling
│   └── validator.ts # Input and AST validation
└── index.ts        # Main exports
```

## Examples

### Basic Usage

```typescript
import { convert } from 'latex-to-mathml';

// Simple expression
const result = convert('x + y = z');
console.log(result.mathml);

// Complex expression
const complex = convert('\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}');
console.log(complex.mathml);

// With error handling
if (result.errors.length > 0) {
  console.error('Errors:', result.errors);
}
if (result.warnings.length > 0) {
  console.warn('Warnings:', result.warnings);
}
```

### Advanced Usage

```typescript
import { LaTeXConverter } from 'latex-to-mathml';

const converter = new LaTeXConverter();

// Custom options
const result = converter.convert('\\alpha + \\beta', {
  displayMode: true,
  strictMode: false,
  allowUnknownCommands: true
});

// Get AST
const ast = converter.parse('x^2 + y^2');

// Generate different formats
const html = converter.convertToHTML('\\frac{1}{2}', { title: 'My Math' });
const svg = converter.convertToSVG('\\sum_{i=1}^{n} i', { width: 400, height: 200 });
```

### Error Handling

```typescript
import { convert, validate } from 'latex-to-mathml';

// Validate before converting
const validation = validate('x^2 + y^2');
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
  return;
}

// Convert with error handling
const result = convert('x^2 + y^2');
if (result.errors.length > 0) {
  console.error('Conversion errors:', result.errors);
} else {
  console.log('Success:', result.mathml);
}
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
npm run test:watch
```

### Linting

```bash
npm run lint
npm run format
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/latex-to-mathml/issues)
- **Documentation**: [GitHub Wiki](https://github.com/yourusername/latex-to-mathml/wiki)
- **Examples**: [Examples Directory](./examples)

## Roadmap

- [ ] Support for more LaTeX packages
- [ ] Performance optimizations
- [ ] WebAssembly version
- [ ] Browser extension
- [ ] VS Code extension
- [ ] More output formats (PNG, PDF)
- [ ] Interactive MathML editor