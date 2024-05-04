import React, { useEffect, useRef, useState } from "react";
import styles from "./AddSecret.module.css";
import { Button } from "../../ui/button";
import postSecret from "./postSecret";
import { useAuth } from "@/contexts/authContext";
import { SecretsType } from "@/types";

type AddSecretProps = {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setSecrets: React.Dispatch<React.SetStateAction<SecretsType[]>>;
};

const AddSecret = ({ trigger, setTrigger, setSecrets }: AddSecretProps) => {
  const popupInnerRef = useRef(null);
  const [secretTitle, setSecretTitle] = useState("");
  const [secretDesc, setSecretDesc] = useState("");
  const { userId } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Title: ", secretTitle);
    console.log("Description: ", secretDesc);

    if (userId) {
      const secretId = await postSecret(userId, secretTitle, secretDesc);
      const newSecret = {
        userId,
        secretId,
        title: secretTitle,
        description: secretDesc,
      };
      console.log("NEW SECRET: ", newSecret);
      setSecrets((prev) => [...prev, newSecret]);
    }

    setSecretTitle("");
    setSecretDesc("");
    setTrigger(false);
  };

  const handleCloseButton = () => {
    setTrigger(false);
  };

  const handleClickOutside = (event) => {
    if (
      popupInnerRef.current &&
      !popupInnerRef.current.contains(event.target)
    ) {
      setTrigger(false);
    }
  };

  useEffect(() => {
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
            Add a new Secret
          </Button>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default AddSecret;
