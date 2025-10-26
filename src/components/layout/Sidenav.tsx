import { NavLink } from "react-router-dom";
import { ClipboardCheck, Receipt } from "flowbite-react-icons/outline";
import { tv } from "tailwind-variants";

const sidenavStyles = tv({
  slots: {
    nav: "w-64 h-screen border-r border-gray-300 bg-white flex flex-col",
    header: "px-4 py-5 h-[71px] border-b border-gray-300",
    title: "text-lg font-semibold text-gray-900",
    menu: "flex-1 py-4",
    link: [
      "flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700",
      "hover:bg-gray-50 transition-colors",
      "border-l-2 border-transparent",
    ],
    linkActive: "bg-gray-100 border-l-black text-black",
    icon: "text-xl",
  },
});

const styles = sidenavStyles();

export const Sidenav = () => {
  return (
    <nav className={styles.nav()}>
      <div className={styles.header()}>
        <h2 className={styles.title()}>Journal System</h2>
      </div>
      <div className={styles.menu()}>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive ? `${styles.link()} ${styles.linkActive()}` : styles.link()
          }
        >
          <ClipboardCheck className={styles.icon()} />
          <span>Tasks</span>
        </NavLink>
        <NavLink
          to="/journal-entries"
          className={({ isActive }) =>
            isActive ? `${styles.link()} ${styles.linkActive()}` : styles.link()
          }
        >
          <Receipt className={styles.icon()} />
          <span>Journal Entries</span>
        </NavLink>
      </div>
    </nav>
  );
};
