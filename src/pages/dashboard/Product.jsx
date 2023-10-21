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

const Product = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [pageRange, setPageRange] = useState(10)
  const [totalData, setTotalData] = useState(0)
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
      const response = await customAxios.get(`product?pageNo=${page}&pagerange=${pageRange}`);

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
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "brandname",
      accessor: "brandname",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },

    {
      Header: "size",
      accessor: "size",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
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

          </div>
        </Modal>
        <ExampleTwo title="Product's List" data={data} column={COLUMNS} />

      </div>
    </div>
  );
};

export default Product;
