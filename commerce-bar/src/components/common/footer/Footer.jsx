import React, { Fragment, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import './footer.css'
import useNavigationFetcher from '../../../hooks/useNavigationFetcher';
import FooterItem from './FooterItem';

const Footer = () => {
  const footer = useNavigationFetcher('footer')
  const [footerOptions, setFooterOptions] = useState([]);

  useEffect(() => {
    if (footer) {
      const { items } = footer
      setFooterOptions(items);
    }

  }, [footer])

  useEffect(() => {
    // console.log("footerOptions", footerOptions);
  }, [footerOptions])

  return (
    <>
     <div className="container">
     <div className="footer">
        <Box component="div" justifyContent={'center'}  sx={{display:'flex',borderTop: 1,paddingTop:'10px'}} >
          {
            footerOptions && (
              footerOptions.map((item,i)=>(
                <Fragment  key={i} >
                  <Box component="div"  sx={{ width:'30%' }} >
                  <FooterItem  data={item}  >
                   </FooterItem>
                  </Box>
                </Fragment>
              ))
            )
          }
        </Box>
      </div>
     </div>
    </>
  )
}

export default Footer