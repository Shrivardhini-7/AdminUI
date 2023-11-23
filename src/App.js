
import "./App.css";
import Users from "./Components/Users";
import axios from "axios"; 
import { useSnackbar } from "notistack";


function App() {
  const APIENDPOINT =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const { enqueueSnackbar } = useSnackbar();

  const apiCall = async () => {
    try {
      let response = await axios.get(APIENDPOINT);
      //console.log(response.data);
      localStorage.setItem("Data", JSON.stringify(response.data));
      return(response.data);
    } catch (e) {
      enqueueSnackbar(
        e.response.message,
        {
          variant: "error",
        }
      );
      return null;
    }
  };
  return (
    <div>
      <div className="App"> Users Info</div>
      <Users apiCall= {apiCall}></Users>
    </div>
  );
}

export default App;
