import { Link } from "react-router-dom";
import { SIDEBAR_MENU } from "./sidebarMenu";

export default function SideBar({ user }) {
  const role = user?.role;

  const styles = `
  :root {
    --sidebar-collapsed: 70px;
    --sidebar-expanded: 260px;
    --navbar-height: 64px;
    --accent-color: #FF7A00;
  }

  .sidebar {
    position: fixed;
    top: var(--navbar-height);
    left: 0;
    width: var(--sidebar-collapsed);
    height: calc(100vh - var(--navbar-height));
    background: #111111; /* Deeper Obsidian Black */
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    overflow-x: hidden;
    overflow-y: auto;
    transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1040;
  }

  .sidebar:hover {
    width: var(--sidebar-expanded);
    box-shadow: 10px 0 30px rgba(0,0,0,0.2);
  }

  .nav-item {
    position: relative;
    width: 100%;
    margin-bottom: 5px;
  }

  .sidebar .nav-link {
    display: flex;
    align-items: center;
    padding: 14px 24px; /* Perfectly centered for 70px width */
    color: rgba(255, 255, 255, 0.6) !important;
    text-decoration: none;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
  }

  .sidebar .nav-link:hover {
    background: rgba(255, 122, 0, 0.1);
    color: var(--accent-color) !important;
    border-left: 3px solid var(--accent-color);
  }

  .sidebar .icon {
    font-size: 20px;
    min-width: 25px;
    text-align: center;
    transition: transform 0.3s ease;
  }

  .sidebar .nav-link:hover .icon {
    transform: scale(1.2);
    color: var(--accent-color);
  }

  .sidebar .link-text {
    opacity: 0;
    margin-left: 20px;
    font-weight: 600;
    white-space: nowrap;
    transition: opacity 0.2s ease, transform 0.3s ease;
    transform: translateX(-10px);
  }

  .sidebar:hover .link-text {
    opacity: 1;
    transform: translateX(0);
  }

  /* Submenu Styling */
  .collapse-inner {
    background: rgba(0, 0, 0, 0.2);
    padding: 5px 0;
  }

  .child-link {
    font-size: 0.85rem;
    padding: 10px 20px 10px 65px !important;
    opacity: 0.7;
  }

  .child-link:hover {
    opacity: 1;
    color: var(--accent-color) !important;
  }

  /* App Content Adjustment Logic */
  .app-container {
    margin-left: var(--sidebar-collapsed);
    transition: margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 20px;
  }
`;

return (
  <>
    <style>{styles}</style>
    <div className="sidebar">
      <ul className="nav flex-column py-3">
        {SIDEBAR_MENU
          .filter(item => item.roles.includes(role))
          .map((item, index) => {
            const Icon = item.icon;
            const collapseId = `menu-${index}`;

            if (!item.children) {
              return (
                <li className="nav-item" key={item.label}>
                  <Link to={item.path} className="nav-link">
                    <Icon className="icon" />
                    <span className="link-text">{item.label}</span>
                  </Link>
                </li>
              );
            }

            return (
              <li className="nav-item" key={item.label}>
                <a
                  className="nav-link"
                  data-bs-toggle="collapse"
                  href={`#${collapseId}`}
                  role="button"
                  aria-expanded="false"
                >
                  <Icon className="icon" />
                  <span className="link-text">{item.label}</span>
                  <i className="fas fa-chevron-down ms-auto link-text" style={{fontSize: '10px'}}></i>
                </a>

                <div className="collapse" id={collapseId}>
                  <div className="collapse-inner">
                    <ul className="nav flex-column">
                      {item.children.map(child => (
                        <li key={child.label}>
                          <Link to={child.path} className="nav-link child-link">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  </>
);
}
