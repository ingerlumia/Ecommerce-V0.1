import { Fragment } from "react";
//import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Wishlist({ wish, setWish, cartItems, setCartItems }) {


    //product qty increase
    function incQty(item) {
        if (item.product.stock == item.qty) {
            return;
        }
        const updateItem = wish.map((i) => {
            if (i.product._id == item.product._id) {
                i.qty++;
            }
            return i;
        })
        setWish(updateItem);
    }

    //product qty decrease
    function descQty(item) {
        if (item.qty > 1) {

            const updateItem = wish.map((i) => {
                if (i.product._id == item.product._id) {
                    i.qty--;
                }
                return i;
            })
            setWish(updateItem)
        }
    }

    function removeItem(item) {
        const updateItem = wish.filter((i) => {
            if (i.product._id !== item.product._id) {
                return true;
            }
        })
        setWish(updateItem);
    }


    //Add to cart
    function addToCart(item) {
        const qty = item.qty;
        const product = item.product;
        
        const check = cartItems.some(i => i.product._id === item.product._id);
        
        if(check){
            toast.warning('Already in Cart');
        }

        if (!check) {
            const newItem = { product, qty }
            setCartItems((state) => [...state, newItem]);
            toast.success("Added To Cart Successfuly");
        }

    }



    return wish.length > 0 ? <Fragment>
        <h1>WishList</h1>
        {wish.map((item, index) =>
        (<Fragment key={item.product._id || index}>
            <div>
                <h1 className="title">{item.product.title}</h1>
            </div>
            <div className="image-div">
                <img
                alt="images"
                    className="image"
                    src={('http://localhost:2005/') + item.product.image}>

                </img>
            </div>
            <h5>{item.product.stock > 0 ? `In Stock` : 'Out Of Stock'}</h5>
            <div className="price-div">
                <span className="price"><h6>Price : {item.product.price}</h6></span>
                <span className="mrp"><h6>MRP :{item.product.mrp} </h6></span>
            </div>
            <button onClick={() => incQty(item)}>+</button>
            <button onClick={() => descQty(item)}>_</button>
            <input type="number" value={item.qty} readOnly></input>
            <button type="button" onClick={() => addToCart(item)} disabled={item.product.stock == 0} >Add To Cart</button>
            <button onClick={() => removeItem(item)}>remove</button>
            <h6 className="description">{item.product.description}</h6>

        </Fragment>)
        )}
    </Fragment> : <h6>Nooo Wishes Found</h6>
}