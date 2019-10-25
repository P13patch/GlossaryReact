import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'


function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function PopUp(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [word, setWord] = React.useState(props.item.word)
    const [definition, setDefinition] = React.useState(props.item.definition)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const onClickHandler = (event) => {                                                         
        if (word !== "" && definition !== "") {

            let term = {
                word: word,
                definition: definition
            }

            fetch(`${props.baseEndpoint}/${props.item._id}`, {
                method: "PUT",
                body: JSON.stringify(term),                                      
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(httpResult => {
                    if (httpResult.statusText === "OK") {
                        props.refresh()
                        handleClose()                              
                    }
                    
                })
        }

    }


    return (
        <span>

            <IconButton onClick={handleOpen}>
                <EditOutlinedIcon value="EDIT"></EditOutlinedIcon>
            </IconButton>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}>

                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">WTF??</h2>
                    <p id="simple-modal-description">
                        <div>Don't like what you wrote you dumb bitch?</div>
                        <div>Fine, change it</div> 
                    </p>
                    <TextField
                        required
                        id="standard-required"
                        label="Word"
                        defaultValue={word}
                        className={classes.textField}
                        margin="normal"
                        onChange={(event) => {return setWord(event.target.value)}}
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Definition"
                        defaultValue={definition}
                        className={classes.textField}
                        margin="normal"
                        onChange={(event) => {return setDefinition(event.target.value)}}
                    />
                    <br></br>
                    <Button
                        onClick={onClickHandler}
                        variant="contained"
                        
                    >Save</Button>
                    
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        
                    >Cancel</Button>
                </div>
            </Modal>
        </span>
    );
}