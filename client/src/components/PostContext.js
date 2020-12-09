import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [shouldGetData, setShouldGetData] = useState(true);

  const getData = async () => {
    try {
      const { data } = await axios.get('/api/posts');
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
        posts: [posts, setPosts],
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
