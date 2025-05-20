import { useWishlist } from "../context/WishlistContext";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  if (wishlistItems.length === 0) return <p>No items in wishlist.</p>;

  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlistItems.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
          <button onClick={() => removeFromWishlist(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;
