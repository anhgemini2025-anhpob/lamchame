import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppItem, LAMCHAME_APPS } from '../data/appsData';
import { supabase } from './supabase';

type Source = 'loading' | 'supabase' | 'offline';

interface AppsState {
  apps: AppItem[];
  source: Source;
}

// Dữ liệu tĩnh chỉ dùng làm bản dự phòng (offline) khi chưa tải được từ Supabase.
const AppsCtx = createContext<AppsState>({ apps: LAMCHAME_APPS, source: 'loading' });

export const AppsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppsState>({ apps: LAMCHAME_APPS, source: 'loading' });

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('apps')
      .select('data')
      .order('number', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data || data.length === 0) {
          console.warn('[Supabase] Không tải được bảng apps, dùng dữ liệu dự phòng.', error);
          setState({ apps: LAMCHAME_APPS, source: 'offline' });
        } else {
          setState({ apps: data.map((r) => r.data as AppItem), source: 'supabase' });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <AppsCtx.Provider value={state}>{children}</AppsCtx.Provider>;
};

export const useApps = () => useContext(AppsCtx).apps;
export const useAppsSource = () => useContext(AppsCtx).source;
