// import { signOutUser } from "../../utils/firebase/firebase.utils";
import { Fragment } from "react";
// import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../asserts/crown.svg";
// import { UserContext } from "../../context/user.context";
// import { CartContext } from "../../context/cart.context";
import {
  Navigate,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";
import CartIcon from "../../Components/CartIcon/CartIcon.component";
import CartDropdown from "../../Components/CartDropdown/CartDropdown.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const dispatch = useDispatch();
  // const { currentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectCartOpen);
  // const { isCartOpen } = useContext(CartContext);

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
            <NavLink as="span" onClick={() => dispatch(signOutStart())}>
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
