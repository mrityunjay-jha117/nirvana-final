// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const token = localStorage.getItem("jwt");
  //will add more implementation here later on will add fetching auth

  useEffect(() => {
    if (!token) {
      toast.error("Please login to access this page.");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
