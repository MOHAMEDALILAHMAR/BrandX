import './AnalyticsDashboard.css';

const NAV_ITEMS = ['OVERVIEW', 'DASHBOARD', 'ANALYTICS', 'CAMPAIGNS', 'AUDIENCE', 'CONTENT', 'ADS', 'REPORTS', 'SETTINGS'];

const KPIS = [
  { label: 'Total Reach', value: '2.45M', change: '-15.8%', up: false, sparkline: '0,18 10,20 20,14 30,16 40,10 50,12 60,6' },
  { label: 'Engagement', value: '245K',  change: '+22.1%', up: true,  sparkline: '0,12 10,10 20,16 30,14 40,18 50,20 60,22' },
  { label: 'Impressions', value: '8.75M', change: '-15.2%', up: false, sparkline: '0,16 10,18 20,12 30,14 40,8 50,10 60,4' },
  { label: 'Conversions', value: '32.5K', change: '-15.3%', up: false, sparkline: '0,20 10,18 20,22 30,16 40,18 50,12 60,14' },
];

const ENG_RATE = 4.38;
const ENG_CHANGE = '+12.4%';
const ENG_RING_CIRCUMFERENCE = 2 * Math.PI * 30;


const PLATFORMS = [
  { name: 'Instagram', value: '1.2M', pct: 40 },
  { name: 'Facebook',  value: '850K', pct: 28 },
  { name: 'TikTok',    value: '620K', pct: 20 },
  { name: 'LinkedIn',  value: '210K', pct: 7 },
  { name: 'YouTube',   value: '190K', pct: 6 },
];

const TOP_CAMPAIGNS = [
  { title: 'Product Launch',      date: 'May 25, 2024', reach: '1.2M', roi: '320%' },
  { title: 'Behind the Scenes',   date: 'May 18, 2024', reach: '890K', roi: '245%' },
  { title: 'Client Success Story',date: 'May 10, 2024', reach: '650K', roi: '188%' },
];

const CAMPAIGN_TABLE = [
  { name: 'Spring Sale',        reach: '2.1M', eng: '180K', conv: '18.2K', roi: '285%' },
  { name: 'Brand Awareness',    reach: '1.8M', eng: '145K', conv: '12.5K', roi: '210%' },
  { name: 'Product Launch',     reach: '1.2M', eng: '98K',  conv: '8.7K',  roi: '320%' },
  { name: 'Retargeting',        reach: '890K', eng: '72K',  conv: '6.3K',  roi: '175%' },
  { name: 'Influencer Campaign',reach: '1.5M', eng: '210K', conv: '15.1K', roi: '260%' },
];

const AD_SPEND = 45670;
const AD_SPEND_CIRCUMFERENCE = 2 * Math.PI * 45;

const AD_PLATFORMS = [
  { name: 'Instagram', spend: 18500, color: '#EC4899' },
  { name: 'Facebook',  spend: 12500, color: '#3B82F6' },
  { name: 'TikTok',    spend: 9870,  color: '#8B5CF6' },
  { name: 'LinkedIn',  spend: 4800,  color: '#10B981' },
];

const DEMOGRAPHICS = [
  { label: '18-24', pct: 22.5, color: '#7C3AED' },
  { label: '25-34', pct: 38.7, color: '#8B5CF6' },
  { label: '35-44', pct: 23.1, color: '#A78BFA' },
  { label: '45+',   pct: 15.7, color: '#C4B5FD' },
];

// Pre-calculate donut segment offsets
const DEMO_CIRCUMFERENCE = 2 * Math.PI * 38;
let demoOffset = 0;
const DEMO_SEGMENTS = DEMOGRAPHICS.map((d) => {
  const length = (d.pct / 100) * DEMO_CIRCUMFERENCE;
  const seg = { ...d, dashArray: `${length} ${DEMO_CIRCUMFERENCE - length}`, dashOffset: -demoOffset };
  demoOffset += length;
  return seg;
});

