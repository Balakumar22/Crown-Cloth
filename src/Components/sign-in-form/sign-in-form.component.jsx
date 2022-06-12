import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDoc,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPES } from "../Button/button.component";
import FormInput from "../FormInput/FormInput.component";
import "./sign-in-form.styles.scss";

const defualtFieldValues = {
  email: "",
  password: "",
};

const SignIn = ({ googlePop }) => {
  const [formField, setFormField] = useState(defualtFieldValues);

  const { email, password } = formField;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      //  const userDoc=await

      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        default:
          console.log(err);
      }
    }
  };

  const signInWithGoogle = async () => {
    console.log("In");
    const { user } = await signInWithGooglePopup();
    await createUserDoc(user);
  };

  const resetFormFields = () => {
    setFormField(defualtFieldValues);
  };

  return (
    <div className="sign-up-container">
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            btnType={BUTTON_TYPES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
