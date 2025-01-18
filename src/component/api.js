import axios from 'axios';

const fetchProductData = async (page = 1, pageSize = 25) => {
  try {
    const response = await axios.get('https://sandbox-api.xcelapp.com/upsa/v1/product/getProducts?state=ALL', {
      params: {
        page: page,
        pageSize: pageSize,
      },
    });

    console.log(response.data);
    // Do something with the data
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    // Handle error
  }
};

export default fetchProductData;
