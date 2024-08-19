import {AuthenticatedRoute} from "../../../main/pages/authentcated-route";
import {FriendsListPage} from "../../pages/friends/friends-list-page";


export const friendsRoutes = [
    {
        path: '/friends',
        element: <AuthenticatedRoute><FriendsListPage/></AuthenticatedRoute>,
    },
]