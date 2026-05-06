import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://api.freeapi.app/api/v1/public/randomusers",
        );
        setUser(response.data.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {user.map((u) => (
          <div
            key={u.login.uuid}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Avatar */}
            <div className="flex justify-center pt-6">
              <img
                src={u.picture.large}
                alt={`${u.name.first} ${u.name.last}`}
                className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
              />
            </div>

            {/* User Info */}
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {u.name.first} {u.name.last}
              </h2>
              <p className="text-sm text-gray-500 mb-4 capitalize">
                {u.gender}
              </p>

              {/* Email */}
              <div className="mb-3 text-left">
                <p className="text-xs text-gray-600 font-semibold">EMAIL</p>
                <p className="text-sm text-blue-600 truncate">{u.email}</p>
              </div>

              {/* Phone */}
              <div className="mb-3 text-left">
                <p className="text-xs text-gray-600 font-semibold">PHONE</p>
                <p className="text-sm text-gray-700">{u.phone}</p>
              </div>

              {/* Location */}
              <div className="mb-3 text-left">
                <p className="text-xs text-gray-600 font-semibold">LOCATION</p>
                <p className="text-sm text-gray-700">
                  {u.location.city}, {u.location.country}
                </p>
              </div>

              {/* Age */}
              <div className="mb-4 text-left">
                <p className="text-xs text-gray-600 font-semibold">AGE</p>
                <p className="text-sm text-gray-700">{u.dob.age} years old</p>
              </div>

              {/* Username */}
              <div className="bg-gray-100 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-600">USERNAME</p>
                <p className="text-sm font-mono text-gray-800">
                  @{u.login.username}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
