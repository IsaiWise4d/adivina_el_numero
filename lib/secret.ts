export function generateSecret(length: number): string {
  if (length > 10) {
    throw new Error('No se pueden generar más de 10 dígitos únicos');
  }
  // Crear array de dígitos 0-9
  const digits = Array.from({ length: 10 }, (_, i) => i.toString());
  // Mezclar con Fisher-Yates
  for (let i = digits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [digits[i], digits[j]] = [digits[j], digits[i]];
  }
  // Tomar los primeros 'length'
  return digits.slice(0, length).join('');
}
