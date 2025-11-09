import { Routes, Route, Navigate } from "react-router-dom";

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
import GroupChat from "./groupChat/GroupChat";

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

      {/* Activity details (dynamic) */}
      <Route path="/activity/:id" element={<ActivityDetails />} />
      <Route path="/activityDetails/:id" element={<ActivityDetails />} />
      <Route path="/activityDetails" element={<Navigate to="/viewActivities" replace />} />

      <Route path="/activitiesCreated" element={<ActivitiesCreated />} />
      <Route path="/upcomingActivities" element={<UpcomingActivities />} />
      <Route path="/profileView" element={<ProfileView />} />

      {/* Group chat (dynamic) */}
      <Route path="/groupChat/:activityId" element={<GroupChat />} />
      <Route path="/groupChat" element={<Navigate to="/viewActivities" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
