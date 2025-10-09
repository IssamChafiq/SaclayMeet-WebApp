import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import SignIn from "./signIn/SignIn";
import Register from "./register/Register";
import CreateProfile from "./createProfile/CreateProfile";
import ViewActivities from "./viewActivities/ViewActivities";
import CreateActivity from "./createActivity/CreateActivity";
import UserProfile from "./userProfile/UserProfile";
import ActivityDetails from "./activityDetails/ActivityDetails";
import ActivitiesCreated from "./activitiesCreated/ActivitiesCreated";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ActivitiesCreated />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createProfile" element={<CreateProfile />} />
      <Route path="/viewActivities" element={<ViewActivities />} />
    </Routes>
  );
}

export default App;
