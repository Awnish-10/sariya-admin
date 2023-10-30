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

const Order = () => {
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
      const response = await customAxios.get(`orders?pageNo=${currentPage-1}&pagerange=${pageRange}`);
  
      console.log('response.data',response.data); // Handle the response data here
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
        return <span>{row?.cell?.value ? row?.cell.value : 'N/A'}</span>;
      },
    },
    // {
    //   Header: "Name",
    //   accessor: "productname.brandname",
    //   Cell: (row) => {
    //     return <span>{row?.cell?.value ? row?.cell.value : 'N/A'}</span>;
    //   },
    // },
    // {
    //   Header: "Product Id",
    //   accessor: "productId",
    //   Cell: (row) => {
    //     return <span>{row?.cell?.value ? row?.cell.value : 'N/A'}</span>;
    //   },
    // },
    {
      Header: "Name",
      accessor: "username.name",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row?.cell.value : 'N/A'}</span>;
      },
    },
    {
      Header: "Email",
      accessor: "username.email",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row.cell.value : 'N/A'}</span>;
      },
    },
    {
      Header: "Mobile",
      accessor: "username.mobile",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row.cell.value : 'N/A'}</span>;
      },
    },
    {
      Header: "Unit",
      accessor: "unit",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row.cell.value : 'N/A'}</span>;
      },
    },
    {
      Header: "Quantity",
      accessor: "quantity",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row.cell.value : 'N/A'}</span>;
      },
    },
    {
      Header: "Brand",
      accessor: "productname.brandname",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row.cell.value : 'N/A'}</span>;
      },
    },
    {
      Header: "Size",
      accessor: "productname.size",
      Cell: (row) => {
        return <span>{row?.cell?.value ? row.cell.value : 'N/A'}</span>;
      },
    },
  ];
  
  return (
    <div>
      {/* <HomeBredCurbs title="Buyer's List" /> */}
      <div className="space-y-5">
      

        <ExampleTwo title="Orders" column={COLUMNS} data={data} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
      </div>
    </div>
  );
};

export default Order;