import React from "react";
import { Switch, Route } from "react-router-dom";

//COMPONENTS
import Home from "./components/Home/Home";
import BooksView from './components/Books/BooksView'
import Login from "./containers/Admin/Login";
import AddReview from "./containers/Admin/AddReview";
import User from "./components/Admin/User";
import UserPosts from "./components/Admin/UserPosts";
import EditReview from "./containers/Admin/EditReview";
import Register from "./containers/Admin/Register";
import Logout from "./components/Admin/Logout";

//HOC
import Layout from './hoc/Layout';
import Auth from './hoc/Auth';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/user" exact component={Auth(User, true)} />
        <Route path="/user/add" exact component={Auth(AddReview, true)} />
        <Route path="/user/register" exact component={Auth(Register, true)} />
        <Route path="/user/edit-post/:id" exact component={Auth(EditReview, true)} />
        <Route path="/books/:id" exact component={Auth(BooksView)} />
        <Route path="/user/user-reviews" exact component={Auth(UserPosts, true)} />
        <Route path="/user/logout" exact component={Auth(Logout, true)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
