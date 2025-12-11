import { FaHome, FaCheck, FaClock } from "react-icons/fa";
import { NavLink } from "react-router-dom";


export default function SidebarNav() {
  return (
<aside className="sidebar">
        {/* Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            "toolIcon" + (isActive ? " active" : "")
          }
          title="Home"
        >
          <FaHome />
        </NavLink>

        {/* Matrix + Todo */}
        <NavLink
          to="/matrix"
          className={({ isActive }) =>
            "toolIcon" + (isActive ? " active" : "")
          }
          title="Tasks & Matrix"
        >
          <FaCheck />
        </NavLink>

        {/* Time Tracker */}
        <NavLink
          to="/tracker"
          className={({ isActive }) =>
            "toolIcon" + (isActive ? " active" : "")
          }
          title="Time Tracker"
        >
          <FaClock />
        </NavLink>
      </aside>
  );
}