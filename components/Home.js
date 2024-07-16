import styles from "../styles/Home.module.css";
import Profil from "./Profil";
import Tweet from "./Tweet";

function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.containerProfil}>
        <Profil />
      </div>
      <div className={styles.containerTweet}>
        <Tweet />
      </div>
      <div className={styles.containerHastag}>
        <p>Hastag</p>
      </div>
    </div>
  );
}

export default Home;
