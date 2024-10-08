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
        <img
          className={styles.avatar}
          src={`https://robohash.org/${username}.png`}
          alt="Avatar"
        />
        <p>
          <span style={{ fontSize: "20px" }}> {firstname}</span>{" "}
          <span style={{ fontSize: "15px", color: "lightgray" }}>
            {" "}
            @{username}
          </span>{" "}
          . {timeDifferenceText}
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
              style={{ paddingTop: "5px", cursor: "pointer" }}
            />
            {like}
          </div>
          <FontAwesomeIcon
            onClick={() => handleDel()}
            icon={faTrash}
            color="white"
            size="15px"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Message;
