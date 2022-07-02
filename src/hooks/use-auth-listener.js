import { useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseContext } from '../context';

export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser'))
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth(firebase);
    const listener = onAuthStateChanged(auth, (user) => {
      // user is signed in
      if (user) {
        localStorage.setItem('authUser', JSON.stringify(user));
        setUser(user);
      } else {
        // user signed out clear out storage
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase]);

  return { user };
}
