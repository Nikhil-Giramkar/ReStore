import React, { useEffect } from "react"
import { Product } from "../models/Product";

function App() {

  //Initializing products state, with an array of objects
  const [products, setProducts] = React.useState<Product[]>([])

  function addProduct() {
    setProducts(prevState => [
      ...prevState, //Retaining previous values via spread operator.
      {
        id: prevState.length + 101,
        name: 'product ' + (prevState.length + 1), //Increment name
        price: (prevState.length * 100 + 100), //Increment price
        pictureUrl: "http://picsum/photos/200", //Some random URL 
        type: "some type",
        brand: "some brand",
        quantityInStock: Math.random() * 100,
        description: "some desc",
      }
    ])
  }

  //UseEffect 
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json()) //promise returned
      .then(data => setProducts(data)); //promise returned -> state initialized
  }
    , []) //Adding an empty depenedancy array, so that we fetch data only once when app loads, else we will be trapped in endless loop


  return (
    <div>
      <h1>Re-Store</h1>
      <ul>
        {products.map((product) => ( //Map function to add li tag to each item
          <li key={product.id}>{product.name} - {product.price}</li> //Adding index as unique key (for stable identity)
        ))}
      </ul>

      <button onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default App