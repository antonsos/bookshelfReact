import axios from 'axios';

//======Books======//

export const getBooks = (
  limit = 10,
  start = 0,
  order = 'asc',
  list = ''
) => {
  const request = axios.get(`/api/books?skip=${start}&limit=${limit}&order=${order}`)
                  .then(response => {
                    if(list) {
                      return [...list, ...response.data]
                    } else {
                      return response.data
                    }
                  })

  return {
    type: 'GET_BOOKS',
    payload: request
  }
}

export const getBookWithReviewer = (id) => {
  const request = axios.get(`/api/getBook?id=${id}`);

  return (dispatch) => {
    request.then(({data}) => {
      let book = data;

      axios.get(`/api/getReviewer?id=${book.ownerId}`)
      .then(({data}) => {
        let response = {
          book,
          reviewer: data
        }

        dispatch({
          type: 'GET_BOOK_W_REVIEWER',
          payload: response
        })
      })
    })
  }
}

export const clearBookWithReviewer = () => {
  return {
    type: 'CLEAR_BOOK_W_REVIEWER',
    payload: {
      book: {},
      reviewer: {}
    }
  }
}

export const addBook = (book) => {
  const request = axios.post('/api/book', book)
                  .then(response => response.data)

  return {
    type: 'ADD_BOOK',
    payload: request
  }
}

export const clearBook = () => {
  return {
    type: 'CLEAR_BOOK',
    payload: null
  }
}

export const getBook = (id) => {
  const request = axios.get(`/api/getBook?id=${id}`)
                  .then(response => response.data);

  return {
      type:'GET_BOOK',
      payload:request
  }
}


export const updateBook = (data) => {
  const request = axios.post(`/api/book_update`,data)
              .then(response => response.data);

  return {
      type:'UPDATE_BOOK',
      payload:request
  }

}

export const deleteBook = (id) => {
  const request = axios.delete(`/api/delete_book?id=${id}`)
                  .then(response => response.data)

  return {
      type:'DELETE_BOOK',
      payload:request
  }
}

export const clearEditBook = () => {
  return{
      type:'CLEAR_BOOK',
      payload:{
          book:null,
          updateBook:false,
          postDeleted:false
      }
  }
}

//======User======//

export const loginUser = ({
  email,
  password
}) => {
  const request = axios.post('/api/login', {email, password})
                  .then(response => response.data)

  return {
    type: 'USER_LOGIN',
    payload: request
  }
}

export const auth = () => {
  const request = axios.get('/api/auth')
                  .then(response => response.data)

  return {
    type: 'USER_AUTH',
    payload: request
  }
}

export const getUserPosts = (userId) => {
  const request = axios.get(`/api/user_posts?user=${userId}`)
                  .then(response => response.data)

  return {
    type: 'GET_USER_POSTS',
    payload: request
  }
}

export const getUsers = () => {
  const request = axios.get('/api/users')
                  .then(response => response.data)

  return {
    type: 'GET_USERS',
    payload: request
  }
}

export const userRegister = (user, usersList) => {
  const request = axios.post('/api/register', user);

  return (dispatch) => {
    request.then(({data}) => {

      let users = data.success ? [...usersList, data.user] : usersList;

      let response = {
        success: data.success,
        users
      }

      dispatch({
        type: 'USER_REGISTER',
        payload: response
      })
    })
  }
}