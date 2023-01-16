import CardRent from "../components/CardRent";
import CardSell from "../components/CardSell";

function Explore() {
  return (
    <>
      <div className="container mt-6">
        <h1 className="text-center font-bold text-4xl ">Explore</h1> <br />
        <h4 className="font-bold text-2xl">Categories</h4>
      </div>
      <div className="">
        <div style={{ float: "left", margin: "2%" }}>
          <CardRent />
        </div>
        <div style={{ float: "left", margin: "2%" }}>
          <CardSell />
        </div>
      </div>
    </>
  );
}

export default Explore;
