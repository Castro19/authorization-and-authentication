import { User } from "@/types";
import styles from "./SetPermissionForm.module.css";
import { ChangeEvent, MouseEvent } from "react";
interface SetPermissionsProps {
  user: User;
  permissions: { [key: string]: boolean };
  handleCheckboxChange: (
    e: ChangeEvent<HTMLInputElement>,
    option: string
  ) => void;
  handleSetPermissions: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SetPermissionForm = ({
  permissions,
  handleCheckboxChange,
}: SetPermissionsProps) => {
  const permissionOptions = ["admin", "viewer"];

  return (
    <span className={styles.checkboxContainer}>
      {permissionOptions.map((option) => (
        <span key={option} className={styles.checkboxWrapper}>
          <label className={styles.label}>{option}</label>
          <input
            type="checkBox"
            checked={permissions[option] || false}
            onChange={(e) => handleCheckboxChange(e, option)}
            className={styles.checkbox}
          />
        </span>
      ))}
    </span>
  );
};

export default SetPermissionForm;
