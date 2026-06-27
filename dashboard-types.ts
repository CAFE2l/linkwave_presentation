/**
 * Contrato do dashboard administrativo.
 * A UI usa atualmente mocks derivados de dados.csv; futuramente este contrato
 * pode ser preenchido diretamente por uma query ou RPC do Supabase.
 */
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalClicks: number;
  totalLinks: number;
  ctr: number;
  averageSession: string;
  newSignups: number;
}

export interface DashboardSeriesPoint {
  date: string;
  users: number;
  clicks: number;
  links: number;
}

export interface DashboardRankingRow {
  position: number;
  name: string;
  clicks: number;
  links: number;
  views: number;
  ctr: number;
}

export interface DashboardActivity {
  id: string;
  actor: string;
  action: string;
  time: string;
  type: "link" | "theme" | "profile" | "signup" | "delete" | "analytics";
}

export interface DashboardData {
  stats: DashboardStats;
  evolution: DashboardSeriesPoint[];
  ranking: DashboardRankingRow[];
  activities: DashboardActivity[];
}
