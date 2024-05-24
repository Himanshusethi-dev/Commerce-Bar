import { useState,useEffect } from "react";
import { fetchCustomer } from '../Services/api'
import { useSelector } from "react-redux";
const useCustomerData = () => {
    const [customerData,setCustomerData] = useState(null)
    const [isCustomer, setIsCustomer] = useState(false);
    const { authToken } = useSelector((state) => state.authProvider)

    useEffect(()=>{

        getCustomerData();

    },[authToken])


    const getCustomerData = async () => {
        if (authToken) {
            try {
                const resp = await fetchCustomer(authToken);
                console.log("customerData", resp.data.data.customer)
                setIsCustomer(true)
                setCustomerData(resp.data.data.customer)
            } catch (error) {
                // console.log(error)
                setIsCustomer(false)
            }
        }else{
            alert('Please log in')
        }

    }

  return (
    {customerData,isCustomer}
  )
}

export default useCustomerData