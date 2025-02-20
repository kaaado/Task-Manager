import { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "react-query";
import Axios from "../Api/axios";
import { BASEURL, USER } from "../Api/Api";

// Create Context
const UserContext = createContext();

// User Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch authenticated user & cache it
  const mutation = useMutation(
    async () => {
      const response = await Axios.get(`${BASEURL}/${USER}`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setUser(data);
      },
    }
  );

  // Fetch user on first render (only once)
  useEffect(() => {
    if (!user) {
      mutation.mutate();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading: mutation.isLoading, isError: mutation.isError }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to Access User Context
export const useUser = () => useContext(UserContext);
