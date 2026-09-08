import React from "react";
import { BrowserRouter } from "react-router-dom";
import Mainroute from "./router/Mainroute";
import { StoreProvider } from "./context/StoreContext";

export default function App() {
  return <BrowserRouter><StoreProvider><Mainroute /></StoreProvider></BrowserRouter>;
}
