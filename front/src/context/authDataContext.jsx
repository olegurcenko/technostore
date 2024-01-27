import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthAdminMe, fetchAuthMe } from '../redux/slices/auth';

const AdminDataContext = createContext();

export const AdminDataProvider = ({ children }) => {

  const dispatch = useDispatch();

  const [adminData, setAdminData] = useState(useSelector((state) => state.adminAuth.data));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchAuthAdminMe());

        if (fetchAuthAdminMe.fulfilled.match(result)) {
          setAdminData({ ...adminData, ...result.payload });
        } else {
          console.error('Error fetching user data:', result.error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const updateAdminData = (newData) => {
    if (newData == null)
    {
      setAdminData(null);
      return;
    }
    setAdminData({ ...adminData, ...newData });
  };

  return (
    <AdminDataContext.Provider value={{adminData, updateAdminData}}>
      {children}
    </AdminDataContext.Provider>
  );
};

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(useSelector((state) => state.auth.data));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchAuthMe());

        if (fetchAuthMe.fulfilled.match(result)) {
          setUserData({ ...userData, ...result.payload });
        } else {
          //console.error('Error fetching user data:', result.error);
        }
      } catch (error) {
        //console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const updateUserData = (newData) => {
    if (newData == null)
    {
      setUserData(null);
      return;
    }
    setUserData({ ...userData, ...newData });
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};

export const useAdminData = () => {
  return useContext(AdminDataContext);
};