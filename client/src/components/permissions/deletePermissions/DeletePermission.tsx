import { MouseEvent } from "react";
import styles from "./DeletePermission.module.css";

type DeletePermissionProps = {
  handleSetPermissions: (e: MouseEvent<HTMLButtonElement>) => void;
};

const DeletePermission = ({ handleSetPermissions }: DeletePermissionProps) => {
  return (
    <button className={styles.removeButton} onClick={handleSetPermissions}>
      Remove Permissions
    </button>
  );
};

export default DeletePermission;
