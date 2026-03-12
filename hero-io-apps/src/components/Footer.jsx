import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">⚡</div>
              Hero<span style={{color:'var(--accent)'}}>IO</span>
            </div>
            <p>Discover the best apps curated from around the world. Your one-stop destination for mobile app reviews and downloads.</p>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/apps">All Apps</Link></li>
              <li><Link to="/installation">My Installation</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Stores</h4>
            <ul>
              <li><a href="https://apps.apple.com" target="_blank" rel="noreferrer">App Store</a></li>
              <li><a href="https://play.google.com" target="_blank" rel="noreferrer">Play Store</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Discord</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Hero.IO. Built with React & Recharts.</p>
          <p>Made with ❤️ for the community</p>
        </div>
      </div>
    </footer>
  );
}