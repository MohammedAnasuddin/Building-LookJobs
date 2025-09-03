import "./App.css";
import HeroTitle from "./components/Home/Hero/HeroTitle.jsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import HeaderMegaMenu from "./components/Home/Header/Header.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthenticationForm from "./components/AuthForms/AuthForm.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx"; // ✅ Import Dashboard
import { Auth0Provider } from "@auth0/auth0-react";
import card_grids from "./components/Dashboard/cards_grid.jsx";

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0RedirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;

function App() {
  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        scope: "openid profile email",
        redirect_uri: auth0RedirectUri,
      }}
    >
      <MantineProvider>
        <Router>

          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HeroTitle />} />

            {/* Authentication Pages */}
            <Route path="/login" element={<AuthenticationForm />} />
            <Route path="/register" element={<AuthenticationForm />} />

            {/* Dashboard Route */}
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
        
      </MantineProvider>
    </Auth0Provider>
  );
}

export default App;
