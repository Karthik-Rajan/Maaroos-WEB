import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import dotenv from "dotenv";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Index from "./components/Index";
import Offers from "./components/Offers";
import MyAccount from "./components/MyAccount";
import List from "./components/List";
import NotFound from "./components/NotFound";
import Thanks from "./components/Thanks";
import Extra from "./components/Extra";
import Login from "./components/Login";
import NoAccess from "./components/NoAccess";
import Register from "./components/Register";
import TrackOrder from "./components/TrackOrder";
import Invoice from "./components/Invoice";
import Checkout from "./components/Checkout";
import Detail from "./components/Detail";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-select2-wrapper/css/select2.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import Auth from "@aws-amplify/auth";
import LoginModal from "./components/modals/LoginModal";
import useTitle from './components/common/useTitle';
import ContactUs from "./components/ContactUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Favorite, Folder, LocationOn, Restore } from "@mui/icons-material";

function App() {
  dotenv.config();

  useTitle();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visible, setVisible] = useState(false);

  const verifyAuth = async () => {
    await Auth.currentAuthenticatedUser()
      .then((res) => setIsAuthenticated(true))
      .catch((err) => setIsAuthenticated(false));
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  const showModal = () => {
    setVisible(visible ? false : true);
  };

  const noAccess = <NoAccess showModal={showModal} />;

  return (
    <>
      <Header showModal={showModal} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="listing" element={<List />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/extra" element={<Extra />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<Terms />} />
        <Route
          path="/listing/:vId/view"
          element={<Detail {...showModal} />}
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/myaccount/*"
          element={isAuthenticated ? <MyAccount /> : noAccess}
        />
        <Route
          path="/track-order"
          element={isAuthenticated ? <TrackOrder /> : noAccess}
        />
        <Route
          path="/invoice"
          element={isAuthenticated ? <Invoice /> : noAccess}
        />
        <Route
          path="/checkout"
          element={isAuthenticated ? <Checkout /> : noAccess}
        />
        <Route
          path="/thanks"
          element={isAuthenticated ? <Thanks /> : noAccess}
        />
        <Route
          path="/offers"
          element={isAuthenticated ? <Offers /> : noAccess}
        />
      </Routes>
      <LoginModal visible={visible} onHide={showModal} />
      {/* <BottomNavigation sx={{ width: 500 }} value={"recents"} onChange={() => { }}>
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<Restore />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<Favorite />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<LocationOn />}
        />
      </BottomNavigation> */}
      <Footer />
    </>

  );
}

export default App;
