import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, logUserOut, selectIsAuthenticated, selectUser, selectToken, resetState } from '../redux/user/userSlice';

const ProtectedRoute = ({ element }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [hasCheckedUser, setHasCheckedUser] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getCurrentUser())
        .unwrap()
        .catch(() => {
          dispatch(resetState());
          navigate('/');
        });
    }
  }, []);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     if (token && !hasCheckedUser) {
  //       setHasCheckedUser(true);
  //       try {
  //         await dispatch(getCurrentUser()).unwrap();
  //       } catch (error) {
  //         await dispatch(logUserOut()).unwrap();
  //         dispatch(resetState());
  //         navigate('/');
  //       }
  //     }
  //   };

  //   checkUser();
  // }, [dispatch, navigate, token, hasCheckedUser]);

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
