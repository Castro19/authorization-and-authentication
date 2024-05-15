import { CiEdit } from "react-icons/ci";

interface EditSecretProps {
  onEdit: () => void;
}
const EditSecret = ({ onEdit }: EditSecretProps) => {
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
