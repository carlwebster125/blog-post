import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

const GetPokeData = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [showPokemonInfo, setShowPokemonInfo] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/piplup/");
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, []);

  const toggleInfoAndDescription = () => {
    setShowPokemonInfo(!showPokemonInfo);
    setShowDescription(!showDescription);
  };

  return (
    <div>
      <div className="pokemon-info-container">
        <h3>Pokemon Information</h3>
        {pokemonData && showPokemonInfo ? (
          <div className="pokemon-info">
            <p>Name: {pokemonData.name}</p>
            <p>Height: {pokemonData.height}</p>
            <p>Weight: {pokemonData.weight}</p>
            <p>Type: {pokemonData.type}</p>
          </div>
        ) : (
          <h5>Loading Pokémon data...</h5>
        )}
        <Button
          onClick={toggleInfoAndDescription}
          size="small"
          variant="contained"
          color="primary"
          sx={{
            fontSize: "11px",
            padding: "3px",
            minWidth: "10px",
          }}
        >
          {showPokemonInfo ? "Hide Pokemon Info" : "Show Pokemon Info"}
        </Button>
      </div>

      {showDescription && (
        <div className="description-container">
          <div className="description-box">
            <p>Description: Piplup is a light-blue, penguin-like Pokémon, which is covered in thick down to insulate against the cold. It has a dark blue head with a primarily white face and a short, yellow beak. The dark blue feathers on its head extend down its back and around its neck, which causes it to appear to be wearing a cape.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetPokeData;
