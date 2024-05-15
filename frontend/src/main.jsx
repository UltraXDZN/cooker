import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./routes/home";
import LoginPage from "./routes/login";
import RegisterPage from "./routes/register";
import EventsPage from "./routes/events";
import EventPage from "./routes/event";
import CreateEventPage from "./routes/createEvent";
import EditEventPage from "./routes/editEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/events",
    element: <EventsPage />,
  },
  {
    path: "/events/:eventID",
    element: <EventPage />,
  },
  {
    path: "/events/:eventID/edit",
    element: <EditEventPage />,
  },
  {
    path: "/events/create",
    element: <CreateEventPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
