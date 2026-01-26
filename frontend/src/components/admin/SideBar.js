import { Link } from "react-router-dom";
import { SIDEBAR_MENU } from "./sidebarMenu";
import "./dashboard.css";

export default function SideBar({ user }) {
  const role = user?.role;

  return (
    <div className="sidebar bg-dark">
      <ul className="nav flex-column">

        {SIDEBAR_MENU
          .filter(item => item.roles.includes(role))
          .map((item, index) => {

            const Icon = item.icon;
            const collapseId = `menu-${index}`;

            // SIMPLE LINK
            if (!item.children) {
              return (
                <li className="nav-item" key={item.label}>
                  <Link
                    to={item.path}
                    className="nav-link text-white d-flex align-items-center"
                  >
                    <Icon className="icon" />
                    <span className="link-text">{item.label}</span>
                  </Link>
                </li>
              );
            }

            // COLLAPSIBLE MENU
            return (
              <li className="nav-item" key={item.label}>
                <a
                  className="nav-link text-white d-flex align-items-center"
                  data-bs-toggle="collapse"
                  href={`#${collapseId}`}
                  role="button"
                  aria-expanded="false"
                  aria-controls={collapseId}
                >
                  <Icon className="icon" />
                  <span className="link-text">{item.label}</span>
                </a>

                <div className="collapse" id={collapseId}>
                  <ul className="nav flex-column ms-4">
                    {item.children.map(child => (
                      <li key={child.label}>
                        <Link
                          to={child.path}
                          className="nav-link text-white"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}

      </ul>
    </div>
  );
}
