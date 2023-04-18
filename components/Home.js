import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import 'antd/dist/antd.css';
import { Popover, Button } from 'antd';
import Movie from '../components/Movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/movies')
      .then((res) => res.json())
      .then((data) => {
        // .map()
        setMoviesList(data.movies);
      });
  }, []);
  //console.log('moviesList =>', moviesList);

  const updateLikedMovies = (movieTitle) => {
    const found = likedMovies.find((el) => el == movieTitle);
    if (found) {
      setLikedMovies(likedMovies.filter((el) => el !== movieTitle));
    } else {
      setLikedMovies([...likedMovies, movieTitle]);
    }
  };

  // const moviesData = [
  //   {
  //     title: 'Forrest Gump',
  //     poster: '/forrestgump.jpg',
  //     voteAverage: 9.2,
  //     voteCount: 22_705,
  //     overview:
  //       'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case.',
  //   },
  //   {
  //     title: 'The Dark Knight',
  //     poster: '/thedarkknight.jpg',
  //     voteAverage: 8.5,
  //     voteCount: 27_547,
  //     overview:
  //       'Batman raises the stakes in his war on crime and sets out to dismantle the remaining criminal organizations that plague the streets.',
  //   },
  //   {
  //     title: 'Your name',
  //     poster: '/yourname.jpg',
  //     voteAverage: 8.5,
  //     voteCount: 8_691,
  //     overview:
  //       'High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places.',
  //   },
  //   {
  //     title: 'Iron Man',
  //     poster: '/ironman.jpg',
  //     voteAverage: 7.6,
  //     voteCount: 22_7726,
  //     overview:
  //       'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
  //   },
  //   {
  //     title: 'Inception',
  //     poster: '/inception.jpg',
  //     voteAverage: 8.4,
  //     voteCount: 31_546,
  //     overview:
  //       'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.',
  //   },
  // ];

  // faire un .map() sur le tableau d'objets moviesData
  // créer les props à faire passer dans le composant Movie du map()
  const movies = moviesList.map((movie, i) => {
    return (
      <Movie
        title={movie.title}
        poster={movie.poster}
        voteAverage={movie.voteAverage}
        voteCount={movie.voteCount}
        overview={movie.overview}
        updateLikedMovies={updateLikedMovies}
        isLiked={likedMovies.includes(movie.title)}
        key={i}
      />
    );
  });

  // faire passer les props vers le composant enfant Movie

  const popoverMovies = likedMovies.map((el, i) => {
    return (
      <span key={i}>
        {el}
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => updateLikedMovies(el)}
        />
      </span>
    );
  });

  const popoverContent = (
    <div className={styles.popoverContent}>{popoverMovies}</div>
  );

  // Il est temps de dynamiser la liste de vos films likés ! Faites
  // en sorte qu'au clic sur l'icône coeur d'un film, celui-ci s'ajoute dans
  // la liste du popover

  // 1 // Dans le composant Home, créez un état "likedMovies" et initialisez-le sous forme
  // d'un tableau vide. Cet état vous permettra de stocker le nom des films que vous aimez.

  // 2 // Dans le même composant, ajoutez une fonction "updateLikedMovies" qui prend comme
  // argument "movieTitle". Au clic sur un coeur, cette fonction ajoutera le nom du film
  // sélectionné au tableau "likedMovies" si celui-ci n'y figure pas déjà.

  // 3 // Si vous cliquez à nouveau sur le coeur, le film doit être retiré de la liste.

  // 4 // Transmettez la fonction d'inverse data flow au composant Movie et intégrez-la
  // pour qu'au clic sur un coeur le nom de film soit renvoyé au composant parent.

  // 5 // Revenez au composant Home pour mettre à jour le bouton qui sert à ouvrir la popover
  // pour qu'il affiche le bon nombre de films.

  // 6 // Enfin, ajoutez un bouton de suppression "X" dans la liste des films.
  // Lorsqu'un film est supprimé, le coeur doit redevenir noir.

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <img src="logo.png" alt="logo" />
          <p className={styles.title}>MOVIZ</p>
        </div>
        <Popover title="Liked Movies" content={popoverContent} trigger="click">
          <Button>❤️ {likedMovies.length} movie(s)</Button>
        </Popover>
      </div>
      <div className={styles.release}>LAST RELEASES</div>
      <div className={styles.moviesContainer}>{movies}</div>
    </div>
  );
}

export default Home;
