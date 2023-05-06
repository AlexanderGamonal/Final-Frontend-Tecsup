import react, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Category = () => {
  const { products } = useContext(ProductContext);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );

      console.log(filtered);

      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="pt-32 pb-12 lg:py-32 h-full items-center mx-20">
        <select value={selectedCategory} onChange={handleCategoryChange} className="select select-info w-full max-w-xs flex justify-center items-center">
          <option value="">Todas las categorías</option>
          <option value="men's clothing">Ropa de Hombres</option>
          <option value="women's clothing">Ropa Mujeres</option>
          <option value="jewelery">Joyas</option>
          <option value="electronics">Electronica</option>
        </select>
        <section className="py-16 h-full items-center">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:max-0">
              {filteredProducts.map((product) => {
                return <Product product={product} key={product.id} />;
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Category;
