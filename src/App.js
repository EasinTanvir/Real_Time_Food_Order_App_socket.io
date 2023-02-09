import React from "react";
import { useSelector } from "react-redux";
import {
  unstable_HistoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import history from "./history";
import AddressPage from "./pages/AddressPage";
import AdminPannel from "./pages/AdminPannel";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import MyOrderPage from "./pages/MyOrderPage";
import OrderPage from "./pages/OrderPage";
import PaymentError from "./pages/PaymentError";
import PaymentFailed from "./pages/PaymentFailed";
import PaymentSuccess from "./pages/PaymentSuccess";
import RealTimeOrder from "./pages/RealTimeOrder";
import SubmitOrderDetails from "./pages/SubmitOrderDetails";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  let protectRoutes;

  if (user.token) {
    protectRoutes = (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout/fail" element={<PaymentFailed />} />
        <Route path="/checkout/success/:id" element={<PaymentSuccess />} />
        <Route path="/checkout/error" element={<PaymentError />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminPannel />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/myorder" element={<MyOrderPage />} />
        <Route path="/myorder/details/:id" element={<SubmitOrderDetails />} />
        <Route path="/myorder/realtime/:id" element={<RealTimeOrder />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    protectRoutes = (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  return (
    <Router history={history}>
      <Layout>
        {/* <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/checkout/fail" element={<PaymentFailed />} />
          <Route path="/checkout/success/:id" element={<PaymentSuccess />} />
          <Route path="/checkout/error" element={<PaymentError />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminPannel />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/myorder" element={<MyOrderPage />} />
          <Route path="/myorder/details/:id" element={<SubmitOrderDetails />} />
          <Route path="/myorder/realtime/:id" element={<RealTimeOrder />} />
        </Routes> */}
        <main>{protectRoutes}</main>
      </Layout>
    </Router>
  );
};

export default App;
