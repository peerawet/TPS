import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import Navbar from "../layouts/Navbar.jsx";


function DocumentsPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex  bg-gray-500">
        <div className=" w-full mx-16 my-12   bg-gray-100 rounded-lg shadow-md flex overflow-hidden">
    
        </div>
      </div>


    </>
  );
}

export default DocumentsPage;
