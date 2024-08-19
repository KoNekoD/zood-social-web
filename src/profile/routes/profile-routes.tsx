import {AuthenticatedRoute} from "../../main/pages/authentcated-route";
import {ProfilePage} from "../pages/profile-page";


export const profileRoutes = [
    {
        path: '/profile',
        element: <AuthenticatedRoute><ProfilePage/></AuthenticatedRoute>,
    },
];