import { useEffect, useState } from "react";
import { getMyUserData } from "../services";

const useUser = (token) => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);

        const data = await getMyUserData(token);
        setUserInfo(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  return { userInfo, loading, error };
};

export { useUser };
