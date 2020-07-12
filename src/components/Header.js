import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ButtonAsLink from './ButtonAsLink';
import Logo from '../img/logo.svg';

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

// local query
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Header = props => {
  // query hook for loggedIn state
  // adding client to reference the Apollo store
  const { data, client } = useQuery(IS_LOGGED_IN);

  return (
    <HeaderBar>
      <img src={Logo} alt="Notedly Logo" height="40" />
      <LogoText>Notedly</LogoText>
      {/* If logged in display a logout link, else display sign-in options */}
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink
            onClick={() => {
              // remove the token
              localStorage.removeItem('token');
              // clear the application's cache
              client.resetStore();
              // update the local state
              client.writeData({ data: { isLoggedIn: false } });
              // redirect to the home page
              props.history.push('/');
            }}
          >
            Logout
          </ButtonAsLink>
        ) : (
          <p>
            <Link to={'/signin'}>Sign In</Link> or{' '}
            <Link to={'/signup'}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};

// use withRouter (a Higher Order Component) to include
// routing in a component that is not directly routable
export default withRouter(Header);
