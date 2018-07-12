import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Fontawesome from "react-fontawesome";

const SideNavItems = ({user}) => {
  const items = [
    {
      type: "navItem",
      icon: "home",
      text: "Home",
      link: "/",
      restricted: false
    },
    {
      type: "navItem",
      icon: "file-text-o",
      text: "My Profile",
      link: "/user",
      restricted: true
    },
    {
      type: "navItem",
      icon: "file-text-o",
      text: "Add Admins",
      link: "/user/register",
      restricted: true
    },
    {
      type: "navItem",
      icon: "sign-in",
      text: "Login",
      link: "/login",
      restricted: false,
      exclude: true
    },
    {
      type: "navItem",
      icon: "file-text-o",
      text: "My Reviews",
      link: "/user/user-reviews",
      restricted: true
    },
    {
      type: "navItem",
      icon: "file-text-o",
      text: "Add Reviews",
      link: "/user/add",
      restricted: true
    },
    {
      type: "navItem",
      icon: "sign-out",
      text: "Logout",
      link: "/user/logout",
      restricted: true
    }
  ];

  const element = (item, i) => {
    return (
      <div key={i} className={item.type}>
        <Link to={item.link} className={item.type}>
          <Fontawesome name={item.icon} />
          {item.text}
        </Link>
      </div>
    )
  }

  const showItems = () => (
    user.user ?
      items.map((item, i) => {
        if(user.user.isAuth) {
          return !item.exclude ? element(item, i) : null;
        } else {
          return !item.restricted ? element(item, i) : null;
        }
      })
    :
      null
  )

  return <div>{showItems()}</div>;
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(SideNavItems);
