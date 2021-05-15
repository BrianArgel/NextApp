import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import Router from 'next/router'
import firebase from '../firebase'
import 'firebase/auth'

// validaciones
import useValidacion from '../hooks/useValidacion'
import validarCrearCuenta from '../validacion/validarCrearCuenta'

const STATE_INICIAL = {
	nombre: '',
	email: '',
	password: ''
}
const crearCuenta = () => {
	const [error, guardarError] = useState('')


	const { valores, errores, submitForm, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta)
	const { nombre, email, password } = valores;
	async function crearCuenta() {
		try {
			await firebase.registrar(nombre, email, password);
			Router.push("/")
		} catch (error) {
			console.log("Hubo un error", error);
			if (error.code === "auth/email-already-in-use") {
				guardarError("Email Ya esta en uso")
			}
		}
	}
	return (
		<Layout>
			<>
				<h1 className="title">Crear cuenta</h1>
				<form className="formulario"
					onSubmit={handleSubmit}
					noValidate
				>
					<div className="campo">
						<label htmlFor="nombre" className="label">Nombre</label>
						<input
							className="inputs"
							type="text"
							id="nombre"
							placeholder="Nombre"
							name="nombre"
							value={nombre}
							onChange={handleChange}
							onBlur={handleBlur}

						/>
					</div>
					{errores.nombre && <p className="error">{errores.nombre}</p>}
					<div className="campo">
						<label htmlFor="nombre" className="label">Email</label>
						<input
							className="inputs"
							type="text"
							id="email"
							placeholder="email"
							name="email"
							value={email}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
					{errores.email && <p className="error">{errores.email}</p>}
					<div className="campo">
						<label htmlFor="nombre" className="label">Password</label>
						<input
							className="inputs"
							type="password"
							id="password"
							placeholder="Tu contraseña"
							name="password"
							value={password}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
					{errores.password && <p className="error">{errores.password}</p>}
					{error && <p className="error">{error}</p>}
					<input
						className="inputSubmit"
						type="submit"
						value="Crear Cuenta"
					/>
				</form>

			</>
		</Layout>
	)
}

export default crearCuenta
