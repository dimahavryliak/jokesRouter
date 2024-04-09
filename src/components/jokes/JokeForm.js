import React, { useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import Loader from "../UI/Loader";
import styles from "./JokeForm.module.css";

const JokeForm = (props) => {
  const [isFormFocused, setIsFormFocused] = useState(false);
  const topicInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredTopic = topicInputRef.current.value;
    const enteredText = textInputRef.current.value;

    props.onAddJoke({ topic: enteredTopic, text: enteredText });
  }

  const formFocusHandler = () => {
    setIsFormFocused(true);
  };

  const sendDataHandler = () => {
    setIsFormFocused(false);
  };

  return (
    <React.Fragment>
      <Prompt
        when={isFormFocused}
        message={(location) =>
          "Do you really want to leave the page? You will lost all entered data"
        }
      />
      <Card>
        <form
          onFocus={formFocusHandler}
          className={styles.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={styles.loading}>
              <Loader />
            </div>
          )}

          <div className={styles.control}>
            <label htmlFor="topic">Topic</label>
            <input type="text" id="topic" ref={topicInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={styles.actions}>
            <button onClick={sendDataHandler} className="btn">
              Add Joke
            </button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default JokeForm;
