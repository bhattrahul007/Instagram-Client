import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../constants/routes';
import React from 'react';

const ProtectedRoute = ({ user, children }) => {
  if (!user || user.uid === '') {
    return <Navigate to={ROUTES.LOGIN} replace={true} />;
  }

  return React.cloneElement(children, { user });
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};

export default ProtectedRoute;
