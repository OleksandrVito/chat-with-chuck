import { Component } from "react";
import MessageItem from "../message-item/message-item";
import "./message-list.css";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let message = this.props.data.messages.map((item, i) => {
      return <MessageItem {...item} key={i} photo={this.props.data.photo} />;
    });
    const photo = this.props.data.photo;

    return (
      <main className="message-list">
        <div className="title">
          <button className="back" onClick={this.props.onChangeView}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div
            className="photo"
            style={{
              backgroundImage: photo,
            }}
          ></div>
          <h2>{this.props.data.name}</h2>
        </div>
        <div className="message-block">{message}</div>
      </main>
    );
  }
}

export default MessageList;
