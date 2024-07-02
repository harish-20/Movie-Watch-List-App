import React from "react";
import { Link, NavLink } from "react-router-dom";

import classes from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  return (
    <div className={classes.sidebar}>
      <Link to="/">
        <h2 className={classes.title}>Movie Watchlist</h2>
      </Link>

      <div className={classes.links}>
        <NavLink
          className={({ isActive }) =>
            isActive ? classes.active : classes.link
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? classes.active : classes.link
          }
          to="/addNewMovie"
        >
          Add New Movie
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
