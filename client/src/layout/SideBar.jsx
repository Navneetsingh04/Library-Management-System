import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RiAdminFill } from "react-icons/ri";
import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import catalogIcon from "../assets/catalog.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { toggleAddNewAdminPopup, toggleSettingPopup } from "../store/slices/popUpSlice";
import AddNewAdmin from "../popups/AddNewAdmin";
import { logout, resetSlice } from "../store/slices/authSlice";
import SettingPopup from "../popups/SettingPopup"; 

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const { addNewAdminPopup, settingPopup } = useSelector(state => state.popup);
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSlice());
    }
  }, [dispatch, isAuthenticated, error, loading, message]);

  return (
    <>
    <aside
      className={`${
        isSideBarOpen ? "left-0" : "-left-full"
      } z-10 transition-all duration-700 md:relative md:left-0 md:w-56 lg:w-60 xl:w-64 flex bg-black text-white flex-col h-full`}
      style={{position: "fixed"}}
    >
      <div className="px-6 py-4 my-8">
        <img src={logo_with_title} alt="logo" className="w-full" />
      </div>

      <nav className="flex-1 px-6 space-y-4">
        <button
          onClick={() => setSelectedComponent("Dashboard")}
          className="w-full py-3 font-medium flex items-center space-x-3 hover:bg-gray-800 rounded-md cursor-pointer"
        >
          <img src={dashboardIcon} alt="dashboard" className="w-6 h-6" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setSelectedComponent("Book")}
          className="w-full py-3 font-medium flex items-center space-x-3 hover:bg-gray-800 rounded-md cursor-pointer"
        >
          <img src={bookIcon} alt="books" className="w-6 h-6" />
          <span>Books</span>
        </button>

        {isAuthenticated && user?.role === "Admin" && (
          <>
            <button
              onClick={() => setSelectedComponent("Catalog")}
              className="w-full py-3 font-medium flex items-center space-x-3 hover:bg-gray-800 rounded-md cursor-pointer"
            >
              <img src={catalogIcon} alt="catalog" className="w-6 h-6" />
              <span>Catalog</span>
            </button>
            <button
              onClick={() => setSelectedComponent("Users")}
              className="w-full py-3 font-medium flex items-center space-x-3 hover:bg-gray-800 rounded-md cursor-pointer"
              >
              <img src={usersIcon} alt="users" className="w-6 h-6" />
              <span>Users</span>
            </button>
            <button
              onClick={() => dispatch(toggleAddNewAdminPopup())}
              className="w-full py-3 font-medium flex items-center space-x-3 hover:bg-gray-800 rounded-md cursor-pointer"
            >
              <RiAdminFill className="text-2xl text-white" /> <span> Add New Admin</span>
            </button>
          </>
        )}

        {isAuthenticated && user?.role === "User" && (
          <button
            onClick={() => setSelectedComponent("My Borrowed Books")}
            className="w-full py-3 font-medium flex items-center space-x-3 hover:bg-gray-800 rounded-md cursor-pointer"
          >
            <img src={catalogIcon} alt="my-borrowed-books" className="w-6 h-6" />
            <span>Borrowed Books</span>
          </button>
        )}

        <button
          className="md:hidden w-full py-3 font-medium flex items-center space-x-3 hover:bg-gray-800 rounded-md cursor-pointer"
          onClick={() => dispatch(toggleSettingPopup())}
        >
          <img src={settingIcon} alt="Credentials" className="w-6 h-6" />
          <span>Update Credentials</span>
        </button>
      </nav>

      <button
        onClick={handleLogout}
        className="py-3 font-medium text-center flex items-center justify-center space-x-3 hover:bg-red-600 rounded-md mx-auto w-full mb-7 cursor-pointer"
      >
        <img src={logoutIcon} alt="logout" className="w-6 h-6" />
        <span>Log Out</span>
      </button>

      <img
        src={closeIcon}
        alt="closeIcon"
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        className="absolute top-0 right-4 mt-4 block md:hidden cursor-pointer w-6 h-6"
      />
    </aside>
    {addNewAdminPopup && <AddNewAdmin />}
    {settingPopup && <SettingPopup />} 
    </>
  );
};

export default SideBar;