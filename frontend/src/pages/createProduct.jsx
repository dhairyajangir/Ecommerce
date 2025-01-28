
import React, {useState, useEffect} from 'react'
import {AiOutlinePlusCircle} from 'react-icons/ai'

const CreateProduct = () => {
    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCatogery] = useState("");
    const [tags, setTags] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [email, setEmail] = useState("");
    const [previewImages, setPreviewImages] = useState([]);

    const categoriesData = [
        {title:"Fashion"},
        {title:"Electronics"},
        {title:"Books"},
        {title:"Home Appliances"},
    ]
    
        
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => prevImages.concat(files))
        const imagePreviews = files.map((file) => URL.createObjectURL(file))
        setPreviewImages((prevPreviews) => prevPreviews.concat(imagePreviews))
    }

    useEffect(() => {
        return() => {
            previewImages.forEach((url) => URL.revokeObjectURL(url))
        }
    },[previewImages])

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            name,
            description,
            category,
            tags,
            stock,
            price,
            email,
            images,
        };
        alert("Product Created Successfully");
        console.log("Product Details:",productData);
        setImages([]);
        setName("");
        setDescription("");
        setCatogery("");
        setTags("");
        setPrice("");
        setStock("");
        setEmail("");
    }

    return(
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 rounded-full '>
            <div className='w-[90%] max-w-[500px] bg-white shadow-md h-auto rounded-md p-6 mx-auto mt-8 sm:mt-16 lg:mt-24 mb-24 mr-14 ml-14 '>
                <h5 className='text-[24px] font-bold text-center mb-4 text-gray-700'>
                    Create Product
                </h5>
                <form onSubmit={handleSubmit}>
                    <div className='mt-4'>
                        <label className='pb-1 block text-gray-600 font-medium'>
                            Email <span className='text-red-500'>*</span>
                        </label>
                        <input type="email" name='email' value = {email} className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200' onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email...' required/>
                    </div>
                    <div className='mt-4'>
                        <label className='pb-1 block text-gray-600 font-medium'>
                            Name <span className='text-red-500'>*</span>
                        </label>
                        <input type="text" value = {name} className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200' onChange={(e) => setName(e.target.value)} placeholder='Enter Product Name...' required/>
                    </div>
                    <div className='mt-4'>
                        <label className='pb-1 block text-gray-600 font-medium'>
                            Description <span className='text-red-500'>*</span>
                        </label>
                        <textarea value={description} className='w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200 resize-none font-roboto' onChange={(e) => setDescription(e.target.value)} placeholder='Provide the product description' rows='3' cols='40' ></textarea>
                    </div>
                    <div className='mt-4'>
                        <label className='pb-1 block text-gray-600 font-medium'>
                            Category <span className='text-red-500'>*</span>
                        </label>
                        <select className='w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200' value={category} onChange={(e) => setCatogery(e.target.value)} required>
                            <option value="">Choose a Categroy</option>
                            {categoriesData.map((i) => (
                                <option value={i.title} ley={i.title}>
                                    {i.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mt-4'>
                        <label className='pb-1 block text-gray-600 font-medium'>
                            Tags
                        </label>
                        <input type="text" value = {tags} className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200' 
                        onChange={(e) => setTags(e.target.value)} placeholder='Enter Tags...' required/>
                    </div>
                    <div className='mt-4'>
                        <label className='pb-1 block text-gray-600 font-medium'>
                            Price <span className='text-red-500'>*</span>
                        </label>
                        <input type="number" value = {price} className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200' 
                        onChange={(e) => setPrice(e.target.value)} placeholder='Enter Product Price...' required/>
                    </div>
                    <div className='mt-4'>
                        <label className='pb-1 block text-gray-600 font-medium'>
                            Stock <span className='text-red-500'>*</span>
                        </label>
                        <input type="number" value = {stock} className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200' 
                        onChange={(e) => setStock(e.target.value)} placeholder='Enter Stock Quantity...' required/>
                    </div>
                    <div className='mt-4 rounded-full'>
                        <label className='pb-1 block text-gray-600 font-medium rounded-full text-center justify-center'>
                            Upload Images <span className='text-red-500'>*</span>
                        </label>
                        <input type="file" id="upload" className='hidden' multiple onChange={handleImageChange} required/>
                        <label htmlFor="upload" className='cursor-pointer rounded-full flex items-center justify-center w-[80px] h-[80px] bg-gray-700 hover:bg-gray-300 transition-colors duration-200'>
                            <AiOutlinePlusCircle size={30} color='white' />
                        </label>
                        <div className="flex flex-wrap mt-2">
                            {previewImages.map((img,index)=>(
                                <img src={img} key={index} alt={previewImages} className='w-[100px] h-[100px] object-cover m-2 rounded-md'/>
                            ))}
                        </div>
                    </div>
                    <button type='sumbit' className='w-full mt-6 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors duration-200'>Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct;
