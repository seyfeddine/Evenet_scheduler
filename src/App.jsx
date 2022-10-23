import "./App.css";
import Scheduler from "./components/Scheduler";
import Calendar from "./components/Calendar";
import { ContextProvider } from "./contexts/ContextProvider";
function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Calendar />
        <Scheduler />
      </div>
    </ContextProvider>
  );
}

export default App;
