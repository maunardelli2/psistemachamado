import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from './contexts/auth';
import RoutesApp from "./routes";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer autoClose={3000}/>
        <RoutesApp/>
      </Router>
    </AuthProvider>
  );
}

export default App;
