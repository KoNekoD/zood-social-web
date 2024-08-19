import {observer} from "mobx-react-lite";
import {useStore} from "../../main/context-provider";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ChatMessageWritingForm} from "../components/chat-message-writing-form";
import {ChatHeader} from "../components/chat-header";
import {Skeleton} from "@mui/material";
import {ChatMessage} from "../components/chat-message";
import {MessageByChatDTO} from "../../api-client/zood/gen";


export const ChatViewPage = observer(() => {
    const {chatsStore, authStore} = useStore();
    const {id} = useParams();
    const [messages, setMessages] = useState<MessageByChatDTO[]>([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        chatsStore.fetchChatItemInformation(authStore.selectedProfileId as string, id as string)
    }, [])

    useEffect(() => {
        if (fetching) {
            console.log(fetching)
            chatsStore.getMessages(authStore.selectedProfileId as string, id as string, currentPage)
                .then(r => {
                    setMessages([...messages, ...r])
                    setCurrentPage(prevState => prevState + 1)
                })
                .finally(() => setFetching(false))
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e: any) => {
        if (
            e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
        ) {
            setFetching(true)
        }
    };


    return (
        <div className="flex flex-col w-full h-full">
            {chatsStore.actualChatItemInfo?.state !== 'fulfilled' &&
                <Skeleton/> // TODO
            }
            {chatsStore.actualChatItemInfo?.state === 'fulfilled' &&
                <ChatHeader chat={chatsStore.actualChatItemInfo.value}/>
            }

            <div className="flex">
                <div
                    className="flex flex-col bg-gray-300 w-full space-y-4 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    {messages.map(message => <ChatMessage key={message.id} message={message}/>)}
                </div>
            </div>
            <ChatMessageWritingForm chatId={id as string}/>
        </div>
    );
});