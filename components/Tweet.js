import styles from "../styles/Tweet.module.css";
import { useState, useEffect } from "react";
import Message from "./Message";
import Hashtags from "./Hastags";
import { useDispatch, useSelector } from "react-redux";
import { message } from "../reducers/tweet";
import moment from "moment";
import "moment/locale/fr";

function Tweet() {
  const [tweet, setTweet] = useState([]);
  const [refreshTweet, setRefreshTweet] = useState(false);
  false;
  //const [refresh, setRefresh] = useState(false);
  const [newTweet, setNewTweet] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch("http://localhost:3000/tweet/")
      .then((response) => response.json())
      .then((data) => {
        dispatch(message(data.tweet));
        setTweet(data.tweet);
      });
  }, [refreshTweet, dispatch]);

  const reverseTweets = [...tweet].reverse();
  const handleDeleteTweet = (id) => {
    fetch(`http://localhost:3000/tweet/deleteTweet/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    }).then((response) => {
      setRefreshTweet(!refreshTweet);
    });
  };

  const handleLikedTweet = (id) => {
    fetch(`http://localhost:3000/tweet/incrementLike/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    }).then((response) => {
      const isLikedByUser = response.ok;

      if (isLikedByUser) {
        console.log("User inclus ");
      } else {
        console.log("User not inclus");
      }

      setRefreshTweet(!refreshTweet);
    });
  };

  const listTweet = reverseTweets.map((tweets, i) => {
    return (
      <Message
        key={i}
        id={tweets._id}
        handleLikedTweet={handleLikedTweet}
        handleDeleteTweet={handleDeleteTweet}
        firstname={tweets.user.firstName}
        username={tweets.user.userName}
        message={tweets.message}
        date={tweets.createdAt}
        likedBy={tweets.likeBy.includes(user.token)}
        like={tweets.likeBy.length}
        style={{
          borderBottom: i === tweet.length - 1 ? "none" : "1px solid gray",
          paddingTop: "15px",
          color: "white",
        }}
      />
    );
  });
  const handleNewTweet = () => {
    setErrorMessage("");

    if (newTweet.trim() === "") {
      setErrorMessage("Message cannot be empty. Please enter a valid message.");
      return;
    }

    fetch("http://localhost:3000/tweet/newTweet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, message: newTweet }),
    })
      .then((response) => {
        if (!response.ok) {
          // Vérifiez si le serveur a renvoyé une réponse d'erreur
          return response.json().then((data) => {
            throw new Error(data.error || "Server error occurred.");
          });
        }
        return response.json();
      })
      .then((data) => {
        setNewTweet("");
        setRefreshTweet((prev) => !prev);
        setErrorMessage("");
      })
      .catch((error) => {
        // Affichez un message d'erreur personnalisé basé sur le type d'erreur
        if (error.message.includes("NetworkError")) {
          setErrorMessage(
            "Network error occurred. Please check your internet connection."
          );
        } else {
          setErrorMessage(error.message);
        }
        console.error("Error while posting new tweet:", error);
      });
  };

  return (
    <div className={styles.main}>
      <h2 className={`${styles.text} ${styles.title}`}>Home</h2>
      <div className={styles.containerText}>
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        <textarea
          className={styles.textarea}
          onChange={(e) => setNewTweet(e.target.value)}
          value={newTweet}
          rows={3}
          cols={60}
          maxLength={280}
          placeholder="What's up?"
        />
        <div className={styles.infi}>
          <span className={styles.text}>{newTweet.length}/280</span>
          <button className={styles.btn} onClick={() => handleNewTweet()}>
            Tweet
          </button>
        </div>
      </div>
      <div className={styles.containerTweets}>
        <div className={styles.tweet}>{listTweet}</div>
      </div>
    </div>
  );
}

export default Tweet;
