import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import {ChatDTO} from "../../api-client/zood/gen";

type Props = {
    chats: ChatDTO[];
};
export const ChatsList = observer((props: Props) => {

    const navigate = useNavigate();

    const {chats} = props;

    console.log(chats);

    return (
        <div>
            <div>
                <div className="grid grid-cols-3 gap-2 p-2">
                    {chats.length > 0 && chats.map((chat, i) => {
                        console.log(chat)

                        // let lastMessage = chatsStore.resolveLastChatMessage()

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
                                            <Chip label={`Title:${chat.title}`}/>
                                            <Chip label={`ID:${chat.id}`}/>
                                            <Chip label={`Description:${chat.description}`}/>
                                            <Chip label={`Roles:${chat.roles}`}/>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap={true}>
                                            {/*{profile.id}*/}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary"
                                            onClick={() => {
                                                navigate(`/chats/${chat.id}`)
                                            }}>
                                        Смотреть
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                    })}
                    {chats.length === 0 &&
                        <Alert severity={"info"}>У вас нет chats</Alert>
                    }
                </div>
            </div>
        </div>
    );
});