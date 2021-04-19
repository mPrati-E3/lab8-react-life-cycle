import React from 'react';
import './App.css';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Filters from './components/Filters';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import API from './api/API';

// Main App component
class App extends React.Component {

  // Construct an initial state
  constructor(props)  {
    super(props);
    this.state = {tasks: [], projects: [], filter: 'All', openMobileMenu: false, modalOpen: false, editedTask: null};
  }

  // Return all projects
  getProjects(tasks) {
    return [...new Set(tasks.map(task => task.project))];
  }

  // Get alla the tasks from the API (this is an async function so I have to use then)
  componentDidMount() {
    // fake loading the tasks from the API server, and create the projects list
    API.getTasks().then((tasks) => this.setState({tasks: tasks, projects: this.getProjects(tasks)}));
  }

  // Toggle the modal mode if I open the form
  toggleModal = () => {
    this.setState((state) => ({modalOpen: !state.modalOpen, editedTask: null}));
  }

  // Show the left sidebar
  showSidebar = () => {
    this.setState((state) => ({openMobileMenu: !state.openMobileMenu}));
  }

  // I'll set the state for the chosen filter so I can show to the user the relatives tasks and title
  // these are all async function (because i call the API) so I have to use then
  filterTasks = (filter, project) => {
    switch(filter){
      case 'filter-important':
        API.getImportantTasks().then((tasks) => this.setState({tasks: tasks, filter: 'Important'}));
        break;
      case 'filter-today':
        API.getTodayTasks().then((tasks) => this.setState({tasks: tasks, filter: 'Today'}));
        break;
      case 'filter-week':
        API.getWeeklyTasks().then((tasks) => this.setState({tasks: tasks, filter: 'Next Week'}));
        break;
      case 'filter-private':
        API.getPrivateTasks().then((tasks) => this.setState({tasks: tasks, filter: 'Private'}));
        break;
      case 'filter-shared':
        API.getSharedTasks().then((tasks) => this.setState({tasks: tasks, filter: 'Shared'}));
        break;
      case 'filter-project':
        API.getByProject(project).then((tasks) => this.setState({tasks: tasks, filter: project}));
        break;
      default:
        API.getTasks().then((tasks) => this.setState({tasks: tasks, filter: 'All'}));
        break;
    }
  }

  // Add or edit a task using the form
  addOrEditTask = (task) => {
    this.setState((state) => {
      // add a fake id for properly rendering the list
      if(!task.id)
        task.id = state.tasks.slice(-1)[0].id + 1;
      // remove possible duplicates 
      let buildState = state.tasks.filter((t) => t.id !== task.id);
      // add new task
      buildState.push(task);
      //sort tasks by id
      buildState = buildState.sort((a, b) => a.id - b.id);
      return {tasks: buildState};
    });
  }

  // Edit method
  editTask = (task) => {
    this.toggleModal();
    this.setState({editedTask: task});
  }

  // Delete method
  deleteTask = (task) => {
    this.setState((state) => ({tasks: state.tasks.filter((t) => t.id !== task.id)}));
  }
  
  // Mandatory render function to draw the entire application
  render() {
    return(
      <>
        <Header showSidebar={this.showSidebar} />
        <Container fluid>
          <Row className="vheight-100">

            {/* LEFT SIDEBAR */}
            <Collapse in={this.state.openMobileMenu}>
              <Col sm={4} bg="light" id="left-sidebar" className="collapse d-sm-block below-nav">
                <Filters projects = {this.state.projects} filterTasks = {this.filterTasks}/>
              </Col>
            </Collapse>

            <Col sm={8} className="below-nav">
              {/* FILTER TITLE */}
              <h1>{this.state.filter}</h1>
              {/* MAIN TABLE WITH TASKS */}
              <TodoList tasks = {this.state.tasks} editTask = {this.editTask} deleteTask = {this.deleteTask} />
              {/* ADD BUTTON */}
              <Button variant="success" size="lg" className="fixed-right-bottom" onClick={this.toggleModal}>&#43;</Button>
            </Col>

            {this.state.modalOpen && <TodoForm modalOpen={this.state.modalOpen} toggleModal={this.toggleModal} addOrEditTask={this.addOrEditTask} task={this.state.editedTask}/>}
            
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
