import React, { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { getUserFriends } from "../lib/api"; // adjust path to where your function is
import FriendCard from "../components/FriendCard"; // optional if you have a card component
import { Link } from "react-router";


const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(true);

  // Fetch friends from backend
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getUserFriends();
        setFriends(data);
      } catch (err) {
        console.error("Error fetching friends:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  const showMore = () => setLimit((prev) => prev + 3);
  const showLess = () => setLimit(3);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex flex-col h-full p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Friends</h1>
        <input
          type="text"
          placeholder="Search friends..."
          className="input input-bordered w-60"
        />
      </div>

      {/* Friends list */}
      <div className="flex-1 overflow-y-auto rounded-xl border border-base-300 bg-base-200 p-4">
        {friends.length === 0 ? (
          <p className="text-center text-gray-500">No friends yet.</p>
        ) : (
          <>
            <ul className="space-y-3">
              {friends.slice(0, limit).map((friend) => (
                <li
                  key={friend._id}
                  className="flex items-center justify-between rounded-lg bg-base-100 p-3 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={friend.profilePic}
                      alt={friend.fullName}
                      className="h-12 w-12 rounded-full object-cover border-2 border-primary/40"
                    />
                    <div>
                      <h2 className="font-semibold text-lg">{friend.fullName}</h2>
                      <p className="text-sm text-gray-400">{friend.nativeLanguage}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-outline btn-primary flex items-center gap-1">
                     <Link to={`/chat/${friend._id}`} >
                     Chat
                   </Link>
                      
                    </button>
                    <button className="btn btn-sm btn-outline btn-success flex items-center gap-1">
                      <Phone size={16} />
                      Call
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Show More / Less */}
            <div className="text-center mt-4">
              {limit < friends.length ? (
                <button onClick={showMore} className="btn btn-outline btn-primary">
                  Show More
                </button>
              ) : (
                friends.length > 3 && (
                  <button onClick={showLess} className="btn btn-outline btn-secondary">
                    Show Less
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;

