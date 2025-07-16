import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ViewMessage from "./pages/ViewMessage";
import MainLayout from "./layout/MainLayout";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import NewTopic from "./pages/NewTopic";
import SendMessage from "./pages/SendMessage";
// import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route
          path="/"
          element={

              <MainLayout />

          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/new" element={<NewTopic />} />
          <Route path="/view/:messageId" element={<ViewMessage />} />
        </Route>
        
        <Route path="/m/:profileSlug/:slug" element={<SendMessage />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
