import { createClient } from '@supabase/supabase-js';

// Publishable (anon) key là khóa CÔNG KHAI dành cho trình duyệt — an toàn khi nằm trong code.
// Quyền truy cập được kiểm soát bằng Row Level Security (xem supabase/schema.sql).
// Có thể ghi đè bằng biến môi trường VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://hzsqvkaojdkveniqmkld.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_6ULDBLH0sHyU9DR_xH5jtA_iGNe5Xgm';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Consultation {
  id: number;
  full_name: string;
  contact: string;
  topic: string;
  app_id: string | null;
  message: string | null;
  status: 'Mới' | 'Đang xử lý' | 'Đã liên hệ';
  created_at: string;
}

export interface Review {
  id: number;
  app_id: string;
  author_name: string;
  rating: number;
  content: string;
  created_at: string;
}
