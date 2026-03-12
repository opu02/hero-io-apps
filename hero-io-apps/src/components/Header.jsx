import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Github, Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo">
            <div className="logo-icon">⚡</div>
            Hero<span>.IO</span>
          </Link>
          <nav className="nav">
            <NavLink to="/" end className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>Home</NavLink>
            <NavLink to="/apps" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>Apps</NavLink>
            <NavLink to="/installation" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>Installation</NavLink>
          </nav>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="contribution-btn">
            <Github size={16} />
            <span>Contribution</span>
          </a>
          <button className="menu-btn" onClick={() => setOpen(o => !o)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {open && (
          <div className="mobile-nav">
            <NavLink to="/" end className={({isActive}) => "nav-link" + (isActive ? " active" : "")} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/apps" className={({isActive}) => "nav-link" + (isActive ? " active" : "")} onClick={() => setOpen(false)}>Apps</NavLink>
            <NavLink to="/installation" className={({isActive}) => "nav-link" + (isActive ? " active" : "")} onClick={() => setOpen(false)}>Installation</NavLink>
          </div>
        )}
      </div>
    </header>
  );
}