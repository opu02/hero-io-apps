import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone } from "lucide-react";
import AppCard from "../components/AppCard";
import Loader from "../components/Loader";
import { appsData } from "../data/apps";

function formatNum(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B+";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M+";
  return n + "+";
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader />;

  const topApps = appsData.slice(0, 8);
  const totalDownloads = appsData.reduce((s, a) => s + a.downloads, 0);
  const totalReviews = appsData.reduce((s, a) => s + a.reviews, 0);

  return (
    <>
      <section className="banner">
        <div className="banner-bg" />
        <div className="container" style={{position:'relative'}}>
          <div className="banner-badge">
            <Smartphone size={13} />
            Discover Amazing Apps
          </div>
          <h1>
            Find the Best<br />
            <span className="gradient-text">Apps & Games</span>
          </h1>
          <p>Explore thousands of apps curated from the world's top stores. Install, review, and manage your favorites all in one place.</p>
          <div className="banner-buttons">
            <a href="https://apps.apple.com" target="_blank" rel="noreferrer" className="btn-primary">
              <span>🍎</span> App Store
            </a>
            <a href="https://play.google.com" target="_blank" rel="noreferrer" className="btn-secondary">
              <span>▶️</span> Play Store
            </a>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📱</div>
              <div className="stat-number">{appsData.length}+</div>
              <div className="stat-label">Curated Apps</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⬇️</div>
              <div className="stat-number">{formatNum(totalDownloads)}</div>
              <div className="stat-label">Total Downloads</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">{formatNum(totalReviews)}</div>
              <div className="stat-label">User Reviews</div>
            </div>
          </div>
        </div>
      </section>

      <section className="apps-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Top Apps</h2>
            <button className="show-all-btn" onClick={() => nav('/apps')}>Show All →</button>
          </div>
          <div className="apps-grid">
            {topApps.map(app => <AppCard key={app.id} app={app} />)}
          </div>
        </div>
      </section>
    </>
  );
}