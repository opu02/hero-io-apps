import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import toast from "react-hot-toast";
import { ArrowLeft, Star, Download, MessageSquare, HardDrive, CheckCircle } from "lucide-react";
import Loader from "../components/Loader";
import { appsData } from "../data/apps";

function formatNum(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return n;
}

const COLORS = ["#ff6584", "#ffb347", "#fbbf24", "#43e97b", "#6c63ff"];

export default function AppDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [installed, setInstalled] = useState(false);

  const app = appsData.find(a => a.id === Number(id));

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (app) {
      const saved = JSON.parse(localStorage.getItem("installed") || "[]");
      setInstalled(saved.some(a => a.id === app.id));
    }
  }, [app]);

  if (loading) return <Loader />;

  if (!app) return (
    <div className="container" style={{padding:'80px 0', textAlign:'center'}}>
      <h2 style={{fontSize:'48px', marginBottom:'16px'}}>😔</h2>
      <h3 style={{fontSize:'24px', marginBottom:'8px'}}>App Not Found</h3>
      <p style={{color:'var(--text-muted)', marginBottom:'24px'}}>The app you're looking for doesn't exist.</p>
      <button className="btn-primary" onClick={() => nav('/apps')} style={{margin:'0 auto', display:'inline-flex'}}>Browse Apps</button>
    </div>
  );

  const handleInstall = () => {
    const saved = JSON.parse(localStorage.getItem("installed") || "[]");
    if (!saved.some(a => a.id === app.id)) {
      localStorage.setItem("installed", JSON.stringify([...saved, app]));
      setInstalled(true);
      toast.success(`${app.title} installed successfully! 🎉`);
    }
  };

  const chartData = app.ratings.map(r => ({ name: r.name, count: r.count }));

  return (
    <div className="details-page">
      <div className="container">
        <Link to="/apps" className="back-btn">
          <ArrowLeft size={16} /> Back to Apps
        </Link>

        <div className="details-top">
          <div className="details-app-img">
            <img src={app.image} alt={app.title} />
          </div>
          <div className="details-info">
            <h1>{app.title}</h1>
            <p className="details-company">{app.companyName}</p>
            <div className="details-meta">
              <div className="detail-meta-item">
                <span className="detail-meta-value" style={{display:'flex', alignItems:'center', gap:'4px'}}>
                  <Star size={18} fill="#fbbf24" color="#fbbf24" />{app.ratingAvg}
                </span>
                <span className="detail-meta-label">Rating</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-value">{formatNum(app.downloads)}</span>
                <span className="detail-meta-label">Downloads</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-value">{formatNum(app.reviews)}</span>
                <span className="detail-meta-label">Reviews</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-value">{app.size} MB</span>
                <span className="detail-meta-label">Size</span>
              </div>
            </div>
            <button
              className="install-btn"
              onClick={handleInstall}
              disabled={installed}
            >
              {installed ? <><CheckCircle size={16} /> Installed</> : <><Download size={16} /> Install</>}
            </button>
          </div>
        </div>

        <div className="chart-section">
          <h3 className="chart-title">📊 Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} margin={{top:0, right:0, bottom:0, left:0}}>
              <XAxis dataKey="name" stroke="var(--text-muted)" tick={{fontSize:12, fontFamily:'DM Sans'}} />
              <YAxis stroke="var(--text-muted)" tickFormatter={v => formatNum(v)} tick={{fontSize:12, fontFamily:'DM Sans'}} />
              <Tooltip
                contentStyle={{background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'10px', fontFamily:'DM Sans'}}
                formatter={v => [formatNum(v), 'Reviews']}
              />
              <Bar dataKey="count" radius={[6,6,0,0]}>
                {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="description-section">
          <h3>About {app.title}</h3>
          <p>{app.description}</p>
          <div className="description-meta">
            <span className="desc-meta-item"><HardDrive size={14} /> {app.size} MB</span>
            <span className="desc-meta-item"><MessageSquare size={14} /> {formatNum(app.reviews)} reviews</span>
            <span className="desc-meta-item"><Download size={14} /> {formatNum(app.downloads)} downloads</span>
            <span className="desc-meta-item"><Star size={14} fill="#fbbf24" color="#fbbf24" /> {app.ratingAvg} average rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}
