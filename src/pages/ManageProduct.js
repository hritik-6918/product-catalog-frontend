import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

const ManageProduct = ({ mode }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stock: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch existing product details for edit mode
  React.useEffect(() => {
    if (mode === "edit") {
      const fetchProduct = async () => {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      };
      fetchProduct();
    }
  }, [mode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        await axios.post("http://localhost:5000/api/products", product, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        await axios.put(`http://localhost:5000/api/products/${id}`, product, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container>
      <h1>{mode === "add" ? "Add Product" : "Edit Product"}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter stock"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {mode === "add" ? "Add Product" : "Update Product"}
        </Button>
      </Form>
    </Container>
  );
};

export default ManageProduct;
