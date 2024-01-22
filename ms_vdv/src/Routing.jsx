import { useEffect, useState } from "react";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import AuthenticatedPageProvider from "./providers/AuthenticatedPageProvider";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import JobTabs from "./components/manageJobs/JobTabs";
import { useAuthProvider } from "./providers/AuthProvider";
import instance from "./service/AxiosInstance";

const AuthRouter = createBrowserRouter([
    {
        path: "/auth",
        element: <Login />,
        errorElement: <Navigate to="/auth" />,
    }
]);

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthenticatedPageProvider />,
        children: [
            // {
            //     path: "",
            //     element: <Dashboard />,
            // },
            {
                path: "/jobs",
                element: <JobTabs />,
            },
            {
                path: "*",
                element: <Navigate to="/jobs" />,
            }
        ],
        errorElement: <Navigate to="/jobs" />,
    },
]);

const Routing = () => {
    const { authData, updateAuth } = useAuthProvider();

    useEffect(() => {
        const checkAuth = async () => {
            try{
                await instance.get("/admin/check-auth");
                updateAuth(true);
            }
            catch(err){
                updateAuth(false);
            }
        };
        checkAuth();
    })

    if(authData === null) return <p>Loading...</p>;
    return <RouterProvider router={ authData ? router : AuthRouter} />;
}

export default Routing;