import axios from "axios";
import { useEffect, useState } from "react";

export default function useUser(token) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("/user/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setUserData(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    getUser();
  }, []);

  return userData;
}
