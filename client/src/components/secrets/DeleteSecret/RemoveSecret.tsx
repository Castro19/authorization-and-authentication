import React, { useCallback } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import deleteSecret from "./deleteSecret";
import { SecretsType } from "@/types";

type RemoveSecretProps = {
  userId: string;
  secretId: string;
  setSecrets: React.Dispatch<React.SetStateAction<SecretsType[]>>;
  setSecretResponse: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const RemoveSecret = ({
  userId,
  secretId,
  setSecrets,
  setSecretResponse,
}: RemoveSecretProps) => {
  console.log("USER IDD: ", userId);
  console.log("SECRET IDD: ", secretId);
  const onDelete = useCallback(
    async (userId: string, secretId: string) => {
      console.log("On UserID: ", userId);
      console.log("Deleting SecretID: ", secretId);
      try {
        const data = await deleteSecret(secretId);
        console.log("DATAA: ", data);
        if (data?.code === 403) {
          setSecretResponse(data.message);
        } else {
          setSecrets((prevSecrets) =>
            prevSecrets.filter((s) => s.secretId !== secretId)
          );
        }
        console.log("responseData: ", data);
      } catch (error) {
        console.log("Error: ", error);
      }
    },
    [setSecretResponse, setSecrets]
  );

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

export default RemoveSecret;
