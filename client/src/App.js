import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Constants } from "./constants";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Header from "./components/Header"
import Post from "./pages/Post/Post";

function App() {
  return (
    <>
      <Header></Header>
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
          <Route
            element={<PublicRoute restricted={false} component={Post} />}
            path={Constants.routes.post}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
