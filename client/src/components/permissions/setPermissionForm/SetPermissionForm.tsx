import styles from "./SetPermissionForm.module.css";
import { ChangeEvent } from "react";
interface SetPermissionsProps {
  permissions: { [key: string]: boolean };
  handleCheckboxChange: (
    e: ChangeEvent<HTMLInputElement>,
    option: string
  ) => void;
}

const SetPermissionForm = ({
  permissions,
  handleCheckboxChange,
}: SetPermissionsProps) => {
  const permissionOptions = ["admin", "editor", "viewer"];

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
