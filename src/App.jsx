import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Layout from "./components/shared/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Page Components
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import BridgeFactor from "./pages/BridgeFactor";
import ProfileSetup from "./pages/ProfileSetup";
import Analysis from "./pages/Analysis";
import SkillGap from "./pages/SkillGap";
import Recommendations from "./pages/Recommendations";
import Roadmap from "./pages/Roadmap";
import PracticeBattle from "./pages/PracticeBattle";
import Evaluation from "./pages/Evaluation";
import Dashboard from "./pages/Dashboard";
import CourseFinder from "./pages/CourseFinder";
import Welcome from "./pages/Welcome";
import Disconnect from "./pages/Disconnect";

// Global Scroll Reset Component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const protectedNodes = ['/dashboard', '/bridge-factor', '/profile', '/analysis', '/skill-gap', '/recommendations', '/roadmap', '/battle', '/evaluation', '/courses', '/welcome'];

  useEffect(() => {
    // 1-second AI Session Pulse (Ensures all tabs eject on logout)
    const pulseInterval = setInterval(() => {
      const user = localStorage.getItem('skillnova_user');
      if (!user && protectedNodes.includes(location.pathname)) {
        navigate('/login', { replace: true });
      }
    }, 1000);

    return () => clearInterval(pulseInterval);
  }, [location.pathname, navigate]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Auth />} />
          
          {/* Protected AI Nodes */}
          <Route path="bridge-factor" element={<ProtectedRoute><BridgeFactor /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
          <Route path="analysis" element={<ProtectedRoute><Analysis /></ProtectedRoute>} />
          <Route path="skill-gap" element={<ProtectedRoute><SkillGap /></ProtectedRoute>} />
          <Route path="recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
          <Route path="roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
          <Route path="battle" element={<ProtectedRoute><PracticeBattle /></ProtectedRoute>} />
          <Route path="evaluation" element={<ProtectedRoute><Evaluation /></ProtectedRoute>} />
          <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="courses" element={<ProtectedRoute><CourseFinder /></ProtectedRoute>} />
          <Route path="welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
          
          <Route path="disconnect" element={<Disconnect />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
