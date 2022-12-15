import {
  BaseButton,
  ButtonSpinner,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

export const BUTTON_TYPES = {
  base: "base",
  google: "google-sign-in",
  invert: "inverted",
};

const getButton = (btnType = BUTTON_TYPES.base) =>
  ({
    [BUTTON_TYPES.base]: BaseButton,
    [BUTTON_TYPES.google]: GoogleSignInButton,
    [BUTTON_TYPES.invert]: InvertedButton,
  }[btnType]);

const Button = ({ children, btnType, isLoading, ...otherprops }) => {
  const CustomButton = getButton(btnType);
  return (
    <CustomButton {...otherprops}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
