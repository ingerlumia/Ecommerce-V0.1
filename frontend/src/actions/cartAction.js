import { addCartItemRequest, addCartItemSucess } from "../slices/cartSlice"
import api from "./api";

export const addCartItem = (id, qty) => async(dispatch) => {
    try {
        dispatch(addCartItemRequest);
        const { data } = await api.get(`/api/product/singleProduct/${id}`);
        dispatch(addCartItemSucess({
            product: data.product._id,
            name: data.product.name,
            description: data.product.description,
            price: data.product.price,
            image: data.product.images[0].image,
            stock: data.product.stock,
            seller: data.product.seller,
            qty
        }));
    } catch (error) {
        throw error;
    }
}