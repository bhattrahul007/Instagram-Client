import { useContext } from 'react';
import User from './user';
import Suggestions from './suggestions';
import { LoggedInUserContext } from '../../context';

export default function Sidebar() {
  const { user: { docId = '', fullname, username, userId, following } = {} } =
    useContext(LoggedInUserContext);

  return (
    <div className="p-4">
      <User username={username} fullName={fullname} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
}
