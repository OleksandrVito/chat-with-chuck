import { Component } from "react";
import "./message-item.css";

class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { text, sender, time } = this.props;
    const photo = this.props.photo;

    let classNames = "message-item";

    if (sender === "User") {
      classNames += " users";
    }

    return (
      <div className={classNames}>
        <div className="message">
          <div
            className="photo"
            style={{
              backgroundImage: photo,
            }}
          ></div>
          <p className="message-text">{text}</p>
        </div>
        <span className="message-time">{time}</span>
      </div>
    );
  }
}

export default MessageItem;
