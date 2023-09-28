import { createRoot } from "react-dom/client";
import Pet from "./Pet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DynamicColumnComponent from "./DynamicColumnComponent"
import Works from "./Works";

const App = () => {
  return (
    <div>
      <h2>Welcome</h2>
      <DynamicColumnComponent />
      <Works />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
