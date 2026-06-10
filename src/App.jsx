import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster }                       from "react-hot-toast";
import { AuthProvider }                  from "./context/AuthContext";

import Navbar           from "./components/Navbar";
import Footer           from "./components/Footer";
import ProtectedRoute   from "./components/ProtectedRoute";

import Home             from "./pages/Home";
import Login            from "./pages/Login";
import Register         from "./pages/Register";
import Services         from "./pages/Services";
import BookAppointment  from "./pages/BookAppointment";
import PatientDashboard from "./pages/PatientDashboard";
import AdminDashboard   from "./pages/AdminDashboard";
import Blog             from "./pages/Blog";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Toaster position="top-right" />
        <Navbar />

        <Routes>
          {/* Public */}
          <Route path="/"         element={<Home />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog"     element={<Blog />} />

          {/* Patient Protected */}
          <Route path="/book" element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }/>

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }/>

          {/* Admin Protected */}
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }/>
        </Routes>

        <Footer />

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;