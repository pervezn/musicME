import * as React from 'react'

interface CarsProps {
    name: string,
    color: string
}

const Cars = (props: CarsProps) => {

    return (
        <>
            <h1>Cars</h1>
            <p>HELLO</p>
        </>
    )
}

export default Cars