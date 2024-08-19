import {ApiClient} from "../../api-client/zood";
import {Notificator} from "../../landing/stores/notificator";
import {action, makeObservable, observable} from "mobx";
import {ProfileDTO} from "../../api-client/zood/gen";
import {fromPromise, IPromiseBasedObservable} from "mobx-utils";

export interface CachedProfilesBufferInterface {
    profileId: string,
    profilePromise: IPromiseBasedObservable<ProfileDTO>
}

export class ProfileStore {

    actualProfileInfo?: IPromiseBasedObservable<ProfileDTO>
    cachedProfilesBuffer: CachedProfilesBufferInterface[] = []

    constructor(
        private client: ApiClient,
        private notificator: Notificator,
    ) {
        makeObservable(this, {
            actualProfileInfo: observable,
            cachedProfilesBuffer: observable,
            fetchSingleProfileInformation: action,
            fetchProfileById: action,
        });
    }


    fetchSingleProfileInformation(id: string): void {
        this.actualProfileInfo = fromPromise(
            this.client.profilesApi.getApiProfilesProfile(id).then(res => res.data)
        );
    }

    fetchProfileById(profileId: string): IPromiseBasedObservable<ProfileDTO> {
        console.log(this.cachedProfilesBuffer);
        let cachedProfile = this.cachedProfilesBuffer.find(
            item => item.profileId === profileId
        );
        if (cachedProfile) {
            return cachedProfile.profilePromise;
        }

        let profilePromise = fromPromise(
            this.client.profilesApi.getApiProfilesProfile(profileId).then(res => res.data)
        );

        this.cachedProfilesBuffer.push({profileId, profilePromise})
        console.log(this.cachedProfilesBuffer);
        return profilePromise;
    }
}