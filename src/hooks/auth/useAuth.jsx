import { apiGetUser } from '../../api/user';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiGetUser();
        setUser(data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user: { username: user?.username, email: user?.email, password: user?.password, canvasToken: user?.canvasToken }, loading };
  
};