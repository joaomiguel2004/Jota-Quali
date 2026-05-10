export const isEmail = (v: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export interface PasswordCheck {
  valid: boolean;
  message?: string;
}

export const checkPassword = (v: string): PasswordCheck => {
  if (v.length < 8) return { valid: false, message: "Mínimo de 8 caracteres." };
  if (!/[A-Z]/.test(v))
    return { valid: false, message: "Inclua ao menos uma letra maiúscula." };
  if (!/[0-9]/.test(v))
    return { valid: false, message: "Inclua ao menos um número." };
  return { valid: true };
};

export const required = (v: string): boolean => v.trim().length > 0;
