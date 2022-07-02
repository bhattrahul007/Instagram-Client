import { useEffect } from 'react';
import { Sidebar, Timeline, Header } from '../components';
import { LoggedInUserContext } from '../context';
import { useUser } from '../hooks';
import PropTypes from 'prop-types';

export default function Dashboard({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser.uid);

  useEffect(() => {
    document.title = 'Home - Instagram';
  }, []);
  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg ">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};
