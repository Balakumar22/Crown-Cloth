import { ButtonHTMLAttributes, FC } from "react";
import {
  BaseButton,
  ButtonSpinner,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

export enum BUTTON_TYPES {
  base = "base",
  google = "google-sign-in",
  invert = "inverted",
}

const getButton = (btnType = BUTTON_TYPES.base) =>
  ({
    [BUTTON_TYPES.base]: BaseButton,
    [BUTTON_TYPES.google]: GoogleSignInButton,
    [BUTTON_TYPES.invert]: InvertedButton,
  }[btnType]);

type ButtonProps = {
  btnType?: BUTTON_TYPES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  btnType,
  isLoading,
  ...otherprops
}) => {
  const CustomButton = getButton(btnType);
  return (
    <CustomButton {...otherprops}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
