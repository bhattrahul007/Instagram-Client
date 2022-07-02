import { useState, useEffect } from 'react';
import { getPhotos } from '../services/firebase';

export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);
  useEffect(() => {
    async function getTimelinePhotos() {
      const followedUserPhotos = await getPhotos(user.userId, user.following);
      // re-arrange array to be newest photos first by dateCreated
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }
    if (user?.following?.length > 0) getTimelinePhotos();
  }, [user]);

  return { photos: photos };
}
