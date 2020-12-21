import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
// import data from './mockData';
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [shouldGetData, setShouldGetData] = useState(true);

  const getData = async () => {
    try {
      // console.log('hi from context', typeof data, data);
      const { data } = await axios.get(
        // 'http://mern-blog-298121.ew.r.appspot.com/api/posts',
        `http://localhost:5000/api/posts`,
      );
      setPosts([...data]);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getData();
  }, [shouldGetData]);

  return (
    <PostContext.Provider
      value={{
        postsData: [posts, setPosts],
        refresh: [shouldGetData, setShouldGetData],
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
// Create a hook to use the PostContext, this is a Kent C. Dodds pattern
export const useAPI = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
};
