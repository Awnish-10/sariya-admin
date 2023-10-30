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
// import axios from "axios";

const Buyer = () => {
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

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const response = await customAxios.get(`users?pageNo=${currentPage-1}&pagerange=${pageRange}&role=1`);
  
      console.log('response.data',response.data); // Handle the response data here
      setData(response.data.results)
      setTotalData(response.data.total)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdate = async(id, status) => {
    const { data } = await customAxios.patch(`users/${id}`, {
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
      Header: "Name",
      accessor: "name",
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


  ];
  
  return (
    <div>
      {/* <HomeBredCurbs title="Buyer's List" /> */}
      <div className="space-y-5">
      

        <ExampleTwo title="Buyer's List" column={COLUMNS} data={data} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
      </div>
    </div>
  );
};

export default Buyer;