import { useState } from "react";
import "./App.css";
import Home from "./components/home";
import users from "./users.json";

function App() {
  const [userData, setUsersData] = useState(users);
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

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
      {userData.map((user) => (
        <Home
          user={user}
          usersData={userData}
          setUsersData={setUsersData}
          search={search}
        />
      ))}
    </div>
  );
}

export default App;
