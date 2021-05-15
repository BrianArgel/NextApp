import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'
import Link from 'next/link'
const DetallesProducto = ({ producto }) => {
	console.log(producto)
	const { id, nombre, empresa, url, urlimagen, descripcion, creado, votos, comentarios } = producto
	return (

		<li className="li">
			<div className="descripcion">
				<div>
					<img src={urlimagen} className="Imagen" />
				</div>
				<div>
					<Link href="/productos/[id]" as={`/productos/${id}`}>
						<h1>{nombre}</h1>
					</Link>
					<p>{descripcion}</p>
					<div className="comentarios">
						<div className="div">
							<img src="/images/comentario.png" className="imgs" />
							<p className="p">{comentarios.length} Comentarios</p>
						</div>
					</div>
					<p>Publicado hace: {formatDistanceToNow(new Date(creado), { locale: es })}</p>
				</div>
			</div>
			<div>
				<div className="central">
					&#9650;
							<p>{votos}</p>
				</div>

			</div>
		</li>

	)
}

export default DetallesProducto
