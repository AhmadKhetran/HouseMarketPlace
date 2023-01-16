import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./signin.css";
import { toast } from "react-toastify";
import GoogleAuth from "../components/GoogleAuth";

function Signin() {
  const emailInput = useRef();
  const passwordInput = useRef();

  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;

    const email = enteredEmail;
    const password = enteredPassword;

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/profile");
      }
      toast.success("Sign In Sucessful", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Invalid Credentials ! Try Again..", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="singinform" onSubmit={loginHandler}>
      <h1 className="font-weight-bold" style={{ textAlign: "center" }}>
        <strong>Welcome Back !</strong>
      </h1>
      <form>
        <div className="mb-3 my-5">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            ref={emailInput}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            ref={passwordInput}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <Link
            style={{ textDecoration: "none", color: "green" }}
            to="/forgot-password"
          >
            <strong>
              <p style={{ marginRight: "" }}>Forgot Password ?</p>
            </strong>
          </Link>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button type="submit" className="btn btn-success">
            <strong>Sign In</strong>
          </button>
        </div>
      </form>
      <div className="my-4">
        <div style={{ textAlign: "center" }}>
          <GoogleAuth />
        </div>

        <div className="my-5">
          <Link
            to="/sign-up"
            style={{
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            <p style={{ color: "green" }}>Not a member? SignUp Now</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
