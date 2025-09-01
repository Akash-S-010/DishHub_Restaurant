import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFoodStore from "../../store/foodStore.js";
import useWishlistStore from "../../store/wishlistStore.js";
import useCartStore from "../../store/cartStore.js";
import useAuthStore from "../../store/authStore.js";
import { Star, Heart, Minus, Plus } from "lucide-react";
import { Button } from "../../components/ui/Button.jsx";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [qty, setQty] = useState(1);
  const { fetchById } = useFoodStore();
  const { items: wishlist, add, remove, hydrate } = useWishlistStore();
  const addCart = useCartStore((s) => s.add);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const load = async () => {
      const data = await fetchById(id);
      if (data) setFood(data);
    };
    load();
  }, [id]);

  useEffect(() => {
    hydrate();
  }, []);

  if (!food) return null;

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(food.avgRating || 0));
  const isInWishlist = (foodId) => wishlist?.some((w) => (w._id || w) === foodId);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    await addCart(food._id, qty);
    navigate('/cart');
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    isInWishlist(food._id) ? await remove(food._id) : await add(food._id);
    await hydrate();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-surface bg-card overflow-hidden">
          {food.image && (
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-96 object-cover"
            />
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center lg:justify-start">
            {food.stockAvailable ? (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Out of stock
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold text-off-white">{food.name}</h1>
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            {stars.map((on, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${on ? "text-primary" : "text-muted"}`}
                fill={on ? "currentColor" : "none"}
              />
            ))}
            {food.avgRating ? (
              <span className="text-xs text-muted">
                {Number(food.avgRating).toFixed(1)}
              </span>
            ) : null}
          </div>

          <p className="text-muted leading-relaxed">{food.description}</p>

          <div className="flex items-center justify-center lg:justify-start mb-2">
            <span className="text-primary text-3xl font-extrabold">₹{food.price}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <div className="inline-flex items-center gap-3 rounded-md border border-surface px-3 py-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-1 hover:text-primary cursor-pointer"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-8 text-center font-semibold text-off-white">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="p-1 hover:text-primary cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              className="px-6 py-3 rounded-md text-black font-semibold"
            >
              Add to Cart
            </Button>
            <Button
              onClick={handleWishlistToggle}
              className="rounded-md px-4 py-3 border border-surface text-off-white hover:bg-surface bg-transparent"
            >
              <Heart
                className={`h-5 w-5 inline mr-2 ${
                  isInWishlist(food._id) ? "text-accent" : "text-muted"
                }`}
              />
              {isInWishlist(food._id) ? "Wishlisted" : "Wishlist"}
            </Button>
          </div>

          {Array.isArray(food.reviews) && food.reviews.length > 0 && (
            <div className="pt-4 border-t border-surface">
              <h3 className="font-bold text-off-white mb-3">Recent Reviews</h3>
              <div className="space-y-3">
                {food.reviews.slice(0, 3).map((r, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-surface bg-card p-3 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-primary">⭐ {r.rating}</span>
                      <span className="text-muted">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {r.comment && (
                      <p className="mt-1 text-off-white/90">{r.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
