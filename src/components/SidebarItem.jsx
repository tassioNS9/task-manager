const SidebarItem = ({ children, variant, href }) => {
  const getVariantClasses = () => {
    if (variant === "unselected") {
      return "text-[#35383E]"
    }
    if (variant === "selected") {
      return "bg-[#E6F7F8] text-[#00ADB5]"
    }
  }
  return (
    <a
      className={`flex items-center gap-2 rounded px-4 py-2 hover:bg-[#E6F7F8] ${getVariantClasses()}`}
      href={href}
    >
      {children}
    </a>
  )
}

export default SidebarItem
