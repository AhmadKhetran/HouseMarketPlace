import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// Firebase Signup Authentication
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Signup() {
  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();

    const enteredName = inputName.current.value;
    const enteredEmail = inputEmail.current.value;
    const enteredPassword = inputPassword.current.value;

    const name = enteredName;
    const email = enteredEmail;
    const password = enteredPassword;

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Signed in
      const user = userCredential.user;
      // ...

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formData = { name, email };

      formData.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formData);
      toast.success("Sign Up Successful");
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="singinform" onSubmit={signupHandler}>
        <h1 className="font-weight-bold" style={{ textAlign: "center" }}>
          <strong>Welcome Back !</strong>
        </h1>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputname" className="form-label">
              Name
            </label>
            <input
              ref={inputName}
              type="text"
              className="form-control"
              id="exampleInputname"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              ref={inputEmail}
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
              ref={inputPassword}
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
              <p className="fon-black">Sign Up</p>
            </button>
          </div>
        </form>
        <div className="my-4">
          <div className="mt-4 text-center">
            <GoogleAuth />
          </div>
        </div>
        <div className="my-5" style={{ marginTop: "5%" }}>
          <Link
            to="/sign-in"
            style={{
              textDecoration: "none",
              color: "green",
              textAlign: "center",
            }}
          >
            <p>Already Have An Account? Sign In Now</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Signup;
