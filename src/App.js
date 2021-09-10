import React, { useCallback, useEffect, useState } from "react"

function App() {

  const [data, setData] = useState([]);
  const [match, setMatch] = useState({});
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const url = "https://rickandmortyapi.com/ap/character/?name=morty&status=alive&count=31";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json.results);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [data]);

  const getRandomMatch = useCallback(function () {
    const randomMatch = data[getRandomInteger(20)];
    setMatch(randomMatch);
  }, [data]);

  useEffect(() => {
    if (data.length != 0) {
      getRandomMatch();
    }
  }, [data, getRandomMatch]);

  function handleSwipeLeft() {
    getRandomMatch();
  }

  function handleSwipeRight() {
    setMatches([...matches, match])
    getRandomMatch();
  }

  function getRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  return (
    <div class="min-w-screen min-h-screen bg-yellow-300 flex items-center p-5 lg:p-10 overflow-hidden relative">
      <div class="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
        <div class="md:flex items-center -mx-10">
          <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
            <div class="relative">
              <img src={match.image} class="w-full relative z-10" alt="" />
              <div class="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-10">
            <div class="mb-10">
              <h1 class="font-bold uppercase text-2xl mb-5">{match.name}</h1>
            </div>
            <div class="inline-block align-bottom">
              <button class="bg-transparent border border-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold mr-2" onClick={handleSwipeLeft}>Swipe left</button>
              <button class="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold" onClick={handleSwipeRight}>Swipe right</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
