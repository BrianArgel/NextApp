import React, { useState, useContext } from 'react'
import Layout from '../components/layout/Layout'
import Router, { useRouter } from 'next/router'
import { FirebaseContext } from '../firebase'
import FileUploader from 'react-firebase-file-uploader'
import 'firebase/auth'

// validaciones
import useValidacion from '../hooks/useValidacion'
import validarCrearProducto from '../validacion/validarCrearProducto'

const STATE_INICIAL = {
	nombre: '',
	empresa: '',
	// imagen: '',
	url: '',
	descripcion: ''
}


const nuevoProducto = () => {

	//state images
	const [nombremagen, guardarNombre] = useState('')
	const [subiendo, guardarSubiendo] = useState(false)
	const [progreso, guardarProgreso] = useState(0)
	const [urlimagen, guardarUrlimagen] = useState('')



	const [error, guardarError] = useState('')
	const router = useRouter()

	const { valores, errores, submitForm, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto)
	const { nombre, empresa, imagen, url, descripcion } = valores;
	const { usuario, firebase } = useContext(FirebaseContext)



	async function crearProducto() {

		// si el usuario no esta autenticador

		if (!usuario) {
			return router.push("/login")
		}

		//crear objeto de productos
		const producto = {
			nombre,
			empresa,
			url,
			urlimagen,
			descripcion,
			votos: 0,
			comentarios: [],
			creado: Date.now(),
			creador: {
				id: usuario.uid,
				nombre: usuario.displayName
			},
			haVotado: []
		}

		//insertar base de datos 
		firebase.db.collection('producto').add(producto)

	}
	const handleUploadStart = () => {
		guardarProgreso(0)
		guardarSubiendo(true)
	}
	const handleProgress = progreso => guardarProgreso(progreso)
	const handleUploadError = error => {
		guardarSubiendo(error)
		console.error(error)
	}

	const handleUploadSuccess = (nombre) => {
		guardarProgreso(100)
		guardarSubiendo(false)
		guardarNombre(nombre)
		firebase
			.storage
			.ref("productos")
			.child(nombre)
			.getDownloadURL()
			.then(url => {
				console.log(url)
				guardarUrlimagen(url)
			})


	}
	if (!usuario) return "Esta pagina no es permitida para usted"
	return (
		<Layout>
			<>
				<h1 className="title">Nuevo Producto</h1>
				<form className="formulario"
					onSubmit={handleSubmit}
					noValidate
				>
					<fieldset>
						<legend>Informacion general</legend>

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
							<label htmlFor="empresa" className="label">Empresa</label>
							<input
								className="inputs"
								type="text"
								id="empresa"
								placeholder="Nombre empresa"
								name="empresa"
								value={empresa}
								onChange={handleChange}
								onBlur={handleBlur}

							/>
						</div>
						{errores.empresa && <p className="error">{errores.empresa}</p>}
						<div className="campo">
							<label htmlFor="empresa" className="label">Imagen</label>
							<FileUploader
								className="inputs"
								accept="image/*"
								id="imagen"
								name="imagen"
								randomizeFilename
								storageRef={firebase.storage.ref("productos")}
								onUploadStart={handleUploadStart}
								onUploadError={handleUploadError}
								onUploadSuccess={handleUploadSuccess}
								onProgress={handleProgress}

							/>
						</div>
						{errores.imagen && <p className="error">{errores.imagen}</p>}
						<div className="campo">
							<label htmlFor="empresa" className="label">Url</label>
							<input
								className="inputs"
								type="text"
								id="url"
								placeholder="Nombre url de tu producto"
								name="url"
								value={url}
								onChange={handleChange}
								onBlur={handleBlur}

							/>
						</div>

						{errores.url && <p className="error">{errores.url}</p>}
					</fieldset>

					<fieldset>
						<legend>Sobre tu producto</legend>
						<div className="campo">
							<label htmlFor="descripcion" className="label">Descripcion</label>
							<textarea
								className="textarea"
								id="descripcion"
								name="descripcion"
								value={descripcion}
								onChange={handleChange}
								onBlur={handleBlur}

							/>
						</div>

						{errores.descripcion && <p className="error">{errores.descripcion}</p>}
					</fieldset>
					<input
						className="inputSubmit"
						type="submit"
						value="Crear Producto"
					/>
				</form>

			</>
		</Layout>
	)
}

export default nuevoProducto
