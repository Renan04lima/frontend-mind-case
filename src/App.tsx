import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Login from "./pages/Login";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route index element={<Products />} path="/products" />
          </Route>
          <Route element={<Login />} path="/login" />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
