import "./EditDetails.css";
// import { useSnackbar } from "notistack";

let EditDetails = ({ usersData, personData, setData }) => {
  // const { enqueueSnackbar } = useSnackbar();
  //to handle the changes in the inout fields
  let handleChange = (e) => {
    let newList = usersData.map((value) =>
      value.id === personData.id
        ? {
            ...value,
            [e.target.name]: e.target.value,
          }
        : value
    );
    setData(newList);
  };
  return (
    <>
      <th>
        <input type="checkbox" />
      </th>
      <th>
        <input
          type="text"
          name="name"
          required
          value={personData.name}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </th>
      <th>
        <input
          type="text"
          value={personData.email}
          name="email"
          required
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </th>
      <th>
        <input
          type="text"
          name="role"
          required
          value={personData.role}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </th>
      <th>
        <button className="submit_btn">Submit</button>
      </th>
    </>
  );
};

export default EditDetails;
