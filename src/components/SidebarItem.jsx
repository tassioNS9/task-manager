// eslint-disable-next-line react/prop-types
const SidebarItem = ({ children, variant, href }) => {
  const getVariantClasses = () => {
    if (variant === "unselected") {
      return "text-brand-dark-blue"
    }
    if (variant === "selected") {
      return "bg-[#E6F7F8] text-brand-primary"
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
