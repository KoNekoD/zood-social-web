import {observer} from "mobx-react-lite";
import {useStore} from "../../main/context-provider";
import React, {useEffect} from "react";
import {Button, Skeleton} from "@mui/material";
import {ChatsList} from "../components/chats-list";
import CreateChatModal from "../components/create-chat-modal";


export const ChatsListPage = observer(() => {
    const [addFriendModalOpen, setAddFriendModalOpen] = React.useState(false);
    const {chatsStore, authStore} = useStore();

    const page = 1;
    const profileId = authStore.selectedProfileId;

    if (null === profileId) {
        return (
            <div>
                Вы не выбрали профиль
            </div>
        )
    }

    // useEffect(() => {
    //     setInterval(() => {
    //         if (authStore.selectedProfileId) {
    //             chatsStore.fetchProfileChatsInformation(authStore.selectedProfileId, page);
    //         }
    //     }, 1000)
    // }, [authStore.selectedProfileId]);

    useEffect(() => {
        chatsStore.fetchProfileChatsInformation(profileId, page);
    }, [authStore.selectedProfileId]);


    if (chatsStore.actualChatListInfo?.state !== 'fulfilled') {
        return (
            <div className="p-4 flex flex-col gap-2">
                <div>
                    <Button onClick={() => setAddFriendModalOpen(true)}>
                        Добавить chat
                    </Button>
                    {addFriendModalOpen && <CreateChatModal/>}
                </div>
                <div className="flex gap-2">
                    <Skeleton variant="rectangular" width={400} height={400}/>
                    <div className="flex flex-col gap-2">
                        <Skeleton variant="rectangular" width={450} height={50}/>
                        <Skeleton variant="rectangular" width={650} height={343}/>
                    </div>
                </div>
                <div>
                    <Skeleton variant="rounded" width={850} height={200}/>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div>
                <Button onClick={() => setAddFriendModalOpen(true)}>
                    Добавить chat
                </Button>
                {addFriendModalOpen && <CreateChatModal/>}
            </div>
            <ChatsList chats={chatsStore.actualChatListInfo.value}/>
        </div>
    );
});