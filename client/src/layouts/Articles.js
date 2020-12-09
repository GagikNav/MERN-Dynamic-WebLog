import React, { useEffect, useContext } from 'react';
import { PostContext } from '../components/PostContext';
//Importing  Components
import Article from '../components/Article';

const Articles = () => {
  // Functions
  const { posts, refresh } = useContext(PostContext);
  const [articles, setArticles] = posts;
  // UseEffects

  useEffect(() => {}, []);

  return (
    <div className='container pt-5  h-100 md-5'>
      <h1>Articles</h1>
      {articles.map((article, index) => (
        <Article key={article._id} article={article} index={index} />
      ))}
    </div>
  );
};

export default Articles;
