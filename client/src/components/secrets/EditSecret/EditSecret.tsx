import React from "react";
import { CiEdit } from "react-icons/ci";

const EditSecret = ({ onEdit }) => {
  return (
    <button
      onClick={onEdit}
      aria-label="Edit Secret"
      style={{ border: "none", background: "none", cursor: "pointer" }}
    >
      <CiEdit size="24px" />
    </button>
  );
};

export default EditSecret;
