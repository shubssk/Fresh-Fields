import React from 'react';
import product1 from '../assets/images/image1.jpg';
import product2 from '../assets/images/image2.jpg';

interface Product {
  id: number;
  image: string;
  description: string;
  price: number;
}

const products: Product[] = [
  {
    id: 1,
    image: product1,
    description: 'This is a great product.',
    price: 29.99,
  },
  {
    id: 2,
    image: product2,
    description: 'This is another great product.',
    price: 39.99,
  },
];

const AdminProducts: React.FC = () => {
  const handleAddProduct = (product: Product) => {
    console.log(`Added product: ${product.description}`);
  };
  
  const handleEditProduct = (product: Product) => {
    console.log(`Edited product: ${product.description}`);
  };
  
  const handleDeleteProduct = (product: Product) => {
    console.log(`Deleted product: ${product.description}`);
  };

  return (
    <>
    <h2>Admin Products</h2>
    <div style={styles.container}>
      {products.map(product => (
        <div key={product.id} style={styles.card}>
          <img src={product.image} alt={product.description} style={styles.image} />
          <div style={styles.info}>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => handleAddProduct(product)} style={styles.button}>Add</button>
            <button onClick={() => handleEditProduct(product)} style={styles.button}>Edit</button>
            <button onClick={() => handleDeleteProduct(product)} style={styles.button}>Delete</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    margin: '20px',
    maxWidth: '400px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  info: {
    padding: '10px',
  },
  button: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    marginTop: '10px',
    marginRight : '10px',
  },
};

export default AdminProducts;
