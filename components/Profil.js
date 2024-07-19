import { useSelector } from "react-redux";
import styles from "../styles/Profil.module.css";
import { logout } from "../reducers/user";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

function Profil() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className={styles.main}>
      <img className={styles.logo} src={"/rettiwt.png"} alt="Logo" />
      <div>
        <div className={styles.containerAvatar}>
          <img className={styles.avatar} src={`https://robohash.org/${user.username}.png`} alt="Avatar" />

          <div className={styles.containerInfo}>
            <span className={styles.firstname}>{user.firstname}</span>
            <span className={styles.username}>@{user.username}</span>
          </div>
        </div>
        <button onClick={() => handleLogout()} className={styles.btn}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profil;
