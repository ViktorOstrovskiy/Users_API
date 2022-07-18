import moment from "moment";

const EmployessBithdayItem = ({ userBithdayItem }) => {
  return (
    <div>
      <h4>
        {userBithdayItem.firstName} {userBithdayItem.lastName} -{" "}
        {moment(userBithdayItem.dob).format("LL")}
      </h4>
    </div>
  );
};

export default EmployessBithdayItem;
