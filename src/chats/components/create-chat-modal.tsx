import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useStore} from '../../main/context-provider';

export default function CreateChatModal() {// TODO
    const {chatsStore, authStore} = useStore()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formLoading, setFormLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSend = () => {
        setFormLoading(true);
        if (authStore.selectedProfileId) {
            chatsStore.submitCreateChatForm(title, description, authStore.selectedProfileId).then(
                r => setFormLoading(false), r => setFormLoading(false)
            );

        }
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Dc по ID
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Добавить chat</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Descr
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="createChatTitle"
                        label="Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="createChatDescription"
                        label="Description"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button onClick={handleSend} disabled={formLoading}>Create chat</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}