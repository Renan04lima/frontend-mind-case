import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
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
          <Route index element={<Login />} path="/" />
          <Route element={<SignUp />} path="/sign-up" />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
