import React, { useState, useEffect, useRef } from 'react'
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow
} from "@mui/material";
import './Products.css'
import ProductsNavbar from './navbar/ProductsNavbar';
import { Link } from 'react-router-dom'
import { useReactToPrint } from "react-to-print";

const columns = [
  { id: "_id", label: "Mã sản phẩm" },
  { id: "name", label: "Tên sản phẩm" },
  {
    id: "costPrice",
    label: "Giá vốn (vnđ)",

    format: (value) => `${value.toLocaleString("en-US")}`,
  },
  {
    id: "salePrice",
    label: "Giá bán (vnđ)",

    format: (value) => `${value.toLocaleString("en-US")}`,
  },
  {
    id: "countInStock",
    label: "Tồn kho",

    format: (value) => value.toLocaleString("en-US"),
  },
];


const Products = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [shirts, setShirts] = useState([]);
  const [trousers, setTrousers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showFormUpdateProduct, setShowFormUpdateProduct] = useState(false);
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [rerenderProducts, setRerenderProducts] = useState(false);

  const handleFilterProductsByCategory = (e) => {

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      <div className="div_right">
        <div className="col-9" style={{ padding: "10px 0px 10px 10px" }}>
          <Paper sx={{ width: "135%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table ref={componentRef} stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "#03a9f4",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell
                      style={{
                        backgroundColor: "#03a9f4",
                      }}
                    ></TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "#03a9f4",
                      }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          key={row.code}
                          style={
                            index % 2 == 1 ? { backgroundColor: "#e8e8e8" } : {}
                          }
                        >
                          {columns.map((column) => {
                            let value = row[column.id];
                            if (column.id === "_id") {
                              value = value.substr(value.length - 7);
                            }
                            if (column.id === "countInStock") {
                              var total = 0;
                              row.options.forEach((value) => {
                                total += value.quantity;
                              });
                              value = total;
                            }
                            return (
                              <TableCell key={column.id}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                          <TableCell
                            onClick={() => {
                              console.log("update");
                              setSelectedProduct(row);
                              console.log(row);
                              setShowFormUpdateProduct(true);
                            }}
                          >
                            <i
                              style={{ fontSize: 18, color: "#0DB3E2" }}
                              class="bx bxs-edit hide-on-print"
                            ></i>
                          </TableCell>
                          <TableCell
                            onClick={() => {
                              console.log("delete");
                              console.log(row);
                              setSelectedProduct(row);
                              setShowDialogDelete(true);
                            }}
                          >
                            <i
                              style={{ fontSize: 18, color: "#F26339" }}
                              class="bx bx-trash hide-on-print"
                            ></i>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[6, 12, 100]}
              component="div"
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Số hàng hiển thị"
            />
          </Paper>
        </div>
        <ProductsNavbar
          handlePrint={handlePrint}
          setRerenderProducts={setRerenderProducts}
        />
      </div>
    </div>
  )
}

export default Products