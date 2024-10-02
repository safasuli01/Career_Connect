import React from 'react';
from useEffect from 'react';
import AppRoutes from './routes/AppRoute';
import axios from 'axios';

function App() {
    const endpoint = `${import.meta.env.REACT_API_URL}/posts/`
    const fetchData = async() => {
    console.log('fetching..')
    const response = await.axios.get(endpoint)
    const {data} = response
    return data
    }
    useEffect(() => {
    fetchData()
    }, [])
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
