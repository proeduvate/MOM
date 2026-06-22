import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import ViewMeeting from "./pages/ViewMeeting";
import Extension from "./pages/Extension";


function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/"  element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/meetings" element={<Meetings />} />

        <Route path="/tasks" element={<Tasks />} />

        <Route path="/settings" element={<Settings />} />
        
        <Route path="/extension" element={<Extension />} />

        <Route path="/meetings/:id" element={<ViewMeeting />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;