import { useAdminData } from '../../context/authDataContext';
import { fetchAuthAdminMe } from '../../redux/slices/auth';
import styles from './css/createProduct.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../axios';

export const ImageUploadForm = () => {
  const [productDetails, setProductDetails] = useState({
    title: undefined,
    brand: undefined,
    product_type: undefined,
    short_description: undefined,
    long_description: undefined,
    parameters: undefined,
    price: undefined,
    reviews: undefined,
    images: undefined
  });
  const {adminData, updateAdminData} = useAdminData();
  const [preview, setPreview] = useState([]);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    setPreview(images.map((img) => <img key={img.name} src={URL.createObjectURL(img)} alt={img.name} />));
  }, [images]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!adminData) {
          const adminDataResult = await dispatch(fetchAuthAdminMe());
          if (adminDataResult.payload) {
            updateAdminData(adminDataResult.payload);
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, []);
//!
  const handleChangeFile = async (event) => {
    try {
      var i = 0;
      var nameArr = [];
      while(event.target.files[i])
      {
        var formData = new FormData();
        var file = event.target.files[i++];
        formData.append('images', file);
        var { data } = await axios.post('/upload', formData);
        console.log(data)
        nameArr.push(data.url);
      }
      setProductDetails((prevDetails) => ({
      ...prevDetails,
      images: nameArr,
      }));
    } catch (err) {
      console.warn(err);
      alert('Error while uploading file');
    }
  };

  const handleImageChange = (e) => {
    let err_files_array = [];
    let i = 0;
    let checked_files = [];
    const file_ext = ['svg', 'png', 'jpg', 'webp', 'jpeg'];
    while (e.target.files[i]) {
      let ext = e.target.files[i].name.split('.').slice(-1)[0];
      if (file_ext.includes(ext)) {
        checked_files.push(e.target.files[i]);
      } else {
        err_files_array.push(e.target.files[i].name.split('.').slice(-1));
      }
      i++;
    }

    if (err_files_array.length === 0 && checked_files.length <= 5) {
      setImages(checked_files);
    } else if (checked_files.length > 5) {
      alert(`You loaded more than 5 images, files were deleted`);
      e.target.value = null;
      setImages([]);
    } else {
      alert(`${err_files_array[0]} is not an image, files were deleted`);
      e.target.value = null;
      setImages([]);
    }

    handleChangeFile(e);
  };

  const handleFormSubmit = async (e) => {
    if (!adminData)
    {
      alert('Error while init');
      return;
    }
    e.preventDefault();
	  try {
		  const { data } = await axios.post('/product', productDetails)
      if (data) {
        navigate(`/product/${data._id}`);
      }
	  } catch (err) {
		  console.warn(err);
		  alert('error');
	  }
  };

  return (
    <section className={styles.createProductSection}>
      <form onSubmit={handleFormSubmit}>
        <ul>
		      <li>
		  		  <label>Title:</label>
		  		  <input type="text" name="title" value={productDetails.title} onChange={handleInputChange} required />
			    </li>
			    <li>
				    <label>Brand:</label>
				    <input type="text" name="brand" value={productDetails.brand} onChange={handleInputChange} required />
			    </li>
			    <li>
				    <label>Product Type:</label>
				    <input type="text" name="product_type" value={productDetails.product_type} onChange={handleInputChange} required />
			    </li>
			    <li>
        		<label>Short Description:</label>
        		<textarea name="short_description" value={productDetails.short_description} onChange={handleInputChange} required />
			    </li>
			    <li>
				    <label>Long Description:</label>
				    <textarea name="long_description" value={productDetails.long_description} onChange={handleInputChange} required />
			    </li>
			    <li>
				    <label>Parameters:</label>
				    <input type="text" name="parameters" value={productDetails.parameters} onChange={handleInputChange} />
			    </li>
			    <li>
				    <label>Price:</label>
				    <input type="number" name="price" value={productDetails.price} onChange={handleInputChange} required />
			    </li>
			    <li>
				    <label>Reviews:</label>
				    <input type="text" name="reviews" value={productDetails.reviews} onChange={handleInputChange} />
			    </li>
	        <li>
            <label>Images:</label>
            <input type="file" multiple onChange={handleImageChange} required />
          </li>
          <li className={styles.previewImgs}>
            {preview}
          </li>
        </ul>
        <button type="submit">
          Create Product with Images
        </button>
      </form>
    </section>
  );
};

