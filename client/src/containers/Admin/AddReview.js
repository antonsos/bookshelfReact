import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearBook } from '../../actions';

class AddReview extends Component {

  state = {
    formdata: {
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: ''
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearBook())
  }

  handleInput = (event, name) => {
    const newFormData = {
      ...this.state.formdata
    }

    newFormData[name] = event.target.value;

    this.setState({
      formdata: newFormData
    })
  }

  showNewBook = (book) => (
    book.post ? 
      <div className="conf_link">
        Cool !!! <Link to={`/books/${book.bookId}`}>Lets see new post</Link>
      </div>
    :
      null
  )

  submitForm = (event) => {
    event.preventDefault();

    this.props.dispatch(addBook({
      ...this.state.formdata,
      ownerId: this.props.user.user.id
    }))
  }

  render() {
    return (
      <div className="rl_container article">
        <form onSubmit={this.submitForm}>
          <h2>Add a review</h2>

          <div className="form_element">
            <input 
              type="text"
              placeholder="Enter name book"
              value={this.state.formdata.name}
              onChange={(event) => this.handleInput(event, 'name')}
            />
          </div>
          <div className="form_element">
            <input 
              type="text"
              placeholder="Enter name author"
              value={this.state.formdata.author}
              onChange={(event) => this.handleInput(event, 'author')}
            />
          </div>
          <div className="form_element">
            <textarea
              type="text"
              value={this.state.formdata.review}
              onChange={(event) => this.handleInput(event, 'review')}
            />
          </div>
          <div className="form_element">
            <input 
              type="number"
              placeholder="Enter count pages"
              value={this.state.formdata.pages}
              onChange={(event) => this.handleInput(event, 'pages')}
            />
          </div>
          <div className="form_element">
            <select 
              placeholder="Enter rating"
              value={this.state.formdata.rating}
              onChange={(event) => this.handleInput(event, 'rating')}
            >
              <option val="1">1</option>
              <option val="2">2</option>
              <option val="3">3</option>
              <option val="4">4</option>
              <option val="5">5</option>
            </select>
          </div>
          <div className="form_element">
            <input 
              type="number"
              placeholder="Enter price"
              value={this.state.formdata.price}
              onChange={(event) => this.handleInput(event, 'price')}
            />
          </div>

          <button type="submit">Add review</button>
          {
            this.props.books.newBook ? 
              this.showNewBook(this.props.books.newBook)
            :
              null
          }
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
}

export default connect(mapStateToProps)(AddReview);