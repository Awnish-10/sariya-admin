import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import GroupChart3 from "@/components/partials/widget/chart/group-chart-3";
import SelectMonth from "@/components/partials/SelectMonth";
import StackBarChart from "@/components/partials/widget/chart/stack-bar";
import Calculation from "@/components/partials/widget/chart/Calculation";
// import ExampleTwo from "../table/react-tables/ExampleTwo";
import HomeBredCurbs from "./HomeBredCurbs";
import ExampleTwo from "../../components/table/react-tables/ExampleTwo";
import customAxios from "../../apis/CustomAxios";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import Fileinput from "@/components/ui/Fileinput";

const Product = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(6);
  const [pageRange, setPageRange] = useState(10)
  const [totalData, setTotalData] = useState(0)
  useEffect(() => {
    setTotalPages(Math.ceil(totalData/pageRange))
  }, [data])
  
  const handlePageChange = (page) => {
    setCurrentPage(page-1);
    setCurrentPage(page)
    // You can add any other logic you need here, such as making an API call to fetch data for the new page
  };
  useEffect(() => {
    fetchData()
  }, [currentPage])
  // const [showModal, setshowModal] = useState(false)
  const [formData, setFormData] = useState({
    brandname: '',
    size: '',
    priceperbundle: '',
    priceperton: '',
    calculationperbundle: '',
    calculationperton: '',
    status: true,
  });

  const handleInputChange = (e) => {
    console.log("e.target",e.target);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const postData = async () => {
    // console.log("formData",formData);
    // return
    try {
      const response = await customAxios.post('product',formData );
  
      console.log('Response:', response.data);
      fetchData()
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const response = await customAxios.get(`product?pageNo=${currentPage-1}&pagerange=${pageRange}`);

      console.log('response.data', response.data); // Handle the response data here
      setData(response.data.results)
      setTotalData(response.data.total)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const COLUMNS = [
    {
      Header: "Id",
      accessor: "id",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },
    {
      Header: "brandname",
      accessor: "brandname",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },

    {
      Header: "size",
      accessor: "size",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },
    {
      Header: "priceperbundle",
      accessor: "priceperbundle",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },
    {
      Header: "priceperton",
      accessor: "priceperton",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },


  ];
  return (
    <div>
      {/* <HomeBredCurbs title="Product's List" /> */}
      <div className="space-y-5">

        <Modal
          activeModal={true}
          title="Add New Product"
          label="Add Product"
          labelClass="btn-outline-dark"
          uncontrol
          positionEnd
          onClick={() => {
            postData()
          }}
        >
          <div className="text-base text-slate-600 dark:text-slate-300">
            
            <Textinput
              label="Brand Name"
              type="text"
              inputName="brandname"
              value={formData.brandname}
              onChange={handleInputChange}

            />
            <Textinput
              label="Size"
              type="text"
              inputName="size"
              value={formData.size}
              onChange={handleInputChange}

            />
            <Textinput
              label="Price/Bundle"
              type="text"
              inputName="priceperbundle"
              value={formData.priceperbundle}
              onChange={handleInputChange}

            />
            <Textinput
              label="Price/Ton"
              type="text"
              inputName="priceperton"
              value={formData.priceperton}
              onChange={handleInputChange}

            />
            <Textinput
              label="Calculation/Bundle"
              type="text"
              inputName="calculationperbundle"
              value={formData.calculationperbundle}
              onChange={handleInputChange}

            />
            <Textinput
              label="Calculation/Ton"
              type="text"
              inputName="calculationperton"
              value={formData.calculationperton}
              onChange={handleInputChange}

            />
  {/* <DropZone /> */}
  <Fileinput
          name="basic"
          // badge
          selectedFile={selectedFile}
          onChange={handleFileChange}
          preview
        />
          </div>
        </Modal>
        <ExampleTwo title="Product's List" data={data} column={COLUMNS} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>

      </div>
    </div>
  );
};

export default Product;