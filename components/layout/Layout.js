import React from 'react'
import Header from './Header'
import Head from 'next/head'
const Layout = (props) => {
    return (
        <>
            <Head>
                <html lang="es" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" />
                <title>ProductHunt | Brian</title>
            </Head>
            <Header />
            <hr className="line" />
            <main>
                {props.children}
            </main>
        </>
    )
}

export default Layout
