import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../constants/routes';

const UserLoggedInRoute = ({ user, children }) => {
  if (user || user.uid !== '') {
    return <Navigate to={ROUTES.DASHBOARD} replace={true} />;
  }

  return children;
};

UserLoggedInRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};

export default UserLoggedInRoute;
