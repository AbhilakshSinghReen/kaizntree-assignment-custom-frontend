import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ paddingTop: 50 }}>
      <Outlet />
    </div>
  );
}
