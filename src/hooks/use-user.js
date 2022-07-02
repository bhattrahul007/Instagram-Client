import { useState, useEffect } from 'react';
import { getUserObjByUserId } from '../services/firebase';

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    if (userId) {
      getUserObjByUserId(userId)
        .then((response) => setActiveUser(response))
        .catch((error) => setActiveUser({}));
    }
  }, [userId]);

  return { user: activeUser, setActiveUser };
}
