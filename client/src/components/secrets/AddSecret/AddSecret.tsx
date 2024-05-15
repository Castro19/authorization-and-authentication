import React, { useEffect, useRef, useState } from "react";
import styles from "./AddSecret.module.css";
import { Button } from "../../ui/button";
import postSecret from "./postSecret";
import { useAuth } from "@/contexts/authContext";
import { SecretsType } from "@/types";
import updateSecret from "../EditSecret/putSecret";

type AddEditSecretProps = {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setSecrets: React.Dispatch<React.SetStateAction<SecretsType[]>>;
  editSecret?: SecretsType; // Optional prop for editing
};
const AddEditSecret = ({
  trigger,
  setTrigger,
  setSecrets,
  editSecret,
}: AddEditSecretProps) => {
  const popupInnerRef = useRef<HTMLDivElement>(null);
  const [secretTitle, setSecretTitle] = useState("");
  const [secretDesc, setSecretDesc] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    // When editSecret changes, update form fields
    if (editSecret) {
      setSecretTitle(editSecret.title);
      setSecretDesc(editSecret.description);
    } else {
      setSecretTitle("");
      setSecretDesc("");
    }
  }, [editSecret]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser?.userId) return;

    if (editSecret) {
      // Update existing secret
      const updatedSecret = {
        ...editSecret,
        title: secretTitle,
        description: secretDesc,
      };
      // Call an API function to update the secret
      await updateSecret(updatedSecret);
      setSecrets((prev) =>
        prev.map((s) =>
          s.secretId === editSecret.secretId ? updatedSecret : s
        )
      );
    } else {
      // Add new secret
      if (
        currentUser?.userName &&
        currentUser?.userId &&
        secretTitle &&
        secretDesc
      ) {
        const secretId = await postSecret(
          currentUser?.userId,
          currentUser?.userName,
          secretTitle,
          secretDesc
        );
        const newSecret = {
          userId: currentUser?.userId,
          secretId,
          userName: currentUser?.userName,
          title: secretTitle,
          description: secretDesc,
        };
        setSecrets((prev) => [...prev, newSecret]);
      } else {
        console.log("Cannot add secret if null");
      }
    }

    setSecretTitle("");
    setSecretDesc("");
    setTrigger(false);
  };

  const handleCloseButton = () => {
    setTrigger(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupInnerRef.current &&
        !popupInnerRef.current.contains(event.target as Node)
      ) {
        setTrigger(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return trigger ? (
    <div className={styles.popup}>
      <div ref={popupInnerRef} className={styles.popupInner}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Button
            type="button"
            onClick={handleCloseButton}
            className={styles.closeBtn}
          >
            Close
          </Button>
          <label htmlFor="title" className={styles.label}>
            Enter Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter a Title"
            value={secretTitle}
            onChange={(e) => setSecretTitle(e.target.value)}
            className={styles.input}
          />

          <label htmlFor="description" className={styles.label}>
            Enter Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write a Description"
            value={secretDesc}
            onChange={(e) => setSecretDesc(e.target.value)}
            className={styles.textArea}
          />
          <Button type="submit" className={styles.button}>
            {editSecret ? "Update Secret" : "Add a new Secret"}
          </Button>
        </form>
      </div>
    </div>
  ) : null;
};

export default AddEditSecret;
