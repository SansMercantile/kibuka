// Real orbital data hooks for KIBUKA, fed by /api/v1/* (CelesTrak + Open Notify).
import { useEffect, useState } from 'react';

export function useTracked() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    fetch('/api/v1/tracked')
      .then((r) => r.json().then((j) => ({ ok: r.ok, j })))
      .then(({ ok, j }) => {
        if (!alive) return;
        if (!ok) throw new Error(j.error || 'request failed');
        setData(j);
      })
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);
  return { data, error, loading };
}

export function useIss() {
  const [pos, setPos] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch('/api/v1/iss')
        .then((r) => r.json())
        .then((j) => { if (alive) { setPos(j); setError(null); } })
        .catch((e) => alive && setError(e.message));
    load();
    const t = setInterval(load, 5000); // ISS moves fast; refresh every 5s
    return () => { alive = false; clearInterval(t); };
  }, []);
  return { pos, error };
}
