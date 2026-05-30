export function useTracking() {
  const track = (event, data) => window.umami?.track(event, data);
  const identify = (data) => window.umami?.identify(data);
  return { track, identify };
}

export function getRadarId() {
  const sessionCache = window.umami?.getSession()?.cache;
  if (sessionCache) return sessionCache;
  const key = 'radar.vid';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(key, id);
  }
  return id;
}
