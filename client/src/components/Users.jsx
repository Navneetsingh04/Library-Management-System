import React from "react";
import { useSelector } from "react-redux";
import Header from "../layout/Header";

const Users = () => {
  const { users } = useSelector((state) => state.user);
  
  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  };
  
  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">Registered Users</h2>
        </header>
        {users && users.filter((u) => u.role === "User").length > 0 ? (
          <div className="mt-6 w-full rounded-md shadow-lg">
            <div className="w-full overflow-hidden">
              <div className="w-full overflow-x-auto" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table className="min-w-full w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left whitespace-nowrap">ID</th>
                      <th className="px-4 py-2 text-left whitespace-nowrap">Name</th>
                      <th className="px-4 py-2 text-left whitespace-nowrap">Email</th>
                      <th className="px-4 py-2 text-left whitespace-nowrap">Role</th>
                      <th className="px-4 py-2 text-center whitespace-nowrap">No. of Book Borrowed</th>
                      <th className="px-4 py-2 text-center whitespace-nowrap">Registered On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter((u) => u.role === "User").map((user, index) => (
                      <tr key={user._id} className={(index+1) % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{user.role}</td>
                        <td className="px-4 py-2 text-center whitespace-nowrap">{user?.borrowedBooks.length}</td>
                        <td className="px-4 py-2 text-center whitespace-nowrap">{formatDate(user.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <h3 className="text-3xl mt-5 font-medium">No. Register Users found in library</h3>
        )}
      </main>
    </>
  );
};

export default Users;