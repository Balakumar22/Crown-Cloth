import SignIn from "../../Components/sign-in-form/sign-in-form.component";
import SignUp from "../../Components/sign-up-form/sign-up-form.component";
import "./Authenticate.style.scss";

function Authenticate() {
  return (
    <div className="authenticate-container">
      <SignIn />
      <SignUp />
    </div>
  );
}

export default Authenticate;
