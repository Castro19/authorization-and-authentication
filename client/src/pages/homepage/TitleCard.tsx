// TitleCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const TitleCard = () => {
  let navigate = useNavigate();

  return (
    <div className="w-1/2 p-8 flex flex-col justify-center items-start bg-gradient-to-b from-indigo-500 to-indigo-700 text-white">
      <h1 className="text-4xl font-bold mb-3">Welcome to Our Community!</h1>
      <p className="mb-5">
        Join us and stay connected with the latest updates.
      </p>
      <button
        onClick={() => navigate("/explore")}
        className="py-2 px-4 bg-white text-indigo-700 font-semibold rounded-lg shadow-md hover:bg-indigo-100"
      >
        Explore
      </button>
    </div>
  );
};

export default TitleCard;
