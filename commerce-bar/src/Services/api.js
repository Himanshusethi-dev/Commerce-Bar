import axios from "axios";

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

  const response = await shopifyStorefront.post('', { query });
  console.log(response.data)
  return response.data
    
  }
