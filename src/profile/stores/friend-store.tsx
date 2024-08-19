import {ApiClient} from "../../api-client/zood";
import {Notificator} from "../../landing/stores/notificator";
import {makeAutoObservable} from "mobx";
import {FriendDTO, FriendRelationEnum} from "../../api-client/zood/gen";
import {fromPromise, IPromiseBasedObservable} from "mobx-utils";

export class FriendStore {

    actualFriendListSenderToDestination?: IPromiseBasedObservable<FriendDTO[]>
    actualFriendListMutual?: IPromiseBasedObservable<FriendDTO[]>
    actualFriendListDestinationToSender?: IPromiseBasedObservable<FriendDTO[]>

    constructor(
        private client: ApiClient,
        private notificator: Notificator,
    ) {
        makeAutoObservable(this);
    }


    fetchFriendsList(id: string, page: number): void {
        this.fetchFriendsListByRelationsSenderToDestination(id, page);
        this.fetchFriendsListByRelationMutual(id, page);
        this.fetchFriendsListByRelationDestinationToSender(id, page);
    }

    fetchFriendsListByRelationsSenderToDestination(id: string, page: number): void {
        this.actualFriendListSenderToDestination = fromPromise(
            this.client.friendsApi.getApiFriendsList(
                id, page, FriendRelationEnum.RelationsSenderToDestination
            ).then(res => res.data)
        );
    }

    fetchFriendsListByRelationMutual(id: string, page: number): void {
        this.actualFriendListMutual = fromPromise(
            this.client.friendsApi.getApiFriendsList(id, page, FriendRelationEnum.RelationMutual).then(res => res.data)
        );
    }

    fetchFriendsListByRelationDestinationToSender(id: string, page: number): void {
        this.actualFriendListDestinationToSender = fromPromise(
            this.client.friendsApi.getApiFriendsList(
                id, page, FriendRelationEnum.RelationDestinationToSender
            ).then(res => res.data)
        );
    }

    async addFriendByProfileId(senderProfileId: string, destinationProfileId: string): Promise<any> {
        await this.client.friendsApi.postApiFriendsAdd(senderProfileId, destinationProfileId)
        this.notificator.success('Друг успешно добавлен')
    }
}