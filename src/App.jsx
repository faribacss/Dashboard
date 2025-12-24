// Library
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Dashboard from "@/pages/dashboard";
import LoginPage from "@/pages/login/index.js";
import SignUpPage from "@/pages/signup/index.js";
import CreatePost from "@/pages/createPost/index.jsx";
import EditPost from "@/pages/editPost/index.jsx";
import Footer from "@/components/Footer/index.jsx";
import { PrivateRoute } from "@/pages/panel/PrivateRoute.jsx";
import Home from "@/pages/home";
import Panel from "@/pages/panel";
import PostId from "@/pages/postId";

// Context
import { LanguageProvider, LanguageRoot } from "./context/LanguageContext.js";


// style
import "@/App.css";

export default function App() {
  return (
    <div className="mainContainer">
      <div className="progress"></div>
        <LanguageProvider>
          <div className="content">
            <LanguageRoot>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route
                  path="/panel"
                  element={
                    <PrivateRoute>
                      <Panel />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/home"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/post/:documentId"
                  element={
                    <PrivateRoute>
                      <PostId />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/create-post"
                  element={
                    <PrivateRoute>
                      <CreatePost />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit-post/:documentId"
                  element={
                    <PrivateRoute>
                      <EditPost />
                    </PrivateRoute>
                  }
                />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
              <ToastContainer />
            </LanguageRoot>
          </div>
          <Footer />
        </LanguageProvider>
    </div>
  );
}
