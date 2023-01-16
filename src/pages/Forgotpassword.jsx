import { useRef } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

function Forgotpassword() {
  const emailInput = useRef();

  const forgotPassHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInput.current.value;

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, enteredEmail);
      toast.success("Email Sent");
    } catch (error) {
      toast.error("Unable to process your request");
    }
  };

  return (
    <>
      <div className="singinform" onSubmit={forgotPassHandler}>
        <h2 className="font-weight-bold" style={{ textAlign: "center" }}>
          <strong>Forgot Password!</strong>
        </h2>
        <p style={{ textAlign: "center" }}>
          Enter your email and we'll send you a link to reset you password.
        </p>
        <form>
          <div className="mb-3">
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
          <div className="mb-3"></div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button type="submit" className="btn btn-success">
              <strong>Send Link</strong>
            </button>
          </div>
        </form>
        <div style={{ marginTop: "5%" }}>
          <Link
            to="/sign-in"
            style={{
              textDecoration: "none",
              color: "green",
              textAlign: "center",
            }}
          >
            <strong>
              <p>Back To Log In</p>
            </strong>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Forgotpassword;
