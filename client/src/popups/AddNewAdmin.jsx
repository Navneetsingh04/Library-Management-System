import React from "react";
import placeHolder from "../assets/placeholder.jpg";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addNewAdmin } from "../store/slices/userSlice";
import { toggleAddNewAdminPopup } from "../store/slices/popUpSlice";

const AddNewAdmin = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(placeHolder);
  const [avatarPreview, setAvatarPreview] = useState(placeHolder);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    } else {
      setAvatarPreview(placeHolder);
      setAvatar(placeHolder);
    }
  };

  const handleNewAdmin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    dispatch(addNewAdmin(formData));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 p-3 sm:p-5 flex items-center justify-center z-50 overflow-auto">
        <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-xl bg-white rounded-lg shadow-lg">
          <div className="p-4 sm:p-6">
            <header className="flex items-center justify-between mb-6 sm:mb-7 pb-4 sm:pb-5 border-b border-black">
              <div className="flex items-center gap-3">
                <img
                  src={keyIcon}
                  alt="keyIcon"
                  className="bg-gray-300 p-4 sm:p-5 rounded-lg w-12 sm:w-16"
                />
                <h3 className="text-lg sm:text-xl font-bold">Add New Admin</h3>
              </div>
              <img
                src={closeIcon}
                alt="close-Icon"
                className="w-5 sm:w-6 cursor-pointer"
                onClick={() => dispatch(toggleAddNewAdminPopup())}
              />
            </header>
            <form onSubmit={handleNewAdmin}>
              {/* Avatar Selection */}
              <div className="flex flex-col items-center justify-center mb-6">
                <label htmlFor="avatarInput" className="cursor-pointer group relative">
                  <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-md hover:shadow-lg transition-all duration-200">
                    <img
                      src={avatarPreview ? avatarPreview : avatar}
                      alt="Profile avatar"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 rounded-full">
                      <span className="text-white text-sm font-medium">Change</span>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2 text-center">Click to upload profile picture</p>
              </div>

              {/* Name Input */}
              <div className="mb-4 sm:mb-5">
                <label htmlFor="name" className="block mb-2 font-medium text-sm sm:text-base">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base"
                />
              </div>

              {/* Email Input */}
              <div className="mb-4 sm:mb-5">
                <label htmlFor="email" className="block mb-2 font-medium text-sm sm:text-base">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4 sm:mb-5">
                <label htmlFor="password" className="block mb-2 font-medium text-sm sm:text-base">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => dispatch(toggleAddNewAdminPopup())}
                  className="px-3 sm:px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm sm:text-base"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-3 sm:px-4 py-2 bg-black rounded-md text-white hover:bg-gray-800 text-sm sm:text-base"
                >
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewAdmin;
