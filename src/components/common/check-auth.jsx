// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const CheckAuth = ({ isAuthenticated, user, children }) => {
//   const location = useLocation();
//   if (
//     !isAuthenticated &&
//     !(
//       location.pathname.includes("/login") ||
//       location.pathname.includes("/register")
//     )
//   ) {
//     return <Navigate to="/auth/login" />;
//   }
//   if (
//     isAuthenticated &&
//     (location.pathname.includes("/login") ||
//       location.pathname.includes("/register"))
//   ) {
//     if (user?.role === "admin") {
//       return <Navigate to="/admin/dashboard" />;
//     } else {
//       return <Navigate to="/" />;
//     }
//   }
//   if (
//     isAuthenticated &&
//     user?.role !== "admin" &&
//     location.pathname.includes("admin")
//   ) {
//     return <Navigate to="/unauth-page" />;
//   }
//   if (
//     isAuthenticated &&
//     user?.role === "admin" &&
//     location.pathname.includes("shop")
//   ) {
//     return <Navigate to="/admin/dashboard" />;
//   }
//   return <>{children}</>;
// };

// export default CheckAuth;
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    // Store the last attempted URL before redirecting to login

    return <Navigate to={`/auth/login`} state={{ from: location }} replace />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    const from = location.state?.from?.pathname || "/"; // Get stored path or default to "/"
    
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to={from} replace />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" replace />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default CheckAuth;
