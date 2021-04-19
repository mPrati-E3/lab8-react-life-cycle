import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Filters extends React.Component {

    // Create a new project with the relative tasks
    createProject = (project) => {
        return (
            <ListGroup.Item action href={`#${project}`} key={project} onClick = {() => {this.props.filterTasks('filter-project', project);}}>{project}</ListGroup.Item>
        );
    }

    // Mandatory render function to setup the left menu 
    // every Item of the menu will filter the tasks by something and populate the realtive central table
    render() {
        return (
            <>
                <ListGroup defaultActiveKey="#all" variant="flush">

                    {/* ALL */}
                    <ListGroup.Item action href="#all" id = "filter-all" onClick = {() => {this.props.filterTasks('filter-all');}}>All</ListGroup.Item>
                    
                    {/* IMPORTANT */}
                    <ListGroup.Item action href="#important" id = "filter-important" onClick = {() => {this.props.filterTasks('filter-important');}}>Important</ListGroup.Item>
                    
                    {/* TODAY */}
                    <ListGroup.Item action href="#today" id = "filter-today" onClick = {() => {this.props.filterTasks('filter-today');}}>Today</ListGroup.Item>
                    
                    {/* NEXT WEEK */}
                    <ListGroup.Item action href="#week" id = "filter-week" onClick = {() => {this.props.filterTasks('filter-week');}}>Next 7 Days</ListGroup.Item>
                    
                    {/* PRIVATE */}
                    <ListGroup.Item action href="#private" id = "filter-private" onClick = {() => {this.props.filterTasks('filter-private');}}>Private</ListGroup.Item>
                    
                    {/* SHARED (NOT PRIVATE) */}
                    <ListGroup.Item action href="#shared" id = "filter-shared" onClick = {() => {this.props.filterTasks('filter-shared');}}>Shared With...</ListGroup.Item>
                    
                    {/* CREATE BOTTOM LEFT MENU FOR PROJECTS */}
                    <ListGroup.Item className="p-3 mt-5 list-title">Projects</ListGroup.Item>
                    {this.props.projects.map(this.createProject) }
                    
                </ListGroup>
            </>
        );
    }
}

export default Filters;
