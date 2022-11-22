import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'}) //intantiatiating axios


//token to carry for every route (token bearer) 
//=> it provides the a header (header.Authorization) to every routes which is being accessed in the Back End
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`; //need to start with the word bearer
    }

    return req;  
})


//api endpoints for posts
export const fetchPost = (id) => API.get(`/posts/${id}`); //in the backend it is 'posts/:id' not 'post/:id'
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, {value});


//api endpoints for like auths

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);