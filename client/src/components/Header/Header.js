import React, { Component } from "react";
import Fontawesome from "react-fontawesome";
import { Link } from "react-router-dom";

//COMPONENTS
import Nav from './SideNav/SideNav'

class Header extends Component {

  state = {
    showNav: false
  }

  onHideNav = () => {
    this.setState({showNav: false})
  }

  render() {
    return (
      <header>
        <div className="open_nav">
          <Fontawesome
            onClick={() => this.setState({showNav: true})}
            name="bars"
            style={{
              color: "#fff",
              padding: "10px",
              cursor: "pointer"
            }}
          />
        </div>
        <Nav
          showNav={this.state.showNav}
          onHideNav={() => this.onHideNav()}
        />
        <Link to="/" className="logo">
          The Book Shelf
        </Link>
      </header>
    );
  }
}

export default Header;
