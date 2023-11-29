import React, { useEffect } from "react"

function App() {

  //Initializing products state, with an array of objects
  const [products, setProducts] = React.useState(
    [{name: 'product 1', price: 100.00},
    {name: 'product 2', price: 200.00}]
    )

    function addProduct(){
      setProducts(prevState => [
        ...prevState, //Retaining previous values via spread operator.
        {
          name: 'product '+(prevState.length + 1), //Increment name
          price: (prevState.length*100 + 100) //Increment price
        }
      ])
    }

    //UseEffect 
    useEffect(()=>{
      fetch('http://localhost:5000/api/products') 
      .then(res => res.json()) //promise returned
      .then(data => setProducts(data)); //promise returned -> state initialized
    }
    ,[]) //Adding an empty depenedancy array, so that we fetch data only once when app loads


  return (
    <div>
      <h1>Re-Store</h1>
      <ul>
        {products.map((item, idx) => ( //Map function to add li tag to each item
          <li key={idx}>{item.name} - {item.price}</li> //Adding index as unique key (for stable identity)
        ))}
      </ul>

      <button onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default App
