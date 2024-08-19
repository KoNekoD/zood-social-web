import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import {FriendDTO} from "../../../api-client/zood/gen";
import {useStore} from "../../../main/context-provider";
import AddFriendModal from "./add-friend-modal";

type Props = {
    friends: FriendDTO[];
};
export const FriendsList = observer((props: Props) => {
    const [addFriendModalOpen, setAddFriendModalOpen] = React.useState(false);
    const navigate = useNavigate();
    const {profileStore} = useStore()

    const {friends} = props;

    console.log(friends);

    return (
        <div>
            <div>
                <div>
                    <Button onClick={() => setAddFriendModalOpen(true)}>
                        Добавить друзей
                    </Button>
                    {addFriendModalOpen && <AddFriendModal/>}
                </div>
                <div className="grid grid-cols-3 gap-2 p-2">
                    {friends.length > 0 && friends.map((friend, i) => {
                        console.log(friend)
                        let friendSender = profileStore.fetchProfileById(friend.senderProfileId as string);
                        let friendDestination = profileStore.fetchProfileById(friend.destinationProfileId as string);

                        if (friendSender.state !== 'fulfilled' || friendDestination.state !== 'fulfilled') {
                            return (
                                <Card key={i}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="1"
                                            alt={friend.destinationProfileId}/>
                                        <CardContent>
                                            <Typography gutterBottom variant="body2" component="div" noWrap={true}>
                                                <Skeleton/>
                                                <Skeleton/>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" noWrap={true}>
                                                {/*{profile.id}*/}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Skeleton/>
                                    </CardActions>
                                </Card>
                            )
                        }

                        return (
                            <Card key={i}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="1"
                                        alt="Зелёная игуана"/>
                                    <CardContent>
                                        <Typography gutterBottom variant="body2" component="div" noWrap={true}>
                                            <Chip label={`Кто:${friendSender.value.firstName}`}/>
                                            <Chip label={`Кого:${friendDestination.value.firstName}`}/>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap={true}>
                                            {/*{profile.id}*/}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary"
                                            onClick={() => {
                                                navigate("/profile.")
                                            }}>
                                        Смотреть
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                    })}
                    {friends.length === 0 &&
                        <Alert severity={"info"}>У вас нет друзей</Alert>
                    }
                </div>
            </div>
        </div>
    );
});