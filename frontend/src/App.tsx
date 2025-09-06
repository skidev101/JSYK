import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./shared/components/Layout/MainLayout/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import NewTopicPage from "./pages/NewTopicPage";
import NotFoundPage from "./pages/NotFoundPage";
import SendMessagePage from "./pages/SendMessagePage";
import UserProfilePage from "./pages/UserProfilePage";
import ViewMessagePage from "./pages/ViewMessagePage";
import TopicsListPage from "./pages/TopicsListPage";
import TopicMessagesListPage from "./pages/TopicMessagesListPage";
import LandingPage from "./pages/LandingPage";
// import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/new-topic" element={<NewTopicPage />} />
          <Route path="/view/:messageId" element={<ViewMessagePage />} />
          <Route path="/topics" element={<TopicsListPage />} />
          <Route path="/topic/:topicId/messages" element={<TopicMessagesListPage />} />
        </Route>

        <Route path="/" element={<LandingPage />} />
        <Route path="/u/:profileSlug" element={<UserProfilePage />} />
        <Route path="/m/:profileSlug/:slug" element={<SendMessagePage />} />
        <Route path="/m/:profileSlug" element={<SendMessagePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
