import { tv } from "tailwind-variants"

const SidebarItem = ({ children, color, href }) => {
  const sidebar = tv({
    base: `hover:text-brand-primary flex items-center gap-2 rounded px-4 py-2 hover:bg-opacity-15`,
    variants: {
      color: {
        unselected: "bg-brand-primary text-brand-primary bg-opacity-15",
        selected: "text-brand-dark-blue",
      },
    },
    defaultVariants: {
      color: "unselected",
    },
  })

  return (
    <a className={sidebar({ color })} href={href}>
      {children}
    </a>
  )
}

export default SidebarItem
