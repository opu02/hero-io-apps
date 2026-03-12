import { useNavigate } from "react-router-dom";
import { Star, Download } from "lucide-react";

function formatNum(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return n;
}

export default function AppCard({ app }) {
  const nav = useNavigate();
  return (
    <div className="app-card" onClick={() => nav(`/apps/${app.id}`)}>
      <div className="app-img-wrap">
        <img src={app.image} alt={app.title} />
      </div>
      <div className="app-card-title">{app.title}</div>
      <div className="app-card-meta">
        <span className="app-meta-item">
          <Star size={11} className="star-icon" fill="#fbbf24" />
          {app.ratingAvg}
        </span>
        <span className="app-meta-item">
          <Download size={11} />
          {formatNum(app.downloads)}
        </span>
      </div>
    </div>
  );
}
