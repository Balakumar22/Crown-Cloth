import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDoc,
} from "../../utils/firebase/firebase.utils";
import Button from "../Button/button.component";
import FormInput from "../FormInput/FormInput.component";
import "./sign-up-form.styles.scss";

const defualtFieldValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formField, setFormField] = useState(defualtFieldValues);

  const { displayName, email, password, confirmPassword } = formField;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userDoc = await createUserDoc(user, { displayName });
      // console.log(userDoc);
      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create user, email you entered is already in use");
      } else console.log("user sign up encounter error", err);
    }
  };

  const resetFormFields = () => {
    setFormField(defualtFieldValues);
  };

  return (
    <div className="sign-up-container">
      <h2>Don't Have accout?</h2>
      <span>Sign Up with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignUp;
