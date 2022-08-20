import { Component } from "react";
import ChatItem from "../chat-item/chat-item";
import "./chats-list.css";

class ChatsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let chat = this.props.data.map((item, i) => {
      return (
        <ChatItem {...item} onChangeChat={this.props.onChangeChat} key={i} />
      );
    });

    return (
      <nav className="chats-list">
        <div className="title">
          <h2>Chats</h2>
        </div>
        <div className="chats-block">{chat}</div>
      </nav>
    );
  }
}

export default ChatsList;
