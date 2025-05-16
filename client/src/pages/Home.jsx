import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "../layout/SideBar.jsx";
import UserDashboard from "../components/UserDashboard.jsx";
import AdminDashboard from "../components/AdminDashboard.jsx";
import BookManagement from "../components/BookManagement.jsx";
import Users from "../components/Users.jsx";
import Catalog from "../components/Catalog.jsx";
import MyBorrowedBooks from "../components/MyBorrowedBooks.jsx";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const renderComponent = () => {
    user?.role || "User";
    switch (selectedComponent) {
      case "Dashboard":
        return user?.role === "User" ? <UserDashboard /> : <AdminDashboard />;
      case "Book":
        return <BookManagement />;
      case "Catalog":
        return user?.role === "Admin" ? <Catalog /> : null;
      case "Users":
        return user?.role === "Admin" ? <Users /> : null;
      case "My Borrowed Books":
        return <MyBorrowedBooks />;
      default:
        return user?.role === "User" ? <UserDashboard /> : <AdminDashboard />;
    }
  };

  return (
    <>
      <div className="relative md:pl-64 flex min-h-screen bg-gray-100">
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden z-10 absolute right-6 sm:top-6 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white">
          <GiHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        {/* Sidebar Component */}
        <Sidebar
          isSideBarOpen={isSidebarOpen}
          setIsSideBarOpen={setIsSidebarOpen}
          setSelectedComponent={setSelectedComponent}
        />

        {/* Render Selected Component */}
        {renderComponent()}
      </div>
    </>
  );
};

export default Home;
