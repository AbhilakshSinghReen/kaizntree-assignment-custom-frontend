import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/RequireAuth";
import SideDrawer from "./components/SideDrawer";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Stock from "./pages/Stock";
import Builds from "./pages/Builds";
import Customers from "./pages/Customers";
import SalesOrders from "./pages/SalesOrders";
import Suppliers from "./pages/Suppliers";
import Manufacturers from "./pages/Manufacturers";
import PurchaseOrders from "./pages/PurchaseOrders";
import Reports from "./pages/Reports";
import Help from "./pages/Help";
import Integrations from "./pages/Integrations";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  return (
    <main className="App">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <SideDrawer />

      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/builds" element={<Builds />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales-orders" element={<SalesOrders />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/manufacturers" element={<Manufacturers />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/help" element={<Help />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Catch all remaining*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
