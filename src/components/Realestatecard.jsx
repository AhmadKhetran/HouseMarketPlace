import { imageListClasses } from "@mui/material";

function Realestatecard(props) {
  return (
    <div className="mb-4 mr-4 card " style={{ width: "25rem", float: "left" }}>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
        integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
        crossOrigin="anonymous"
      />
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="">
        <div className="relative mx-auto w-full">
          <a
            href="#"
            className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2"
          >
            <div className="rounded-lg bg-white p-4 shadow">
              <div className="relative flex h-52 justify-center overflow-hidden rounded-lg">
                <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                  <div className="absolute inset-0 bg-black bg-opacity-80">
                    <img src={`${props.imageurl}?crop=4:3`} alt="" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-5 mb-3 flex">
                  <p className="flex items-center font-medium text-white shadow-sm">
                    <i className="fa fa-camera mr-2 text-xl text-white"></i>
                    {props.imagenumbers}
                  </p>
                </div>
                <div className="absolute bottom-0 right-5 mb-3 flex">
                  <p className="flex items-center font-medium text-gray-800">
                    <i className="fa fa-heart mr-2 text-2xl text-white"></i>
                  </p>
                </div>

                <span className="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#1f93ff] px-2 py-1 text-xs font-semibold text-white">
                  {props.type}
                </span>
                <span className="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white">
                  <i className="fa fa-star"></i>
                </span>
              </div>

              <div className="mt-4">
                <h2
                  className="line-clamp-1 text-2xl font-medium text-gray-800 md:text-lg"
                  title="New York"
                >
                  {props.name}
                </h2>

                <div className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                  <span className="text-sm uppercase"> $ </span>
                  <span className="text-2xl">{props.regularprice}</span>
                  {props.type === "rent" ? "/Month" : null}
                  <br />
                  {props.offer ? (
                    <div>
                      <span className="text-sm-uppercase ">Sale: $</span>
                      <span className="text-2xl">{props.discounterprice}</span>
                      {props.type === "rent" ? "/Month" : null}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-4">
                <p className="line-clamp-1 mt-2 text-lg text-gray-800">
                  {props.location}
                </p>
              </div>
              <div className="justify-center">
                <div className="mt-4 flex space-x-3 overflow-hidden rounded-lg px-1 py-1">
                  <p className="flex items-center font-medium text-gray-800">
                    <i className="fa fa-bed mr-2 text-blue-900"></i>
                    {props.bedrooms}
                  </p>

                  <p className="flex items-center font-medium text-gray-800">
                    <i className="fa fa-bath mr-2 text-blue-900"></i>
                    {props.bathrooms}
                  </p>
                  <p className="flex items-center font-medium text-gray-800">
                    <i className="fa fa-home mr-2 text-blue-900"></i>
                    {props.size}
                    <sup>{props.sizein}</sup>
                  </p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2">
                <div className="flex items-center"></div>
                {props.onDelete ? (
                  <div className="flex justify-end">
                    <button className="btn btn-secondary mx-2">Edit</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.onDelete(props.id, props.name)}
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Realestatecard;
