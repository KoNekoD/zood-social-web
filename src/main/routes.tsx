import {createBrowserRouter, RouteObject} from 'react-router-dom';
import {Layout} from './layout';
import {landingRoutes} from "../landing/routes/landing-routes";
import React from "react";
import {NotFoundPage} from "./pages/not-found-page";
import {userRoutes} from "../user/routes/user-routes";
import {profileRoutes} from "../profile/routes/profile-routes";
import {friendsRoutes} from "../profile/routes/friends/friends-routes";
import {chatsRoutes} from "../chats/routes/chats-routes";

const routes: RouteObject[] = [
    {
        element: <Layout/>,
        children: [
            ...landingRoutes,
            ...userRoutes,
            ...profileRoutes,
            ...friendsRoutes,
            ...chatsRoutes,
            {
                path: '*',
                element: <NotFoundPage/>,
            },
        ],
    },
    // {
    //   path: '/login',
    //   element: <LoginModal />,
    // },
    // {
    //   path: '/register',
    //   element: <RegisterModal />,
    // },
];

export const browserRouter = createBrowserRouter(routes);
