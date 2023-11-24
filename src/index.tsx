import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import router from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// 아래와 같이 소스 코드에 적혀있는데 안됨, 아마도 ReactDOM 버전 문제인듯?
// import ReactDOM from 'react-dom' 이렇게 적어야 함
// ReactDOM.render(
//   <React.StrictMode>
//     <ThemeProvider theme={darkTheme}>
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );




// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <ThemeProvider theme={}>
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>
// );
