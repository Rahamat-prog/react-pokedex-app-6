import Search from '../Search/Search'
import React, {useState } from 'react'
import "./Pokedex.css"
import Pokemonlist from '../PokemonList/PokemonList'
import PokemonDetails from '../PokemonDetails/PokemonDetails'

const Pokedex = () => {

  const [searchTerm, setSearchTerm] = useState('')

  

  return (
    <div className="pokedex-wrapper">
      <Search updateSearchTerm={setSearchTerm} />
     
{     searchTerm.length == 0 ? <Pokemonlist /> : <PokemonDetails key={searchTerm} pokemonName={searchTerm} /> }
    </div>
  );
}

export default Pokedex;