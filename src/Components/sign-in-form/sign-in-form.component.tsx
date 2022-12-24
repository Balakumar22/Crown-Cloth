import { AuthError, AuthErrorCodes } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

import Button, { BUTTON_TYPES } from "../Button/button.component";
import FormInput from "../FormInput/FormInput.component";
import { ButtonContainer, SignUpContainer } from "./sign-in-form.style";
// import "./sign-in-form.styles.scss";

const defualtFieldValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const dispatch = useDispatch();
  const [formField, setFormField] = useState(defualtFieldValues);

  const { email, password } = formField;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // await signInAuthUserWithEmailAndPassword(email, password);
      dispatch(emailSignInStart(email, password));

      //  const userDoc=await

      resetFormFields();
    } catch (err) {
      switch ((err as AuthError).code) {
        case AuthErrorCodes.USER_DELETED:
          alert("no user associated with this email");
          break;
        case AuthErrorCodes.INVALID_PASSWORD:
          alert("incorrect password for email");
          break;
        default:
          console.log(err);
      }
    }
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
    // console.log("In");
    // const { user } = await signInWithGooglePopup();
    // await createUserDoc(user);
  };

  const resetFormFields = () => {
    setFormField(defualtFieldValues);
  };

  return (
    <SignUpContainer>
      <h2>Alreay Have account</h2>
      <span>Sign in with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            btnType={BUTTON_TYPES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignIn;
