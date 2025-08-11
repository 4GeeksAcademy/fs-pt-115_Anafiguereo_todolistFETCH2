import React, { useEffect, useState } from "react";

// PASOS PARA LA API DE TAREAS

//Primero crear el usuario
//Primero traemos la información por si hay algo ya
// Creamos la funcionalidad para trabajar sobre ella
//      Crear funcionalidad:
//		GET: trae tareas y unimos el enlace de la API con el usuario que queremos traer
//           si no hay respuesta es porque el usuario no está creado
//			 esas tareas las guardamos en una variable (preferiblemente que se llame data)
//			 Luego editamos nuestra variable "todos" para tener la data que se ha recogido (setTodos)
//				 -> setTodos(data.todos)

const Home = () => {
	const [todos, setTodos] = useState([]) //esto son las tareas guardadas
	const [inputValue, setInputValue] = useState("") // este es el input para crear tareas
	const url = "https://playground.4geeks.com/todo"

	// CREAR USUARIO
	const createUser = async () => {
		const response = await fetch(url + "/users/Ana", {
			method: "POST"
		})
	}
	//TRAER TAREA
	const getTodos = async () => {
		// fetch e para trabajar con la api
		const response = await fetch(url + "/users/Ana")
		if (!response.ok) {
			createUser()
		}
		const data = await response.json()
		// aqui especificamos que nos traiga las tareas (todos) de data
		setTodos(data.todos)
	}

	// CREAMOS TAREAS
	const createTodo = async () => {
		const response = await fetch(url + "/todos/Ana", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				label: inputValue,
				isdone: false
			})
		})
		// con la tarea creada, actualizamos la lisya de tareas
		getTodos();
		setInputValue("") //para que después de hacer la tarea, el input quede vacío
	}
	// ELIMINAR TAREAS
	// es importante saber que las tareas tienen id, para eliminar esa que no quieres
	const deleteTodo = async (id) => {
		const response = await fetch(url + `/todos/${id}`, {
			method: "DELETE"
		})
		getTodos(); //actualizamos
	}
	// Configuramos el input para que al darle enter se meta en la galería de tareas
	const handleKeyUp = (event) => {
		if (event.key === "Enter" && inputValue.trim() !== "") {
			createTodo()
		}
	}

	useEffect(() => { getTodos() }, []) //El useEffect abajo de los pasos a relizar
	return (
		<div>
			<link rel="preconnect" href="https://fonts.googleapis.com"/>
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
			<link href="https://fonts.googleapis.com/css2?family=Alumni+Sans+Pinstripe:ital@0;1&display=swap" rel="stylesheet"/>
				<h1 className="d-flex justify-content-center align-items-center" style={{ color: "pink", fontSize: "150px", marginTop: "20px", fontFamily: "Alumni Sans Pinstripe" }}>
						Todos</h1>
				<div className="d-flex justify-content-center align-items-center" style={{ marginBottom: "10px" }} >
					<input
					type="text"
					value={inputValue}
					// esto es para indicar que el valor del input se está cambiando para ser editado
					onChange={(event) => { setInputValue(event.target.value) }}
					// cuando levante el botón ejecuta la funcion
					onKeyUp={handleKeyUp}/> 
				</div>
				<div className="rounded-3" style={
						{
							listStyle: "none", margin: "auto", width: "50%",
							borderWidth: todos.length>0 ? "2px": "0px", borderColor: "black", borderStyle: "solid", height: "auto" 
						}} >
						{/* aqui vamos a decirle que haga un recorrido del array que nos ha dado el response del get */}
						{todos.map((todo, index) => (
							<li className="d-flex justify-content-between mx-2" style={{fontFamily:"Alumni Sans Pinstripe", fontSize:"30px"}} key={todo.id}> {todo.label}
								<button className="d-flex justify-content-around align-items-center" style={{ margin:"2px", height:"35px", width:"35px"}}
								onClick={() => { deleteTodo(todo.id) }}>x</button>
							</li>
						))}
				</div>	
		</div>
	);
};

				export default Home;