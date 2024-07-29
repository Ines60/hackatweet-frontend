import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import styles from "../styles/Hastags.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { backendURL } from "../pages/_app";
import { addHastags } from "../reducers/tweet";

function Hastags({}) {
  const tweets = useSelector((state) => state.tweet.value);
  const user = useSelector((state) => state.user.value);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [currentHashtag, setCurrentHashtag] = useState("");
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  //console.log("Tweets is ", tweets);
  //console.log("rerender");

  let pattern = /#\w+/g;
  let hashtagCounts = {};
  // Pas réussi a gerer les likes dan sla modal, a revoir
  // const handleLikedTweet = (id) => {
  //   console.log("id is", id);
  //   fetch(`${backendURL}/tweet/incrementLike/${id}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ token: user.token }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("data is", data);
  //       setRefresh(!refresh);
  //     });
  // };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(1).toUpperCase() + str.slice(2);
  };

  tweets.forEach((message) => {
    const hashTagsInMessage = message.message.match(pattern);
    if (hashTagsInMessage) {
      let uniqueHashtags = new Set(
        hashTagsInMessage.map((ht) => ht.toLowerCase())
      );
      uniqueHashtags.forEach((hashtag) => {
        const formattedHashtag = capitalizeFirstLetter(hashtag);
        if (hashtagCounts[formattedHashtag]) {
          hashtagCounts[formattedHashtag]++;
        } else {
          hashtagCounts[formattedHashtag] = 1;
        }
      });
    }
  });

  const handleHashtagClick = (hashtag) => {
    setCurrentHashtag(hashtag);
    const lowerCaseHashtag = `#${hashtag
      .charAt(0)
      .toLowerCase()}${hashtag.slice(1)}`;
    const messagesWithHashtag = tweets.filter((message) => {
      return message.message.toLowerCase().includes(lowerCaseHashtag);
    });
    console.log("filtered message is ", filteredMessages);
    setFilteredMessages(messagesWithHashtag);
    setIsModalOpen(true);
    setRefresh(!refresh);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const hashtagList = Object.keys(hashtagCounts).map((hashtag, index) => (
    <p className={styles.li} key={index}>
      <span className={styles.hash} onClick={() => handleHashtagClick(hashtag)}>
        {hashtag}
      </span>
      <span className={styles.count}> {hashtagCounts[hashtag]} Tweets</span>
    </p>
  ));

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>Trends</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.hashtag}>{hashtagList}</div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Hashtag Messages"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <FontAwesomeIcon
          onClick={closeModal}
          icon={faXmark}
          size="lg"
          style={{ cursor: "pointer" }}
        />
        <h2>
          Messages with{" "}
          <span style={{ color: "rgb(177, 174, 174)" }}>
            {" "}
            #{currentHashtag}
          </span>{" "}
          :
        </h2>
        <div className={styles.messages}>
          {filteredMessages.map((message, i) => (
            <div className={styles.containerHash} key={i}>
              <div className={styles.profil}>
                <img
                  className={styles.avatar}
                  src={`https://robohash.org/${user.username}.png`}
                  alt="Avatar"
                />
                <p className={styles.info}>
                  {" "}
                  <span style={{ fontSize: "17px" }}>
                    {message.user.firstName}
                  </span>{" "}
                  <span style={{ fontSize: "12px", color: "lightgray" }}>
                    @{message.user.userName}
                  </span>
                </p>
              </div>
              <span style={{ paddingLeft: "70px" }}>{message.message}</span>
              <FontAwesomeIcon
                icon={faHeart}
                className={styles.icon}
                color={message.likeBy.includes(user.token) ? "red" : "white"}
              />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default Hastags;
