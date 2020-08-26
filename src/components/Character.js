import React, { useEffect } from 'react';

import { useHttp } from '../hooks/http';

import Summary from './Summary';

const Character = props => {
  // const [loadedCharacter, setLoadedCharacter] = useState({});
  // const [isLoading, setIsLoading] = useState(false); 

  const [isLoading, fetchedData ] = useHttp('https://swapi.dev/api/people/' + props.selectedChar, [props.selectedChar]);
  
  let loadedCharacter = null;

  if(fetchedData) {
    loadedCharacter = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      colors: {
        hair: fetchedData.hair_color,
        skin: fetchedData.skin_color
      },
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    };
  }

  // const shouldComponentUpdate = (nextProps, nextState) => {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== props.selectedChar ||
  //     nextState.loadedCharacter.id !== loadedCharacter.id ||
  //     nextState.isLoading !== isLoading
  //   );
  // }

  // useEffect(() => {
  //   fetchData();
  //   return () => {
  //     // Runs right before useEffect runs the next time, when useEffect is done
  //     // and when the component is destroyed
  //     console.log('Cleaning up...');
  //   };
  // }, [props.selectedChar]);

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== props.selectedChar) {
  //     this.fetchData();
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);
  
  // componentDidMount() {
  //   this.fetchData();
  // }

  useEffect(() => {
    // With [], runs when component mounts and unmount
    return () => {
      console.log('component will unmount');
    };
  }, [])

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    } else if (!isLoading && !loadedCharacter) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
}

// Only updates when props changes
export default React.memo(Character);

// returns true if the component should not rerender. Only uses to prevent from updating with some props
// export default React.memo(Character, (prevProps, nextProps) => nextProps.selectedChar === prevProps.selectedChar);
