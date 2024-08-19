import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ProfileDTO} from "../../api-client/zood/gen";
import {Alert, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import {useStore} from "../../main/context-provider";

type Props = {
    profiles: ProfileDTO[];
};
export const ProfilesList = observer((props: Props) => {
    const navigate = useNavigate();
    const {authStore} = useStore()

    const {profiles} = props;

    return (
        <div>
            <div>
                <div className="grid grid-cols-3 gap-2 p-2">
                    {profiles.length > 0 && profiles.map((profile, i) => {
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
                                            <Chip label={`${profile.firstName} ${profile.lastName}`}/>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap={true}>
                                            {/*{profile.id}*/}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary"
                                            onClick={() => {
                                                authStore.selectProfile(profile.id as string);
                                                navigate("/profile")
                                            }}>
                                        Использовать
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                    })}
                    {profiles.length === 0 &&
                        <Alert severity={"info"}>У вас нет доступных профилей, создайте новый!</Alert>
                    }
                </div>
            </div>
        </div>
    );
});