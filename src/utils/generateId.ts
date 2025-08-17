const symbols = "qwertyuiopasdfghjklzxcvbnm1234567890"

export const generateId = (length: number = 30) => {
  return [...Array(length)]
  .map((e) => symbols[Math.floor(Math.random() * 36)])
  .join('');
} 