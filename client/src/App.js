import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Constants } from "./constants";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={<PublicRoute restricted={false} component={Home} />}
            path={Constants.routes.home}
          />
          <Route
            element={<PublicRoute restricted={true} component={Login} />}
            path={Constants.routes.login}
          />
          <Route
            element={<PublicRoute restricted={true} component={Register} />}
            path={Constants.routes.register}
          />
          <Route
            element={<PublicRoute restricted={false} component={Profile} />}
            path={Constants.routes.profile}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
