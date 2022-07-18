import { useEffect } from "react";
import { useDispatch } from "react-redux";
// components
import Employees from "./components/Employees";
import EmployeesBirthday from "./components/EmployeesBirthday";
// actions
import { getUsers } from "./store/users-services/actions";
// styles
import styles from "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("persist:state")) {
      dispatch(getUsers());
    }
    return localStorage.removeItem("persist:state");
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Employees />
      <EmployeesBirthday />
    </div>
  );
};

export default App;
