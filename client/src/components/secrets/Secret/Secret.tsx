import React from "react";
import styles from "./Secrets.module.css";
import DeleteSecret from "../DeleteSecret/DeleteSecret";
import deleteSecret from "../DeleteSecret/deleteSecret";
import EditSecret from "../EditSecret/EditSecret";
import { SecretsType } from "@/types";

interface SecretsProps {
  setSecrets: React.Dispatch<React.SetStateAction<SecretsType[]>>;
  secret: SecretsType;
  triggerEdit: any;
}

const Secret = ({ setSecrets, secret, triggerEdit }: SecretsProps) => {
  const handleDelete = async (userId: number, secretId: number) => {
    console.log("On UserID: ", userId);
    console.log("Deleting SecretID: ", secretId);
    try {
      const data = await deleteSecret(userId, secretId);
      setSecrets((prevSecrets) =>
        prevSecrets.filter((s) => s.secretId !== secretId)
      );
      console.log("responseData: ", data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleEdit = () => {
    triggerEdit(secret); // Assume this function sets the editing state and the current secret to edit
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{secret.title}</h2>
      <h4>By:{secret.userName}</h4>
      <p className={styles.text}>{secret.description}</p>
      <div className={styles.iconContainer}>
        <div className={styles.deleteSecretIcon}>
          <DeleteSecret
            secretId={secret.secretId}
            userId={secret.userId}
            onDelete={handleDelete}
          />
        </div>
        <div className={styles.editSecretIcon}>
          <EditSecret onEdit={handleEdit} />
        </div>
      </div>
      <div className={styles.idContainer}>
        <p className={styles.userId}>User ID: {secret.userId}</p>
        <p className={styles.userId}>Secret ID: {secret.secretId}</p>
      </div>
    </div>
  );
};

export default Secret;
