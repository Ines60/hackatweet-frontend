import { useState } from "react";
import styles from "../styles/Login.module.css";
import Signup from "./Signup";
import Signin from "./Signin";
import Modal from "react-modal";

function Login() {
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);

  const openSignup = async () => {
    setSignup(true);
  };

  const closeSignup = async () => {
    setSignup(false);
  };

  const openSignin = async () => {
    setSignin(true);
  };

  const closeSignin = async () => {
    setSignin(true);
  };

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.left}>
          <img className={styles.logoLeft} src={"/rettiwt.png"} alt="Logo" />
        </div>
        <div className={styles.right}>
          <img className={styles.logoRight} src={"/rettiwt.png"} alt="Logo" />
          <h1 className={styles.title}>
            See what's <br />
            happening
          </h1>
          <p className={`${styles.text} ${styles.join}`}>
            Join Hackatweet today .
          </p>

          <button
            className={`${styles.btn} ${styles.btnUp}`}
            onClick={openSignup}
          >
            Sign up
          </button>
          <Modal
            className={styles.modal}
            isOpen={signup}
            onRequestClose={closeSignup}
          >
            <Signup />
          </Modal>
          <p className={styles.text}>Already have an account ? </p>
          <button
            className={`${styles.btn} ${styles.btnIn}`}
            onClick={openSignin}
          >
            Sign in
          </button>
          <Modal
            className={styles.modal}
            isOpen={signin}
            onRequestClose={closeSignin}
          >
            <Signin />
          </Modal>
        </div>
      </main>
    </div>
  );
}

export default Login;
