import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {Button, Card, CardActionArea, CardActions, CardContent, Skeleton} from "@mui/material";
import {useStore} from "../../../main/context-provider";
import {FriendsList} from "../../components/friends/firends-list";


export const FriendsListPage = observer(() => {
    const {friendStore, authStore} = useStore();

    const page = 1;

    useEffect(() => {
        if (authStore.selectedProfileId) {
            friendStore.fetchFriendsList(authStore.selectedProfileId, page);
        }
    }, [authStore.selectedProfileId, page]);

    if (authStore.selectedProfileId === null) {
        return (
            <div>
                Вы не выбрали профиль
            </div>
        )
    }


    return (
        <div>
            <div>
                <h1>Исходящие запросы в друзья</h1>
                {friendStore.actualFriendListSenderToDestination?.state === 'pending' &&
                    <div className="grid grid-cols-3 gap-2 p-2">
                        {Array(10)
                            .fill(null)
                            .map((_, i) => (

                                <Card key={i}>
                                    <CardActionArea>
                                        <Skeleton height="140"/>
                                        <CardContent>
                                            <Skeleton/>
                                            <Skeleton/>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            <Skeleton className="w-full"/>
                                        </Button>
                                    </CardActions>
                                </Card>

                            ))}
                    </div>
                }
                {friendStore.actualFriendListSenderToDestination?.state === 'fulfilled' &&
                    <FriendsList friends={friendStore.actualFriendListSenderToDestination.value}/>}
            </div>
            <div>
                <h1>Друзья</h1>
                {friendStore.actualFriendListMutual?.state === 'pending' &&
                    <div className="grid grid-cols-3 gap-2 p-2">
                        {Array(10)
                            .fill(null)
                            .map((_, i) => (

                                <Card key={i}>
                                    <CardActionArea>
                                        <Skeleton height="140"/>
                                        <CardContent>
                                            <Skeleton/>
                                            <Skeleton/>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            <Skeleton className="w-full"/>
                                        </Button>
                                    </CardActions>
                                </Card>

                            ))}
                    </div>
                }
                {friendStore.actualFriendListMutual?.state === 'fulfilled' &&
                    <FriendsList friends={friendStore.actualFriendListMutual.value}/>}
            </div>
            <div>
                <h1>Входящие запросы в друзья</h1>
                {friendStore.actualFriendListDestinationToSender?.state === 'pending' &&
                    <div className="grid grid-cols-3 gap-2 p-2">
                        {Array(10)
                            .fill(null)
                            .map((_, i) => (

                                <Card key={i}>
                                    <CardActionArea>
                                        <Skeleton height="140"/>
                                        <CardContent>
                                            <Skeleton/>
                                            <Skeleton/>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            <Skeleton className="w-full"/>
                                        </Button>
                                    </CardActions>
                                </Card>

                            ))}
                    </div>
                }
                {friendStore.actualFriendListDestinationToSender?.state === 'fulfilled' &&
                    <FriendsList friends={friendStore.actualFriendListDestinationToSender.value}/>}
            </div>
        </div>
    );
});