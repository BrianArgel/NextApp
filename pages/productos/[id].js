import React, { useEffect, useContext, useState } from 'react'
import Layout from '../../components/layout/Layout'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'
import { useRouter } from 'next/router'
import { FirebaseContext } from '../../firebase'
import Error404 from '../../components/layout/404'
const Producto = () => {

	const [producto, guardarProducto] = useState({});
	const [error, guardarError] = useState(false)
	const [comentario, guardarComentario] = useState({});
	const { firebase, usuario } = useContext(FirebaseContext)
	const router = useRouter()
	const { query: { id } } = router;
	useEffect(() => {
		if (id) {
			const obtenerProducto = async () => {
				const productoQuery = await firebase.db.collection('producto').doc(id)
				const producto = await productoQuery.get();
				if (producto.exists) {
					guardarProducto(producto.data());
				} else {
					guardarError(true);
				}

			}
			obtenerProducto()
		}
	}, [id, producto])

	if (Object.keys(producto).length === 0) return 'Cargando...'
	const { nombre, empresa, url, urlimagen, descripcion, creado, creador, votos, comentarios, haVotado } = producto
	const votarProducto = () => {
		const nuevoTotal = votos + 1;
		if (haVotado.includes(usuario.uid)) return;

		//guardarUsuario votado 
		const hanVotado = [...haVotado, usuario.uid]
		//actualizar db
		firebase.db.collection('producto').doc(id).update({
			haVotado: hanVotado,
			votos: nuevoTotal
		})



		//acutalizar status
		guardarProducto({
			...producto,
			votos: nuevoTotal,
		})
	}
	//es creador
	const esCreador = id => {
		if (creador.id == id) {
			return true
		}
	}
	//funcion para crear  comentarios
	const comentarioChange = e => {
		guardarComentario({
			...comentario,
			[e.target.name]: e.target.value
		})
	}

	const agregarComentario = e => {
		e.preventDefault();
		//informacion extra
		comentario.usuarioUid = usuario.uid;
		comentario.usuarioNombre = usuario.displayName;

		//tomar copia comentarios
		const nuevosComentarios = [...comentarios, comentario]
		console.log(comentario)

		// actualizar DB
		firebase.db.collection('producto').doc(id).update({
			comentarios: nuevosComentarios
		})

		//actualizar States
		guardarProducto({
			...producto,
			comentarios: nuevosComentarios
		})


	}
	return (
		<>
			<Layout>
				{error && <Error404 />}
				<div className="contenedor">
					<h1 className="noExist">{nombre}</h1>
				</div>
				<div className="contenedor-producto">
					<div>
						<p>Publicado hace: {formatDistanceToNow(new Date(creado), { locale: es })}</p>
						<p>Publicado por: {creador.nombre} de {empresa}</p>
						<img src={urlimagen} />
						<p>{descripcion}</p>
						{usuario && (
							<>
								<h2>Agrega tu Comentario</h2>
								<form
									onSubmit={agregarComentario}
								>
									<div className="campo">
										<input
											className="inputs"
											type="text"
											name="mensaje"
											onChange={comentarioChange}

										/>
									</div>
									<input
										type="submit"
										className="inputSubmit"
										value="Enviar comentario"

									/>
								</form>
							</>
						)}

						<h2>Comentarios</h2>
						{comentarios.length === 0 && "Aun no hay comentarios"}
						<ul>
							{comentarios.map(comentario => (
								<li className="lista">
									<p className="bold">{comentario.mensaje}</p>
									<p>Escrito por {comentario.usuarioNombre}</p>
									{esCreador(comentario.usuarioUid) && <span className="creador">Es creador</span>}
								</li>
							))}
						</ul>
					</div>
					<aside>
						<button
							className="inputSubmit"
							target="_blank"
							href={url}
						>Visitar Link</button>
						{usuario && (
							<button
								className="inputSubmits"
								onClick={votarProducto}
							>Votar</button>
						)}

						<p className="voto">votos {votos}</p>
					</aside>
				</div>
			</Layout>

		</>
	)
}

export default Producto
