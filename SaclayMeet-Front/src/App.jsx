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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/createProfile"
        element={
          <ProtectedRoute>
            <CreateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewActivities"
        element={
          <ProtectedRoute>
            <ViewActivities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/createActivity"
        element={
          <ProtectedRoute>
            <CreateActivity />
          </ProtectedRoute>
        }
      />
      <Route
        path="/userProfile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* Activity details (dynamic) */}
      <Route
        path="/activity/:id"
        element={
          <ProtectedRoute>
            <ActivityDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activityDetails/:id"
        element={
          <ProtectedRoute>
            <ActivityDetails />
          </ProtectedRoute>
        }
      />
      <Route path="/activityDetails" element={<Navigate to="/viewActivities" replace />} />

      <Route
        path="/activitiesCreated"
        element={
          <ProtectedRoute>
            <ActivitiesCreated />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upcomingActivities"
        element={
          <ProtectedRoute>
            <UpcomingActivities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profileView/:userId"
        element={
          <ProtectedRoute>
            <ProfileView />
          </ProtectedRoute>
        }
      />

      {/* Group chat (dynamic) */}
      <Route
        path="/groupChat/:activityId"
        element={
          <ProtectedRoute>
            <GroupChat />
          </ProtectedRoute>
        }
      />
      <Route path="/groupChat" element={<Navigate to="/viewActivities" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
