import {makeAutoObservable} from "mobx";

export type TokenStorageType = {
    getToken(): string | null;
    setToken(token: string): void;
    removeToken(): void;
    getRefreshToken(): string | null;
    removeRefreshToken(): void;
    setRefreshToken(token: string): void;
    getProfileSelection(): string | null;
    removeProfileSelection(): void;
    setProfileSelection(id: string): void;
};

export class TokenStorage implements TokenStorageType {
    constructor(
        private accessTokenKey: string,
        private refreshTokenKey: string,
        private selectedProfile: string,
    ) {
        makeAutoObservable(this);
    }

    getToken(): string | null {
        return localStorage.getItem(this.accessTokenKey);
    }

    removeToken(): void {
        localStorage.removeItem(this.accessTokenKey);
    }

    setToken(token: string): void {
        localStorage.setItem(this.accessTokenKey, token);
    }


    getRefreshToken(): string | null {
        return localStorage.getItem(this.refreshTokenKey);
    }

    removeRefreshToken(): void {
        localStorage.removeItem(this.refreshTokenKey);
        this.removeProfileSelection();
    }

    setRefreshToken(token: string): void {
        localStorage.setItem(this.refreshTokenKey, token);
    }

    getProfileSelection(): string | null {
        return localStorage.getItem(this.selectedProfile);
    }

    removeProfileSelection(): void {
        localStorage.removeItem(this.selectedProfile);
    }

    setProfileSelection(id: string): void {
        localStorage.setItem(this.selectedProfile, id);
    }
}
