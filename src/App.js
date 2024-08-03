import React from "react";
import JokeList from "./JokeList";

/** App component. Renders list of jokes. */

const App = () => {
  return (
    <div className="App">
      <JokeList numJokes={25}/>
    </div>
  );
}

export default App;
