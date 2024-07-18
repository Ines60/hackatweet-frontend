import styles from "../styles/Message.module.css";
import moment from "moment";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Message({
  id,
  firstname,
  username,
  message,
  date,
  style,
  handleDeleteTweet,
  handleLikedTweet,
  likedBy,
  like,
}) {
  const handleDel = () => {
    handleDeleteTweet(id);
  };

  const handleLike = () => {
    handleLikedTweet(id);
  };

  const timeDifferenceText = moment(date).fromNow();

  return (
    <div className={styles.main} style={style}>
      <div className={styles.profil}>
        <img className={styles.avatar} src={"/avatar-1.jpg"} alt="Avatar" />
        <p>
          {firstname} @{username} . {timeDifferenceText}
        </p>
      </div>
      <div>
        <p>{message}</p>
        <div className={styles.icon}>
          <div className={styles.like}>
            <FontAwesomeIcon
              onClick={() => handleLike()}
              icon={faHeart}
              color={likedBy ? "red" : "white"}
              size="15px"
              style={{ paddingTop: "5px" }}
            />
            {like}
          </div>
          <FontAwesomeIcon
            onClick={() => handleDel()}
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
