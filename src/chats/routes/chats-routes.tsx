import {AuthenticatedRoute} from "../../main/pages/authentcated-route";
import {ChatsListPage} from "../pages/chats-list-page";
import {ChatViewPage} from "../pages/chat-view-page";
import {ChatsPage} from "../pages/chats-page";


export const chatsRoutes = [
    {
        path: '/chats',
        element: <AuthenticatedRoute><ChatsPage/></AuthenticatedRoute>,
        handle: {
            title: () => 'Chats'
        },
        children: [
            {
                index: true,
                element: <ChatsListPage/>,
            },
            {
                path: ':id',
                element: <ChatViewPage/>,
                handle: {
                    title: (id?: string) => `Chat ${id} view`
                }
            }
        ]
    },
];