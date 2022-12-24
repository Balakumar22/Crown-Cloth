import SignIn from "../../Components/sign-in-form/sign-in-form.component";
import SignUp from "../../Components/sign-up-form/sign-up-form.component";
import { AuthenticateContainer } from "./Authenticate.style";
// import "./Authenticate.style.scss";

function Authenticate() {
  return (
    <AuthenticateContainer>
      <SignIn />
      <SignUp />
    </AuthenticateContainer>
  );
}

export default Authenticate;
