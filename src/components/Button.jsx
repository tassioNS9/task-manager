const Button = ({
  children,
  variant = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-brand-primary  text-white"
    }
    if (variant === "secondary") {
      return "bg-light-gray  text-[#353583E]"
    }
    if (variant === "ghost") {
      return "bg-transparent text-brand-dark-gray"
    }
  }

  const getSizeClasses = () => {
    if (size == "small") {
      return "py-1 text-xs"
    }

    if (size == "large") {
      return "py-2 text-sm"
    }
  }
  return (
    <button
      {...rest}
      className={`flex items-center ${className} gap-2 rounded-md px-3 font-semibold transition hover:opacity-50 ${getSizeClasses()} ${getVariantClasses()}`}
    >
      {children}
    </button>
  )
}

export default Button
