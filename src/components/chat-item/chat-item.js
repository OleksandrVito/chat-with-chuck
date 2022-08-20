import { Component } from "react";
import "./chat-item.css";

class ChatItem extends Component {
  render() {
    const { name, photo } = this.props;
    const lastMessage =
      this.props.messages[this.props.messages.length - 1].text;
    let options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    let date = new Date(
      this.props.messages[this.props.messages.length - 1].time
    ).toLocaleString("en-US", options);

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
