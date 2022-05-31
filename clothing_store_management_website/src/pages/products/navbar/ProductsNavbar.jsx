import React, { useState, useRef } from "react";
import "./ProductsNavbar.css";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled } from '@mui/material/styles';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
const ProductsNavbar = ({ setRerenderProducts, handlePrint }) => {
  const [showFormAddProduct, setShowFormAddProduct] = useState(false);
  const excelRef = useRef(null);
  const [showExcelIcon, setShowExcelIcon] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [showDialogImport, setShowDialogImport] = useState(false);
  const handleClose = () => {
    setShowFormAddProduct(false);
  };
  const handleSelectFile = (e) => {
    e.stopPropagation();

    if (e.target.files) {
      setShowExcelIcon(true);
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleShowModal = () => {
    if (!showExcelIcon) {
      alert("Vui lòng chọn file ở icon bên trái trước");
    } else {
      setShowDialogImport(true);
    }
  };
  const handleImportFile = (e) => {
    
  };
  return (
    <div>

      <div className="row list-action-products-btn">
        <div
          onClick={() => setShowFormAddProduct(true)}
          className="action-products-btn"
        >
          <i class="bx bx-plus"></i>
          Thêm mới{" "}
        </div>
        <div className="action-products-btn">
          <input
            accept=".xlsx, .xls"
            onClick={(e) => {
              e.target.value = "";
            }}
            onChange={handleSelectFile}
            ref={excelRef}
            type="file"
            style={{ display: "none" }}
          />
          {showExcelIcon && (
            <i
              onClick={(e) => {
                excelRef.current.click();
              }}
              style={{ color: "green", fontSize: 25 }}
              class="fas fa-file-excel"
            ></i>
          )}
          {!showExcelIcon && (
            <i
              onClick={(e) => {
                excelRef.current.click();
              }}
              class="bx bxs-file-import"
            ></i>
          )}
          <div onClick={handleShowModal}>Import</div>
        </div>

        <div
          onClick={() => {
            handlePrint();
          }}
          className="action-products-btn"
        >
          <i class="bx bxs-file-export"></i>Xuất file
        </div>
      </div>
    </div>
  );
};

export default ProductsNavbar;