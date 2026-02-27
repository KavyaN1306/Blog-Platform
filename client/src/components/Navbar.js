// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav style={{ padding: "10px", background: "#eee" }}>
//       <Link to="/">Home</Link> |{" "}
//       <Link to="/login">Login</Link> |{" "}
//       <Link to="/register">Register</Link> |{" "}
//       <Link to="/create">Create Post</Link>
//     </nav>
//   );
// }

// export default Navbar;
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <div style={{ padding: "10px", background: "#eee" }}>
//       <Link to="/">Home</Link> |{" "}
//       <Link to="/login">Login</Link> |{" "}
//       <Link to="/register">Register</Link> |{" "}
//       <Link to="/create">Create Post</Link>
//     </div>
//   );
// }

// export default Navbar;

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <div>
        <Link to="/">Blog Platform</Link>
      </div>

      <div>
        <Link to="/">Home</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/create">Create Post</Link>
            <Link to="/" onClick={logout}>
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;