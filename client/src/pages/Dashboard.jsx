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

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const [s, g, t] = await Promise.all([
      getHomeDashboard(),
      getDashboardGraph("monthly"),
      getTopProducts(),
    ]);

    setSummary(s.data);
    setGraph(g.data);
    setTopProducts(t.data);
  };

  if (!summary || !graph) return null;

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
