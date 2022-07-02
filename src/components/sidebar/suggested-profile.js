import React, { useState, useContext } from 'react';
import { LoggedInUserContext } from '../../context';
import PropTypes from 'prop-types';
import {
  updateUserFollowing,
  updateUserFollower,
  getUserObjByUserId,
} from '../../services/firebase';
import { Link } from 'react-router-dom';

const SuggestedProfile = ({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
}) => {
  const [followed, setFollowed] = useState(false);
  const { setActiveUser } = useContext(LoggedInUserContext);

  async function handleFollowUser() {
    setFollowed(true);

    // update following array of logged in user
    await updateUserFollowing(loggedInUserDocId, profileId, false);
    // update  the followers array of the user who has been followed

    await updateUserFollower(profileDocId, userId, false);
    const user = getUserObjByUserId(userId);
    setActiveUser(user);
  }

  return (
    !followed && (
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center justify-between">
          <img
            className="rounded-full w-8 flex mr-3"
            src={`/images/avatars/${username}.jpg`}
            alt={``}
          />
          <Link to={`/p/${username}`}>
            <p className="font-bold text-sm">{username}</p>
          </Link>
        </div>
        <div>
          <button
            onClick={handleFollowUser}
            className="text-xs font-bold text-blue-medium"
          >
            Follow
          </button>
        </div>
      </div>
    )
  );
};

export default React.memo(SuggestedProfile);

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string,
  username: PropTypes.string,
  profileId: PropTypes.string,
  userId: PropTypes.string,
  loggedInUserDocId: PropTypes.string,
};
