"use client";
import {  FC } from "react";
import { InputProps } from "@/types/interfaces";
import { BiRupee } from "react-icons/bi";

const Input: FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiRupee
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${error ? "border-rose-500" : "border-neutral-300"}
          ${error ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          ${required ? "after:content-['*']" : " "}
          ${required ? "after:ml-1" : " "}
          ${required ? "after:text-red-600" : " "}
          origin-[0] 
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${error ? "text-rose-500" : "text-zinc-400"}
        `}
        htmlFor={id}
      >
        {label}
      </label>
      {error && <p className="text-rose-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
