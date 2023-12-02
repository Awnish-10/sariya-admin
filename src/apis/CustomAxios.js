import axios from 'axios';
import { toast } from "react-toastify";

// Create an Axios instance with default configuration
const customAxios = axios.create({
  // baseURL: 'http://localhost:3002/', // Set your API base URL here
  baseURL: 'http://ec2-15-206-253-20.ap-south-1.compute.amazonaws.com:3002/', 
  timeout: 10000, // Set the timeout for requests in milliseconds
});

// Add a request interceptor to include common data like JWT token
customAxios.interceptors.request.use(config => {
  // Add your logic to include common data like JWT token
  // For example, if you have a JWT token stored in localStorage:
  const token = localStorage.getItem('jwt');
  console.log("token",token);
  config.headers['Content-Type'] = 'application/json'
  if (token) {
    config.headers.Authorization = `Bearer ${token.slice(1, -1)}`;
  }
  return config;
});

// Add a response interceptor for error handling
customAxios.interceptors.response.use(
  response => {
    console.log("responseinterceptors",response.data.status);
    if(response.data.status == 500){
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // Handle successful responses here
    return response;
  },
  error => {
    // Handle errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.status);
      console.error('Response data:', error.response.data);
      toast.error(error.response.data.message[0]?? error.response.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error message:', error.message);
    }
    return Promise.reject(error); // Pass the error along
  }
);

export default customAxios;
