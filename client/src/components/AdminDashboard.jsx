import React, { useEffect, useState } from "react";
import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import Header from "../layout/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);
  const { settingPopup } = useSelector((state) => state.popup);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState((books && books.length) || 0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
  // Count users and admins
  let totalUsersCount = 0;
  let totalAdminCount = 0;
  users?.forEach((user) => {
    if (user.role === "User") {
      totalUsersCount++;
    } else if (user.role === "Admin") {
      totalAdminCount++;
    }
  });
  setTotalUsers(totalUsersCount);
  setTotalAdmin(totalAdminCount);

  let totalBorrowed = 0;
  let totalReturned = 0;
  allBorrowedBooks?.forEach((book) => {
    if (book.returnDate === null) {
      totalBorrowed++;
    } else {
      totalReturned++;
    }
  });
  setTotalBorrowedBooks(totalBorrowed);
  setTotalReturnedBooks(totalReturned);
  setTotalBooks(books?.length || 0);
}, [users, allBorrowedBooks, books]);


  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        label: "Books",
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#4F46E5", "#10B981"],
        hoverBackgroundColor: ["#3730A3", "#059669"],
        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <main className="relative flex-1 p-3 sm:p-4 md:p-6 pt-20 md:pt-28">
        <Header />
        <div className="flex flex-col xl:flex-row gap-4 md:gap-6">
          {/* Right Side on Mobile, Left Side on Desktop */}
          <div className="w-full xl:w-2/3 flex flex-col gap-4 md:gap-6 order-2 xl:order-1">
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              {/* Stat Cards */}
              <div className="w-full sm:w-1/2 flex flex-col gap-4">
                <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
                  <div className="bg-indigo-50 h-12 w-12 sm:h-16 sm:w-16 flex justify-center items-center rounded-lg">
                    <img src={usersIcon} alt="Users icon" className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <span className="w-px bg-gray-200 self-stretch"></span>
                  <div className="flex-1 flex flex-col items-center">
                    <h4 className="font-bold text-xl sm:text-2xl text-gray-800">{totalUsers}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Total User Base</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
                  <div className="bg-green-50 h-12 w-12 sm:h-16 sm:w-16 flex justify-center items-center rounded-lg">
                    <img src={bookIcon} alt="Books icon" className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <span className="w-px bg-gray-200 self-stretch"></span>
                  <div className="flex-1 flex flex-col items-center">
                    <h4 className="font-bold text-xl sm:text-2xl text-gray-800">{totalBooks}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Total Books Count</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
                  <div className="bg-purple-50 h-12 w-12 sm:h-16 sm:w-16 flex justify-center items-center rounded-lg">
                    <img src={adminIcon} alt="Admin icon" className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <span className="w-px bg-gray-200 self-stretch"></span>
                  <div className="flex-1 flex flex-col items-center">
                    <h4 className="font-bold text-xl sm:text-2xl text-gray-800">{totalAdmin}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Total Admin Count</p>
                  </div>
                </div>
              </div>
              
              {/* Admin Profile */}
              <div className="w-full sm:w-1/2">
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 h-full">
                  <div className="flex flex-col items-center">
                    <div className="mb-3 sm:mb-4 relative">
                      <img
                        src={user?.avatar?.url || "/placeholder-avatar.png"}
                        alt="Admin avatar"
                        className="rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover border-4 border-gray-50"
                      />
                      <span className="absolute bottom-1 right-1 bg-green-500 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-white"></span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-center mb-1 sm:mb-2">
                      {user?.name || "Admin"}
                    </h2>
                    <p className="text-xs sm:text-sm text-indigo-600 font-medium mb-2 sm:mb-4">
                      {user?.role || "Administrator"}
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm text-center max-w-xs">
                      Welcome to your admin dashboard. Here you can manage all the
                      settings and monitor the statistics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quote - Hidden on small screens, shown on xl screens */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 hidden lg:block">
              <blockquote className="text-lg md:text-xl xl:text-2xl font-medium text-center italic text-gray-800">
                "Embarking on the journey of reading fosters personal growth,
                nurturing a path towards excellence and the refinement of
                character."
                <footer className="text-gray-600 text-xs sm:text-sm mt-3 md:mt-4 text-right font-normal">
                  ~ BookWarm Team
                </footer>
              </blockquote>
            </div>
          </div>
          
          {/* Left Side on Mobile, Right Side on Desktop */}
          <div className="w-full xl:w-1/3 flex flex-col gap-4 md:gap-6 bg-gray-50 p-4 md:p-6 rounded-xl order-1 xl:order-2">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-gray-800">Book Statistics</h3>
              <div className="relative h-48 sm:h-56 md:h-64">
                <Pie
                  data={data}
                  options={{ 
                    cutout: 0,
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }}
                  className="mx-auto w-full"
                />
              </div>
              <div className="flex justify-center gap-4 md:gap-8 mt-4 md:mt-6">
                <p className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#4F46E5]"></span>
                  <span className="text-xs sm:text-sm font-medium">Borrowed ({totalBorrowedBooks})</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
                  <span className="text-xs sm:text-sm font-medium">Returned ({totalReturnedBooks})</span>
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex items-center gap-3 md:gap-4">
              <img
                src={logo}
                alt="Library logo"
                className="h-8 sm:h-10 md:h-12 w-auto"
              />
              <div>
                <h3 className="font-semibold text-sm sm:text-base">BookWarm Library</h3>
                <p className="text-xs sm:text-sm text-gray-600">Digital Management System</p>
              </div>
            </div>
            
            {/* Quote - Only visible on small screens up to lg */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 block lg:hidden">
              <blockquote className="text-sm sm:text-base font-medium text-center italic text-gray-800">
                "Embarking on the journey of reading fosters personal growth,
                nurturing a path towards excellence and the refinement of
                character."
                <footer className="text-gray-600 text-xs mt-2 sm:mt-3 text-right font-normal">
                  ~ BookWarm Team
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;