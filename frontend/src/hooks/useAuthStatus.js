import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("User:", user);
    console.log("Checking Status:", checkingStatus);

    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false); // Make sure to set checkingStatus to false when done checking
  }, [user]);

  return { loggedIn, checkingStatus };
}