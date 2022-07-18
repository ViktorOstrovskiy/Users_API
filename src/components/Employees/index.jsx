import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
// selectors
import { AllUserSelector } from "../../store/users-services/selectors";
// components
import EmployessItem from "../EmployessItem";
// styles
import styles from "./Employees.module.scss";

const Employees = () => {
  // selectors
  const user = useSelector(AllUserSelector);

  return (
    <div className={styles.wrapper}>
      <h1>Employees</h1>
      <div className={styles.list}>
        {(user || []).map((item) => (
          <div key={nanoid()}>
            <h3>{item.letters}</h3>
            {item.users.length > 0 ? (
              <div>
                {item.users.map((userItem) => (
                  <EmployessItem user={userItem} key={userItem.id} />
                ))}
              </div>
            ) : (
              "No empliyees"
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
