import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getSchools = async () => {
    try {
      const response = await axios.get(`${API_URL}/schools`);
      return response; 
    } catch (error) {
      console.error('Error fetching schools:', error);
      throw error;
    }
  };

export const getKindergardens = async () => {
  try {
    const response = await axios.get(`${API_URL}/kindergardens`);
    return response;
  } catch (error) {
    console.error('Error fetching kindergardens:', error);
    throw error;
  }
};

export const getSocialChildProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/socialchildprojects`);
      return response;
    } catch (error) {
      console.error('Error fetching social child projects:', error);
      throw error;
    }
  };

  export const getSocialTeenagerProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/socialteenagerprojects`);
      return response;
    } catch (error) {
      console.error('Error fetching social teenager projects:', error);
      throw error;
    }
  };


  
  export const getUserDataById = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error fetching user data by ID:', error);
      throw error;
    }
  };