import { useState, useEffect } from "react";
import "../src/sass/App.scss";
import Home from "./components/home";
import { useDispatch, useSelector } from "react-redux";
import mainData from "./users.json";
import { searchUser } from "./redux/userSlice";

function App() {
  const { userList, newList } = useSelector((state) => state.userMaster);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    let filteredUsers;
    if (search !== "") {
      filteredUsers = newList?.filter(
        (user) =>
          user?.first?.toLowerCase().includes(search?.toLowerCase()) ||
          user?.last?.toLowerCase().includes(search?.toLowerCase())
      );
      dispatch(searchUser(filteredUsers));
    } else {
      dispatch(searchUser(newList));
    }
  }, [search]);

  console.log("search", search);
  console.log("userList", userList);
  return (
    <div className="App">
      <input
        className="
      App_search"
        type="text"
        placeholder="Search user"
        value={search}
        onChange={handleChange}
      />
      {userList.length !== 0 ? (
        userList?.map((user) => (
          <Home user={user} search={search} setSearch={setSearch} />
        ))
      ) : (
        <div className="App_error">No Data Found</div>
      )}
    </div>
  );
}

export default App;
