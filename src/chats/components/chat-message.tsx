import {observer} from "mobx-react-lite";
import React from "react";
import {MessageByChatDTO} from "../../api-client/zood/gen";
import {Alert} from "@mui/material";
import {useStore} from "../../main/context-provider";

type Props = {
    message: MessageByChatDTO;
};
export const ChatMessage = observer((props: Props) => {


    const {message} = props;

    const {authStore} = useStore();

    if (null === authStore.selectedProfileId) {
        return (
            <Alert severity={"info"}>Вы не выбрали профиль</Alert>
        )
    }


    return (
        <div className={authStore.selectedProfileId === message.from ? "flex items-end justify-end" : "flex items-end"}>
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                    <span
                        className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">{message.content}</span>
                </div>
            </div>
            <img
                src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="My profile" className="w-6 h-6 rounded-full order-2"/>
        </div>
    )
});

/**
 * <div className="chat-message">
 *                                 <div className="flex items-end">
 *                                     <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
 *                                         <div>
 *                             <span
 *                                 className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Can be verified on any platform using docker</span>
 *                                         </div>
 *                                     </div>
 *                                     <img
 *                                         src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
 *                                         alt="My profile" className="w-6 h-6 rounded-full order-1"/>
 *                                 </div>
 *                             </div>
 *
 *                             <div className="chat-message">
 *                                 <div className="flex items-end">
 *                                     <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
 *                                         <div>
 *                                             <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">Command was run with root privileges. I'm sure about that.</span>
 *                                         </div>
 *                                         <div>
 *                                             <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">I've update the description so it's more obviously now</span>
 *                                         </div>
 *                                         <div>
 *                                             <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">FYI https://askubuntu.com/a/700266/510172</span>
 *                                         </div>
 *                                         <div>
 *                                     <span
 *                                         className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
 *                                         Check the line above (it ends with a # so, I'm running it as root )
 *                                         <pre># npm install -g @vue/devtools</pre>
 *                                     </span>
 *                                         </div>
 *                                     </div>
 *                                     <img
 *                                         src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
 *                                         alt="My profile" className="w-6 h-6 rounded-full order-1"/>
 *                                 </div>
 *                             </div>
 */