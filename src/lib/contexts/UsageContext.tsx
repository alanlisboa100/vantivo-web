import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface UsageData {
  daily: Record<string, number>;
  monthly: Record<string, number>;
}

interface UsageContextType {
  getUsage: (feature: string) => number;
  trackUsage: (feature: string) => void;
}

const UsageContext = createContext<UsageContextType>({
  getUsage: () => 0,
  trackUsage: () => {},
});

const STORAGE_KEY = "vantivo.usage.v1";

function loadUsage(): UsageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { daily: {}, monthly: {} };
  } catch {
    return { daily: {}, monthly: {} };
  }
}

function saveUsage(data: UsageData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function UsageProvider({ children }: { children: ReactNode }) {
  const [usage, setUsage] = useState<UsageData>(loadUsage);

  const getUsage = useCallback(
    (feature: string) => usage.daily[feature] || 0,
    [usage]
  );

  const trackUsage = useCallback((feature: string) => {
    setUsage((prev) => {
      const today = new Date().toISOString().split("T")[0];
      const month = today.slice(0, 7);
      const next = {
        daily: {
          ...prev.daily,
          [`${feature}_${today}`]: (prev.daily[`${feature}_${today}`] || 0) + 1,
        },
        monthly: {
          ...prev.monthly,
          [`${feature}_${month}`]: (prev.monthly[`${feature}_${month}`] || 0) + 1,
        },
      };
      // Clean old entries
      const cleanDaily: Record<string, number> = {};
      Object.entries(next.daily).forEach(([k, v]) => {
        const date = k.split("_").slice(-1)[0];
        if (date === today) cleanDaily[k] = v;
      });
      const result = { daily: cleanDaily, monthly: next.monthly };
      saveUsage(result);
      return result;
    });
  }, []);

  return (
    <UsageContext.Provider value={{ getUsage, trackUsage }}>
      {children}
    </UsageContext.Provider>
  );
}

export const useUsage = () => useContext(UsageContext);
