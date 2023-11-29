import { Product } from "../app/models/Product"

interface Props {
    products: Product[]; //products is an array of type Product
    addProduct: () => void; // addProduct is a method with no parameter and void return type
}

export function Catalog({products, addProduct}: Props) {
    return (
        <>
            <h3>Catalog Component</h3>

            <ul>
                {products.map((product) => ( //Map function to add li tag to each item
                    <li key={product.id}>{product.name} - {product.price}</li> //Adding index as unique key (for stable identity)
                ))}
            </ul>


            <button onClick={addProduct}>Add Product</button>

        </>
    )
}