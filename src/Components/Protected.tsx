import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import type { RootState, AppDispatch } from "../Store/store.ts";
import { setUser } from '../Slices/authSlices.ts'
import { useDispatch, useSelector } from "react-redux";
import { GET_USER, login_url, VERIFY_TOKEN, welcome_url } from "../routes.ts";

interface ProtectedProps {
  children: React.ReactNode;
}

export function Protected({ children }: ProtectedProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.loginSlice);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(VERIFY_TOKEN, {
          credentials: "include"
        });

        if (!res.ok) {
          setIsLoading(false);
          return navigate('/');
        }

        if (!user) {
          const resUser = await fetch(GET_USER, {
            method: 'GET',
            credentials: 'include'
          });
          const userData = await resUser.json();
          if (!resUser.ok) {
            return navigate(login_url)
          }
          dispatch(setUser(userData));
        }

        setIsLoading(false);
      } catch (err) {
        console.log("Error de red o servidor:", err);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, user]);

  if (isLoading) return <p>Loading...</p>;

  if (!user) return <Navigate to={welcome_url} replace />;

  return <>{children}</>;
}
