import {ApiClient} from "../../api-client/zood";
import {Notificator} from "../../landing/stores/notificator";
import {makeAutoObservable} from "mobx";
import {ChatDetailedDTO, ChatMinimalDTO, MessageByChatDTO} from "../../api-client/zood/gen";
import {fromPromise, IPromiseBasedObservable} from "mobx-utils";

export class ChatsStore {
    actualChatListInfo?: IPromiseBasedObservable<ChatMinimalDTO[]>
    actualChatItemInfo?: IPromiseBasedObservable<ChatDetailedDTO>

    constructor(
        private client: ApiClient,
        private notificator: Notificator,
    ) {
        makeAutoObservable(this);
    }


    fetchProfileChatsInformation(id: string, page: number): void {
        this.actualChatListInfo = fromPromise(
            this.client.chatsApi.getApiMessengerChatsGet(id, page).then(res => res.data)
        );
    }

    getMessages(profileId: string, chatId: string, page: number): Promise<MessageByChatDTO[]> {
        // let cachedMessages = this.cachedMessagesBuffer.find(
        //     item => item.page === page
        // );
        //

        return this.client.chatsApi.getApiMessengerMessagesGetMessages(chatId, profileId, page).then(res => res.data);

        // this.cachedMessagesBuffer.push({page, messagesListPromise})
        // console.log(this.cachedMessagesBuffer);
    }

    createChatByProfileId(chatTitle: string, chatDescription: string, creatorProfileId: string) {
        return fromPromise(
            this.client.chatsApi.postApiMessengerChatsCreate(
                {chatTitle, chatDescription, creatorProfileId}
            )
        ).then(() => this.notificator.success("Success created chat"))
    }

    async submitCreateChatForm(chatTitle: string, chatDescription: string, creatorProfileId: string) {

        const result = await this.client.chatsApi.postApiMessengerChatsCreate(
            {chatTitle, chatDescription, creatorProfileId}
        )

        this.notificator.success("Success created chat")
        return result;
    }

    fetchChatItemInformation(profileId: string, chatId: string): void {
        this.actualChatItemInfo = fromPromise(
            this.client.chatsApi.getApiMessengerChatGet(chatId, profileId).then(res => res.data)
        )
    }

    async sendMessage(fromId: string, chatId: string, content: string) {
        return fromPromise(
            this.client.chatsApi.postApiMessengerMessageSend({fromId, chatId, content}).then(res => res.data)
        )
    }
}