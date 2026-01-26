import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { getProduct } from "../../actions/productAction";
import { sellerGetProduct, sellerUpdateProduct } from "../../actions/sellerAction";
import { clearUpdatedProduct, sellerclearError } from "../../slices/sellerSlice";

export default function SellerUpdateProduct() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);
    const [stock, setStock] = useState(0);
    const [category, setCategory] = useState("");
    const [seller, setSeller] = useState("");
    const [sellerID, setSellerID] = useState("");
    const [imagePreview, setImagePreview] = useState([]);
    const [clearImages, setClearImages] = useState(false);

    const { isProductUpdated, loading, error, product={} } = useSelector(state => state.sellerState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id:productId} = useParams();
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
    const clearImageHandler = ()=>{
        setImages([]);
        setImagePreview([]);
        setClearImages(true);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',name)
        formData.append('price',price)
        formData.append('description',description)
        formData.append('category',category)
        formData.append('stock',stock)
        formData.append('seller',JSON.stringify({id:sellerID,name:seller}))
        images.forEach(image => {
            formData.append('images',image)
        });
        formData.append('clearImages',clearImages)
        dispatch(sellerUpdateProduct(formData,productId));
        
    }
    
    useEffect(() => {
       
        if(isProductUpdated){
            toast.success('Product Updated Sucessfuly',{
                onOpen: ()=> dispatch(clearUpdatedProduct())
            })
            navigate('/seller/sellerproductlist')
            return;
        }
        if(error){
            toast.error(error,{
                onOpen: ()=> dispatch(sellerclearError())
            })
            return;
        }
        dispatch(sellerGetProduct(productId))
       
    }, [isProductUpdated,,error,dispatch])

    useEffect(()=>{
        if(product._id){
            setName(product.name);
            setCategory(product.category);
            setDescription(product.description);
            setPrice(product.price);
            setStock(product.stock);
            setSeller(product.seller.name);
            setSellerID(product.seller.id);
            
            let imgs = [];
            product.images.forEach( img => {
                imgs.push(img.image);
            })

            setImagePreview(imgs)
        }
    },[product])

    return (
        <div className="container my-4">
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h4 className="card-title mb-3">Update Product</h4>

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
                            <select className="form-select" name="category" value={category} onChange={e => setCategory(e.target.value)}>
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
                            <label className="form-label">Upload Images</label>
                            <input type="file" className="form-control" multiple onChange={onImageChange}/>
                        </div>
                        {imagePreview.length > 0 && <span onClick={clearImageHandler} style={{cursor:'pointer'}}><FaTrash /> </span>}
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

