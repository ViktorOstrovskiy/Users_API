import { useDispatch } from "react-redux";
// action
import { changeStatus } from "../../store/users-services/actions";
// styles
import styles from "./EmployessItem.module.scss";

const EmployessItem = ({ user }) => {
  // dispatch
  const dispatch = useDispatch();
  // helpers
  const handleChange = (e) => {
    dispatch(changeStatus(user, e.target.value));
  };

  return (
    <div>
      <div
        key={user.id}
        className={user.status === "active" ? styles.active : ""}
      >
        <p>
          {user.firstName} {user.lastName}
        </p>

        <label>Active</label>
        <input
          type="radio"
          id={"active" + user.id}
          checked={user.status === "active"}
          value="active"
          onChange={(e) => handleChange(e)}
        ></input>
        <label>Not Active</label>
        <input
          type="radio"
          id={"not active" + user.id}
          value="not active"
          checked={user.status === "not active"}
          onChange={(e) => handleChange(e)}
        ></input>
      </div>
    </div>
  );
};

export default EmployessItem;
