import { FaRegTrashAlt } from "react-icons/fa";

type DeleteSecretProps = {
  userId: number;
  secretId: number;
  onDelete: any;
};

const DeleteSecret = ({ userId, secretId, onDelete }: DeleteSecretProps) => {
  return (
    <button
      onClick={() => onDelete(userId, secretId)}
      aria-label="Delete item"
      style={{ border: "none", background: "none", cursor: "pointer" }}
    >
      <FaRegTrashAlt size="24px" />
    </button>
  );
};

export default DeleteSecret;
