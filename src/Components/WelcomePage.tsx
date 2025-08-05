import { useNavigate } from "react-router-dom"
import type { RootState, AppDispatch } from "../Store/store";
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "../Slices/authSlices";
import { dashboard_url, GET_USER, login_url, VERIFY_TOKEN } from "../routes";
import { Link } from "./Link";

export function WelcomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.loginSlice);

  const checkAuth = async () => {
    console.log('checkeando...')
    try {
      const res = await fetch(VERIFY_TOKEN, {
        credentials: "include"
      });

      const data = await res.json()
      console.log(data)
      if (!res.ok) return navigate(login_url)

      if (!user) {
        const resUser = await fetch(GET_USER, {
          method: "GET",
          credentials: "include"
        });
        const userData = await resUser.json();
        if (!resUser.ok) return navigate('/login')
        dispatch(setUser(userData));
      }

      navigate(dashboard_url)
    } catch (err) {
      console.error("Error:", err);
      navigate("/login");
    }
  };

  return (
    <div className="welcome-card">
      <img src="../../brainImg.png" alt="brain image"/>
      <h1>Welcome to openBrain</h1>
      <p>openBrain is an App where you can be honest with yourself and all the people in the site, a place where you can share your experiences and receive people advices without feel pressed or uncomfortable, but you may open your brain to get new thoughts shared by another ones</p>
      <h2 style={{ fontStyle: 'italic'}}>"Open your BRAIN and throw the PAIN"</h2>
      <div className="log-options">
        <p>Log-in or Register</p>
        <div className="options">
          <button className="login-button" onClick={async () => await checkAuth()}>Login</button>
          <button className="register-button"><Link target={undefined} to="/register" destiny="Register" /></button>
        </div>
      </div>
    </div>
  );
}