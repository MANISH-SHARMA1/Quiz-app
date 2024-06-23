import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-around py-3 border-b">
      <div className="font-bold text-lg">
        <Link to="/">Home</Link>
      </div>
      <div className="font-bold text-lg">
        <Link to="/create-quiz">Create Quiz</Link>
      </div>
    </div>
  );
}

export default Navbar;
