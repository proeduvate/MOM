import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import ViewMeeting from "./pages/ViewMeeting";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/meetings" element={<Meetings />} />

        <Route path="/tasks" element={<Tasks />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/meetings/:id" element={<ViewMeeting />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;