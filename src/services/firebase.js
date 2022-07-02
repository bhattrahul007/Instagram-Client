import { firebase } from '../lib/firebase';
import {
  query,
  collection,
  where,
  getDocs,
  getFirestore,
  limit,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';

const firestore = getFirestore(firebase);

export async function doesUsernameExist(username) {
  const q = query(
    collection(firestore, 'users'),
    where('username', '==', username)
  );
  const result = await getDocs(q);
  return result.docs.map((user) => user.data()).length > 0;
}

export async function getUserObjByUserId(userId) {
  if (!userId) return {};

  const q = query(
    collection(firestore, 'users'),
    where('userId', '==', userId),
    limit(1)
  );
  const result = await (
    await getDocs(q)
  ).docs.reduce(
    (initial, doc) => Object.assign(initial, { ...doc.data(), docId: doc.id }),
    {}
  );
  return result;
}

export async function getSuggestedProfiles(userId, following) {
  if (!userId) return [];
  const q = query(collection(firestore, 'users'), limit(10));
  const result = await (await getDocs(q)).docs
    .map((doc) => ({ ...doc.data(), docId: doc.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
  return result;
}

export async function updateUserFollower(
  profileDocId, // document id of the the profile requested to follow
  userId, // currently logged in user id
  isProfileFollowed // boolean value indicating user currently follows the profile or not
) {
  const docRef = doc(firestore, 'users', profileDocId);
  await updateDoc(docRef, {
    followers: isProfileFollowed ? arrayRemove(userId) : arrayUnion(userId),
  });
}

export async function updateUserFollowing(
  userDocId, // currently logged in user document id
  profileId, // user id of the the profile requested to follow
  isFollowingProfile // boolean value indicating user currently follows the profile or not
) {
  const docRef = doc(firestore, 'users', userDocId);
  await updateDoc(docRef, {
    following: isFollowingProfile
      ? arrayRemove(profileId)
      : arrayUnion(profileId),
  });
}

export async function getPhotos(userId, following) {
  const q = query(
    collection(firestore, 'photos'),
    where('userId', 'in', following)
  );
  const userFollowedPhotos = await (
    await getDocs(q)
  ).docs.map((doc) => ({ ...doc.data(), docId: doc.id }));

  const postWithDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) userLikedPhoto = true;

      //  get the user detail who posted this post
      const user = await getUserObjByUserId(photo.userId);
      const { username } = user;
      return { username, ...photo, userLikedPhoto };
    })
  );
  return postWithDetails;
}

export async function getUserByUsername(username) {
  const q = query(
    collection(firestore, 'users'),
    where('username', '==', username),
    limit(1)
  );
  const result = await (
    await getDocs(q)
  ).docs.reduce(
    (initial, doc) => Object.assign(initial, { ...doc.data(), docId: doc.id }),
    {}
  );

  return result;
}

export async function getUserPhotosByUserId(userId) {
  const q = query(
    collection(firestore, 'photos'),
    where('userId', '==', userId)
  );
  const result = await (
    await getDocs(q)
  ).docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
  return result;
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  const q = query(
    collection(firestore, 'users'),
    where('username', '==', loggedInUserUsername),
    where('following', 'array-contains', profileUserId)
  );

  const response = await (
    await getDocs(q)
  ).docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  // 1st param: karl's doc id
  // 2nd param: raphael's user id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);

  // 1st param: karl's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateUserFollower(profileDocId, followingUserId, isFollowingProfile);
}