function Sparkline({ points, color = '#8B5CF6' }: { points: string; color?: string }) {
  const maxY = 22;
  const coords = points.split(' ').map(p => {
    const [x, y] = p.split(',').map(Number);
    return `${x},${maxY - y}`;
  });
  return (
    <svg width="80" height="26" viewBox="0 0 64 26" className="dash-sparkline">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        points={coords.join(' ')} />
    </svg>
  );
}

function AudienceChart() {
  const pathD = 'M0,70 Q40,50 80,60 T160,30 T240,45 T300,15';
  const areaD = pathD + ' L300,95 L0,95 Z';
  return (
    <svg width="100%" height="100" viewBox="0 0 300 100" preserveAspectRatio="none" className="dash-audience-svg">
      <defs>
        <linearGradient id="audienceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#audienceGrad)" />
      <path d={pathD} fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AnalyticsDashboard() {
  return (
    <section className="dash-section">
      <div className="dash-card">
        {/* ── Header ── */}
        <div className="dash-header">
          <div className="dash-logo">BrandX</div>
          <div className="dash-badge">
            <span className="dash-badge-icon">&#128722;</span>
            <span className="dash-badge-check">&#10003;</span>
            ALL PRODUCTS SOLD OUT
          </div>
          <div className="dash-controls">
            <span className="dash-date">May 1 - May 31, 2024</span>
            <button className="dash-export-btn">Export</button>
          </div>
        </div>

        <div className="dash-body">
          {/* ── Sidebar ── */}
          <div className="dash-sidebar">
            {NAV_ITEMS.map((item, i) => (
              <div key={item} className={`dash-nav-item ${i === 0 ? 'dash-nav-active' : ''}`}>
                {item}
              </div>
            ))}
          </div>

          {/* ── Main content ── */}
          <div className="dash-main">
            {/* Row 1 — KPI cards */}
            <div className="dash-kpi-row">
              {KPIS.map((kpi) => (
                <div key={kpi.label} className="dash-kpi-card">
                  <div className="dash-kpi-label">{kpi.label}</div>
                  <div className="dash-kpi-value">{kpi.value}</div>
                  <div className="dash-kpi-footer">
                    <Sparkline points={kpi.sparkline} />
                    <span className={`dash-kpi-change ${kpi.up ? 'dash-up' : 'dash-down'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
              ))}
              {/* Engagement Rate ring */}
              <div className="dash-kpi-card dash-kpi-ring-card">
                <div className="dash-kpi-label">Engagement Rate</div>
                <div className="dash-ring-wrap">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#8B5CF6" strokeWidth="6"
                      strokeDasharray={`${ENG_RING_CIRCUMFERENCE * 0.438} ${ENG_RING_CIRCUMFERENCE * 0.562}`}
                      strokeLinecap="round" transform="rotate(-90 40 40)" />
                  </svg>
                  <div className="dash-ring-value">{ENG_RATE}%</div>
                </div>
                <span className="dash-kpi-change dash-up">{ENG_CHANGE}</span>
              </div>
            </div>

            {/* Row 2 — Charts */}
            <div className="dash-charts-row">
              {/* Audience Growth */}
              <div className="dash-chart-card dash-chart-wide">
                <div className="dash-chart-header">
                  <span className="dash-chart-title">Audience Growth</span>
                  <span className="dash-chart-sub">+32.7K New Followers</span>
                </div>
                <AudienceChart />
              </div>

              {/* Platform Performance */}
              <div className="dash-chart-card">
                <div className="dash-chart-title">Platform Performance</div>
                <div className="dash-platform-list">
                  {PLATFORMS.map((p) => (
                    <div key={p.name} className="dash-platform-item">
                      <div className="dash-platform-name">{p.name}</div>
                      <div className="dash-platform-bar-wrap">
                        <div className="dash-platform-bar" style={{ width: `${p.pct}%` }} />
                      </div>
                      <div className="dash-platform-value">{p.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Campaigns */}
              <div className="dash-chart-card">
                <div className="dash-chart-title">Top Campaigns</div>
                <div className="dash-top-campaigns">
                  {TOP_CAMPAIGNS.map((c, i) => (
                    <div key={i} className="dash-campaign-item">
                      <div className="dash-campaign-thumb" style={{ background: i === 0 ? '#7C3AED' : i === 1 ? '#6D28D9' : '#5B21B6' }} />
                      <div className="dash-campaign-info">
                        <div className="dash-campaign-name">{c.title}</div>
                        <div className="dash-campaign-date">{c.date}</div>
                        <div className="dash-campaign-metrics">{c.reach} &middot; ROI {c.roi}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3 — Bottom metrics */}
            <div className="dash-metrics-row">
              {/* Campaign Performance Table */}
              <div className="dash-metric-card dash-table-card">
                <div className="dash-chart-title">Campaign Performance</div>
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Campaign</th>
                      <th>Reach</th>
                      <th>Eng.</th>
                      <th>Conv.</th>
                      <th>ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CAMPAIGN_TABLE.map((row) => (
                      <tr key={row.name}>
                        <td>{row.name}</td>
                        <td>{row.reach}</td>
                        <td>{row.eng}</td>
                        <td>{row.conv}</td>
                        <td className="dash-roi">{row.roi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Ad Performance */}
              <div className="dash-metric-card">
                <div className="dash-chart-title">Ad Performance</div>
                <div className="dash-ad-spend-wrap">
                  <svg width="110" height="110" viewBox="0 0 110 110">
                    <circle cx="55" cy="55" r="45" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                    {(() => {
                      const total = AD_PLATFORMS.reduce((s, p) => s + p.spend, 0);
                      let offset = 0;
                      return AD_PLATFORMS.map((p) => {
                        const length = (p.spend / total) * AD_SPEND_CIRCUMFERENCE;
                        const seg = (
                          <circle key={p.name} cx="55" cy="55" r="45" fill="none" stroke={p.color}
                            strokeWidth="8"
                            strokeDasharray={`${length} ${AD_SPEND_CIRCUMFERENCE - length}`}
                            strokeDashoffset={-offset}
                            transform="rotate(-90 55 55)"
                            style={{ transition: 'stroke-dashoffset 0.5s' }} />
                        );
                        offset += length;
                        return seg;
                      });
                    })()}
                  </svg>
                  <div className="dash-ad-center">
                    <div className="dash-ad-total">${AD_SPEND.toLocaleString()}</div>
                    <div className="dash-ad-total-label">Total Spend</div>
                  </div>
                </div>
                <div className="dash-ad-breakdown">
                  {AD_PLATFORMS.map((p) => (
                    <div key={p.name} className="dash-ad-row">
                      <span className="dash-ad-dot" style={{ background: p.color }} />
                      <span className="dash-ad-name">{p.name}</span>
                      <span className="dash-ad-amount">${(p.spend / 1000).toFixed(1)}K</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demographics */}
              <div className="dash-metric-card">
                <div className="dash-chart-title">Demographics</div>
                <div className="dash-demo-wrap">
                  <svg width="110" height="110" viewBox="0 0 110 110">
                    <circle cx="55" cy="55" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                    {DEMO_SEGMENTS.map((seg) => (
                      <circle key={seg.label} cx="55" cy="55" r="38" fill="none" stroke={seg.color}
                        strokeWidth="10"
                        strokeDasharray={seg.dashArray}
                        strokeDashoffset={seg.dashOffset}
                        transform="rotate(-90 55 55)"
                        style={{ transition: 'stroke-dashoffset 0.5s' }} />
                    ))}
                  </svg>
                  <div className="dash-demo-center">Age</div>
                </div>
                <div className="dash-demo-list">
                  {DEMOGRAPHICS.map((d) => (
                    <div key={d.label} className="dash-demo-row">
                      <span className="dash-demo-dot" style={{ background: d.color }} />
                      <span className="dash-demo-label">{d.label}</span>
                      <span className="dash-demo-value">{d.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
