import styles from "../styles/Signin.module.css";
import { useDispatch } from "react-redux";
import TextFieldComponent from "./TextFieldComponent";
import PasswordComponent from "./PasswordInput";
import { useRouter } from "next/router";
import { login } from "../reducers/user";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Signin(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [signin, setSignin] = useState({
    userName: "nes",
    password: "Lololo.11",
  });

  const handleSignin = async () => {
    if (!userName || !password) {
      alert.alert("Champs manquants !");
      return;
    }

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: signin.userName,
        password: signin.password,
      }),
    };
    const response = await fetch(
      "http://localhost:3000/users/signin",
      options
    ).then((response) => response.json());

    if (response.result) {
      dispatch(
        login({
          firstname: response.user.firstName,
          username: signin.userName,
          token: response.user.token,
        })
      );
      setSignin({
        userName: "",
        password: "",
      });
      router.push("/acceuil");
    }
  };
  const handleClose = async () => {
    props.closeSignin();
  };

  return (
    <div className={styles.main}>
      <div className={styles.containerIcon}>
        <FontAwesomeIcon
          onClick={() => handleClose()}
          className={styles.icon}
          icon={faXmark}
          color="white"
          size="lg"
        />
      </div>
      <img className={styles.logo} src={"/rettiwt.png"} alt="Logo" />
      <p className={styles.text}>Connect to Hackatweet</p>
      <div className={styles.input}>
        <TextFieldComponent
          id="userName"
          label="Username"
          valueSetter={(value) => setSignin({ ...signin, userName: value })}
          size="small"
          valueGetter={signin.userName}
        />
        <PasswordComponent
          id="password"
          label="Password"
          valueSette={(value) => setSignin({ ...signin, password: value })}
          size="small"
          valueGette={signin.password}
          type="password"
        />
        <button className={styles.btn} onClick={() => handleSignin()}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Signin;
