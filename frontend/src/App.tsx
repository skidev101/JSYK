import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ViewMessage from "./pages/ViewMessage";
import MainLayout from "./layout/MainLayout";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route
          path="/"
          element={
           <ProtectedRoute>
              <MainLayout />
           </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/view" element={<ViewMessage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
