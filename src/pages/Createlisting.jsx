import React, { useRef, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase.config";
import Loading from "../components/Loading";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Createlisting() {
  const [rent, setRent] = useState(false);
  const [sale, setSale] = useState(true);
  const [typeRS, setTypeRS] = useState("sale");
  const [offer, setOffer] = useState(true);
  const [parking, setParking] = useState(false);
  const [loading, setLoading] = useState(false);

  const name = useRef();
  const location = useRef();
  const bedrooms = useRef();
  const bathrooms = useRef();
  const regularPrice = useRef();
  const discountedPrice = useRef();
  const images = useRef();

  const saleHandler = () => {
    setSale(true);
    setRent(false);
    setTypeRS("sell");
  };
  const rentHandler = () => {
    setRent(true);
    setSale(false);
    setTypeRS("rent");
  };
  const yesOffer = () => {
    setOffer(true);
  };
  const noOffer = () => {
    setOffer(false);
  };
  const yesParking = () => {
    setParking(true);
  };
  const noParking = () => {
    setParking(false);
  };

  const createListing = async (e) => {
    setLoading(true);
    e.preventDefault();

    const enteredName = name.current.value;
    const enteredLocation = location.current.value;
    const enteredBedrooms = bedrooms.current.value;
    const enteredBathrooms = bathrooms.current.value;
    const enteredRegularprice = regularPrice.current.value;
    const uploadedImages = images.current.files;

    const auth = getAuth();

    const storeImage = async (uploadedImages) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${
          uploadedImages.name
        }-${uuidv4()}`;
        const storageRef = ref(storage, "images/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, uploadedImages);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    if (offer == true) {
      const enteredDiscountedPrice = discountedPrice.current.value;

      const imgUrls = await Promise.all(
        [...uploadedImages].map((image) => storeImage(image))
      ).catch(() => {
        toast.error("image not uploaded");
      });
      const obj = {
        name: enteredName,
        location: enteredLocation,
        bedrooms: enteredBedrooms,
        bathrooms: enteredBathrooms,
        regularPrice: enteredRegularprice,
        discountedPrice: enteredDiscountedPrice,
        type: typeRS,
        offer: offer,
        parking: parking,
        imageUrls: imgUrls,
        userRef: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, "listings"), obj);
      setLoading(false);
      toast.success("Listing Created");
    } else {
      const imgUrls = await Promise.all(
        [...uploadedImages].map((image) => storeImage(image))
      ).catch(() => {
        toast.error("image not uploaded");
      });
      const obj = {
        name: enteredName,
        location: enteredLocation,
        bedrooms: enteredBedrooms,
        bathrooms: enteredBathrooms,
        regularPrice: enteredRegularprice,
        type: typeRS,
        offer: offer,
        parking: parking,
        imageUrls: imgUrls,
        userRef: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      };
      console.log(obj);
      const docRef = await addDoc(collection(db, "listings"), obj);
      setLoading(false);
      toast.success("Listing Created");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container mt-4">
            <section>
              <div className="row">
                <div className="col-md-8 mb-4">
                  <div className="card mb-4">
                    <div className="card-header py-3">
                      <h5 className="mb-0 font-bold">Property Details</h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={createListing}>
                        <div>
                          <div className="d-grid gap-2 d-md-block mb-4">
                            <h2 className="font-bold">SALE/RENT</h2>
                            <button
                              className={
                                !sale
                                  ? "inline-block px-5 py-1.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  -mb-2 mt-3 mr-1  mr-3"
                                  : "inline-block px-5 py-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  -mb-2 mt-3 mr-1  mr-3"
                              }
                              type="button"
                              onClick={saleHandler}
                            >
                              Sale
                            </button>
                            <button
                              className={
                                !rent
                                  ? "inline-block px-5 py-1.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  -mb-2 mt-3 mr-1  mr-3"
                                  : "inline-block px-5 py-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg -mb-2 mt-3 mr-1  mr-3"
                              }
                              type="button"
                              onClick={rentHandler}
                            >
                              Rent
                            </button>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <div className="row mb-4">
                          <label className="form-label" htmlFor="form6Example1">
                            Title
                          </label>
                          <div className="col">
                            <div className="form-outline">
                              <input
                                required
                                ref={name}
                                type="text"
                                id="form6Example1"
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form6Example4">
                            Location
                          </label>
                          <input
                            required
                            ref={location}
                            type="text"
                            id="form6Example4"
                            className="form-control"
                          />
                        </div>

                        <div className="row mb-4">
                          <div className="col">
                            <div className="form-outline">
                              <label
                                className="form-label"
                                htmlFor="form6Example1"
                              >
                                Bedrooms
                              </label>
                              <input
                                required
                                ref={bedrooms}
                                type="Number"
                                id="form6Example1"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col">
                            <label
                              className="form-label"
                              htmlFor="form6Example2"
                            >
                              Bathrooms
                            </label>
                            <div className="form-outline">
                              <input
                                required
                                ref={bathrooms}
                                type="number"
                                id="form6Example2"
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>

                        <hr className="my-4" />
                        <div>
                          <div className="d-grid gap-2 d-md-block mb-4">
                            <h2 className="font-bold">Parking Spot</h2>
                            <button
                              className={
                                !parking
                                  ? "inline-block px-3.5 py-1.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  -mb-2 mt-3 mr-1  mr-3"
                                  : "inline-block px-3.5 py-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  -mb-2 mt-3 mr-1  mr-3"
                              }
                              type="button"
                              onClick={yesParking}
                            >
                              Yes
                            </button>
                            <button
                              className={
                                parking
                                  ? "inline-block px-3.5 py-1.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  -mb-2 mt-3 mr-1  mr-3"
                                  : "inline-block px-3.5 py-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg -mb-2 mt-3 mr-1  mr-3"
                              }
                              type="button"
                              onClick={noParking}
                            >
                              No
                            </button>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <div>
                          <div className="d-grid gap-2 d-md-block mb-4">
                            <h2 className="font-bold">Offer</h2>
                            <button
                              className={
                                !offer
                                  ? "inline-block px-3.5 py-1.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  -mb-2 mt-3 mr-1  mr-3"
                                  : "inline-block px-3.5 py-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  -mb-2 mt-3 mr-1  mr-3"
                              }
                              type="button"
                              onClick={yesOffer}
                            >
                              Yes
                            </button>
                            <button
                              className={
                                offer
                                  ? "inline-block px-3.5 py-1.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  -mb-2 mt-3 mr-1  mr-3"
                                  : "inline-block px-3.5 py-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg -mb-2 mt-3 mr-1  mr-3"
                              }
                              type="button"
                              onClick={noOffer}
                            >
                              No
                            </button>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <h2 className="mb-2 font-bold">Price</h2>
                        <div className="row mb-4">
                          <div className="col">
                            <div className="form-outline">
                              <label
                                className="form-label"
                                htmlFor="formNameOnCard"
                              >
                                Regular Price {rent ? "$/Month" : null}
                              </label>
                              <input
                                required
                                ref={regularPrice}
                                type="number"
                                id="formNameOnCard"
                                className="form-control"
                              />
                            </div>
                          </div>
                          {!offer ? null : (
                            <div className="col">
                              <div className="form-outline">
                                <label
                                  className="form-label"
                                  htmlFor="formCardNumber"
                                >
                                  Discounted Price {rent ? "$/Month" : null}
                                </label>
                                <input
                                  ref={discountedPrice}
                                  type="number"
                                  id="formCardNumber"
                                  className="form-control"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <hr className="my-4" />
                        <div className="row mb-4">
                          <h2 className="font-bold">Upload Images</h2>
                          <p>The First Image will be the cove (max-6) </p>
                          <label
                            className="form-label"
                            htmlFor="form6Example1"
                          ></label>
                          <div className="col">
                            <div className="form-outline">
                              <input
                                ref={images}
                                type="file"
                                id="images"
                                max="6"
                                accept=".jpg,.png,.jpeg"
                                multiple
                                required
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 justify-center mb-3">
                          <button
                            className="mb-2 w-96 text-center inline-block px-6 py-2.5 bg-green-600 text-white font-bold text-ms leading-normal uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                            type="submit"
                          >
                            Create Listing
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}

export default Createlisting;
