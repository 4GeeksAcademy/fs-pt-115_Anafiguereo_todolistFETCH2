import React, { useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

//Primero traemos la información por si hay algo ya
// Creamos la funcionalidad para trabajar sobre ella


const Home = () => {

	const url = "https://playground.4geeks.com/todo"
	
	const getTodos = async () => {
		// fetch e para trabajar con la api
		const response = fetch(url+"/users/Ana")
		if (!response.ok) {
			alert("The user is not created")
		}
		const data = await response.json()
		console.log(data)
	}
	useEffect(()=> {getTodos()}, [] )
	return (
		<div>
			<div>
				<li>
					
				</li>
			</div>
		</div>
	);
};

export default Home;