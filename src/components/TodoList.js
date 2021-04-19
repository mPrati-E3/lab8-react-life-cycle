import React from 'react';
import TodoItem from './TodoItem';
import ListGroup from 'react-bootstrap/ListGroup';

// Return the entire list of TodoItems that will be drawn in the main table
const TodoList = (props) => {

  let {tasks, editTask, deleteTask} = props;

  return (
    <>
      {tasks && 
        <ListGroup as="ul" variant="flush">
          {tasks.map((task) => <TodoItem key = {task.id} task = {task} editTask = {editTask} deleteTask = {deleteTask} />) }
        </ListGroup>}
    </>
  );
}

export default TodoList;
