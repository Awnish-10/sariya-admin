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

const Buyer = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [pageRange, setPageRange] = useState(10)
  const [totalData, setTotalData] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const response = await customAxios.get(`users?pageNo=${page}&pagerange=${pageRange}&role=1`);
  
      console.log('response.data',response.data); // Handle the response data here
      setData(response.data.results)
      setTotalData(response.data.total)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <div>
      {/* <HomeBredCurbs title="Buyer's List" /> */}
      <div className="space-y-5">
      

        <ExampleTwo title="Buyer's List" data={data}/>
      </div>
    </div>
  );
};

export default Buyer;
