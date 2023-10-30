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
import Select from "react-select";
import { useNavigate, useNavigation } from "react-router-dom";
// import ReactSelect from "@/components/ui/Select/ReactSelect";

const Brand = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
  const [brand, setBrand] = useState([])

  const [formData, setFormData] = useState({
    brandname: '',
    priceperbundle: 0,
    priceperton: '',
    // status: true,
  });

  const handleInputChange = (e) => {
    console.log("e.target", e.target);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSelectChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    setFormData({
      ...formData,
      brandname: selectedOption.value,
    });
  };
  const postData = async () => {
    console.log("formData",formData);
    // return
    try {
      const response = await customAxios.patch('product', formData);

      console.log('Response:', response.data);
      navigate("/product");
      // fetchData()
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
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


  return (
    <div>
      <Card title="Update Brand">

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


          <Textinput
            label="Price/Ton"
            type="text"
            inputName="priceperton"
            value={formData.priceperton}
            onChange={handleInputChange}

          />

          {/* <DropZone /> */}
          {/* <Fileinput
          name="basic"
          // badge
          selectedFile={selectedFile}
          onChange={handleFileChange}
          preview
        /> */}
        </div>
      </Card>
      <div className="px-4 py-3 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-700">
                          <Button
                            text="Update Brand"
                            className="btn-dark "
                            onClick={() => {
                              postData()
                            }}
                          />
                        </div>
    </div>
  );
};

export default Brand;