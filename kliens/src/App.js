import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Axios from "axios";

import { LoginProvider } from "./Context/LoginContext";
import { RoleProvider } from "./Context/RoleContext";
import Footer from "./Layouts/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Notfound from "./Pages/Notfound";
import Shop from "./Pages/Shop/Shop";
import Reset from "./Pages/Reset";
import Asztalfoglalas from "./Pages/Asztalfoglalas";
import UploadItem from "./Pages/Admin/UploadItem";
import DeleteItems from "./Pages/Admin/DeleteItems";
import DeleteAdmins from "./Pages/Admin/DeleteAdmins";
import AsztalfoglalasAdmin from "./Pages/Admin/AsztalfoglalasAdmin";
import ShopEnergiaital from "./Pages/Shop/Shop_Edrink";
import ShopPizza from "./Pages/Shop/Shop_Pizza";
import ShopTPizza from "./Pages/Shop/Shop_TPizza";
import ShopUdeto from "./Pages/Shop/Shop_Udeto";
import ShopSor from "./Pages/Shop/Shop_Sor";
import ShopASor from "./Pages/Shop/Shop_ASor";
import ShopHamburger from "./Pages/Shop/Shop_Hamburger";
import ShopLPizza from "./Pages/Shop/Shop_LPizza";

function App() {
  //Sütik engedélyezése az Axioson keresztül
  Axios.defaults.withCredentials = true;

  return (
    <div className="App">
      <LoginProvider>
        <RoleProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Notfound />} />
              <Route path="/asztalfoglalas" element={<Asztalfoglalas />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/edrink" element={<ShopEnergiaital />} />
              <Route path="/pizza" element={<ShopPizza />} />
              <Route path="/tpizza" element={<ShopTPizza />} />
              <Route path="/lpizza" element={<ShopLPizza />} />
              <Route path="/sor" element={<ShopSor />} />
              <Route path="/asor" element={<ShopASor />} />
              <Route path="/hamburger" element={<ShopHamburger />} />
              <Route path="/udeto" element={<ShopUdeto/>} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/itemupload" element={<UploadItem />} />
              <Route path="/itemremove" element={<DeleteItems />} />
              <Route path="/admindelete" element={<DeleteAdmins />} />
              <Route path="/foglalasok" element={<AsztalfoglalasAdmin />} />
            </Routes>
          </Router>
        </RoleProvider>
      </LoginProvider>
      <Footer />
    </div>
  );
}

export default App;
