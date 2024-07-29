import styles from "../styles/Signup.module.css";
import { useDispatch } from "react-redux";
import {
  faCheck,
  faFontAwesome,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { login } from "../reducers/user";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextFieldComponent from "./TextFieldComponent";
import PasswordComponent from "./PasswordInput";
import { backendURL } from "../pages/_app";

function Signup(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [message, setMessage] = useState("");

  const [signup, setSignup] = useState({
    firstName: "",
    userName: "",
    password: "",
  });

  const handleSignup = async () => {
    const regex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

    if (!firstName || !userName || !password) {
      setMessage("Des champs sont manquants !");
    } else if (!regex.test(signup.password)) {
      setMessage(
        "Le mot de passe doit contenir une majuscule, un caractère spécial et un min de 8 caractéres !"
      );
    } else {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: signup.firstName,
          userName: signup.userName,
          password: signup.password,
        }),
      };
      const response = await fetch(`${backendURL}/users/signup`, options).then(
        (response) => response.json()
      );

      if (response.result) {
        dispatch(
          login({
            firstname: signup.firstName,
            username: signup.userName,
            token: response.newUser.token,
          })
        );
        setSignup({
          firstName: "",
          userName: "",
          password: "",
        });

        router.push("/acceuil");
      }
    }
  };

  const handleClose = async () => {
    props.closeSignup();
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
          style={{ cursor: "pointer" }}
        />
      </div>
      <img className={styles.logo} src={"/rettiwt.png"} alt="Logo" />
      <p className={styles.text}>Create your Hackatweet account</p>
      <div className={styles.input}>
        <TextFieldComponent
          id="firstName"
          label="Name"
          valueSetter={(value) => setSignup({ ...signup, firstName: value })}
          size="small"
          valueGetter={signup.firstName}
        />
        <TextFieldComponent
          id="userName"
          label="Pseudo"
          valueSetter={(value) => setSignup({ ...signup, userName: value })}
          size="small"
          valueGetter={signup.userName}
        />
        <PasswordComponent
          id="password"
          label="Password"
          valueSette={(value) => setSignup({ ...signup, password: value })}
          size="small"
          valueGette={signup.password}
        />
        <button className={styles.btn} onClick={() => handleSignup()}>
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Signup;
