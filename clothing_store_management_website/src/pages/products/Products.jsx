import React, {useState} from 'react'
import './Products.css'
import {Link} from 'react-router-dom'

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [shirts, setShirts] = useState([]);
  const [trousers, setTrousers] = useState([]);

  const handleFilterProductsByCategory = (e) => {

  };

  return (
    <div className='div_products'>
        <div className="div_left">
        <div className="clothes-category-card">
          <div className="div_search">
            <div className="header_search">Tìm kiếm</div>
            <div className="search">
              <input
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                type="text"
                placeholder="Tìm theo mã, tên sản phẩm"
              />

              <i className="bx bx-search"></i>
            </div>
          </div>
        </div>
        <div className="clothes-category-card">
          <div className="div_search">
            <div className="header_search">Các loại áo</div>
            <select
              name="Áo"
              onChange={handleFilterProductsByCategory}
              onClick={handleFilterProductsByCategory}
              className="selectbox"
            >
              <option value="all">Tất cả</option>
              {shirts.map((shirt, index) => {
                return (
                  <option key={index} value={shirt.name}>
                    {shirt.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="clothes-category-card">
          <div className="div_search">
            <div className="header_search">Các loại quần</div>
            <select
              name="Quần"
              onChange={handleFilterProductsByCategory}
              onClick={handleFilterProductsByCategory}
              className="selectbox"
            >
              <option value="all">Tất cả</option>
              {trousers.map((trouser, index) => {
                return (
                  <option key={index} value={trouser.name}>
                    {trouser.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="product-btn-view-qr">
          <Link to="/productQr">
            <button className="product-btn-view-qr-btn">Xem mã vạch</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Products