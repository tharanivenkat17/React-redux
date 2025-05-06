import React from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav/Nav";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Nav />
    </BrowserRouter>
  )
}
export default App