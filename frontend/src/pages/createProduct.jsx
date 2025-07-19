import React, { useState, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../components/auth/nav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categoriesData = [
  { title: "Electronics" },
  { title: "Fashion" },
  { title: "Books" },
  { title: "Home Appliances" },
];

const CreateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [email, setEmail] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch for edit mode
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      axios
        .get(`http://localhost:8000/api/v2/product/product/${id}`)
        .then((resp) => {
          const p = resp.data.product;
          setName(p.name);
          setDescription(p.description);
          setCategory(p.category);
          setTags(p.tags || "");
          setPrice(p.price);
          setStock(p.stock);
          setEmail(p.email);
          setPreviewImages(
            (p.images || []).map((imgPath) => `http://localhost:8000${imgPath}`)
          );
          // Don't set 'images' so old files aren't resubmitted, only user uploads new ones.
        })
        .catch((err) => {
          toast.error("Error fetching product!");
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  // Handle image preview/update
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => prev.concat(files));
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => prev.concat(previews));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("email", email);
    images.forEach((image) => formData.append("images", image));

    try {
      let response;
      if (isEdit) {
        response = await axios.put(
          `http://localhost:8000/api/v2/product/update-product/${id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response.status === 200) {
          toast.success("Product updated!");
          navigate("/my-products", { replace: true });
        }
      } else {
        response = await axios.post(
          "http://localhost:8000/api/v2/product/create-product",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response.status === 201) {
          toast.success("Product created!");
          setImages([]);
          setPreviewImages([]);
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
      toast.error("Failed to save product. Please check the data and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 py-8">
        <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 mx-auto">
          <h5 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {isEdit ? "Edit Product" : "Create Product"}
          </h5>
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isEdit} // for consistency, usually seller email doesn't change
              />
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                rows="3"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Choose a category</option>
                {categoriesData.map((c) => (
                  <option value={c.title} key={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter product tags eg. gadget, mobile, new"
              />
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={0}
                value={price}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                required
              />
            </div>

            {/* Stock */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={0}
                value={stock}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setStock(e.target.value)}
                placeholder="Enter available stock quantity"
                required
              />
            </div>

            {/* Image uploader */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                {isEdit ? "Upload New Images (optional)" : "Upload Images"}{" "}
                {!isEdit && <span className="text-red-500">*</span>}
              </label>
              <input
                id="upload"
                name="image"
                type="file"
                className="hidden"
                multiple
                onChange={handleImageChange}
                required={!isEdit}
              />
              <label
                htmlFor="upload"
                className="inline-flex items-center cursor-pointer gap-2 font-semibold text-blue-700 hover:underline"
              >
                <AiOutlinePlusCircle size={28} />{" "}
                {isEdit ? "Add More Images" : "Select Images"}
              </label>
              <div className="flex flex-wrap gap-2 mt-3">
                {previewImages.map((img, index) => (
                  <img
                    src={img}
                    key={index}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              disabled={loading}
            >
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                ? "Update Product"
                : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
