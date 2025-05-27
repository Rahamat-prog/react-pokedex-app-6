import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";

const PokemonList = () => {

// custom useState hook 
const [pokemonListState, setPokemonListState] = usePokemonList(false)
  useEffect(() => {
    console.log('render');
    
  })

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Data is loading"
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          id="btn-control"
          disabled={pokemonListState.prevUrl == null}
          onClick={() => {
            const urlToSet = pokemonListState.prevUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
          }}
        >
          previous
        </button>
        <button
          id="btn-control"
          disabled={pokemonListState.nextUrl == null}
          onClick={() => {
            const urlToSet = pokemonListState.nextUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
