import React from 'react';

//COMPONENTS
import Header from '../components/Header/Header';

const Layout = (props) => {
  return (
    <div>
      <Header />
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default Layout;