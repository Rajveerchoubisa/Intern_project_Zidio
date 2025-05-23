import { useWishlist } from "../context/WishlistContext";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  if (wishlistItems.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg font-semibold">🦸 No items in your wishlist.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">
        ⭐ Your Wishlist
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="bg-gray-800 rounded-xl shadow-lg p-4 hover:shadow-2xl transition duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-yellow-400 font-bold mb-4">₹{item.price}</p>
            <button
              onClick={() => removeFromWishlist(item._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Remove ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
