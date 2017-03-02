//import libraries
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Landing from '../components/Landing';
import ManageDomains from '../components/Admin/ManageDomains';

import { Container } from 'semantic-ui-react'

//create component
class ManageDomainsPage extends Component {

  render() {

    const { currentUser, children, loginToken } = this.props;


    return(
      <Container>
        { loginToken ? <ManageDomains /> : <Landing />
        }
      </Container>

  );
}
}

export default createContainer(() => {
  return { currentUser: Meteor.user(), loginToken: localStorage.getItem("Meteor.loginToken")  };
},ManageDomainsPage);