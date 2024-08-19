import {observer} from "mobx-react-lite";
import {useStore} from "../../main/context-provider";
import React, {useEffect} from "react";
import {Chip, Skeleton} from "@mui/material";


export const ProfilePage = observer(() => {
    const {profileStore, authStore} = useStore();

    useEffect(() => {
        if (authStore.selectedProfileId) {
            profileStore.fetchSingleProfileInformation(authStore.selectedProfileId);
        }
    }, [authStore.selectedProfileId]);

    if (authStore.selectedProfileId === null) {
        return (
            <div>
                Вы не выбрали профиль
            </div>
        )
    }

    if (profileStore.actualProfileInfo?.state !== 'fulfilled') {
        return (
            <div className="p-4 flex flex-col gap-2">
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
        <div className="p-4 flex flex-col gap-6">
            <div className="flex gap-5">
                <div className="w-1/5 shrink">
                    <img src="/images/optimized/404.webp" alt={"Book preview"}/>
                </div>
                <div className="w-full">
                    <div className="flex flex-col gap-6">
                        <span className="font-semibold text-5xl">Текущий профиль</span>
                        <span className="font-sans">
                            <Chip label={`ID - @${profileStore.actualProfileInfo.value.id}`}/>
                            <Chip label={`Имя - ${profileStore.actualProfileInfo.value.firstName}`}/>
                            <Chip label={`Фамилия - ${profileStore.actualProfileInfo.value.lastName}`}/>
                        </span>
                    </div>
                </div>
            </div>
            <div>
                Фе
            </div>
        </div>
    );
});