import React, { useEffect, useState } from 'react';
import './App.css';
import Recipes from './component/Recipes';
import spiner from './spinner.gif'
const App = () => {
  const APP_ID = '0d4cb643';
  const APP_KEY = 'e18d6d5d4796ef0f17b1b1d623c8b55f';
  
  const [loading , setloading] = useState(false);
  
  const [recipes, setRecipes] = useState([]);

  const [search, setSearch] = useState('');

  const [query, setQuery] = useState('chicken');

  const [error, setError] = useState(false);
  
  
	useEffect(() => {
		getRecipes();

    }, [query]);


  let order = null

  if(loading){
    order = <img src={spiner} width="130px" height="130px" className="vasat" />
  }
	const getRecipes = async () => {
			 setloading(true)
				setRecipes([])
			const response = await fetch(
				`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`
			);
			while(setloading(false)){
				setRecipes([])
			}
			const data = await response.json();
			setRecipes(data.hits);
			if (
				data.hits.length === null ||
				data.hits.length === 0 ||
				data.hits.length === '' ||
				data.hits.length === NaN
			) {
				setError(true);
				setRecipes([]);
				setTimeout(() => {
					setError(false);
				}, 2000);
			}
	};

	const getsearch = (e) => {
		e.preventDefault();
		setQuery(search);
	};

	return (
		<div className="app">
			<form onSubmit={getsearch} className="search-form">
				<input className="search-bar" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
				<button onClick={getsearch} className="search-button" type="submit">
					search
				</button>
			</form>
			<div className="recipes">
				{order}
				{!error ? (
					recipes.map((recipe) => {
						return (
							<Recipes
								key={recipe.recipe.label}
								title={recipe.recipe.label}
								calories={recipe.recipe.calories}
								image={recipe.recipe.image}
								ingredients={recipe.recipe.ingredients}
							/>
						);
					})
				) : (
					<div className="fetch-Faild">
						<h1>Nothing found</h1>
					</div>
				)}
			</div>
		</div>
	);
};
export default App;
