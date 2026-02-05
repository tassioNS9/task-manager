import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import { tv } from "tailwind-variants"
const SidebarItem = ({ children, to }) => {
  const sidebar = tv({
    base: `flex items-center gap-2 rounded px-4 py-2 hover:bg-opacity-15 hover:text-brand-primary`,
    variants: {
      color: {
        unselected: "bg-brand-primary bg-opacity-15 text-brand-primary",
        selected: "text-brand-dark-blue",
      },
    },
    defaultVariants: {
      color: "unselected",
    },
  })

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        sidebar({ color: isActive ? "unselected" : "selected" })
      }
    >
      {children}
    </NavLink>
  )
}

SidebarItem.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
}

export default SidebarItem
