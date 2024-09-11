import { TFunction } from "i18next";

// Function to validate the email
export function validateEmail(
  email: string,
  t: TFunction<"translation", undefined>
): string | null {
  if (!email) {
    return t("Email is required");
  }
  // Use a regular expression to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return t("Email is not valid");
  }
  return null;
}

// Function to validate the password
export function validatePassword(
  password: string,
  t: TFunction<"translation", undefined>
): string | null {
  if (!password) {
    return t("Password is required");
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    return `${t("Password must be :")}
    - ${t("Minimum 8 characters")}
    - ${t("At least one lowercase letter")}
    - ${t("At least one uppercase letter")}
    - ${t("At least one number")}`;
  }

  return null;
}

// Function to validate the password confirmation
export function validatePasswordConfirmation(
  password: string,
  confirmation: string,
  t: TFunction<"translation", undefined>
): string | null {
  if (!confirmation) {
    return t("Password confirmation is required");
  }

  if (password !== confirmation) {
    return t("Passwords do not match");
  }
  return null;
}
