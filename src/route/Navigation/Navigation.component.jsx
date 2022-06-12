import { signOutUser } from "../../utils/firebase/firebase.utils";
import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../asserts/crown.svg";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import {
  Navigate,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";
import CartIcon from "../../Components/CartIcon/CartIcon.component";
import CartDropdown from "../../Components/CartDropdown/CartDropdown.component";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, setCart } = useContext(CartContext);

  // const toggleCart = () => {
  //   setCart(isCartOpen ? false : true);
  // };

  return (
    <Fragment>
      <Navigate>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="auth">SIGN-IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </Navigate>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
