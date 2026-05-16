import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Edit2, Trash2 } from 'lucide-react';

const AdminInventory = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    description: ''
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { ...formData, price: Number(formData.price) };
    if (isEditing) {
      updateProduct(currentId, productData);
    } else {
      addProduct(productData);
    }
    setFormData({ name: '', category: '', price: '', image: '', description: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description || ''
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: '', category: '', price: '', image: '', description: '' });
  };

  return (
    <div className="container" style={{padding: '2rem'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1 className="page-title">Inventory Management</h1>
      </div>

      <div className="glass" style={{padding: '2rem', borderRadius: '12px', marginBottom: '3rem'}}>
        <h3 style={{marginBottom: '1rem'}}>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem'}}>
          <input type="text" name="name" className="input" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="category" className="input" placeholder="Category" value={formData.category} onChange={handleChange} required />
          <input type="number" name="price" className="input" placeholder="Price" step="0.01" value={formData.price} onChange={handleChange} required />
          <input type="url" name="image" className="input" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
          <textarea name="description" className="input" placeholder="Description" value={formData.description} onChange={handleChange} style={{gridColumn: '1 / -1', minHeight: '100px'}} required></textarea>
          
          <div style={{gridColumn: '1 / -1', display: 'flex', gap: '1rem'}}>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update Product' : 'Add Product'}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-outline" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-responsive glass" style={{padding: '1.5rem', borderRadius: '12px'}}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td><img src={product.image} alt={product.name} style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px'}} /></td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${Number(product.price).toFixed(2)}</td>
                <td>
                  <div style={{display: 'flex', gap: '0.5rem'}}>
                    <button className="icon-btn" onClick={() => handleEdit(product)} style={{background:'none', border:'none', cursor:'pointer'}}><Edit2 size={18} /></button>
                    <button className="icon-btn" onClick={() => deleteProduct(product.id)} style={{background:'none', border:'none', cursor:'pointer', color: '#ef4444'}}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInventory;
