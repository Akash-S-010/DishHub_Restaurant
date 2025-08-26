import React, { useEffect } from "react";
import useWishlistStore from "../../store/wishlistStore.js";
import { Link } from "react-router-dom";
import useCartStore from "../../store/cartStore.js";
import { Trash2 } from "lucide-react";
import FoodCard from '../../components/user/FoodCard'

const Wishlist = () => {
  const { items, loading, hydrate, remove } = useWishlistStore();
  const addCart = useCartStore((s) => s.add);

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-off-white">Your Wishlist</h1>
        <Link to="/menu" className="text-primary hover:underline">
          Browse menu
        </Link>
      </div>

      {loading && (
        <div className="rounded-xl border border-surface bg-card h-28 animate-pulse" />
      )}

      {!loading && items.length === 0 && (
        <div className="rounded-xl border border-surface bg-card p-6 text-muted">
          No items yet. Explore the menu and add your favorites.
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((food) => (
          <FoodCard
            key={food._id || food}
            food={food}
            isFavorite={true}
            onToggleWishlist={(id) => remove(id)}
            onAdd={(id) => addCart(id, 1)}
            onDetails={(id) => window.location.href = `/food/${id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
