import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { fPost1, fPost2 } from './FeaturedPosts';
import { sideBar } from './FooterLinks';
// import data from './mockData';
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([fPost1, fPost2]);
  const [shouldGetData, setShouldGetData] = useState(true);

  //

  const getData = async () => {
    try {
      // console.log('hi from context', typeof data, data);
      const { data } = await axios.get(
        'https://mern-blog-298121.ew.r.appspot.com/api/posts',
        // `http://localhost:5000/api/posts`,
      );
      setPosts([fPost1, fPost2, ...data]);
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
        sidebar: sideBar,
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
