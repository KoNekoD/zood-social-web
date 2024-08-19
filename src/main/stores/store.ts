import {TokenStorage} from "../../landing/stores/token-storage";
import {Notificator} from "../../landing/stores/notificator";
import {AuthStore} from "../../user/stores/auth-store";
import {QuerySerializer} from "../routing/query-serializer";
import {ApiClient as ZoodApiClient} from "../../api-client/zood";
import {UserStore} from "../../user/stores/user-store";
import {ProfileStore} from "../../profile/stores/profile-store";
import {FriendStore} from "../../profile/stores/friend-store";
import {ChatsStore} from "../../chats/stores/chats-store";

export class RootStore {

  querySerializer = new QuerySerializer('hash');

  private jwtToken = new TokenStorage('token', 'refresh_token', 'selected_profile');
  private notificator = new Notificator();
  apiClient = new ZoodApiClient(this.jwtToken, this.notificator);
  authStore = new AuthStore(this.apiClient, this.jwtToken, this.notificator);
  userStore = new UserStore(this.apiClient, this.notificator);
  profileStore = new ProfileStore(this.apiClient, this.notificator);
  friendStore = new FriendStore(this.apiClient, this.notificator);
  chatsStore = new ChatsStore(this.apiClient, this.notificator);
}
