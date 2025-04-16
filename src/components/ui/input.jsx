import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Phone, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const Input = ({ label = "", type, id, value, onChange, onBlur, error, placeholder, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      {/* Label */}
      <label
        htmlFor={id}
        className={`${label === "" && "hidden"} block text-sm mb-2 font-medium text-labelColor-default`}
      >
        {label} 
        {required && <span className="absolute text-sm text-errorColor-default pl-1 mt-1">*</span>}
      </label>

      <div className="relative">
        {/* Input Field */}
        <input
          id={id}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          className={cn(
            "w-full rounded-lg border !pr-9 px-4 py-2 text-textColor-dark bg-background-default focus:ring-2 focus:ring-primary-default focus:outline-none transition-all duration-300 ease-in-out",
            error ? "border-errorColor-default" : "border-gray-300 hover:border-primary-default"
          )}
        />

        {/* Icon Inside Input */}
        <motion.span 
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute top-3 right-3 flex items-center text-labelColor-light"
        >
          {id === "email" && <Mail size={20} className="animate-pulse" />}
          {id === "telephone" && <Phone size={20} className="animate-bounce" />}
          {id === "firstName" && <User size={20} className="animate-pulse" />}
          {id === "lastName" && <User size={20} className="animate-pulse" />}
          {id === "search" && <Search size={20} className="animate-wiggle" />}
        </motion.span>

        {/* Password Show/Hide Button */}
        {type === "password" && (
          <motion.button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
            className="absolute top-3 right-3 flex items-center text-labelColor-light transition-colors duration-300 ease-in-out hover:text-primary-default"
          >
            <motion.span
              initial={{ rotate: 180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="transition-transform duration-300 ease-in-out transform scale-100 hover:scale-110"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </motion.span>
          </motion.button>
        )}
      </div>

      {/* Error Message */}
      {error && <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-sm text-errorColor-default mt-1"
      >
        {error}
      </motion.p>}
    </div>
  );
};

export default Input;