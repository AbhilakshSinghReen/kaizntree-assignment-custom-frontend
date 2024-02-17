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
        </Route>

        {/* Catch all remaining*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
