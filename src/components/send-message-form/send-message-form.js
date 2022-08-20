import { Component } from "react";
import "./send-message-form.css";

class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messageFromChuck: "",
      time: "",
      nameSender: "",
    };
  }

  onChangeMessage = (e) => {
    this.setState({
      message: e.target.value,
      time: this.getTime(),
    });
  };

  onGetMessageFromChuck = (name) => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          messageFromChuck: data.value,
          time: this.getTime(),
        });
      })
      .then(() => {
        setTimeout(() => {
          this.props.onGetMessageFromChuck(
            this.state.messageFromChuck,
            this.state.time,
            name
          );
        }, 0);
      });
  };

  getTime = () => {
    let time = new Date()
      .toLocaleString()
      .replace(/\./g, "/")
      .replace(/,/, "")
      .slice(0, -3);
    return time;
  };

  onSubmitMessage = () => {
    let name = this.props.currentSender;
    this.props.onSendMessage(this.state.message, this.state.time);
    this.setState({
      message: "",
      nameSender: this.props.currentSender,
    });
    setTimeout(() => {
      this.onGetMessageFromChuck(name);
    }, 5000);
  };

  onEnterPress = (e) => {
    let width = document.body.clientWidth;
    if (width > 768 && e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.setState({
        message: e.target.value,
        time: this.getTime(),
      });
      this.onSubmitMessage();
    }
  };

  render() {
    return (
      <form
        className="send-message-form"
        onSubmit={(e) => {
          e.preventDefault();
          this.onSubmitMessage();
        }}
      >
        <textarea
          type="text"
          name="text"
          placeholder="Type your message"
          rows={1}
          onChange={this.onChangeMessage}
          value={this.state.message}
          onKeyDown={this.onEnterPress}
        />
        <button className="send" type="submit">
          <span className="material-icons">send</span>
        </button>
      </form>
    );
  }
}

export default SendMessageForm;
