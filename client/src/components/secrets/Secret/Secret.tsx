import React from "react";
import styles from "./Secrets.module.css";
import RemoveSecret from "../DeleteSecret/RemoveSecret";
import EditSecret from "../EditSecret/EditSecret";
import ViewAllUsers from "@/components/users/ReadUsers/ViewAllUsers";
import { SecretsType } from "@/types";

interface SecretsProps {
  setSecrets: React.Dispatch<React.SetStateAction<SecretsType[]>>;
  secret: SecretsType;
  triggerEdit: (secret: SecretsType) => void;
  secretResponse: string | undefined;
  setSecretResponse: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Secret = ({
  setSecrets,
  secret,
  triggerEdit,
  secretResponse,
  setSecretResponse,
}: SecretsProps) => {
  const handleEdit = () => {
    triggerEdit(secret); // Function sets the editing state and the current secret to edit
  };

  const renderAdminControls = () => (
    <>
      <div className={styles.iconContainer}>
        <div className={styles.modifySecretIconContainer}>
          <RemoveSecret
            secretId={secret.secretId}
            userId={secret.userId}
            setSecrets={setSecrets}
            setSecretResponse={setSecretResponse}
          />
          <EditSecret onEdit={handleEdit} />
        </div>
        <div>
          <ViewAllUsers secretId={secret.secretId} />
        </div>
      </div>
      <div className={styles.idContainer}>
        <p className={styles.userId}>User ID: {secret.userId}</p>
        <p className={styles.userId}>Secret ID: {secret.secretId}</p>
      </div>
      {secretResponse}
    </>
  );

  const renderEditorControls = () => (
    <div className={styles.iconContainer}>
      <div className={styles.modifySecretIconContainer}>
        <EditSecret onEdit={handleEdit} />
      </div>
    </div>
  );

  const determineAccessControl = () => {
    if (secret?.role?.includes("admin")) {
      return renderAdminControls();
    } else if (secret?.role?.includes("editor")) {
      return renderEditorControls();
    }
    // Implicitly, if the role is "viewer" or undefined, no controls are shown
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{secret.title}</h2>
      <h4>By: {secret.userName}</h4>
      <p className={styles.text}>{secret.description}</p>

      {determineAccessControl()}
    </div>
  );
};

export default Secret;

/*
<p className={styles.text}>{secret.description}</p>

<p
      className={styles.text}
      dangerouslySetInnerHTML={{ __html: secret.description }}
    ></p>

*/
