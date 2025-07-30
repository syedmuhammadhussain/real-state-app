import { Star, StarHalf, StarOff } from "lucide-react";

// Validation functions
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Требуется электронной почты";
  if (!regex.test(email)) return "Неверный формат электронной почты";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Требуется пароль";
  if (password.length < 8)
    return "Пароль должен содержать не менее 8 символов.";
  return "";
};

/**
 * Validates that the password confirmation matches the original password.
 * @param {string} originalPassword - The original password to match against.
 * @param {string} confirmationPassword - The confirmation password to validate.
 * @returns {string} Empty string if valid, otherwise an error message.
 */
export const validateConfirmationPassword = (
  originalPassword,
  confirmationPassword
) => {
  if (originalPassword !== confirmationPassword) {
    return "Пароли не совпадают";
  }
  return "";
};

export const validateFirstName = (name) => {
  return name.trim().length > 0 ? null : "Имя обязательно";
};

export const validateLastName = (name) => {
  return name.trim().length > 0 ? null : "Фамилия обязательна";
};

export const validateTelephone = (telephone) => {
  const digitsOnly = telephone.replace(/\D/g, "");

  const e164WithPlus = /^\+7\d{10}$/;
  const localEight = /^8\d{10}$/;

  if (e164WithPlus.test(telephone) || localEight.test(digitsOnly)) {
    return null;
  }

  return "Неверный номер телефона";
};

export const getStarRating = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center text-accent-default">
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <Star key={i} size={16} className="fill-current" />
        ))}
      {hasHalfStar && <StarHalf size={16} className="fill-current" />}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <StarOff key={i} size={16} className="text-gray-400" />
        ))}
    </div>
  );
};
