import { TFunction } from "i18next";

/**
 * Function to validate the names
 *
 * @param email
 * @param t
 * @returns Returns a string if the name is invalid, otherwise returns null
 */
export function validateName(
  name: string,
  t: TFunction<"translation", undefined>
): string | null {
  if (!name) {
    return t("Required field");
  }
  // Name must be at least 3 characters long
  if (name.length < 3) {
    return t("Name must be at least 3 characters long");
  }
  return null;
}

/**
 * Function to validate the email
 *
 * @param email
 * @param t
 * @returns Returns a string if the email is invalid, otherwise returns null
 */
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

/**
 * Function to validate the password
 *
 * @param password
 * @param t
 * @returns Returns a string if the password is invalid, otherwise returns null
 */
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

/**
 * Function to validate the password confirmation
 *
 * @param password
 * @param confirmation
 * @param t
 * @returns Returns a string if the password confirmation is invalid, otherwise returns null
 */
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

/**
 * Function to validate file size and type
 *
 * @param file
 * @param t
 * @returns Returns a string if the file is invalid, otherwise returns null
 */
export function validateFile(
  file: File,
  t: TFunction<"translation", undefined>
): string | null {
  // Validate the file size (Max : 3MB)
  if (file.size > 1024 * 1024 * 3) {
    return t("{{fileName}} File size must be less than 3MB", {
      fileName: '"' + file.name + '"',
    });
  }
  // Validate the file type
  const match = file.type.match(/\/(jpg|jpeg|png|pdf)$/);
  if (!match) {
    return t("{{fileName}} Only JPG, JPEG, PNG and PDF files are allowed", {
      fileName: '"' + file.name + '"',
    });
  }
  return null;
}
