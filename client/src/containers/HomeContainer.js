import React, { Component } from 'react';
import { connect } from 'react-redux';

//ACTION
import { getBooks } from '../actions';

//WIDGETSUI
import BookItem from '../widgetsUI/BookItem'

class HomeContainer extends Component {

  componentWillMount() {
    this.props.dispatch(getBooks(1, 0, 'desc'))
  }

  renderItems = (books) => (
    books.list ? 
      books.list.map((book) => {
        return (
          <BookItem key={book._id} {...book}/>
        )
      })
      :
      null
  )

  loadmore = () => {
    let count = this.props.books.list.length;
    this.props.dispatch(getBooks(1, count, 'desc', this.props.books.list))
  }

  render() {
    return (
      <div>
        {this.renderItems(this.props.books)}

        <div className="loadmore"
          onClick={this.loadmore}
        >
          loadmore
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
}

export default connect(mapStateToProps)(HomeContainer);