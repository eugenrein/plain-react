'use strict';

var FormGroup = React.createClass({
  render: function() {
    return React.createElement('div', { className: 'form-group' },
      React.createElement('label', { htmlFor: "message" }, this.props.label),
      React.createElement('textarea', {
        id: 'message',
        className: 'form-control',
        onInput: this.props.onInput,
        value: this.props.message
      }));
  }
});

var MessageForm = React.createClass({
  getInitialState: function() {
    return { message: '' }
  },

  handleInput: function(e) {
    this.setState({ message: e.target.value });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.message);
    this.setState({ message: '' })
  },

  render: function() {
    return React.createElement('form', { onSubmit: this.handleSubmit },
      React.createElement(FormGroup, { label: 'Message', onInput: this.handleInput, message: this.state.message }),
      React.createElement('button', { type: 'submit', className: 'btn btn-primary' }, 'Submit'));
  }
});

var MessageList = React.createClass({
  renderMessageList: function() {
    return this.props.messages.map(function (value, index) {
      return React.createElement('div', { className: 'message-container', key: index },
        React.createElement('span', { className: 'message'}, value));
    });
  },

  render: function() {
    return React.createElement('div', { className: 'message-list' }, this.renderMessageList());
  }
});

var Content = React.createClass({
  getInitialState: function() {
    return { messages: [] };
  },

  handleSubmit: function(message) {
    var messages = this.state.messages;
    messages.push(message);
    this.setState({ messages: messages });
  },

  render: function() {
    return React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-sm-6 offset-sm-3'},
        React.createElement('h1', { className: 'text-center' }, 'Vanilla React App'),
        React.createElement(MessageForm, { onSubmit: this.handleSubmit }),
        React.createElement(MessageList, { messages: this.state.messages })));
  }
});

var App = React.createClass({
  render: function() {
    return React.createElement(Content);
  }
});

window.onload = function () {
  ReactDOM.render(
    React.createElement(App),
    document.getElementById('root')
  );
};
