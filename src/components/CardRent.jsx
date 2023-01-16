import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import { Link } from "react-router-dom";

function CardRent() {
  return (
    <Link
      to="/category/rent"
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="card mx-2 my-4" style={{ width: "13rem" }}>
        <img
          className="card-img-top"
          src={rentCategoryImage}
          alt="Card image cap"
        />
      </div>
      <p className="fw-bold mx-3">Places for rent</p>
    </Link>
  );
}

export default CardRent;
