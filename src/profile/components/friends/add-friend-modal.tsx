import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useStore} from '../../../main/context-provider';

export default function FormDialog() {
    // TODO Добавить friend-store
    // Добавить туда метод добавления друга и тд
    const {friendStore, authStore} = useStore()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formLoading, setFormLoading] = useState(false);
    const [profileId, setProfileId] = useState("");

    const handleSend = () => {
        setFormLoading(true);
        if (authStore.selectedProfileId) {
            friendStore.addFriendByProfileId(authStore.selectedProfileId, profileId).then(() => setOpen(false));
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Добавить по ID
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Добавить по ID</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Чтобы добавить профиль в друзья необходимо,
                        чтобы тот кого вы добавляете принял ваш запрос дружбы
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="addProfileByIDInput"
                        label="Profile ID"
                        type="text"
                        fullWidth
                        value={profileId}
                        onChange={(event) => setProfileId(event.target.value)}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button onClick={handleSend} disabled={formLoading}>Отправить запрос</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}