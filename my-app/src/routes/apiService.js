import axios from 'axios';

const API = 'http://localhost:5000/api';

// Auth endpoints
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// Album endpoints
export const getAlbums = async () => {
  try {
    const response = await axios.get(`${API}/albums`);
    return response.data;
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

export const getAlbum = async (albumId) => {
  try {
    const response = await axios.get(`${API}/albums/${albumId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching album:', error);
    throw error;
  }
};

// Artist endpoints
export const getArtists = async () => {
  try {
    const response = await axios.get(`${API}/artists`);
    return response.data;
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
};

export const getArtist = async (artistId) => {
  try {
    const response = await axios.get(`${API}/artists/${artistId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching artist:', error);
    throw error;
  }
};

// Collection endpoints
export const getCollections = async () => {
  try {
    const response = await axios.get(`${API}/collections`);
    return response.data;
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
};

export const addToCollection = async (collectionId, albumId) => {
  try {
    const response = await axios.post(`${API}/collections/${collectionId}/albums`, { album_id: albumId });
    return response.data;
  } catch (error) {
    console.error('Error adding to collection:', error);
    throw error;
  }
};

// Review endpoints
export const addReview = async (albumId, reviewData) => {
  try {
    const response = await axios.post(`${API}/reviews/${albumId}`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// Search endpoints
export const searchMusic = async (query) => {
  try {
    const response = await axios.get(`${API}/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching:', error);
    throw error;
  }
};

// Identifier database endpoints
export const searchIdentifier = async (query) => {
  try {
    const response = await axios.get(`${API}/identifier/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching identifier:', error);
    throw error;
  }
};