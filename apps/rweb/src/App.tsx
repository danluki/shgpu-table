import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/dashboard/Login";
import Landing from "./pages/landing/Landing";

import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

export default App;
