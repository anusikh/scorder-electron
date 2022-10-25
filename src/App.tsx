import "./App.css";
import { ThemeProvider } from "styled-components";
import Theme from "./components/Theme/Theme";
import BaseApp from "./components/BaseApp/BaseApp";

function App() {
  const { ipcRenderer } = window.require("electron");

  return (
    <ThemeProvider theme={Theme}>
      <BaseApp ipcRenderer={ipcRenderer} />
    </ThemeProvider>
  );
}

export default App;
