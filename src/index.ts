/**
 * Simple Hello World function
 * @param name - Optional name to greet
 * @returns A greeting message
 */
export function hello(name?: string): string {
  const target = name || "World";
  return `Hello, ${target}!`;
}

/**
 * Get current timestamp
 * @returns Current timestamp as string
 */
export function getTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Default export with main functionality
 */
export default {
  hello,
  getTimestamp,
};
