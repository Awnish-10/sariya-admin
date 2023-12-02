import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Switch from "@/components/ui/Switch";
import GroupChart3 from "@/components/partials/widget/chart/group-chart-3";
import SelectMonth from "@/components/partials/SelectMonth";
import StackBarChart from "@/components/partials/widget/chart/stack-bar";
import Calculation from "@/components/partials/widget/chart/Calculation";
// import ExampleTwo from "../table/react-tables/ExampleTwo";
import HomeBredCurbs from "./HomeBredCurbs";
import ExampleTwo from "../../components/table/react-tables/ExampleTwo";
import customAxios from "../../apis/CustomAxios";
import axios from "axios";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import moment from "moment"
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import Flatpickr from "react-flatpickr";
const Dealer = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(6);
  const [pageRange, setPageRange] = useState(10)
  const [totalData, setTotalData] = useState(0)
  const [row, setRow] = useState({})
  const [showModal, setShowModal] = useState(false)
  console.log("row",row);
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

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const response = await customAxios.get(`users?pageNo=${currentPage-1}&pagerange=${pageRange}&role=2`);
  
      console.log('response.data',response.data); // Handle the response data here
      setData(response.data.results)
      setTotalData(response.data.total)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleInputChange = (value, name) => {
    // const { name, value } = e.target;
    setRow((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleUpdate = async() => {
    console.log("handleUpdate",handleUpdate);
    const { data } = await customAxios.patch(`users/${row.id}`, {
      membershipDate: row.membershipDate,
      numberofdays: row.numberofdays
    })
    fetchData()
    setShowModal(false)
  }
  const handledayUpdate = async(id, status) => {
    console.log("handleUpdate",handleUpdate);
    const { data } = await customAxios.patch(`users/${id}`, {
      status: status == 1 ? 0 : 1
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
      Header: "Name",
      accessor: "name",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },

    {
      Header: "Name of Firm",
      accessor: "nameoffirm",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },
    {
      Header: "Town",
      accessor: "townname",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },
    {
      Header: "Mobile",
      accessor: "mobile",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },
    {
      Header: "GST IN",
      accessor: "gstin",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },

    {
      Header: "Membership Date",
      accessor: "membershipDate",
      Cell: (row) => {
        return <span>{ row?.cell?.value ? moment(row?.cell?.value).format('L') : 'N/A'}</span>;
      },
    },
    {
      Header: "Days Left",
      accessor: "numberofdays",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell?.value : 'N/A'}</span>;
      },
    },

    {
      Header: "Status",
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
    {
      Header: "action",
      accessor: "action",
      Cell: (row) => {
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
           
            <Tooltip content="Edit" placement="top" arrow animation="shift-away">
              <button className="action-btn" type="button" onClick={async()=>{ setRow({membershipDate:row.row.original.membershipDate,numberofdays:row.row.original.numberofdays,id:row.row.original.id});setShowModal(true);}}>
                <Icon icon="heroicons:pencil-square" />
              </button>
            </Tooltip>
           
           
          </div>
        );
      },
    },


  ];
  
  return (
    <div>
         <Modal
         activeModal={showModal}
         onClose={()=>{setShowModal(false)}}
            title="Edit Details"
            label="Edit Details"
            labelClass="btn-outline-dark"
            // uncontrol
            footerContent={
              <Button
                text="Update"
                className="btn-dark "
                onClick={() => {
                  handleUpdate()
                }}
              />
            }
          >
              <Textinput
            label="Days Left"
            id="Days Left"
            type="text"
            value ={row.numberofdays}
            onChange={(e)=>handleInputChange(e.target.value,'numberofdays' )}
            // inputName='numberofdays'
            // placeholder="Management dashboard "
          />
          <p  className={`block capitalize  flex-0 mr-6 md:w-[200px] w-[200px] break-words mt-6`}>
            Membership Date</p>
           <Flatpickr
              className="form-control py-2"
              value={row.membershipDate}
              onChange={(e)=>handleInputChange(e[0],'membershipDate' )}
              id="default-picker"
              // name='membershipDate'
            />
          </Modal>
      {/* <HomeBredCurbs title="Dealer's List" /> */}
      <div className="space-y-5">
      

        <ExampleTwo title="Dealer's List" data={data} column={COLUMNS} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
      </div>
    </div>
  );
};

export default Dealer;