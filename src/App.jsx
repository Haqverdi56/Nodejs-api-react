import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { axiosNetwork, BASE_URL } from './axios/axiosInstance';
import { Modal } from 'antd';



function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState({name:'', description:""});
  const [updateItem, setUpdateItem] = useState({id: undefined,name: "",description: ""})

  
  const {refetch} = useQuery("product", async () => {
    return axiosNetwork.getAll(BASE_URL)
    .then(res => setProducts(res))
  })
 
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
    axiosNetwork.add(BASE_URL, newProducts)
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

  const handleUpdate = () => {
    setIsModalOpen(false);
    axiosNetwork.update(BASE_URL, updateItem.id, updateItem)
      .then(() => {
        refetch()
      })
  };
  const productUpdate = (item) => {
    setIsModalOpen(true);
    setUpdateItem({
      id: item._id,
      name: item.name,
      description: item.description,
    })
  }
  const isUpdated = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUpdateItem(
      {
        ...updateItem,
        [name]: value
      }
    )
  }
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
                    <td><button className='updatebtn' onClick={() => productUpdate(el)}>Update</button></td>
                  </tr>
                ))
              }
              <Modal open={isModalOpen} onOk={handleUpdate} onCancel={() => setIsModalOpen(false)} >
              {
                updateItem && (
                  <div className='modal'>
                    <div>
                      <label htmlFor="Name">Name</label>
                      <input type="text" value={updateItem.name} name='name' id='Name' onChange={isUpdated} />
                    </div>
                    <div>
                      <label htmlFor="description">Description</label>
                      <input type="text" value={updateItem.description} name='description' id='description' onChange={isUpdated} />
                    </div>
                  </div>
                )
              }
            </Modal>
          </tbody>
        </table>
    </div>
  )
}

export default App
