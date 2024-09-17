import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import './footer.css'
const FooterItem = ({ data }) => {
    const { items } = data;
    useEffect(() => {
        // console.log(items)
    }, [])
    return (
        <>
            <div className="title">
                {data.title}
            </div>
            <List className='footerListItems' sx={{display:'flex',flexDirection:'column'}}>
                {items.map(({ title, resource }, i) => (
                    <Fragment key={i}  >
                        <ListItem className='footerListItem' width={'100%'} sx={{justifyContent:'center'}}>
                            <Link to={`${resource ? `/collections/${resource.handle}` : '/'}`}>
                                {title}
                            </Link>
                            
                        </ListItem>

                    </Fragment>

                ))}
            </List>
        </>
    )
}

export default FooterItem