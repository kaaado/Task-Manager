import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from 'react-query'; 


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 10,  
      staleTime: 1000 * 60 * 2,   
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
