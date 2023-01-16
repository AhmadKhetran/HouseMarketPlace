import { useRef } from "react";

function Userdetails(props) {
  return (
    <>
      <button
        type="button"
        className="px-3 py-1.5 text-green-600 font-medium text-xs  float-right -mt-9"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Change
      </button>

      <div
        className="modal fade fixed hidden  outline-none overflow-x-hidden overflow-y-auto"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-body relative p-4">
              <form onSubmit={props.updateHandler}>
                <p className="mb-1 text-xs font-bold">Change Name</p>
                <div className="input-group">
                  <input
                    ref={props.updatedValue}
                    style={{ fontWeight: "bold" }}
                    type="text"
                    className="form-control"
                  />
                  <button className="btn btn-secondary px-2 text-xs font-bold">
                    Done
                  </button>
                </div>
              </form>
              <button
                type="button"
                className="inline-block px-2 py-1.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg focus:bg-re-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out -mb-2 float-right mt-3 mr-1 "
                data-bs-dismiss="modal"
                onClick={props.closeHand}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userdetails;
