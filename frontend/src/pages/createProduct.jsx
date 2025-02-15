import React,{useState,useEffect} from 'react'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import NavBar from '../components/auth/nav';

const CreateProduct=()=>{
    const {id}=useParams();
    const navigate=useNavigate();
    const isEdit=Boolean(id);
    const[images,setImages]=useState([]);
    const[name,setName]=useState("");
    const[description,setDescription]=useState("");
    const[category,setCategory]=useState("");
    const[tags,setTags]=useState("");
    const[price,setPrice]=useState("");
    const[stock,setStock]=useState("");
    const[email,setEmail]=useState("");
    const[previewImages,setPreviewImages]=useState([]);
   
    const categoriesData=[
        {title:"Faishon"},
        {title:"Electornics"},
        {title:"Books"},
        {title:"Home Appliances"},
    ]

    const handleImageChange=(e)=>{
        const files=Array.from(e.target.files);
        setImages((prevImages)=>prevImages.concat(files))
        const imagePreviews=files.map((file)=>URL.createObjectURL(file))
        setPreviewImages((prevPreviews)=>prevPreviews.concat(imagePreviews))
    }
    
    useEffect(()=>{
        if(isEdit){
            axios.get(`http://localhost:8000/api/v2/product/product/${id}`).then((response)=>{
                const p=response.data.product;
                setName(p.name);
                setDescription(p.description);
                setCategory(p.category);
                setTags(p.tags||" ");
                setPrice(p.price);
                setStock(p.stock);
                setEmail(p.email);
                if(p.images && p.images.length>0){
                    setPreviewImages(p.images.map((imgPath)=>
                    `http://localhost:8000${imgPath}`))
                }
            }).catch((err)=>{
                console.error(`Error Fetching Product ${err}`)
            })
        }
    },[id,isEdit]) //To avoid storage issues


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Hi")
      
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("email", email);
      
        images.forEach((image) => {
            formData.append("images", image);
        });
      
        try {
            if(isEdit){
                const response= await axios.put(`http://localhost:8000/api/v2/product/update-product/${id}`,formData,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                if(response.status===200){
                    alert("Details Updated!")
                    navigate('/my-products',{replace:true})
                }
            }
            else{

                const response = await axios.post("http://localhost:8000/api/v2/product/create-product", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                
                if (response.status === 201) {
                    alert("Product created successfully!");
                setImages([]);
                setName("");
                setDescription("");
                setCategory("");
                setTags("");
                setPrice("");
                setStock("");
                setEmail("");
            }
        }
        } catch (err) {
            console.error("Error creating product:", err);
            alert("Failed to create product. Please check the data and try again.");
        }
      };
      
    return(
        <>
        <NavBar/>
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300'>
            <div className='w-[90%] max-w-[500px] bg-white shadow-md h-auto rounded-md p-6 mx-auto mt-8 sm:mt-16 lg:mt-24'>
                <h5 className='text-[24px] font-bold text-center mb-4 text-gray-700'>
                    Create Product
                </h5>
                <form onSubmit={handleSubmit}>
                    <div className='mt-4'>
                        <label className='pb-1 block text-gray-600 font-medium'>
                            Email <span className='text-red-500'>*</span>
                        </label>
                        <input type='email' name='email' value={email} 
                        className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200'
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder='Enter Email...'
                        required/>
                    </div>
                    <div className='mt-4'>
                        <label className='pb-1 block text-gray-600 font-medium'>
                            Name <span className='text-red-500'>*</span>
                        </label>
                        <input type='text' value={name} 
                        className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200'
                        onChange={(e)=>setName(e.target.value)}
                        placeholder='Enter Product Name...'
                        required/>
                    </div>
                    <div className='mt-4'>
                    <label className='pb-1 block text-gray-600 font-medium'>
                            Description <span className='text-red-500'>*</span>
                    </label>
                    <textarea value={description} className='w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200'
                    onChange={(e)=>setDescription(e.target.value)}
                    placeholder='Provide the product description'
                    rows='3'
                    cols='40'
                    ></textarea>
                    </div>
                    <div className='mt-4'>
                    <label className='pb-1 block text-gray-600 font-medium'>
                            Category <span className='text-red-500'>*</span>
                    </label>
                    <select className='w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200'
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    required>
                        <option value="">Choose a Category</option>
                        {categoriesData.map((i)=>(
                            <option value={i.title} key={i.title}>
                                {i.title}
                            </option>
                        ))}
                    </select>
                    </div>
                    <div className='mt-4'>
                        <label className='pb-1 block text-gray-600 font-medium'>
                            Tags
                        </label>
                        <input type='text' value={tags} 
                        className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200'
                        onChange={(e)=>setTags(e.target.value)}
                        placeholder='Enter Tags'
                        />
                    </div>
                    <div className='mt-4'>
                        <label className='pb-1 block text-gray-600 font-medium'>
                            Price <span className='text-red-500'>*</span>
                        </label>
                        <input type='number' value={price} 
                        className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200'
                        onChange={(e)=>setPrice(e.target.value)}
                        placeholder='Enter Product Price...'
                        required/>
                    </div>
                    <div className='mt-4'>
                        <label className='pb-1 block text-gray-600 font-medium'>
                            Stock <span className='text-red-500'>*</span>
                        </label>
                        <input type='number' value={stock} 
                        className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200'
                        onChange={(e)=>setStock(e.target.value)}
                        placeholder='Enter Stocks/Quantity...'
                        required/>
                    </div>
                    <div className='mt-4'>
                        <label className='pb-1 block text-gray-600 font-medium'>
                            Upload Images <span className='text-red-500'>*</span>
                        </label>
                        <input type='file' id='upload' className='hidden' multiple onChange={handleImageChange} required={!isEdit}/>
                        <label htmlFor='upload' className='cursor-pointer flex items-center justify-center w-[100px] h-[100px] bg-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200'>
                            <AiOutlinePlusCircle size={30} color='#555555'/>
                        </label>
                        <div className='flex flex-wrap mt-2'>
                            {previewImages.map((img,index)=>(
                                <img src={img} key={index} alt="Preview" className='w-[100px] h-[100px] object-cover m-2 rounded-md'/>

                            ))}
                        </div>
                    </div>
                    <button type='submit' className='w-full mt-6 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors duration-200'>
                        Create
                    </button>
                    
                </form>
            </div>

        </div>
    </>
    )
}

export default CreateProduct;