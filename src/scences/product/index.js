import React, { useState } from 'react';
import { db, storage } from '../../components/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TextField, Button, Container, Typography } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductDetail.css';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [volume, setVolume] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error('Please upload at least one image for the product');
      return;
    }
    try {
      const imageUrls = [];
      for (const image of images) {
        // Upload each image to Firebase Storage
        const imageRef = ref(storage, `products/${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(snapshot.ref);
        imageUrls.push(imageUrl);
      }

      // Add the product to Firestore with all the details
      await addDoc(collection(db, 'products'), {
        name,
        price: parseFloat(price),
        imageUrls, // Save the array of image URLs
        description,
        volume
      });
      setName('');
      setPrice('');
      setImages([]);
      setDescription('');
      setVolume('');
      toast.success('Product added successfully!');
    } catch (error) {
      console.error("Error adding product: ", error);
      toast.error(`Error adding product: ${error.message}`);
    }
  };

  return (
    <div className="main-content">
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="Volume"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            multiple // Allow multiple file selection
            onChange={(e) => setImages(Array.from(e.target.files))}
            accept="image/*"
          />
          <Button type="submit" variant="contained" color="primary">
            Add Product
          </Button>
        </form>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </Container>
    </div>
  );
};

export default ProductForm;
