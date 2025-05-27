import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';


const usePokemonList = () => {
  // advance useState
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons() {
    // setIsLoding(true)
    setPokemonListState((state) => ({...state, isLoading: true}))
    const response = await axios.get(pokemonListState.pokedexUrl); // this download 20 pokemons
    // console.log(`Main api url`);
    // console.log(response);

    const pokemonResults = response.data.results; // we get the array of 20 pokemon from results

    // console.log(response.data);
    // setNextUrl(response.data.next)
    // setPrevUrl(response.data.previous)

    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    // iterating over the array of pokemons and using their url, to create an array of promises
    // that will download those 20 pokemons
    const pokemonResultsPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    // console.log(pokemonResultsPromise);

    // passing that promise array to axios.all
    const pokemonData = await axios.all(pokemonResultsPromise); // array of 20 pokemon details data
    // console.log(`20 pokemon link which is carry pokemon details`);
    // console.log(pokemonData);

    // Now iterate on the each pokemon and extract id, name, image and types
    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      // console.log(`now print data object from the pokemon`);
      // console.log(pokemon);

      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front.shiny,
        types: pokemon.types,
      };
    });
    // console.log(pokeListResult);
    // setPokemonList(pokeListResult);
    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
    }));
    // setIsLoding(false);
  }
  useEffect(() => {
    // console.log("effect called");
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return [pokemonListState, setPokemonListState]
}

export default usePokemonList