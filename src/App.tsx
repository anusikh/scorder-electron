import "./App.css";
import { ThemeProvider } from "styled-components";
import Theme from "./components/Theme/Theme";
import BaseApp from "./components/BaseApp/BaseApp";
import { AuthProvider } from "./context/Auth/AuthProvider";

function App() {
  const { ipcRenderer } = window.require("electron");

  return (
    <ThemeProvider theme={Theme}>
      <AuthProvider>
        <BaseApp ipcRenderer={ipcRenderer} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
