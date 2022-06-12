import { Route, Routes } from "react-router-dom";
import Home from "./route/Home/home.component";
import Navigation from "./route/Navigation/Navigation.component";
import Authenticate from "./route/Authentication/Authenticate.component";
import Shop from "./route/Shop/Shop.component";
import Checkout from "./route/CartCheckout/Checkout.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authenticate />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
