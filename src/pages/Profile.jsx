import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Userdetails from "../components/Userdetails";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";

function Profile() {
  const navigate = useNavigate();
  const updatedValue = useRef();
  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [editForm, setEditForm] = useState(false);

  const name = formData.name;
  const email = formData.email;

  const logoutHandler = () => {
    auth.signOut();
    toast.success("Logged Out Success");
    navigate("/");
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    const name = auth.currentUser.displayName;
    const newValue = updatedValue.current.value;

    if (newValue.length < 5) {
      toast.error("Minimum Length Should be 5");
      updatedValue.current.value = null;
    } else {
      try {
        // update display name
        updateProfile(auth.currentUser, {
          displayName: newValue,
        });
        // update in firestore database

        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: newValue,
        });
        toast.success("Name Changed Sucessfully");
        setEditForm(false);
        updatedValue.current.value = null;
        setFormData({
          name: newValue,
          email: email,
        });
      } catch (error) {
        toast.error("Unable to change name : Try Again");
      }
    }

    console.log(newValue);
  };

  return (
    <div className="container mt-6">
      <div>
        <h1 className="text-center font-bold text-3xl">My Profile</h1>
        <div className=" mt-5 ml-5 mb-3">
          <p className="font-bold">
            Personal Details{" "}
            <button
              className="btn btn-primary btn-sm float-right  "
              onClick={logoutHandler}
            >
              Log Out
            </button>
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#fafafa",
            borderRadius: "20px",
            marginLeft: "10px",
            paddingTop: "5px",
            paddingBottom: "1px",
            height: "70px",
          }}
        >
          <div style={{ marginLeft: "30px" }}>
            <p>
              <strong>{name}</strong> <br /> {email}
            </p>
            <div className="container float-right">
              <Userdetails
                name={name}
                updateHandler={updateHandler}
                updatedValue={updatedValue}
              />
            </div>
          </div>
          <Link to="/create-listing">
            <div className="d-grid gap-2 col-8 mx-auto bg-gray-100 p-2 mt-11 drop-shadow-md rounded-xl text-sm ">
              <div>
                <img src={homeIcon} alt="home" className="float-left" />
                <img src={arrowRight} alt="" className="float-right " />
                <p className="text-center font-bold  ">
                  Rent Or Sell Your House
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;

<p>Sell or rent you home</p>;
