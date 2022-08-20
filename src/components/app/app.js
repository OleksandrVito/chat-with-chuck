import React, { Component } from "react";
import SendMessageForm from "../send-message-form/send-message-form";
import MessageList from "../message-list/message-list";
import SearchPanel from "../search-panel/search-panel";
import ChatsList from "../chats-list/chats-list";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);

    if (sessionStorage.getItem("data") !== null) {
      this.state = {
        dataChats: JSON.parse(sessionStorage.getItem("data")),
        term: "",
        currentData: JSON.parse(sessionStorage.getItem("data"))[0],
        sender: "",
      };
    } else {
      this.state = {
        dataChats: [
          {
            name: "Alice",
            photo: "url(/avatar/Alice.png)",
            messages: [
              {
                sender: "Alice",
                text: "Don't worry about Chuck Norris' carbon footprint. His physical bootprints have destroyed the earth irrepairably as it is.",
                time: "18/08/2022",
              },
              {
                sender: "Alice",
                text: "The only time Chuck Norris ever made a mistake was when he was writing about killing a squadron of ninjas. As he was writing that he 'owned' them, his finger slipped and wrote 'pwned' instead. It immediately became an official, widely-used term.",
                time: "18/08/2022",
              },
            ],
          },
          {
            name: "Donald",
            photo: "url(/avatar/Donald.png)",
            messages: [
              {
                sender: "Donald",
                text: "Chuck Norris tans in a pizza oven.",
                time: "18/08/2022",
              },
            ],
          },
          {
            name: "Josefina",
            photo: "url(/avatar/Josefina.png)",
            messages: [
              {
                sender: "Josefina",
                text: "Chucooked at s merely t s merely lookes merely lookes melookes merely lookes merely lookethem!",
                time: "18/08/2022",
              },
              {
                sender: "Josefina",
                text: "I WANT TO CHOP CHUCK NORRIS IN HALF I WANNA KILL HIM",
                time: "18/08/2022",
              },
            ],
          },
          {
            name: "Joseph",
            photo: "url(/avatar/Joseph.png)",
            messages: [
              {
                sender: "Joseph",
                text: "The Thousand Islands used to be one big island, but then Chuck Norris's roundhouse kick smashed it into pieces.",
                time: "18/08/2022",
              },
              {
                sender: "Joseph",
                text: "Chuck Norris has the world's most famous taint.",
                time: "18/08/2022",
              },
            ],
          },
        ],
        term: "",
        currentData: {
          name: "Joseph",
          photo: "url(/avatar/Joseph.png)",
          messages: [
            {
              sender: "Joseph",
              text: "The Thousand Islands used to be one big island, but then Chuck Norris's roundhouse kick smashed it into pieces.",
              time: "18/08/2022",
            },
            {
              sender: "Joseph",
              text: "Chuck Norris has the world's most famous taint.",
              time: "18/08/2022",
            },
          ],
        },
        sender: "",
      };
    }
  }

  onSendMessage = (item, time) => {
    const newItem = {
      sender: "User",
      text: item,
      time: time,
    };
    this.setState(({ currentData }) => {
      let newMessages = [...{ ...currentData }.messages, newItem];

      return {
        currentData: { ...currentData, messages: newMessages },
      };
    });

    setTimeout(() => {
      this.changeDataChats(this.state.dataChats, this.state.currentData);
    }, 0);
  };

  onGetMessageFromChuck = (item, time, name) => {
    const newItem = {
      sender: name,
      text: item,
      time: time,
    };

    let newMessgesList = [
      ...this.state.dataChats.find((item) => item.name === newItem.sender)
        .messages,
      newItem,
    ];

    let clone = [...this.state.dataChats];

    if (
      clone.findIndex((item) => item.name === newMessgesList[0].sender) > -1
    ) {
      clone.find((item) => item.name === newMessgesList[0].sender).messages =
        newMessgesList;
    }

    setTimeout(() => {
      this.setState(() => {
        return {
          dataChats: clone,
          sender: name,
        };
      });
      setTimeout(() => {
        if (this.state.sender) {
          this.addNotification(this.state.sender);
        }
      }, 0);
    }, 0);

    setTimeout(() => {
      this.changeDataChats(this.state.dataChats, this.state.currentData);
    }, 0);
  };

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(term.toLowerCase()[0]) === 0 &&
        item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
        ? item
        : null;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  onChangeChat = (e) => {
    const data = this.state.dataChats;
    const currentName = e.currentTarget.id;
    this.setState({
      currentData: data.find((el) => el.name === currentName),
    });
    document.querySelector("textarea").focus();
    const messageList = document.querySelector(".message-list");
    const sendMessageForm = document.querySelector(".send-message-form");
    messageList.classList.add("visible");
    sendMessageForm.classList.add("visible");
  };

  changeDataChats = (dataChats, currentData) => {
    let clone = [...dataChats];
    if (clone.findIndex((item) => item.name === currentData.name) > -1) {
      clone.splice(
        clone.findIndex((item) => item.name === currentData.name),
        1
      );
      this.setState({
        dataChats: [currentData, ...clone],
      });
    }
  };

  scroll() {
    if (document.querySelector(".message-block")) {
      document.querySelector(".message-block").scrollIntoView(false);
    }
  }

  addNotification(name) {
    document.querySelector(`#${name}`).classList.add("notification");
    setTimeout(() => {
      document.querySelector(`#${name}`).classList.remove("notification");
    }, 2000);
  }

  onChangeView() {
    const messageList = document.querySelector(".message-list");
    const sendMessageForm = document.querySelector(".send-message-form");
    messageList.classList.remove("visible");
    sendMessageForm.classList.remove("visible");
  }
  render() {
    sessionStorage.setItem("data", JSON.stringify(this.state.dataChats));
    const visibleChats = this.searchEmp(this.state.dataChats, this.state.term);
    setTimeout(() => {
      this.scroll();
    }, 0);

    // const backBtn = document.querySelector(".back");
    // let forwardBtn;
    // if (document.querySelector(".forward")) {
    //   forwardBtn = document.querySelector(".forward");
    //   let width = document.body.clientWidth;
    //   if (width <= 768) {
    //     forwardBtn.addEventListener("click", () => {
    //       console.log("ddddd");
    //     });
    //   }
    // }

    // const messageList = document.querySelector(".message-list");
    // const sendMessageForm = document.querySelector(".send-message-form");
    // const chatsList = document.querySelector(".chats-list");
    // const searchPanel = document.querySelector(".search-panel");

    // console.log(messageList);

    return (
      <div className="app">
        <SearchPanel onUpdateSearch={this.onUpdateSearch} />
        <ChatsList data={visibleChats} onChangeChat={this.onChangeChat} />
        <SendMessageForm
          onSendMessage={this.onSendMessage}
          onGetMessageFromChuck={this.onGetMessageFromChuck}
          currentSender={this.state.currentData.name}
        />
        <MessageList
          data={this.state.currentData}
          onChangeView={this.onChangeView}
        />
      </div>
    );
  }
}

export default App;
