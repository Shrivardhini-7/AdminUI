import "./EditDetails.css";

let EditDetails = ({ usersData, personData, setData }) => {
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
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </th>
      <th>
        <input
          type="text"
          name="role"
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
