import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Star, Download, Trash2 } from "lucide-react";
import Loader from "../components/Loader";

function formatNum(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return n;
}

export default function Installation() {
  const [loading, setLoading] = useState(true);
  const [installed, setInstalled] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      const saved = JSON.parse(localStorage.getItem("installed") || "[]");
      setInstalled(saved);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const uninstall = (app) => {
    const updated = installed.filter(a => a.id !== app.id);
    setInstalled(updated);
    localStorage.setItem("installed", JSON.stringify(updated));
    toast.success(`${app.title} has been uninstalled.`);
  };

  if (loading) return <Loader />;

  return (
    <>
      <section className="page-title-section">
        <div className="container">
          <h1>My <span className="gradient-text">Installation</span></h1>
          <p>Manage all your installed applications in one place</p>
        </div>
      </section>

      <section style={{padding:'0 0 80px'}}>
        <div className="container">
          {installed.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No Apps Installed</h3>
              <p style={{marginBottom:'24px'}}>You haven't installed any apps yet. Browse and install some!</p>
              <button className="btn-primary" style={{margin:'0 auto', display:'inline-flex'}} onClick={() => nav('/apps')}>
                Browse Apps
              </button>
            </div>
          ) : (
            <>
              <p style={{color:'var(--text-muted)', fontSize:'14px', marginBottom:'24px'}}>
                <strong style={{color:'var(--text)'}}>{installed.length}</strong> app{installed.length !== 1 ? 's' : ''} installed
              </p>
              <div className="installation-grid">
                {installed.map(app => (
                  <div key={app.id} className="installed-card">
                    <div className="app-img-wrap">
                      <img src={app.image} alt={app.title} />
                    </div>
                    <div className="app-card-title">{app.title}</div>
                    <div className="app-card-meta" style={{marginBottom:'4px'}}>
                      <span className="app-meta-item">
                        <Star size={11} className="star-icon" fill="#fbbf24" />
                        {app.ratingAvg}
                      </span>
                      <span className="app-meta-item">
                        <Download size={11} />
                        {formatNum(app.downloads)}
                      </span>
                    </div>
                    <p style={{fontSize:'12px', color:'var(--text-dim)', marginTop:'4px'}}>{app.companyName}</p>
                    <button className="uninstall-btn" onClick={() => uninstall(app)}>
                      <Trash2 size={13} style={{display:'inline', marginRight:'4px'}} />
                      Uninstall
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}