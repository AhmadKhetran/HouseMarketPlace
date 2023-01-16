import googleIcon from "../assets/svg/googleIcon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function GoogleAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const googleHandler = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        {
          location.pathname === "sign-in"
            ? toast.success("Sing In Sucessful")
            : toast.success("Sign Up Sucessful");
        }
      }
      navigate("/");
    } catch (error) {
      toast.error("Could'nt Authorize ");
    }
  };

  return (
    <>
      <p className="mb-3">
        Or Sign {location.pathname === "/sign-up" ? "up" : "in"} with google
      </p>
      <button
        className="btn btn-outline shadow p-3"
        style={{ borderRadius: "50%" }}
      >
        <img src={googleIcon} alt="" onClick={googleHandler} />
      </button>
    </>
  );
}

export default GoogleAuth;
