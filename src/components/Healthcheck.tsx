import React, { useEffect, useState } from 'react';
import { API_HEALTHCHECK } from './links';
import '../styles/healthcheck.css';

type HealthRow = {
  key: string;
  label: string;
  status: 'healthy' | 'unhealthy' | 'unknown';
  raw: any;
};

type HealthResponse = {
  raw: any;
  checks: HealthRow[];
};

function deriveStatus(value: any): 'healthy' | 'unhealthy' | 'unknown' {
  if (value === true) return 'healthy';
  if (value === false) return 'unhealthy';
  if (typeof value === 'string') {
    const v = value.toLowerCase();
    if (v.includes('up') || v.includes('ok') || v.includes('healthy') || v.includes('running')) return 'healthy';
    if (v.includes('down') || v.includes('fail') || v.includes('unhealthy') || v.includes('error')) return 'unhealthy';
    return 'unknown';
  }
  if (typeof value === 'number') {
    return value === 0 || value === 200 ? 'healthy' : 'unhealthy';
  }
  if (typeof value === 'object' && value != null) {
    if ('status' in value) return deriveStatus(value.status);
    if ('ok' in value) return deriveStatus(value.ok);
    if ('healthy' in value) return deriveStatus(value.healthy);
  }
  return 'unknown';
}

function rowsFromData(data: any): HealthRow[] {
  if (!data) return [];

  if (Array.isArray(data)) {
    return data.map((it, i) => ({
      key: String(i),
      label: it.name || `item-${i}`,
      status: deriveStatus(it.status ?? it.state ?? it),
      raw: it,
    }));
  }

  if (typeof data === 'object') {
    // common shape: { status: 'ok', services: { svc1: {...}, svc2: {...} } }
    if (data.services && typeof data.services === 'object') {
      return Object.entries(data.services).map(([k, v]: [string, any]) => ({
        key: k,
        label: k,
        status: deriveStatus(v.status ?? v),
        raw: v,
      }));
    }

    // If top-level keys are health checks, list them
    return Object.entries(data).map(([k, v]) => ({
      key: k,
      label: k,
      status: deriveStatus(v),
      raw: v,
    }));
  }

  return [{ key: 'value', label: 'value', status: deriveStatus(data), raw: data }];
}

function responseFromData(data: any): HealthResponse {
  const rows = rowsFromData(data);
  return { raw: data, checks: rows };
}

export const Healthcheck: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [response, setResponse] = useState<HealthResponse | null>(null);
  const [rows, setRows] = useState<HealthRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_HEALTHCHECK);
      const json = await res.json();
      setData(json);
      const resp = responseFromData(json);
      setResponse(resp);
      setRows(resp.checks);
    } catch (e: any) {
      setError(String(e));
      setData(null);
      setResponse(null);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const displayStatus = (r: HealthRow) => {
    return r.status;
  };

  const overallStatus = (): 'healthy' | 'unhealthy' | 'unknown' => {
    if (rows.length === 0) return 'unknown';
    const allStatuses = rows.map((r) => r.status);
    if (allStatuses.every((s) => s === 'healthy')) return 'healthy';
    if (allStatuses.some((s) => s === 'unhealthy')) return 'unhealthy';
    return 'unknown';
  };

  const statusCounts = {
    healthy: rows.filter((r) => r.status === 'healthy').length,
    unhealthy: rows.filter((r) => r.status === 'unhealthy').length,
    unknown: rows.filter((r) => r.status === 'unknown').length,
  };

  return (
    <div className="hc-wrapper">
      <div className="hc-header">
        <h3>Healthcheck</h3>
        <button onClick={fetchHealth} className="btn">Refresh</button>
      </div>

      {loading && <div className="hc-loading">Loading…</div>}
      {error && <div className="hc-error">Error: {error}</div>}

      {!loading && rows.length > 0 && (
        <>
          <div className="hc-status-summary">
            <div className="hc-overall">
              <div className="hc-overall-label">Overall Status</div>
              <span className={`hc-pill-large ${overallStatus()}`}>{overallStatus()}</span>
            </div>
            <div className="hc-status-grid">
              <div className="hc-status-item healthy">
                <div className="hc-count">{statusCounts.healthy}</div>
                <div className="hc-label">Healthy</div>
              </div>
              <div className="hc-status-item unhealthy">
                <div className="hc-count">{statusCounts.unhealthy}</div>
                <div className="hc-label">Unhealthy</div>
              </div>
              <div className="hc-status-item unknown">
                <div className="hc-count">{statusCounts.unknown}</div>
                <div className="hc-label">Unknown</div>
              </div>
            </div>
          </div>

          <div className="hc-report-section">
            <h4>Check Details</h4>
            <table className="hc-report-table">
              <thead>
                <tr>
                  <th>Check Name</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.key}>
                    <td className="hc-report-name">{r.label}</td>
                    <td className="hc-report-status">
                      <span className={`hc-pill ${displayStatus(r)}`}>{displayStatus(r)}</span>
                    </td>
                    <td className="hc-report-details">
                      <button
                        onClick={() => navigator.clipboard?.writeText(JSON.stringify(r.raw, null, 2))}
                        className="btn small"
                      >
                        View Raw
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!loading && rows.length === 0 && !error && <div className="hc-empty">No health data</div>}
    </div>
  );
};

export default Healthcheck;
