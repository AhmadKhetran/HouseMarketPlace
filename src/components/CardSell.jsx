import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import { Link } from "react-router-dom";

function CardRent() {
  return (
    <Link
      to="/category/sell"
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="card mx-2 my-4" style={{ width: "13rem" }}>
        <img
          className="card-img-top"
          src={sellCategoryImage}
          alt="Card image cap"
        />
      </div>
      <p className="fw-bold mx-3">Places for sell</p>
    </Link>
  );
}

export default CardRent;
