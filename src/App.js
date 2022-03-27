import { Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import SignUpForm from "./pages/SignUpForm";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import AddStudent from "./pages/AddStudent";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-student"
          element={
            <PrivateRoute>
              <AddStudent />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
