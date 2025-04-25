import { Star, StarHalf, StarOff } from "lucide-react";

  // Validation functions
  export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!regex.test(email)) return 'Invalid email format';
    return '';
    };

    export const validatePassword = (password) => {
      if (!password) return 'Password is required';
      if (password.length < 8) return 'Password must contain at least 8 characters';
      return '';
    };
    
    /**
     * Validates that the password confirmation matches the original password.
     * @param {string} originalPassword - The original password to match against.
     * @param {string} confirmationPassword - The confirmation password to validate.
     * @returns {string} Empty string if valid, otherwise an error message.
     */
    export const validateConfirmationPassword = (originalPassword, confirmationPassword) => {
      if (originalPassword !== confirmationPassword) {
        return 'Passwords do not match';
      }
      return '';
    };

    export const validateFirstName = (name) => {
    return name.trim().length > 0 ? null : 'First name is required';
    };

    export  const validateLastName = (name) => {
        return name.trim().length > 0 ? null : 'Last name is required';
    };

    export const validateTelephone = (telephone) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(telephone) ? null : 'Invalid telephone number';
    }; 

    export const getStarRating = (rating) => {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
      return (
        <div className="flex items-center text-accent-default">
          {Array(fullStars).fill().map((_, i) => <Star key={i} size={16} className="fill-current" />)}
          {hasHalfStar && <StarHalf size={16} className="fill-current" />}
          {Array(emptyStars).fill().map((_, i) => <StarOff key={i} size={16} className="text-gray-400" />)}
        </div>
      );
    };

    
    