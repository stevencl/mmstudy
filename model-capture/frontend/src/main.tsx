import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CaptureView } from './views/CaptureView';
import { ModeratorHome } from './views/ModeratorHome';
import { ParticipantDetailView } from './views/ParticipantDetailView';
import './styles.css';

const router = createBrowserRouter([
  { path: '/', element: <CaptureView /> },
  { path: '/moderator', element: <ModeratorHome /> },
  { path: '/moderator/p/:id', element: <ParticipantDetailView /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
