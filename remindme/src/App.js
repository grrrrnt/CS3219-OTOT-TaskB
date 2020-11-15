import React, { Component } from 'react';
import './App.css';

class App extends Component {
    state = {
        response: '',
        responseToPost: '',
        responseToGet: '',
        responseToUpdate: '',
        responseToDelete: '',
        reminder: 'e.g. Wash my hands',
        details: 'Otherwise I\'ll catch COVID',
        remind_when: 'Every day',
        id: ''
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/reminders');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    handleCreateSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/reminders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reminder: this.state.reminder,
                details: this.state.details,
                remind_when: this.state.remind_when
            }),
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
    };

    handleGetSubmit = async e => {
        e.preventDefault();
        if (this.state.id === '') {
            const response = await fetch('/api/reminders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const body = await response.text();
            this.setState({ responseToGet: body });
        } else {
            const response = await fetch('/api/reminders/' + this.state.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const body = await response.text();
            this.setState({ responseToGet: body });
        }
    };

    handleUpdateSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/reminders/' + this.state.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reminder: this.state.reminder,
                details: this.state.details,
                remind_when: this.state.remind_when
            }),
        });
        const body = await response.text();
        this.setState({ responseToUpdate: body });
    };

    handleDeleteSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/reminders/' + this.state.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const body = await response.text();
        this.setState({ responseToDelete: body });
    };

    render() {
        return (
            <div className="App">
              <header className="App-header">
                <p>
                  RemindMe
                </p>
              </header>
              <p>{this.state.response}</p>
              <form onSubmit={this.handleCreateSubmit}>
                <p>
                  <strong>Create new reminder:</strong>
                </p>
                <p>Reminder: </p>
                <input
                    type="text"
                    value={this.state.reminder}
                    onChange={e => this.setState({ reminder: e.target.value })}
                />
                <p>Details: </p>
                <input
                    type="text"
                    value={this.state.details}
                    onChange={e => this.setState({ details: e.target.value })}
                />
                <p>Remind when: </p>
                <input
                    type="text"
                    value={this.state.remind_when}
                    onChange={e => this.setState({ remind_when: e.target.value })}
                />
                <p></p>
                <button type="submit">Set reminder</button>
              </form>
              <p>{this.state.responseToPost}</p>
                <form onSubmit={this.handleGetSubmit}>
                    <p>
                        <strong>Get reminder:</strong>
                    </p>
                    <p>ID (if left blank, it will retrieve all): </p>
                    <input
                        type="text"
                        value={this.state.id}
                        onChange={e => this.setState({ id: e.target.value })}
                    />
                    <p></p>
                    <button type="submit">Get reminder(s)</button>
                </form>
                <p>{this.state.responseToGet}</p>
                <form onSubmit={this.handleUpdateSubmit}>
                    <p>
                        <strong>Update existing reminder:</strong>
                    </p>
                    <p>ID: </p>
                    <input
                        type="text"
                        value={this.state.id}
                        onChange={e => this.setState({ id: e.target.value })}
                    />
                    <p>Reminder: </p>
                    <input
                        type="text"
                        value={this.state.reminder}
                        onChange={e => this.setState({ reminder: e.target.value })}
                    />
                    <p>Details: </p>
                    <input
                        type="text"
                        value={this.state.details}
                        onChange={e => this.setState({ details: e.target.value })}
                    />
                    <p>Remind when: </p>
                    <input
                        type="text"
                        value={this.state.remind_when}
                        onChange={e => this.setState({ remind_when: e.target.value })}
                    />
                    <p></p>
                    <button type="submit">Update reminder</button>
                </form>
                <p>{this.state.responseToUpdate}</p>
                <form onSubmit={this.handleDeleteSubmit}>
                    <p>
                        <strong>Delete reminder:</strong>
                    </p>
                    <p>ID: </p>
                    <input
                        type="text"
                        value={this.state.id}
                        onChange={e => this.setState({ id: e.target.value })}
                    />
                    <p></p>
                    <button type="submit">Delete reminder</button>
                </form>
                <p>{this.state.responseToDelete}</p>
            </div>
      );
    }
}

export default App;