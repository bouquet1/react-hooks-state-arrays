import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterByCuisine, setFilterByCuisine] = useState("All");

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    const newFoodArr = [...foods, newFood];
    setFoods(newFoodArr);
    //console.log(newFoodArr);
  }

  function handleClick(id) {
    const newFoodArr = foods.filter((food) => food.id !== id);
    setFoods(newFoodArr);
    //I used it for foodListbyCuisine variable to remove the linked food. It can be raplaced with handleLiClick to increment the heat level instead of removing the clicked link.
  }

  function handleLiClick(id) {
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return { ...food, heatLevel: food.heatLevel + 1 };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }

  function handleFilterCuisine(e) {
    setFilterByCuisine(e.target.value);
    //console.log(filterByCuisine);
  }

  const foodList = foods.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  const foodsToDisplay = foods.filter((food) => {
    if (filterByCuisine === "All") {
      return true;
    } else {
      return filterByCuisine === food.cuisine;
    }
  });

  const foodListbyCuisine = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
      <>
        <select name="filter" onChange={handleFilterCuisine}>
          <option value="All">All</option>
          <option value="American">American</option>
          <option value="Sichuan">Sichuan</option>
          <option value="Thai">Thai</option>
          <option value="Mexican">Mexican</option>
        </select>
        <ul>{foodListbyCuisine}</ul>
      </>
    </div>
  );
}

export default SpicyFoodList;
