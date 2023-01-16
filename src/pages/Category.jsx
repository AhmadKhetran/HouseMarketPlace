import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Realestatecard from "../components/Realestatecard";
import Loading from "../components/Loading";

function Category() {
  const [listings, setListing] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryName } = useParams();

  useEffect(() => {
    const fetchlistings = async () => {
      try {
        //get reference
        const q = query(
          collection(db, "listings"),
          where("type", "==", categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          let data = doc.data();
          listings.push(data);
        });
        setLoading(false);
      } catch (error) {
        console.log("error");
      }
    };

    fetchlistings();
  }, [categoryName]);

  if (loading === false && listings.length === 0) {
    return (
      <div className="container mt-6">
        <div className=" text-2xl font-bold text-center">
          {listings.length > 1 ? (
            <p>
              ({listings.length} )Properties Avaiable for {categoryName}{" "}
            </p>
          ) : (
            <p>
              ({listings.length}) Property Available for {categoryName}{" "}
            </p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="container mt-6">
      <div className=" text-2xl font-bold text-center">
        {listings.length > 1 ? (
          <p>
            ({listings.length}) Properties Avaiable for {categoryName}{" "}
          </p>
        ) : (
          <p>
            ({listings.length}) Property Available for {categoryName}{" "}
          </p>
        )}
      </div>
      {loading ? (
        <div className="content-center	">
          <Loading />
        </div>
      ) : (
        <div className="container mt-6">
          {listings.map((e) => (
            <Realestatecard
              key={e.name}
              bathrooms={e.bathrooms}
              bedrooms={e.bedrooms}
              type={e.type}
              name={e.name}
              regularprice={e.regularPrice}
              discounterprice={e.discountedPrice}
              location={e.location}
              offer={e.offer}
              imageurl={e.imageUrls[0]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;

//create query
// const q = query(
//   listingRef,
//   where("type", "==", params.categoryName),
//   orderBy("timeStamp", "desc"),
//   limit(10)
// );
//execurte query
// const querySnap = await getDocs(q);
// let listing = [];
// querySnap.forEach((doc) => {
//   console.log(doc.data());
//});
