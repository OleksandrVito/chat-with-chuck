import { Component } from "react";
import "./chat-item.css";

class ChatItem extends Component {
  render() {
    const { name, photo } = this.props;
    const lastMessage =
      this.props.messages[this.props.messages.length - 1].text;
    let date;

    if (this.props.messages[this.props.messages.length - 1].time.length > 10) {
      date = this.props.messages[this.props.messages.length - 1].time.slice(
        0,
        -6
      );
    } else {
      date = this.props.messages[this.props.messages.length - 1].time;
    }

    return (
      <div className="chat-item" onClick={this.props.onChangeChat} id={name}>
        <div
          className="chat-item-photo"
          style={{
            backgroundImage: photo,
          }}
        ></div>
        <div className="text">
          <h3>
            {name}
            <span>{date}</span>
          </h3>
          <p>{lastMessage}</p>
        </div>
      </div>
    );
  }
}

export default ChatItem;
