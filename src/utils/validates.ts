export function verifyEmail(email: string): string {
  const trimmed = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    throw new Error("Invalid email format");
  }
  return trimmed.toLowerCase();
}


export function verifyPhone(phone: string): string {
  const phoneRegex = /^\+?\d[\d\s-]{8,}\d$/;
  if (!phoneRegex.test(phone)){
    throw new Error("Invalid phone number");
  };
  return phone;
}
