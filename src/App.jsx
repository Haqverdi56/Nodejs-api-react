import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { axiosNetwork, BASE_URL } from './axios/axiosInstance';




function App() {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState({name:'', description:""});

  const { data, isLoading, refetch} = useQuery("product", async () => {
    return axiosNetwork.getAll(BASE_URL)
    .then(res => setProducts(res))
  })
 
 console.log(products);

 
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setNewProducts({
      ...newProducts,
      [name]: value
    }
    )
  }
  
  const formSubmit = (e) => {
    e.preventDefault();
    axiosNetwork.addItem(BASE_URL, newProducts)
    .then(() => {
      refetch()
    })
  }

  const deleteProduct = (id) => {
    console.log(id);
    axiosNetwork.delete(BASE_URL,id)
    .then(()=> {
      refetch()
    })
  }

  const addFavorites = (el) => {
    
  }
  console.log(newProducts.name);
  return (
    <div className="App">
      <div className='formDiv'>
        <form onSubmit={formSubmit}>
          <div>
            <input onChange={handleChange} id='name' name='name' type="text" placeholder='Name' />
          </div>
          <div>
            <input onChange={handleChange} type="text" name='description' placeholder='Description' />
          </div>
          <button type='submit' disabled={newProducts.name.length < 1 || newProducts.description.length < 1 ? true : null}>Add</button>
        </form>
      </div>
      <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {
                products && products.map((el,i) => (
                  <tr key={i}>
                    <td>{el.name}</td>
                    <td>{el.description}</td>
                    <td><button onClick={()=> deleteProduct(el._id)}>Delete</button></td>
                  </tr>
                ))
              }
          </tbody>
        </table>
    </div>
  )
}

export default App
