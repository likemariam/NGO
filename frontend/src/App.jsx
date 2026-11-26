import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';

// Auth pages
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';

// Dashboard pages
import AdminDashboard from './pages/Dashboard/AdminDashboard.jsx';
import ManagerDashboard from './pages/Dashboard/ManagerDashboard.jsx';
import TeacherDashboard from './pages/Dashboard/TeacherDashboard.jsx';
import FieldWorkerDashboard from './pages/Dashboard/FieldWorkerDashboard.jsx';
import RegularUserDashboard from './pages/Dashboard/RegularUserDashboard.jsx';
import FunderDashboard from './pages/Dashboard/FunderDashboard.jsx';

// LMS pages
import LearningMaterials from './pages/LMS/LearningMaterials.jsx';
import MaterialDetails from './pages/LMS/MaterialDetails.jsx';
import UploadMaterial from './pages/LMS/UploadMaterial.jsx';
import EditMaterial from './pages/LMS/EditMaterial.jsx';
import VideoMaterials from './pages/LMS/VideoMaterials.jsx';
import Questionnaires from './pages/LMS/Questionnaires.jsx';
import CreateQuestionnaire from './pages/LMS/CreateQuestionnaire.jsx';
import Quizzes from './pages/LMS/Quizzes.jsx';
import CreateQuiz from './pages/LMS/CreateQuiz.jsx';
import TakeQuiz from './pages/LMS/TakeQuiz.jsx';
import QuizResults from './pages/LMS/QuizResults.jsx';

// Attendance pages
import CheckInCheckOut from './pages/Attendance/CheckInCheckOut.jsx';
import AttendanceHistory from './pages/Attendance/AttendanceHistory.jsx';
import ManagerAttendanceView from './pages/Attendance/ManagerAttendanceView.jsx';
import AttendanceReports from './pages/Attendance/AttendanceReports.jsx';

// Profile pages
import MyProfile from './pages/Profile/MyProfile.jsx';
import EditProfile from './pages/Profile/EditProfile.jsx';
import UserManagement from './pages/Profile/UserManagement.jsx';
import CreateUser from './pages/Profile/CreateUser.jsx';
import EditUser from './pages/Profile/EditUser.jsx';
import RoleManagement from './pages/Profile/RoleManagement.jsx';
import FunderProjects from './pages/Profile/FunderProjects.jsx';
import FieldWorkerActivities from './pages/Profile/FieldWorkerActivities.jsx';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/manager" element={<ManagerDashboard />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/field-worker" element={<FieldWorkerDashboard />} />
        <Route path="/dashboard/user" element={<RegularUserDashboard />} />
        <Route path="/dashboard/funder" element={<FunderDashboard />} />

        <Route path="/lms/materials" element={<LearningMaterials />} />
        <Route path="/lms/materials/:id" element={<MaterialDetails />} />
        <Route path="/lms/materials/upload" element={<UploadMaterial />} />
        <Route path="/lms/materials/edit/:id" element={<EditMaterial />} />
        <Route path="/lms/videos" element={<VideoMaterials />} />
        <Route path="/lms/questionnaires" element={<Questionnaires />} />
        <Route path="/lms/questionnaires/create" element={<CreateQuestionnaire />} />
        <Route path="/lms/quizzes" element={<Quizzes />} />
        <Route path="/lms/quizzes/create" element={<CreateQuiz />} />
        <Route path="/lms/quizzes/take/:id" element={<TakeQuiz />} />
        <Route path="/lms/quizzes/results/:id" element={<QuizResults />} />

        <Route path="/attendance/check-in" element={<CheckInCheckOut />} />
        <Route path="/attendance/history" element={<AttendanceHistory />} />
        <Route path="/attendance/manager-view" element={<ManagerAttendanceView />} />
        <Route path="/attendance/reports" element={<AttendanceReports />} />

        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/roles" element={<RoleManagement />} />
        <Route path="/funder/projects" element={<FunderProjects />} />
        <Route path="/field-worker/activities" element={<FieldWorkerActivities />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
