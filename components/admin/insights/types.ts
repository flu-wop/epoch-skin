// components/admin/insights/types.ts — shape of GET /api/admin/insights

export interface ProductRow {
  id: string | null; name: string; slug: string | null; group: string; price: number; image: string | null;
  views: number; avgTime: number; carts: number; checkouts: number; sold: number; revenue: number;
}
export interface ServiceRow {
  name: string; group: string; selects: number; starts: number; booked: number; revenue: number;
}
export interface Step { label: string; value: number }
export interface Upcoming {
  id: number; name: string; service: string; date: string; time: string; duration: number | null; price: number;
}
export interface Insights {
  range: { days: number; start: string; end: string };
  trackingSince: string | null;
  catalog: { products: number; services: number };
  kpis: {
    revenue: number; revenuePrev: number; shopRevenue: number; studioRevenue: number;
    orders: number; ordersPrev: number; bookings: number; bookingsPrev: number;
    avgSale: number; avgSalePrev: number; visitors: number; visitorsPrev: number;
  };
  daily: { date: string; shop: number; studio: number; visitors: number }[];
  products: ProductRow[];
  services: ServiceRow[];
  funnels: { shop: Step[]; studio: Step[] };
  checkoutStarts: number;
  bookingStarts: number;
  abandoned: { sessions: number; cartSessions: number; items: { item: string; count: number }[] };
  pages: { path: string; views: number; avgTime: number }[];
  referrers: { host: string; visits: number }[];
  devices: Record<string, number>;
  upcoming: Upcoming[];
}
