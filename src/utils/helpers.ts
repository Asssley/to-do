export function htmlEscape(text: string): string {
   return text.replace(/&/g, '&amp;').
     replace(/</g, '&lt;').
     replace(/"/g, '&quot;').
     replace(/'/g, '&#039;');
}