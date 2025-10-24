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
import UpcomingActivities from "./upcomingActivities/UpcomingActivities";
import ProfileView from "./profileView/ProfileView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createProfile" element={<CreateProfile />} />
      <Route path="/viewActivities" element={<ViewActivities />} />
      <Route path="/createActivity" element={<CreateActivity />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/activityDetails" element={<ActivityDetails />} /> {/*J'ai l'impression qu'en lui passant l'id de la route, on peut lui faire aller sur une route spécifique : <Route path="/activityDetails/:id" element={<ActivityDetails />} />*/}
      <Route path="/activitiesCreated" element={<ActivitiesCreated />} />
      <Route path="/upcomingActivities" element={<UpcomingActivities />} />
      <Route path="/profileView" element={<ProfileView />} />
    </Routes>
  );
}

export default App;
