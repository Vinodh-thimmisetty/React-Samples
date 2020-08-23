import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  ListItem,
  List,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Modal,
  makeStyles,
} from '@material-ui/core';
import { Edit, Trash2, Edit2 } from 'react-feather';
import './App.css';
import { useStyles, getModalStyle } from './constants';
import db from './firebase';
import { firestore } from 'firebase';

function ToDoList({ todoList }) {
  return (
    <List className="todo__list">
      {todoList.map((data, idx) => {
        return <ToDoItem key={idx} id={data.id} task={data.task} />;
      })}
    </List>
  );
}

function ToDoItem(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [todoItem, setTodoItem] = useState(props.task);

  function deleteTask(_id) {
    db.collection('todos').doc(_id).delete();
  }
  function editTask(_id) {
    db.collection('todos').doc(_id).set(
      {
        id: _id,
        task: todoItem,
        timestamp: firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    setOpen(false);
  }

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <h1>Update</h1>
          <TextField
            onChange={(e) => setTodoItem(e.target.value)}
            value={todoItem}
          />
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={(e) => editTask(props.id)}>
            Save
          </Button>
        </div>
      </Modal>
      <ListItem id={props.id} className="todo__item">
        <ListItemAvatar>
          <Avatar>
            🚀 
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Todo" secondary={props.task} />
        <Button
          color="primary"
          size="small"
          variant="contained"
          className={classes.button}
          onClick={(e) => setOpen(true)}>
          <Edit />
        </Button>
        <Button
          color="secondary"
          size="small"
          variant="contained"
          className={classes.button}
          onClick={() => deleteTask(props.id)}>
          <Trash2 />
        </Button>
      </ListItem>
    </>
  );
}

function ToDoApp() {
  const [todoItem, setTodoItem] = useState('');
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    db.collection('todos').onSnapshot((snapshot) => {
      console.log(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          task: doc.data().task,
        }))
      );
      setTodoList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          task: doc.data().task,
        }))
      );
      // console.log(todoList);
    });
  }, []);

  function addTodoItem(event) {
    event.preventDefault();

    // setTodoList([...todoList, todoItem]);
    db.collection('todos').add({
      task: todoItem,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
    setTodoItem('');
  }

  return (
    <>
      <h2>Todo List App!</h2>
      <form noValidate autoComplete="off" onSubmit={addTodoItem}>
        <FormControl>
          <InputLabel>type todo</InputLabel>
          <Input
            onChange={(e) => setTodoItem(e.target.value)}
            value={todoItem}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            Note: only alpha-numerics allowed
          </FormHelperText>
        </FormControl>
        {/* <TextField
          onChange={(e) => setTodoItem(e.target.value)}
          value={todoItem}
          // variant="outlined"
        /> */}
        {/* <input
          type="text"
          onChange={(e) => setTodoItem(e.target.value)}
          value={todoItem}
        /> */}
        <FormControl>
          <Button
            // style={{ marginLeft: 10 }}
            type="submit"
            color="primary"
            variant="contained"
            disabled={!todoItem}>
            Add Task
          </Button>
        </FormControl>

        {/* <button type="submit">Add ToDo</button> */}
      </form>

      <ToDoList todoList={todoList} />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <ToDoApp />
    </div>
  );
}

export default App;
