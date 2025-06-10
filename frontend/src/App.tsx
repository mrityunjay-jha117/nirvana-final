import Home from "./pages/homepage";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import BlogPage from "./pages/blogpage";
import Blogi from "./pages/inidvidual_blogs";
import Hime from "./pages/userpage";
import { ScrollToTop } from "./useful_functions/scrolltotop";
import TextRevealParallax from "./components/primary_components/primary_components/unique_components/text_reveal";
import Credentials from "./pages/credentials";
import Blog_creation from "./pages/create_blog";
import Update_blog from "./pages/update_blog";
import Author from "./pages/coming_soon";
import Chatin from "./pages/chat_in_phone";
import ProtectedRoute from "./pages/auth";
import { Toaster } from "react-hot-toast";
import Chatbutton from "./components/primary_components/primary_components/common_html_components/chat_button";
export function AppContent() {
  const images = [
    "/images/carousel_images/1.jpg",
    "/images/carousel_images/2.jpg",
    "/images/carousel_images/3.jpg",
    "/images/carousel_images/4.jpg",
    "/images/carousel_images/5.jpg",
    "/images/carousel_images/6.jpg",
    "/images/carousel_images/7.jpg",
    "/images/carousel_images/8.jpg",
    "/images/carousel_images/9.jpg",
    "/images/carousel_images/11.jpg",
    "/images/carousel_images/12.jpg",
    "/images/carousel_images/13.jpg",
    "/images/carousel_images/14.jpg",
    "/images/carousel_images/15.jpg",
    "/images/carousel_images/16.jpg",
    "/images/carousel_images/17.jpg",
    "/images/carousel_images/18.jpg",
    "/images/carousel_images/19.jpg",
    "/images/carousel_images/20.jpg",
    "/images/carousel_images/1.jpg",
    "/images/carousel_images/2.jpg",
    "/images/carousel_images/3.jpg",
    "/images/carousel_images/4.jpg",
    "/images/carousel_images/5.jpg",
    "/images/carousel_images/6.jpg",
    "/images/carousel_images/7.jpg",
    "/images/carousel_images/8.jpg",
    "/images/carousel_images/9.jpg",
    "/images/carousel_images/11.jpg",
    "/images/carousel_images/12.jpg",
    "/images/carousel_images/13.jpg",
    "/images/carousel_images/14.jpg",
    "/images/carousel_images/15.jpg",
    "/images/carousel_images/16.jpg",
    "/images/carousel_images/17.jpg",
    "/images/carousel_images/18.jpg",
    "/images/carousel_images/19.jpg",
    "/images/carousel_images/20.jpg",
  ];
  const location = useLocation();
  const hideChatButtonOnRoutes = ["/", "/window","/chat"];
  const shouldShowChatButton = !hideChatButtonOnRoutes.includes(
    location.pathname
  );
   return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <Routes>
        <Route
          path="/window"
          element={
            <ProtectedRoute>
              <TextRevealParallax text="NIRVANA" images={images} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog_page"
          element={
            <ProtectedRoute>
              <BlogPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute>
              <Blogi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <Hime />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Credentials />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <Blog_creation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <Update_blog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Author />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chatin />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* ✅ Show chat button only if not on / or /window */}
      {shouldShowChatButton && <Chatbutton />}
    </>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
