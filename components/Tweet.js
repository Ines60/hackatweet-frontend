import styles from "../styles/Tweet.module.css";
import { useState, useEffect } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";

function Tweet() {
  const [tweet, setTweet] = useState([]);
  const [refreshTweet, setRefreshTweet] = useState(false);
  false;
  const [refresh, setRefresh] = useState(false);
  const [newTweet, setNewTweet] = useState([]);

  const user = useSelector((state) => state.user.value);
  console.log("user is", user);
  console.log("tweet is", tweet);

  useEffect(() => {
    fetch("http://localhost:3000/tweet/")
      .then((response) => response.json())
      .then((data) => {
        setTweet(data.tweet);
      });
  }, [refreshTweet, refresh]);

  const reverseTweets = [...tweet].reverse();

  const handleDeleteTweet = (id) => {
    fetch(`http://localhost:3000/tweet/deleteTweet/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      setRefreshTweet(!refreshTweet);
    });
  };

  const listTweet = reverseTweets.map((tweets, i) => {
    return (
      <Message
        key={i}
        handleDeleteTweet={handleDeleteTweet}
        id={tweet._id}
        firstname={tweets.user.firstName}
        username={tweets.user.userName}
        message={tweets.message}
        style={{
          borderBottom: i === tweet.length - 1 ? "none" : "1px solid gray",
          paddingTop: i !== 0 ? "15px" : "0px",
          color: "white",
        }}
      />
    );
  });

  const handleNewTweet = () => {
    fetch("http://localhost:3000/tweet/newTweet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, message: newTweet }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewTweet("");
        setRefresh(!refresh);
      });
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.text}>Home</h1>
      <div className={styles.containerText}>
        <textarea
          className={styles.textarea}
          onChange={(e) => setNewTweet(e.target.value)}
          value={newTweet}
          rows={2}
          cols={70}
          maxLength={280}
          placeholder="What's up?"
        />
        <div className={styles.infi}>
          <span className={styles.text}>{newTweet.length}/280</span>
          <button onClick={() => handleNewTweet()}>Tweet</button>
        </div>
      </div>
      <div className={styles.containerTweets}>
        <div className={styles.tweet}>{listTweet}</div>
      </div>
    </div>
  );
}

export default Tweet;
