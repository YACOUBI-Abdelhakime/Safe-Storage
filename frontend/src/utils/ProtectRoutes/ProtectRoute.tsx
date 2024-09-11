import React from "react";
import { Navigate } from "react-router-dom";
interface ProtectRouteInput {
  isSignedIn: boolean;
  navigateTo?: string;
  children: React.ReactNode;
}

/**
 * Function to protect routes
 *
 * @param isSignedIn
 * @param navigateTo
 * @param children
 * @returns Returns the children if the user is signed in, otherwise returns a Navigate component
 */

function ProtectRoute({ isSignedIn, navigateTo, children }: ProtectRouteInput) {
  if (!isSignedIn) {
    return <Navigate to={navigateTo ?? "/login"} replace />;
  }
  return children;
}
export default ProtectRoute;
