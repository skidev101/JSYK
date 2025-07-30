import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./shared/components/Layout/MainLayout/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import NewTopicPage from "./pages/NewTopicPage";
import NotFoundPage from "./pages/NotFoundPage";
// import SendMessage from "./pages/SendMessage";
// import ViewTopics from "./features/dashboard/components/TopicLinksList/TopicList";
// import UserProfile from "./pages/UserProfile";
// import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/new" element={<NewTopicPage />} />
          {/* <Route path="/view/:messageId" element={<ViewMessage />} /> */}
          {/* <Route path="/topics" element={<ViewTopics />} /> */}
        </Route>

        {/* <Route path="/:profileSlug" element={<UserProfile />} /> */}
        {/* <Route path="/m/:profileSlug/:slug" element={<SendMessage />} /> */}
        {/* <Route path="/m/:profileSlug" element={<SendMessage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
