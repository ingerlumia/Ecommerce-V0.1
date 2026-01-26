import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCreatedProduct, clearError } from "../../slices/productSlice";
import { sellerCreateProduct } from "../../actions/sellerAction";

export default function SellerNewProduct() {

    const [name, setName] = useState("");
    const [managerEmail, setmanagerEmail] = useState("");    
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);
    const [stock, setStock] = useState(0);
    const [category, setCategory] = useState("");
    const [seller, setSeller] = useState("");
    const [imagePreview, setImagePreview] = useState([]);

    const { isProductCreated, loading, error } = useSelector(state => state.sellerState);
    const { user } = useSelector(state => state.authState);
        
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Mobile Phones',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const onImageChange = (e)=>{
        const files = Array.from(e.target.files);

        files.forEach(file =>{
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState == 2){
                    setImagePreview(oldArray => [...oldArray,reader.result]);
                    setImages(oldArray => [...oldArray,file]);
                };
            };
           
            reader.readAsDataURL(file);
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',name)
        formData.append('price',price)
        formData.append('description',description)
        formData.append('category',category)
        formData.append('stock',stock)
        formData.append('seller',seller)
        formData.append('managerEmail',user.manager)
        images.forEach(image => {
            formData.append('images',image)
        });
        console.log(formData);
        dispatch(sellerCreateProduct(formData));
        
    }
    
    useEffect(() => {
       
        if(isProductCreated){
            toast.success('New Product Created Sucessfuly',{
                onOpen: ()=> dispatch(clearCreatedProduct())
            })
            navigate('/seller/sellerproductlist')
            return;
        }
        if(error){
            toast.error(error,{
                onOpen: ()=> dispatch(clearError())
            })
            return;
        }
       
    }, [isProductCreated,navigate,error,dispatch])

    return (
        <div className="container my-4">
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h4 className="card-title mb-3">Add Product</h4>

                    <form encType="multipart/form-data" onSubmit={submitHandler}>

                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter product name"
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Enter product description"
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                            ></textarea>
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                            <label className="form-label">Price (₹)</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter price"
                                onChange={e => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select className="form-select" name="category" onChange={e => setCategory(e.target.value)}>
                                <option value="">-- Select Category --</option>
                                {categories?.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>


                        <div className="mb-3">
                            <label className="form-label">Seller</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter seller name"
                                onChange={e => setSeller(e.target.value)}
                                value={seller}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Stock</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter stock quantity"
                                onChange={e => setStock(e.target.value)}
                                value={stock}
                            />
                        </div>

                        <div className="mb-3">
                            <h6>Manager Email : {user.manager}</h6>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Upload Images</label>
                            <input type="file" className="form-control" aria-required="true" multiple onChange={onImageChange}/>
                        </div>
                        {imagePreview.map((image,idx)=>(
                            <img 
                                className="mt-5 mr-3"
                                src={image}
                                key={idx}
                                height='50'
                                width='60'
                                
                            />
                        ))}
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                Save Product
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

