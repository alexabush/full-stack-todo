import React, { Component, PureComponent } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import debounce from 'lodash/debounce';

class App extends PureComponent {
  state = { todos: [] };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('/messages')
      .then(res => res.json())
      .then(data => {
        this.setState({ todos: data });
      });
  };

  handleSubmit = (e, value) => {
    e.preventDefault();
    fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value })
    })
      .then(res => res.json())
      .then(data => {
        this.setState(prev => ({ todos: [...prev.todos, data] }));
      });
    this.setState({ value: '' });
  };

  handleUpdate = (id, value) => {
    fetch('/messages', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, value })
    })
      .then(res => res.json())
      .then(updatedTodos => {
        let todosMap = updatedTodos.reduce((acc, todo) => {
          acc[todo.id] = todo;
          return acc;
        }, {});
        this.setState(prev => {
          let newTodos = prev.todos.map(todo => {
            if (todosMap[todo.id]) {
              todo = todosMap[todo.id];
            }
            return todo;
          });
          return { todos: newTodos };
        });
      });
  };

  handleDelete = id => {
    fetch('/messages', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(({ status }) => {
        if (status === 'success') {
          this.setState(prev => ({
            todos: prev.todos.filter(todo => todo.id !== id)
          }));
        } else {
          console.log('failed to delete!');
          this.fetchData();
        }
      });
  };

  render() {
    console.log('in App render');
    let todosList = this.state.todos.map(({ id, title }, index) => {
      return (
        <Todo
          key={index}
          id={id}
          handleUpdate={this.handleUpdate}
          title={title}
          handleDelete={this.handleDelete}
        />
      );
    });
    return (
      <div id="container">
        <div className="App">
          <div>
            <header>Todo list</header>
            <List>{todosList}</List>
          </div>
          <InputForm handleSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

class InputForm extends PureComponent {
  state = { value: '' };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleFormSubmit = e => {
    this.props.handleSubmit(e, this.state.value)
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <InputLabel>
          Todo:
          <Input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </InputLabel>
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

class Todo extends Component {
  state = { value: '', isInputHidden: true };

  toggleShowInput = () => {
    this.setState(prev => {
      if (prev.isInputHidden && prev.value.length < 1) {
        return { value: this.props.title, isInputHidden: false };
      } else if (prev.isInputHidden) {
        return { isInputHidden: false };
      } else {
        return { isInputHidden: true };
      }
    });
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleUpdate(this.props.id, this.state.value);
    this.toggleShowInput();
  };

  handleDeleteClick = () => {
    this.props.handleDelete(this.props.id);
  }

  render() {
    console.log('in Todo render');
    let { title, id } = this.props;
    return this.state.isInputHidden ? (
      <ListItem style={{ justifyContent: 'center' }}>
        <span onClick={this.toggleShowInput}>{title}</span>
        <div
          onClick={this.handleDeleteClick}
        >
          <Delete />
        </div>
      </ListItem>
    ) : (
      <ListItem>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Button type="submit">Update</Button>
        </form>
        <Button onClick={this.toggleShowInput}>X</Button>
      </ListItem>
    );
  }
}

export default App;
