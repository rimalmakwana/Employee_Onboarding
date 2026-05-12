import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Register Page */}
        <Route path="/" element={<Register />} />

        {/* Onboarding Page */}
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;