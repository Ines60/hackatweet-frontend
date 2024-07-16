import styles from "../styles/Message.module.css";

import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Message({
  id,
  firstname,
  username,
  message,
  style,
  handleDeleteTweet,
}) {
  const handleClick = () => {
    console.log("OK");
    handleDeleteTweet(id);
  };

  return (
    <div className={styles.main} style={style}>
      <div className={styles.profil}>
        <img className={styles.avatar} src={"/avatar-1.jpg"} alt="Avatar" />
        <p>
          {firstname} @{username} . 5 hours
        </p>
      </div>
      <div>
        <p>{message}</p>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faHeart} color="white" size="15px" />
          <FontAwesomeIcon
            onClick={() => handleClick()}
            icon={faTrash}
            color="white"
            size="15px"
          />
        </div>
      </div>
    </div>
  );
}

export default Message;
