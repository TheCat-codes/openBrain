import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../Store/store.ts";
import { setUser, logout } from '../Slices/authSlices.ts';
import { useDispatch, useSelector } from "react-redux";
import { GET_USER, login_url, VERIFY_TOKEN, welcome_url } from "../routes.ts";

interface ProtectedProps {
  children: React.ReactNode;
}

export function Protected({ children }: ProtectedProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.loginSlice);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(VERIFY_TOKEN, {
          credentials: "include"
        });

        const data = await res.json()
        console.log(data)

        if (!res.ok) {
          setIsLoading(false);
          return navigate(welcome_url);
        }

        if (!user) {
          const resUser = await fetch(GET_USER, {
            method: 'GET',
            credentials: 'include'
          });

          if (!resUser.ok) {
            dispatch(logout());
            return navigate(login_url);
          }

          const userData = await resUser.json();
          dispatch(setUser(userData));
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error de red o servidor:", err);
        dispatch(logout());
        setIsLoading(false);
        return navigate(login_url);
      }
    };

    checkAuth();
  }, [dispatch, user, navigate]);

  if (isLoading) return <p>Loading...</p>;

  if (!user) return <Navigate to={login_url} replace />;

  return <>{children}</>;
}
