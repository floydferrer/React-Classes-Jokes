import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokeList.css'

const JokeList = ({numJokes = 5}) => {
  const [jokes, setJokes] = useState([]);
  const [seenJokes, setSeenJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getJokes() {
        if (jokes.length < numJokes) {
            setIsLoading(true);
            let res = await axios.get("https://icanhazdadjoke.com", {
                headers: { Accept: "application/json" }
            });
            let { ...joke } = res.data;
            setSeenJokes([...seenJokes, {joke: joke.id}]);
            if (jokes.length === 0) {
                setJokes([...jokes, { ...joke, votes: 0 }]);
                console.log('0 jokes')
            } else {
                for(let j of seenJokes) {
                    console.log(j.joke)
                    console.log(joke.id)
                    if (j.joke !== joke.id) {
                      console.log('runs')  
                      setJokes([...jokes, { ...joke, votes: 0 }]);
                      } else {
                        console.log("duplicate found!");
                        return;
                      }
                }
            }
        }
        if(jokes.length === numJokes) setIsLoading(false);
      }
      getJokes();
  }, [jokes, seenJokes])


  const generateNewJokes = () => {
    setJokes([]);
  }

  const vote = (id, delta) => {
    setJokes(jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      ))
    };

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  if (isLoading) {
      return (
      <div className="loading">
          <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
      )
  }
  return (
    <div>
      <button
          className="JokeList-getmore"
          onClick={generateNewJokes}
        >
          Get New Jokes
        </button>

        {jokes.length === numJokes && sortedJokes.map(j => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={vote}
          />
        ))}
    </div>
  )
}

export default JokeList
