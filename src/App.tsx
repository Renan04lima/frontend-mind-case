import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Login />} path="/" />
          <Route element={<SignUp />} path="/sign-up" />
          <Route element={<PrivateRoutes />}>
            <Route element={<Products />} path="/products" />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
