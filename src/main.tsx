import React from "react";
import ReactDOM from "react-dom/client";

const App = () => (
  <div style={{ textAlign: "center", marginTop: "20%" }}>
    <h1>🎂 Happy Birthday! 🎉</h1>
    <p>Made with ❤️ by Baran Ege Şenol</p>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);