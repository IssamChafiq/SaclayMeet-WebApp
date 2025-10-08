import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import SignIn from "./signIn/SignIn";
import Register from "./register/Register";
import CreateProfile from "./createProfile/CreateProfile";
import ViewActivities from "./viewActivities/ViewActivities";
import CreateActivity from "./createActivity/CreateActivity";
import UserProfile from "./userProfile/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserProfile />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createProfile" element={<CreateProfile />} />
      <Route path="/viewActivities" element={<ViewActivities />} />
    </Routes>
  );
}

export default App;
