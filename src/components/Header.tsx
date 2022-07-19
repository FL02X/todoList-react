const Header = () => {
  return (
    <div style={{ backgroundColor: "#16181d", color: "white" }} className="">
      <div className="row">
        <div className="p-4  pb-2 col-6 text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="React Logo"
            style={{ height: "100px", width: "100px" }}
          ></img>
        </div>
        <div className="p-4 pb-2 col-6">
          <h1>react-todo-app</h1>
          <p>simple todo application written in React, using localStorage.</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
