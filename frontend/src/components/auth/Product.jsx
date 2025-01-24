import React from 'react';
import PropTypes from 'prop-types';

const Product = ({name,image,description,price})=>{
    return(
        <div className="bg-white p-4 rounded-lg hover:shadow-2xl transform transition-transform hover:scale-105 flex flex-col items-center">
            <div className="w-full">
                <img src={image} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">{name}</h2>
                <p className="text-sm text-gray-600 text-center mb-4">{description}</p>
            </div>
            <div className='w-full text-center'>
                <p className="text-lgfont-bold text-gray-900 mb-4">{price}</p>
                <button className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition-all">More Info</button>

            </div>
        </div>
    )
}

Product.propTypes={
    name:PropTypes.string.isRequired,
    image:PropTypes.string.isRequired,
    description:PropTypes.string.isRequired,
    price:PropTypes.number.isRequired,

}

export default Product;