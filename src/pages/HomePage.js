import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import AppNavbar from "../components/Navbar";
import Paginate from "../components/Pagination";
import { Container, Row, Col, Form } from "react-bootstrap";

const HomePage = () => {
  const [products, setProducts] = useState([]); // Initialize with an empty array
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products?search=${search}&sort=${sort}&page=${page}&limit=5`
        );
        setProducts(res.data.products || []);
        const calculatedTotalPages = res.data.total
          ? Math.ceil(res.data.total / 5)
          : 1;
        setTotalPages(calculatedTotalPages); // Ensure a default of 1 page
      } catch (err) {
        console.error(err.message);
        setTotalPages(1); // Fallback to 1 in case of error
      }
    };
    fetchProducts();
  }, [search, sort, page]);

  return (
    <>
      <AppNavbar search={search} setSearch={setSearch} />
      <Container>
        <Row>
          <Col md={3}>
            <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="asc">Sort by Price: Low to High</option>
              <option value="desc">Sort by Price: High to Low</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
          {products.length > 0 ? (
            products.map((product) => (
              <Col key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <p>No products found.</p> // Render a fallback message if the array is empty
          )}
        </Row>
        <Paginate
          totalPages={totalPages}
          currentPage={page}
          setPage={setPage}
        />
      </Container>
    </>
  );
};

export default HomePage;
