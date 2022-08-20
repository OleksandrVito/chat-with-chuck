import { Component } from "react";
import "./search-panel.css";

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
    };
  }

  onUpdateSearch = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onUpdateSearch(term);
  };

  render() {
    return (
      <div className="search-panel">
        <div className="avatars-block">
          <div className="photo"></div>
        </div>
        <div className="search-block">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search or start new chat"
            value={this.state.term}
            onChange={this.onUpdateSearch}
          />
        </div>
      </div>
    );
  }
}

export default SearchPanel;
