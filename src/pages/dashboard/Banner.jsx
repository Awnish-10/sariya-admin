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
import Textarea from "@/components/ui/Textarea";
import Switch from "@/components/ui/Switch";

const Banner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const [data, setData] = useState([])
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(6);
  // const [pageRange, setPageRange] = useState(10)
  // const [totalData, setTotalData] = useState(0)
  // useEffect(() => {
  //   setTotalPages(Math.ceil(totalData / pageRange))
  // }, [data])
console.log("data",data);
  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
    setCurrentPage(page)
    // You can add any other logic you need here, such as making an API call to fetch data for the new page
  };
  // useEffect(() => {
  //   fetchData()
  // }, [currentPage])
  // const [showModal, setshowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    url: 'https://www.gstatic.com/webp/gallery3/1.sm.png',
    description: '',
    status: true,
  });

  const handleInputChange = (e) => {
    console.log("e.target", e.target);
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
      const response = await customAxios.post('banners', formData);

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
      const response = await customAxios.get(`banners`);

      console.log('response.data', response.data); // Handle the response data here
      setData(response.data)
      // setTotalData(response.data.total)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleUpdate = async(id, status) => {
    const { data } = await customAxios.patch(`banners/${id}`, {
      status: (status == 1) ? 0 : 1
    })
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
      Header: "name",
      accessor: "name",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },

    {
      Header: "description",
      accessor: "description",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },
    {
      Header: "image",
      accessor: "url",
      Cell: (row) => {
        return  <img src={row?.cell?.value} alt="Sample" width="50" height="50" />
        // return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },
    {
      Header: "status",
      accessor: "status",
      Cell: (row) => {
        return <Switch
        // label="primary"
        activeClass="bg-primary-500"
        value={row?.cell?.value == 1? true: false}
        onChange={()=>{handleUpdate(row.row.original.id, row.cell.value)}} 
        // onChange={() => setChecked5(!checked5)}
      />
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
          title="Add New Banner"
          label="Add Banner"
          labelClass="btn-outline-dark"
          uncontrol
          positionEnd
          onClick={() => {
            postData()
          }}
        >
          <div className="text-base text-slate-600 dark:text-slate-300">

            <Textinput
              label="Name"
              type="text"
              inputName="name"
              value={formData.name}
              onChange={handleInputChange}

            />
              <Textarea
            label="Banner description"
            id="pn4"
            placeholder="Type here"
            inputName="description"
            value={formData.description}
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
        <ExampleTwo title="Banner's List" data={data} column={COLUMNS} />

      </div>
    </div>
  );
};

export default Banner;