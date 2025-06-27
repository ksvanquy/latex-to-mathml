/**
 * Simple Hello World Package
 */

/**
 * Prints "Hello, World!" to the console
 */
export function sayHello(): void {
  console.log("Hello, World!");
}

/**
 * Returns a hello message with a custom name
 * @param name - The name to greet
 * @returns A greeting message
 */
export function greet(name: string): string {
  return `Hello, ${name}!`;
}

/**
 * Returns a hello message in different languages
 * @param language - The language code ('en', 'es', 'fr', 'de')
 * @param name - Optional name to include in the greeting
 * @returns A greeting message in the specified language
 */
export function greetInLanguage(language: string, name?: string): string {
  const greetings: Record<string, string> = {
    en: "Hello",
    es: "Hola",
    fr: "Bonjour",
    de: "Hallo",
  };

  const greeting = greetings[language] || greetings.en;
  return name ? `${greeting}, ${name}!` : `${greeting}!`;
}

/**
 * Default export with all functions
 */
export default {
  sayHello,
  greet,
  greetInLanguage,
};
