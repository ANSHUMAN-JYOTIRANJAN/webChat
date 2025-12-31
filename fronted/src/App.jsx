import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth) {
    return <PageLoader />;
  }
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 
    bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),
    linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)]
    bg-[size:18px_18px]"
      />

  
      <div
        className="pointer-events-none absolute top-[-6rem] -left-16 size-[28rem]
    bg-gradient-to-r from-pink-500/30 to-purple-500/20 
    blur-[120px] rounded-full"
      />

 
      <div
        className="pointer-events-none absolute bottom-[-6rem] -right-16 size-[28rem]
    bg-gradient-to-l from-cyan-500/30 to-blue-500/20 
    blur-[120px] rounded-full"
      />
      {/* <button onClick={login} className="z-10"></button> */}
      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}
