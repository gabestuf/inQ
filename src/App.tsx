import { useState } from "react";
import SurveyPage from "./pages/SurveyPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <SurveyPage />
    </div>
  );
}

export default App;
