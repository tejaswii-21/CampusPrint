import { AppProvider, useApp } from '@/context/AppContext';
import ToastContainer from '@/components/ToastContainer';
import Landing from '@/pages/Landing';
import StudentLogin from '@/pages/StudentLogin';
import StaffLogin from '@/pages/StaffLogin';
import StudentDashboard from '@/pages/StudentDashboard';
import StaffDashboard from '@/pages/StaffDashboard';

function Router() {
  const { currentPage } = useApp();

  switch (currentPage) {
    case 'landing':
      return <Landing />;
    case 'student-login':
    case 'student-register':
      return <StudentLogin />;
    case 'staff-login':
      return <StaffLogin />;
    case 'student-dashboard':
      return <StudentDashboard />;
    case 'staff-dashboard':
      return <StaffDashboard />;
    default:
      return <Landing />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <Router />
      <ToastContainer />
    </AppProvider>
  );
}
