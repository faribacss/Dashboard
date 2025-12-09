// Library
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard"; // Importing Dashboard component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import ChangeLang from "@/components/language/ChangeLang";
import ToLogin from "@/pages/login/index.js";
import ToSignUp from "@/pages/signup/index.js";
import { PrivateRoute } from "@/pages/panel/PrivateRoute.jsx";
import Home from "@/pages/home";
import Panel from "@/pages/panel";
import PostId from "@/pages/postId";

// Context
import { SaveInfoProvider } from "@/context/SaveInfo";
import { LanguageProvider, LanguageRoot } from "./context/LanguageContext.js";
import CreatePost from "@/pages/createPost/index.jsx";
import EditPost from "@/pages/editPost/index.jsx";
import Navbar from "@/components/Navbar/index.jsx";
import Footer from "@/components/Footer/index.jsx";

// style
import "@/App.css";

export default function App() {
  return (
    <div className="mainContainer">
      <SaveInfoProvider>
        <LanguageProvider>
          <ChangeLang />
          <div className="content">
            {/* <Navbar /> */}
            <LanguageRoot>
              <Routes>
                <Route path="/" element={<ToLogin />} />
                <Route path="/signup" element={<ToSignUp />} />
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
                <Route path="/dashboard" element={<Dashboard />} /> // Adding
                dashboard route
              </Routes>
              <ToastContainer />
            </LanguageRoot>
          </div>
          <Footer />
        </LanguageProvider>
      </SaveInfoProvider>
    </div>
  );
}
