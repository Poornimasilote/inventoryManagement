import api from "./axios";

/* ================= SUMMARY ================= */
export const getStatisticsSummary = async () => {
  const { data } = await api.get("/statistics/summary");
  return data;
};

/* ================= GRAPH ================= */
export const getStatisticsGraph = async (range = "monthly") => {
  const { data } = await api.get("/statistics/graph", {
    params: { range },
  });
  return data;
};

/* ================= TOP PRODUCTS ================= */
export const getStatisticsTopProducts = async () => {
  const { data } = await api.get("/statistics/top-products");
  return data;
};
