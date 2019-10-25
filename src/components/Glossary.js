import React, { useEffect } from 'react'
import './Glossary.css'
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Button from '@material-ui/core/Button'
import PopUp from './EditPopup'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';



const baseEndpoint = 'http://localhost:3000/glossary'

export default function Glossary() {

    const [items, setItems] = React.useState([])
    const [word, setWord] = React.useState("")
    const [definition, setDefinition] = React.useState("")
    const [editMode, setEditMode] = React.useState(false)

    useEffect(() => {
        refresh()
    },[])

    const onClickHandler = (event) => {                                                          // fetch to local host 3000/glossary/add. Sends back an array
        if (word !== "" && definition !== "") {

            let term = {
                word: word,
                definition: definition
            }

            fetch(`${baseEndpoint}/`, {
                method: "POST",
                body: JSON.stringify(term),                                      //body is new glossary term
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(httpResult => {
                    if (httpResult.statusText === "OK") {
                        setWord('')
                        setDefinition('')
                        setEditMode(false)


                    }
                    refresh()                                      //call function to "reload" page
                })
        }
    }

    const deleteOnClickHandler = (id) => {

        fetch(`${baseEndpoint}/${id}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(httpResult => {
                if (httpResult.statusText === "OK") {
                    refresh()
                }
            })
    }

    const refresh = () => {
        fetch(`${baseEndpoint}`,
            {
                method: 'GET'
            })
            .then(httpResult => httpResult.json())
            .then(result => {
                setItems(result)
            })
    }

    const editClickHandler = () => {
        setEditMode(! editMode)
    }


    return (
        <div>
            {items.map((item, index) => {
                return (

                    <div key={item._id}>{`${item.word} - ${item.definition}`}

                        {(editMode ?
                            <span>
                                <IconButton onClick={() => deleteOnClickHandler(item._id)}>
                                    <DeleteOutlinedIcon value="DEL"></DeleteOutlinedIcon>
                                </IconButton>

                                <PopUp baseEndpoint={baseEndpoint} item={item} refresh={refresh}></PopUp>

                            </span>
                            : null)
                        }

                    </div>

                )
            })}
            <br></br>

            <input
                type="text"
                className="textField"
                onChange={(event) => { return setWord(event.target.value) }}
                value={word}>
            </input>
            <input
                type="text"
                className="textField"
                onChange={(event) => { return setDefinition(event.target.value) }}
                value={definition}>
            </input>
            <div></div>
            <Button
                variant="contained"
                className="addButton"
                size="large"
                startIcon={<AddIcon />}
                onClick={onClickHandler}
            >Add</Button>
            <Button
                variant="contained"
                className="edit"
                size="large"
                startIcon={<EditIcon />}
                onClick={editClickHandler}
            >Edit</Button>

        </div>
    ) //end of return

} //end of glossary

