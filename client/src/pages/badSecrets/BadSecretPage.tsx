import BadSecret from "@/components/secrets/badSecret/BadSecret";
import { useState } from "react";
import AddEditSecret from "@/components/secrets/AddSecret/AddSecret";
import { Button } from "@/components/ui/button";
// import { useLoaderData } from "react-router-dom";
import { SecretsType } from "@/types";
import styles from "../secrets/SecretsPage.module.css";

const testSecret = {
  secretId: "66577af675b353e9b7a975f1",
  userId: "8adb71f3-f8c7-4994-b28a-9436ff8d9709",
  userName: "Bob123",
  description: "<script>alert('Hello World!')</script>",
  role: ["editor"],
  title: "YOOO",
};

const secretsFetched = [testSecret];

const BadSecretPage = () => {
  //   const secretsFetched = useLoaderData() as SecretsType[];
  //   console.log("secrets FETCHED!!", secretsFetched);
  const [trigger, setTrigger] = useState(false);
  const [xsecrets, setXsecrets] = useState<SecretsType[]>(secretsFetched);
  const [editSecret, setEditSecret] = useState<SecretsType | undefined>(
    undefined
  ); // State to manage the secret being edited

  const handleAddSecret = () => {
    setEditSecret(undefined);
    setTrigger(true);
  };

  const handleEditSecret = (secret: SecretsType) => {
    setEditSecret(secret);
    setTrigger(true);
  };
  console.log("Secretsss:", xsecrets);
  return (
    <div className={styles.container}>
      {xsecrets.map((secret) => (
        <BadSecret
          key={secret.secretId}
          secret={secret}
          setSecrets={setXsecrets}
          triggerEdit={handleEditSecret}
        />
      ))}
      <div>
        <Button onClick={handleAddSecret} className={styles.addSecretButton}>
          Add a Secret
        </Button>
        {trigger && (
          <AddEditSecret
            trigger={trigger}
            setTrigger={setTrigger}
            setSecrets={setSecrets}
            editSecret={editSecret}
          />
        )}
      </div>
    </div>
  );
};

export default BadSecretPage;
