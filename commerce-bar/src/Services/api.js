import axios from "axios";
import gql from 'graphql-tag';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const shopifyAccessToken = import.meta.env.VITE_REACT_APP_API_KEY;

const shopifyStorefront = axios.create({
    baseURL: apiUrl,
    headers: {
      'X-Shopify-Storefront-Access-Token': shopifyAccessToken,
      'Content-Type': 'application/json',
    },
  });

  export const getProductsQuery = async ()=>{

    const query = `
    {
        products(first: 10) {
          edges {
            node {
              id
              title
              description
              handle
              images(first: 1) {
                edges {
                  node {
                    originalSrc
                  }
                }
              }
              variants(first: 2) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
    }
  `;

  try {
    const response = await shopifyStorefront.post('', { query });
    return response.data.data.products.edges
  } catch (error) {
    return(error)
  }

//   console.log(response.data.data.products.edges)
  
    
  }

  export const getCollectionsQuery = async ()=>{

    const query = `

    {
        collections(first:10){
          edges{
            node{
              handle
              description
              id
              title
              products(first:5){
                edges{
                  node{
                    handle
                    description
                    id
                    images(first:2){
                      edges{
                        node{
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
              image{
                url
                altText
              }
              
            }
          }
        }
      }
    
    
    `

    const response = await shopifyStorefront.post('',{ query })
    //   console.log(response.data.data.collections.edges)
    return response.data.data.collections.edges
  }

  export const getCollectionByHandle = async (handle,sortParam='MANUAL',order='false',filterArray)=>{

    if(filterArray.length < 1){

      filterArray = null
    }
    const query = `
    
    
    {
      collection(handle:${handle}){
        description
        handle
        title
        id
        image{
          url
        }
        products(first:10,sortKey:${sortParam},reverse:${order},filters:${JSON.stringify(filterArray).replace(/\"([^(\")"]+)\":/g, '$1:')}){
          edges{
            node{
              handle
              title
              images(first:2){
                edges{
                  node{
                    url
                  }
                }
              }
              priceRange{
                minVariantPrice{
                  amount
                }
                maxVariantPrice{
                  amount
                }
              }
              variants(first:10){
                edges{
                  node{
                    price{
                      amount
                    }
                  	compareAtPrice{
                      amount
                    }
                  }
                }
              }
            }
          }
          filters{
            id
            label
            type
            values{
              count
              label
              input
            }
          }
        }
      }
      }

    `


    //  console.log(query)

      try {
        const response = await shopifyStorefront.post('', { query });
        return response.data.data.collection
      } catch (error) {
        return(error)
      }


  }