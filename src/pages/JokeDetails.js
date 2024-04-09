import React, { useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedJoke from "../components/jokes/HighlightedJoke";
import useHttp from "../hooks/use-http";
import { getJoke } from "../utils/firebase-api";
import Loader from "../components/UI/Loader";

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

const JokeDetails = () => {
  const params = useParams();
  const routeMatch = useRouteMatch();
  const { jokeId } = params;

  const {
    sendHttpRequest,
    status,
    data: loadedJoke,
    error,
  } = useHttp(getJoke, true);

  useEffect(() => {
    sendHttpRequest(jokeId);
  }, [sendHttpRequest, jokeId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <Loader />
      </div>
    );
  }
  if (error) {
    return <p className="cenetered">error</p>;
  }

  // const joke = DUMMY_JOKES.find((joke) => joke.id === params.jokeId);

  if (!loadedJoke.text) {
    return <h1 className="centered">Joke Not Found</h1>;
  }

  return (
    <React.Fragment>
      <HighlightedJoke topic={loadedJoke.topic} text={loadedJoke.text} />
      <Route path={`${routeMatch.path}`} exact>
        <div className="centered">
          <Link className="btn--empty" to={`${routeMatch.url}/comments`}>
            Show Comments
          </Link>
        </div>
      </Route>

      <Route path={`${routeMatch.path}/comments`}>
        <Comments />
      </Route>
    </React.Fragment>
  );
};

export default JokeDetails;
