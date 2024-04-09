import { useEffect } from "react";
import JokeList from "../components/jokes/JokeList";
import useHttp from "../hooks/use-http";
import { getJokes } from "../utils/firebase-api";
import Loader from "../components/UI/Loader";
import NoJokesFound from "../components/jokes/NoJokesFound";

// const DUMMY_JOKES = [
//   {
//     id: "j1",
//     topic: "Programming",
//     text: "Knock, knock. Who’s There? Very long pause… “Java.”",
//   },
//   {
//     id: "j2",
//     topic: "Programming",
//     text: "Programming is 10% writing code and 90% understanding why it’s not working",
//   },
//   { id: "j3", topic: "General", text: "RIP, boiling water. You will be mist." },
// ];

const Jokes = () => {
  const {
    sendHttpRequest,
    status,
    data: loadedJokes,
    error,
  } = useHttp(getJokes, true);

  useEffect(() => {
    sendHttpRequest();
  }, [sendHttpRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedJokes || loadedJokes.length === 0)) {
    return <NoJokesFound />;
  }

  return <JokeList jokes={loadedJokes}></JokeList>;
};

export default Jokes;
