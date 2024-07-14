import styles from "../styles/Signup.module.css";
import { useDispatch } from "react-redux";
import {
  faCheck,
  faFontAwesome,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { login } from "../reducers/user";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextFieldComponent from "./TextFieldComponent";

function Signup() {
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
      const response = await fetch(
        "http://localhost:3000/users/signup",
        options
      ).then((response) => response.json());
      if (response.result) {
        dispatch(
          login({
            firstname: signup.firstName,
            userName: signup.userName,
            token: response.token,
          })
        );
        setSignup({
          firstName: "",
          userName: "",
          password: "",
        });
        setMessage(<FontAwesomeIcon icon={faCheck} />);
        router.push("/acceuil");
      } else {
        setMessage("L'username est déjà utilisé ! ");
      }
    }
  };

  //   const handleChange = (e) => {
  //     const { id, value } = e.target;
  //     setSignup((prevSignup) => ({
  //       ...prevSignup,
  //       [id]: value,
  //     }));
  //   };

  return (
    <div className={styles.main}>
      <FontAwesomeIcon icon={faXmark} />
      <div className={styles.input}>
        <TextFieldComponent
          id="firstName"
          label="Prénom"
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
        <TextFieldComponent
          id="password"
          label="Mot de passe"
          valueSetter={(value) => setSignup({ ...signup, password: value })}
          size="small"
          valueGetter={signup.password}
        />
        <button onClick={() => handleSignup()}>S'inscrire</button>
      </div>
    </div>
  );
}

export default Signup;
