import { useState } from "react";
import CreateProduct from "./files/CreateProudct";
import SearchBar from "./files/SearchBar";
import ProductsTable from "./files/ProductsTable";
import "./App.css";
import WariningMessage from "./files/WarningMessage";
import {
  updateLocalStorage,
  initialProducts,
  getData,
  initialzeProducts,
  SwalMessage,
  clearData,
} from "./files/utilties";
//products
//data = index product to update

//state dy
//state private
// change state => re-render
// initilze state by props
// override state [object, array]
//take deep copy
//override copy
//pass new state to setState
// outside return state prev value => state mash
// use local storage

function App() {
  //state
  const [products, setProducts] = useState(initialProducts); //lifiting up
  //const [filteredProducts, setFilteredProducts] = useState([]);
  const [updatedProductIndex, setUpdatedProductIndex] = useState(-1);
  const [product, setProduct] = useState({
    name: "",
    cat: "",
    price: "",
    description: "",
  });
  const [searchInput, setSearchInput] = useState();
  const [updatedProduct, setUpdatedProduct] = useState(null);

  //effects

  //functions (handlers)
  const addProduct = () => {
    const newProducts = [...products];
    newProducts.push(product);
    updateLocalStorage(newProducts);
    setProducts(newProducts);
  };

  const updateProduct = () => {
    //copy
    const updatedProducts = products.map((product, index) => {
      if (index === updatedProductIndex) {
        return updatedProduct;
      } else {
        return product;
      }
    });
    //setState
    updateLocalStorage(updatedProducts);
    setProducts(updatedProducts);
    setUpdatedProduct(null);
    setUpdatedProductIndex(-1);
  };

  const deleteProduct = (deletedIndex) => {
    SwalMessage(
      "Delete",
      `are you sure want to delete item ${deletedIndex + 1}`,
      "info"
    ).then((result) => {
      console.log(result);
      if (result) {
        const updatedProducts = getData().filter(
          (product, index) => index !== deletedIndex
        );
        updateLocalStorage(updatedProducts);
        setProducts(updatedProducts);
      }
    });
  };

  const filterProducts = (e) => {
    const value = e.target.value;
    const filterProducts = products.filter((product) =>
      product.name.includes(value)
    );
    if (filterProducts.length === 0) {
      initialzeProducts(setProducts);
      SwalMessage("Search Result Not found", "", "info", 1500);
    } else if (value.length <= 0) {
      initialzeProducts(setProducts);
    } else {
      setProducts(filterProducts);
    }
  };

  const handelChangeOfProduct = (e) => {
    if (updatedProduct) {
      setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (updatedProduct) {
      SwalMessage(
        "Update",
        `are you sure want to Update item ${updatedProduct.name}`,
        "info"
      ).then((result) => {
        if (result) {
          updateProduct();
        }
      });
    } else {
      addProduct();
    }
    clearData(setProduct, product);
  };

  const clearBtn = () => {
    clearData(setProduct, product);
    SwalMessage("Data Cleared", "", "info", 1200);
  };

  const handelUpdatedProduct = (productToProduct, index) => {
    initialzeProducts(setProducts);
    setUpdatedProduct(productToProduct);
    setUpdatedProductIndex(index);
  };
  return (
    <>
      <CreateProduct
        product={updatedProduct ? updatedProduct : product}
        handelChange={handelChangeOfProduct}
        handelSubmit={handelSubmit}
      >
        <button id="create-btn" className="btn btn-primary">
          {updatedProduct ? "Update Product" : "Add Product"}
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={clearBtn}
        >
          Clear
        </button>
      </CreateProduct>
      <SearchBar filterProducts={filterProducts} />
      {products.length > 0 ? (
        <ProductsTable
          products={products}
          handelUpdatedProduct={handelUpdatedProduct}
          deleteProductByIndex={deleteProduct}
        />
      ) : (
        <WariningMessage />
      )}
    </>
  );
}

export default App;
