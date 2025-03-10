// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import formData from 'form-data';
// const BASE_URL = 'https://www.iorbit-tech.com:8443/api/v1/'; //DEV
// const BASE_URL = 'https://hunt-backr.onrender.com/api/'; //DEMO https://hunt-back.vercel.app/api/
const BASE_URL = 'https://slender-polarized-alley.glitch.me/'; //DEMO https://hunt-back.vercel.app/api/

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthorizationHeader = async () => {
  try {
    let accessToken = await AsyncStorage.getItem('accessToken');
    console.log(accessToken, 'accessToken');
    if (accessToken !== null) {
      // AsyncStorage.removeItem('accessToken')
      // delete api.defaults.headers.common['Authorization'];
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  } catch (error) {
    console.error('Error setting authorization header:', error);
  }
};

export const updateTokens = async (newAccessToken, newRefreshToken) => {
  try {
    await AsyncStorage.setItem('refreshToken', newRefreshToken);
    await AsyncStorage.setItem('accessToken', newAccessToken);
  } catch (error) {
    console.error('Error updating tokens:', error);
  }
};

const storeTokens = async (accessToken, refreshToken) => {
  try {
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await AsyncStorage.setItem('accessToken', accessToken);
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
};

// GET request
export const getApiData = async endpoint => {
  console.log('endpoint', endpoint);

  try {
    // await setAuthorizationHeader();
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error in GET request:', error);
    throw error;
  }
};

// GET request
export const getApiDatawithoutToken = async endpoint => {
  console.log('endpoint', endpoint);

  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error in GET request:', error);
    throw error;
  }
};

// POST request
export const postApiData = async (endpoint, data) => {
  console.log('endpoint', endpoint);
  console.log('data', data);
  try {
    // await setAuthorizationHeader();
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error in POST request:', error);
    throw error;
  }
};

export const postApiDatawithoutToken = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error in POST request:', error);
    throw error;
  }
};

// PUT request
export const putApiData = async (endpoint, data) => {
  try {
    await setAuthorizationHeader();
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error in PUT request:', error);
    throw error;
  }
};

// PUT request
export const putApiDatawithoutToken = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error in PUT request:', error);
    throw error;
  }
};

// DELETE request
export const deleteApiData = async endpoint => {
  try {
    await setAuthorizationHeader();
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error in DELETE request:', error);
    throw error;
  }
};

//GET PLACE DETAILS

export const getPlaceDetails = async coords => {
  console.log('coords', coords);
  let test = {
    place_id: 221339227,
    licence:
      'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright',
    osm_type: 'way',
    osm_id: 239462396,
    lat: '8.475776596700603',
    lon: '77.00780380845802',
    category: 'highway',
    type: 'secondary',
    place_rank: 26,
    importance: 0.0533433333333333,
    addresstype: 'road',
    name: 'Malayam - thiruvanathapuram Road',
    display_name:
      'Malayam - thiruvanathapuram Road, Machel, Kattakkada, Thiruvananthapuram, Kerala, 695032, India',
    address: {
      road: 'Malayam - thiruvanathapuram Road',
      village: 'Machel',
      county: 'Kattakkada',
      state_district: 'Thiruvananthapuram',
      state: 'Kerala',
      'ISO3166-2-lvl4': 'IN-KL',
      postcode: '695032',
      country: 'India',
      country_code: 'in',
    },
    boundingbox: ['8.4694549', '8.4793707', '77.0043160', '77.0199718'],
  };
  try {
    // const response = await axios.get(
    //   `https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=jsonv2`,
    // );
    // return response.data;
    return test;
  } catch (error) {
    console.error('Error in GET request:', error);
    throw error;
  }
};

export const uploadImage = async base64Image => {
  const apiKey = '6d207e02198a847aa98d0a2a901485a5'; // Replace with your actual API key
  const apiUrl = 'https://freeimage.host/api/1/upload';

  // Remove the data:image/[type];base64, part if it exists
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('source', base64Data);
  formData.append('format', 'json');

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Upload successful:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Upload failed:',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};
