import { useDispatch, useSelector } from "react-redux";
import { selectProductById } from "../../store/modules/collections/products/selectors";
import Product from "../../components/Product/Product";
import { cartActions } from "../../store/modules/cart";

const ProductContainer = ({ productId }) => {
    console.log("RENDER = CONTAINER = PRODUCT");
    const product = useSelector(state => selectProductById(state, productId))

    const dispatch = useDispatch();
    const onAdd = () => dispatch(cartActions.addProduct({productId}))
    const onRemove = () => dispatch(cartActions.removeProduct({productId}))

    return(
        <>
            {product ? <Product product={product} onAdd={onAdd} onRemove={onRemove}/> : null}
        </>
    )
}

export default ProductContainer;