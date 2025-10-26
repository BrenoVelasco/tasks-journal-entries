import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store";
import { Sidenav } from "./components/layout";
import { TasksScreen } from "./features/tasks";
import { JournalEntriesScreen } from "./features/journal-entries";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex h-screen">
          <Sidenav />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/tasks" replace />} />
              <Route path="/tasks" element={<TasksScreen />} />
              <Route
                path="/journal-entries"
                element={<JournalEntriesScreen />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
