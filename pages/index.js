import styles from "../styles/Home.module.css";
import { useState } from "react";
import { Button, Images } from "../components/main_page";

export default function Home() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const username = "test";
  const password = "test";

  // makes get request to localhost:5000/images to fetch all images
  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/images", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      // console.log(json);
      if (json["message"] == "Invalid credentials") {
        alert("Invalid username of password");
      }
      if (json["data"]) {
        // creates shallow copy of urls array
        const data = Array.from(json["data"]);
        setUrls(data);
        // console.log(urls);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Button fetchImages={fetchImages} loading={loading} />
      <Images urls={urls} />
    </div>
  );
}
