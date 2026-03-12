import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import AppCard from "../components/AppCard";
import Loader from "../components/Loader";
import { appsData } from "../data/apps";

export default function Apps() {
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setSearchLoading(true);
    const t = setTimeout(() => {
      setDebouncedQuery(query);
      setSearchLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [query]);

  const filtered = useMemo(() => {
    let list = appsData.filter(a =>
      a.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    if (sort === "high-low") list = [...list].sort((a, b) => b.downloads - a.downloads);
    if (sort === "low-high") list = [...list].sort((a, b) => a.downloads - b.downloads);
    return list;
  }, [debouncedQuery, sort]);

  if (loading) return <Loader />;

  return (
    <>
      <section className="page-title-section">
        <div className="container">
          <h1>All <span className="gradient-text">Apps</span></h1>
          <p>Browse our complete collection of top-rated applications</p>
        </div>
      </section>

      <section style={{padding: '0 0 80px'}}>
        <div className="container">
          <div className="apps-controls">
            <div className="apps-count">
              Showing <strong>{filtered.length}</strong> of <strong>{appsData.length}</strong> apps
            </div>
            <div className="search-sort-wrap">
              <div className="search-bar">
                <Search size={14} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>
              <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="">Sort by</option>
                <option value="high-low">Downloads: High → Low</option>
                <option value="low-high">Downloads: Low → High</option>
              </select>
            </div>
          </div>

          {searchLoading ? (
            <div style={{textAlign:'center', padding:'60px 0'}}>
              <div className="loader-ring" style={{margin:'0 auto'}} />
            </div>
          ) : (
            <div className="apps-grid">
              {filtered.length === 0 ? (
                <div className="no-results">
                  <h3>🔍 No Apps Found</h3>
                  <p>Try a different search term</p>
                </div>
              ) : filtered.map(app => <AppCard key={app.id} app={app} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}