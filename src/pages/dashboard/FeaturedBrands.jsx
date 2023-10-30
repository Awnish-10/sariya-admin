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
import Select from "react-select";
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";

const FeaturedBrands = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const [data, setData] = useState([])
  const [brand, setBrand] = useState([])
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(6);
  // const [pageRange, setPageRange] = useState(10)
  // const [totalData, setTotalData] = useState(0)
  // useEffect(() => {
  //   setTotalPages(Math.ceil(totalData/pageRange))
  // }, [data])
  
  // const handlePageChange = (page) => {
  //   setCurrentPage(page-1);
  //   setCurrentPage(page)
  //   // You can add any other logic you need here, such as making an API call to fetch data for the new page
  // };
  // useEffect(() => {
  //   fetchData()
  // }, [currentPage])
  // const [showModal, setshowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    // images:['https://www.gstatic.com/webp/gallery3/1.sm.png']
  });
  const handleSelectChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    setFormData({
      ...formData,
      name: selectedOption.value,
    });
  };
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
      const response = await customAxios.post('product/featuredbrands',formData );
  
      console.log('Response:', response.data);
      fetchData()
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  useEffect(() => {
    fetchData()
    fetchData2()
  }, [])
  const fetchData = async () => {
    try {
      const response = await customAxios.get(`product/featuredbrands`);

      console.log('response.data', response.data); // Handle the response data here
      setData(response.data)
      // setTotalData(response.data.total)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchData2 = async () => {
    try {
      const response = await customAxios.get(`product/brandname`);

      console.log('response.data', response.data); // Handle the response data here
      const data = response.data?.map((item) => {
        return { value: item.brandname, label: item.brandname }
      })
      setBrand(data)
      // setTotalData(response.data.total)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
  const handleDelete = async(id) => {
    const { data } = await customAxios.delete(`product/featuredbrands/${id}`)
    fetchData()
  }
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
      accessor: "name",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },
    {
      Header: "Action",
      // accessor: "name",
      Cell: (row) => {
        return  <Tooltip
        content="Delete"
        placement="top"
        arrow
        animation="shift-away"
        theme="danger"
      >
        <button className="action-btn" type="button" onClick={()=>{handleDelete(row.row.original.id)}} >
          <Icon icon="heroicons:trash" />
        </button>
      </Tooltip>
      //   <Switch
      //   // label="primary"
      //   activeClass="bg-primary-500"
      //   value={''}
      //   onChange={()=>{handleDelete(row.row.original.id)}} 
      //   // onChange={() => setChecked5(!checked5)}
      // />
        // return <span onClick={()=>{handleUpdate(row.row.original.id, row.cell.value)}} style={{cursor: 'pointer'}}>{row?.cell?.value == 1 ? "Active" : 'Inactive'}</span>;
      },
    },
  ];
  return (
    <div>
      {/* <HomeBredCurbs title="Product's List" /> */}
      <div className="space-y-5">

        <Modal
          activeModal={true}
          title="Add New Featured Brand"
          label="Add Featured Brand"
          labelClass="btn-outline-dark"
          uncontrol
          positionEnd
          onClick={() => {
            postData()
          }}
        >
          <div className="text-base text-slate-600 dark:text-slate-300">
         
          <div>
            <label htmlFor=" hh" className="form-label ">
              Brand Name
            </label>
            <Select
              name='brandname'
              className="react-select"
              classNamePrefix="select"
              defaultValue={brand[0]}
              options={brand}
              onChange={handleSelectChange}
              styles={styles}
              id="hh"
            />
          </div>
       
  {/* <DropZone /> */}
  <Fileinput
          name="basic"
          // badge
          // multiple
          selectedFile={selectedFile}
          onChange={handleFileChange}
          preview
        />
          </div>
        </Modal>
        <ExampleTwo title="Product's List" data={data} column={COLUMNS} />

      </div>
    </div>
  );
};

export default FeaturedBrands;