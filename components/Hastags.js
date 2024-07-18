import { useSelector } from "react-redux";
import styles from "../styles/Hastags.module.css";

function Hastags() {
  const tweet = useSelector((state) => state.tweet.value);
  //console.log("Tweet is ", tweet);
  let pattern = /#\w+/g;

  let hashtagCounts = {};

  const capitalizeFirstLetter = (str) => {
    return str.charAt(1).toUpperCase() + str.slice(2);
  };

  console.log(capitalizeFirstLetter("test"));

  tweet.forEach((message) => {
    const hashTagsInMessage = message.message.match(pattern);
    if (hashTagsInMessage) {
      hashTagsInMessage.forEach((hashtag) => {
        const lowerCaseHashtag = hashtag.toLowerCase();
        const formattedHashtag = capitalizeFirstLetter(lowerCaseHashtag);
        console.log("formatted is : ", formattedHashtag);
        if (hashtagCounts[formattedHashtag]) {
          hashtagCounts[formattedHashtag]++;
        } else {
          hashtagCounts[formattedHashtag] = 1;
        }
      });
    }
  });

  const hashtagList = Object.keys(hashtagCounts).map((hashtag, index) => (
    <p className={styles.li} key={index}>
      <span className={styles.hash}> {hashtag}</span>{" "}
      <span className={styles.count}> {hashtagCounts[hashtag]} Tweets</span>
    </p>
  ));

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>Trends</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.hashtag}>{hashtagList}</div>
      </div>
    </div>
  );
}

export default Hastags;
