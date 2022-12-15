import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./route/Home/home.component";
import Navigation from "./route/Navigation/Navigation.component";
import Authenticate from "./route/Authentication/Authenticate.component";
import Shop from "./route/Shop/Shop.component";
import Checkout from "./route/CartCheckout/Checkout.component";
import {
  createUserDoc,
  onAuthStateListner,
  getCurrentUser,
} from "./utils/firebase/firebase.utils";
import { checkUserSession, setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // getCurrentUser().then((user) => dispatch(setCurrentUser(user)));
    dispatch(checkUserSession());
    // const unsubscribe = onAuthStateListner((user) => {
    //   if (user) {
    //     createUserDoc(user);
    //   }
    //   dispatch(setCurrentUser(user));
    // });

    // return unsubscribe;
  }, []);

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
