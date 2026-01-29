import { useEffect, useState } from "react";
import {
  getHomeDashboard,
  getDashboardGraph,
  getTopProducts,
} from "../api/dashboard";

import SalesGraph from "../components/dashboard/SalesGraph";
import TopProducts from "../components/dashboard/TopProducts";
import SalesOverview from "../components/dashboard/SalesOverview";
import PurchaseOverview from "../components/dashboard/PurchaseOverview";
import InventorySummary from "../components/dashboard/InventorySummary";
import ProductSummary from "../components/dashboard/ProductSummary";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [graph, setGraph] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      // CHECK CACHE FIRST
      const cached = sessionStorage.getItem("dashboardData");
      if (cached) {
        const parsed = JSON.parse(cached);
        setSummary(parsed.summary);
        setGraph(parsed.graph);
        setTopProducts(parsed.topProducts);
        return;
      }

      // FETCH IN PARALLEL
      const [s, g, t] = await Promise.all([
        getHomeDashboard(),
        getDashboardGraph("monthly"),
        getTopProducts(),
      ]);

      setSummary(s.data);
      setGraph(g.data);
      setTopProducts(t.data);

      // SAVE TO CACHE
      sessionStorage.setItem(
        "dashboardData",
        JSON.stringify({
          summary: s.data,
          graph: g.data,
          topProducts: t.data,
        })
      );
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <div className="dashboard-container">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Home</h2>
      <hr />

      <div className="dashboard-grid">
        <div className="dashboard-left">
          <SalesOverview data={summary.salesOverview} />
          <PurchaseOverview data={summary.purchaseOverview} />
          <SalesGraph data={graph} />
        </div>

        <div className="dashboard-right">
          <InventorySummary data={summary.inventorySummary} />
          <ProductSummary data={summary.productSummary} />
          <TopProducts data={topProducts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
