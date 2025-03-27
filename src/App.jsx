import "./App.css";
import HeroTitle from "./components/Home/Hero/HeroTitle.jsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import HeaderMegaMenu from "./components/Home/Header/Header.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthenticationForm from "./components/AuthForms/AuthForm.jsx";

function App() {
  return (
    <MantineProvider>
      <Router>
        {/* Header remains visible on all pages */}
        <HeaderMegaMenu />

        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HeroTitle />} />

          {/* Authentication Pages */}
          <Route path="/login" element={<AuthenticationForm type="login" />} />
          <Route path="/register" element={<AuthenticationForm type="register" />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
