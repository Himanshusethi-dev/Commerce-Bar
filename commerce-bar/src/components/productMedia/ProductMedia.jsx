import React from 'react'

const ProductMedia = ({ data }) => {
    return (
        <>
            {data.images.edges.map((item) => (
                <div key={item.node.id}  className="mediaContainer">
                    <div className="prodimage">
                        <img src={item.node.url} />
                    </div>

                </div>
            ))}
        </>
    )
}

export default ProductMedia