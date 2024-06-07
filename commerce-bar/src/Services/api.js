import axios from "axios";
import gql from "graphql-tag";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const shopifyAccessToken = import.meta.env.VITE_REACT_APP_API_KEY;
const shopifyStorefront = axios.create({
  baseURL: apiUrl,
  headers: {
    "X-Shopify-Storefront-Access-Token": shopifyAccessToken,
    "Content-Type": "application/json",
  },
});

export const getCollectionsQuery = async () => {
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
    
    
    `;

  const response = await shopifyStorefront.post("", { query });
  //   console.log(response.data.data.collections.edges)
  return response.data.data.collections.edges;
};

export const getCollectionByHandle = async (
  handle,
  sortParam = "MANUAL",
  order = "false",
  filterArray
) => {
  if (filterArray.length < 1) {
    filterArray = null;
  }
  const query = `
    
    
    {
      collection(handle:${handle}){
        descriptionHtml
        handle
        title
        id
        image{
          url
        }
        products(first:10,sortKey:${sortParam},reverse:${order},filters:${JSON.stringify(
    filterArray
  ).replace(/\"([^(\")"]+)\":/g, "$1:")}){
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
                    id
                    title
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

    `;

  //  console.log(query)

  try {
    const response = await shopifyStorefront.post("", { query });
    return response.data.data.collection;
  } catch (error) {
    return error;
  }
};

export const getProductByHandle = async (handle) => {
  const ProductQuery = `
  query productByHandle($handle: String!){
    productByHandle(handle:$handle){
      descriptionHtml
      handle
      totalInventory
      title
      id
      vendor
      options(first:2){
        id
        name
        values
      }
      variants(first:2){
        edges{
          node{
            price{
              amount
              currencyCode
            }
            compareAtPrice{
              amount
              currencyCode
            }
            id
            title
          }
        }
      }
      featuredImage{
        width
        id
        url
      }
      images(first:5){
        edges{
          node{
            id
            width
            url
          }
        }
      }
    }
  }

  
  
  `;

  try {
    const response = await shopifyStorefront.post("", {
      query: ProductQuery,
      variables: { handle: handle },
    });
    // console.log(response);
    return response;
  } catch (error) {}
};

export const getRecommendedProducts = async (id) => {
  const recommendedProductsQuery = `

      query productRecommendations($productId: ID!) {
        productRecommendations(productId: $productId) {
          id
          vendor
          title
          handle
          images(first:5){
            edges{
              node{
                id
                width
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
        }
         
      }
  
  `;

  try {
    const response = await shopifyStorefront.post("", {
      query: recommendedProductsQuery,
      variables: { productId: id },
    });
    // console.log(response);
    return response.data.data.productRecommendations;
  } catch (error) {}
};

export const logInCustomer = async (input) => {
  const customerLogMutation = `
  
      mutation customerAccessTokenCreate($input : CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            message
          }
        }
      }
     
  
  `;

  try {
    const response = await shopifyStorefront.post("", {
      query: customerLogMutation,
      variables: {
        input: {
          ...input,
        },
      },
    });
    console.log(response);
    return response;
  } catch (error) {}
};

export const logOutCustomer = async (token) => {
  const logOutCustomerMutation = `mutation customerAccessTokenDelete($customerAccessToken: String!) {
          customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
            deletedAccessToken
            deletedCustomerAccessTokenId
            userErrors {
              field
              message
            }
          }
        }`;

  try {
    const response = await shopifyStorefront.post("", {
      query: logOutCustomerMutation,
      variables: {
        // input: {
        //   email: "himanshusethi9641@gmail.com",
        //   password: "123456",
        // },
        customerAccessToken: token,
      },
    });
    // console.log(response);
    return response;
  } catch (error) {}
};

export const fetchCustomer = async (token) => {
  const customerFetchQuery = `
  
  query getCustomerQuery($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      acceptsMarketing
      email
      phone
    }
  }
  
  `;
  try {
    const response = await shopifyStorefront.post("", {
      query: customerFetchQuery,
      variables: {
        customerAccessToken: token
      },
    });
    console.log(response);
    return response;
  } catch (error) {}

};

export const createCustomer = async (input) => {
  const customerCreateQuery = `
  
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customerUserErrors {
          code
          field
          message
        }
        customer {
          id
          email
          firstName
          lastName
        }
      }
    }
    
    `;

  try {
    const response = await shopifyStorefront.post("", {
      query: customerCreateQuery,
      variables: {
        input: {
          ...input,
        },
      },
    });
    console.log(response);
    return response;
  } catch (error) {}
};


export const generateCart = async (input)=>{
  const  createCartMutation = `
      mutation cartCreate {
        cartCreate {
          cart {
            id
            totalQuantity
            checkoutUrl
            note
          }
          userErrors {
            field
            message
          }
        }
      }     
  `


  try {
      const response = await shopifyStorefront.post("",{
        query: createCartMutation,
        variables: {
          input: {
            ...input,
          },
        },

      })
      return response;
  } catch (error) {
    
  }
}


export const updateCartBuyerIdentity = async (buyerIdentity,cartId)=>{
  console.log(buyerIdentity,cartId)
  const  cartBuyerIDMutation = `
      mutation cartBuyerIdentityUpdate($buyerIdentity: CartBuyerIdentityInput!, $cartId: ID!) {
        cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
          cart {
            id
          }
          userErrors {  
            field
            message
          }
        }
      }
  `


  try {
      const response = await shopifyStorefront.post("",{
        query: cartBuyerIDMutation,
        variables: {
          buyerIdentity: {
            ...buyerIdentity
          },
          cartId : cartId
        },

      })
      return response;
  } catch (error) {
    
  }
}

export const getCartByID = async (cartID)=>{

  const fetchCartQuery = `
  
  query cartFetch($id:ID!){
    cart(id:$id) {
      buyerIdentity{
        customer{
          
          email
          id
        }
      }
      id
      totalQuantity
      cost{
        totalAmount{
          amount
        }
      }
      lines(first: 10){
        edges{
          node{
            id
            quantity
            cost{
              amountPerQuantity{
                amount
              }
              totalAmount{
                amount
              }
            }
            merchandise{
              ... on ProductVariant{
                id
                price{
                  amount
                }
                 compareAtPrice{
                  amount
                }
                image{
                  id
                  url
                }
                product{
                  handle
                  id
                  title
                  vendor
                  variants(first:3){
                    edges{
                      node{
                        price{
                          amount
                          currencyCode
                        }
                        compareAtPrice{
                          amount
                          currencyCode
                        }
                        id
                        title
                        quantityAvailable
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      checkoutUrl
    }
}

  
  `
  // variantBySelectedOptions(selectedOptions){
  //   id
  // }
  try {
    const response = await shopifyStorefront.post("",{
      query: fetchCartQuery,
      variables: {
        id: cartID
      },

    })
    return response;
} catch (error) {
  
}

}

export const addToCart = async (cartID,lines)=>{

    const addToCartQuery = `
    
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
         id
         cost{
          totalAmount{
            amount
          }
         }
         totalQuantity
        }
        userErrors {
          field
          message
        }
      }
    }
    
    `


    try {

      const response = await shopifyStorefront.post('',{
          query : addToCartQuery,
          variables: {
            cartId: cartID,
            lines: lines
          },
      })

      return response;
      
    } catch (error) {
      
    }

}

export const updateCartLine = async (cartID,lines)=>{
console.log("ho rha h ")

  const cartLineUpdateMutation = `
  
        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
              id
             }
            userErrors {
              field
              message
            }
          }
        }
  
  `


    try {

      const response = await shopifyStorefront.post('',{
          query : cartLineUpdateMutation,
          variables: {
            cartId: cartID,
            lines: [lines]
          },
      })
        console.log(response,"updateCart")
      return response;
      
    } catch (error) {
      
    }


}


export const deleteCartLine = async (cartID,lineIds)=>{

  const  cartLineItemDeleteMutation = `
  
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
          }
          userErrors {
            field
            message
          }
        }
      }


  
  
  `



  try{
      const response = await shopifyStorefront.post("",{
        query : cartLineItemDeleteMutation,
        variables : {
          cartId : cartID,
          lineIds : lineIds
        }
      })

  }catch(error){

  }

}