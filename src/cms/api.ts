import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('cms_token');
    return token ? { Authorization: `Token ${token}` } : {};
};

export const api = {
    login: (username: string, password: string) =>
        axios.post(`${API_BASE}/auth/login/`, { username, password }),

    // Company Info
    getCompanyInfo: () => axios.get(`${API_BASE}/company-info/`),
    updateCompanyInfo: (id: number, data: any) =>
        axios.patch(`${API_BASE}/company-info/${id}/`, data, { headers: getAuthHeaders() }),

    // About Paragraphs
    getAboutParagraphs: () => axios.get(`${API_BASE}/about/`),
    createAboutParagraph: (data: any) =>
        axios.post(`${API_BASE}/about/`, data, { headers: getAuthHeaders() }),
    updateAboutParagraph: (id: number, data: any) =>
        axios.patch(`${API_BASE}/about/${id}/`, data, { headers: getAuthHeaders() }),
    deleteAboutParagraph: (id: number) =>
        axios.delete(`${API_BASE}/about/${id}/`, { headers: getAuthHeaders() }),

    // Categories
    getCategories: () => axios.get(`${API_BASE}/categories/`),
    createCategory: (data: any) =>
        axios.post(`${API_BASE}/categories/`, data, { headers: getAuthHeaders() }),
    updateCategory: (id: number, data: any) =>
        axios.patch(`${API_BASE}/categories/${id}/`, data, { headers: getAuthHeaders() }),
    deleteCategory: (id: number) =>
        axios.delete(`${API_BASE}/categories/${id}/`, { headers: getAuthHeaders() }),

    // Products
    getProducts: () => axios.get(`${API_BASE}/products/`),
    createProduct: (data: FormData) =>
        axios.post(`${API_BASE}/products/`, data, {
            headers: { ...getAuthHeaders(), 'Content-Type': 'multipart/form-data' },
        }),
    updateProduct: (id: number, data: FormData) =>
        axios.patch(`${API_BASE}/products/${id}/`, data, {
            headers: { ...getAuthHeaders(), 'Content-Type': 'multipart/form-data' },
        }),
    deleteProduct: (id: number) =>
        axios.delete(`${API_BASE}/products/${id}/`, { headers: getAuthHeaders() }),
};
