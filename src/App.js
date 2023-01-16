import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import Forgotpassword from "./pages/Forgotpassword";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Offers from "./pages/Offers";
import Createlisting from "./pages/Createlisting";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import ImageUpload from "./pages/Imageupload";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/create-listing" element={<Createlisting />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/imageupload" element={<ImageUpload />} />
      </Routes>
      <ToastContainer />
      <Navbar />
    </div>
  );
}

export default App;
