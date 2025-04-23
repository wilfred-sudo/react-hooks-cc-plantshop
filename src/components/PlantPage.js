import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(res => res.json())
      .then(data => setPlants(data));
  }, []);

  function handleAddPlant(newPlant) {
    setPlants(prev => [...prev, newPlant]);
  }

  function handleSoldOutToggle(id) {
    setPlants(prev => prev.map(plant =>
      plant.id === id ? { ...plant, isSoldOut: !plant.isSoldOut } : plant
    ));
  }

  const displayedPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearchChange={setSearchQuery} />
      <PlantList plants={displayedPlants} onSoldOutToggle={handleSoldOutToggle} />
    </main>
  );
}

export default PlantPage;
