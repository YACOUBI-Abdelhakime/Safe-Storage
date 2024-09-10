import React from "react";
import { Navigate } from "react-router-dom";
interface ProtectRouteInput {
  isSignedIn: boolean;
  navigateTo?: string;
  children: React.ReactNode;
}

function ProtectRoute({ isSignedIn, navigateTo, children }: ProtectRouteInput) {
  if (!isSignedIn) {
    return <Navigate to={navigateTo ?? "/login"} replace />;
  }
  return children;
}
export default ProtectRoute;
