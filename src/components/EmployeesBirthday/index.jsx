import { nanoid } from "nanoid";
import { useMemo } from "react";
import { useSelector } from "react-redux";
// selectors
import { ActiveUserSelector } from "../../store/users-services/selectors";
// helpers
import { getMonths } from "../../core/helpers/functions";
// components
import EmployessBithdayItem from "../EmployessBithdayItem";
// styles
import styles from "./EmployeesBirthday.module.scss";

const EmployessBithday = () => {
  // selectors
  const userActive = useSelector(ActiveUserSelector);
  // memo
  const userActiveSortableLists = useMemo(() => {
    const userActiveSort = [...userActive];
    const arrMonth = getMonths();

    const usersSortlastName = userActiveSort.sort((a, b) => {
      return a.lastName.localeCompare(b.lastName);
    });

    const usersSortDate = usersSortlastName.sort((a, b) => {
      var dateA = new Date(a.dob).getTime();
      var dateB = new Date(b.dob).getTime();
      return dateA > dateB ? 1 : -1;
    });

    const usersSortMonth = {};
    arrMonth.forEach((month) => {
      usersSortDate.forEach((userBithdayItem) => {
        const date = new Date(userBithdayItem.dob);
        const monthUser = date.getMonth();

        if (
          usersSortMonth[arrMonth[monthUser]] &&
          usersSortMonth[arrMonth[monthUser]].length >= 0
        ) {
          if (month === arrMonth[monthUser]) {
            usersSortMonth[arrMonth[monthUser]].push({
              ...userBithdayItem,
            });
          }
        } else {
          usersSortMonth[arrMonth[monthUser]] = [];
        }
      });
    });
    return usersSortMonth;
  }, [userActive]);
  return (
    <div className={styles.wrapper}>
      <div>
        <h2>Employess Bithday</h2>
      </div>
      <div>
        {Object.keys(userActiveSortableLists).length === 0 ? (
          <h3>Employees List is empty</h3>
        ) : (
          Object.keys(userActiveSortableLists).map((key) => {
            return (
              <div key={nanoid()}>
                <h2>{key}</h2>
                {userActiveSortableLists[key].length > 0 ? (
                  <div>
                    {userActiveSortableLists[key].map((userBithdayItem) => {
                      return (
                        <EmployessBithdayItem
                          key={nanoid()}
                          userBithdayItem={userBithdayItem}
                        />
                      );
                    })}
                  </div>
                ) : (
                  "No Employees"
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EmployessBithday;
