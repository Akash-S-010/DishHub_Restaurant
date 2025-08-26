import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFoodStore from "../../store/foodStore.js";
import useWishlistStore from "../../store/wishlistStore.js";
import useCartStore from "../../store/cartStore.js";
import { Minus, Plus, Heart, Star } from "lucide-react";
import Button from '../../components/ui/Button'

const Details = () => {
  const { id } = useParams();
  const { fetchById, loading } = useFoodStore();
  const wishlist = useWishlistStore((s) => s.items);
  const add = useWishlistStore((s) => s.add);
  const remove = useWishlistStore((s) => s.remove);
  const hydrate = useWishlistStore((s) => s.hydrate);
  const [food, setFood] = useState(null);
  const [qty, setQty] = useState(1);
  const addCart = useCartStore((s) => s.add);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const f = await fetchById(id);
      setFood(f);
    })();
  }, [id]);

  useEffect(() => {
    // ensure wishlist is loaded so isInWishlist() works correctly
    hydrate();
  }, []);

  const isInWishlist = (fid) => wishlist?.some((w) => (w._id || w) === fid);

  const stars = useMemo(() => {
    const r = Number(food?.avgRating || 0);
    return Array.from({ length: 5 }).map((_, i) => i < Math.round(r));
  }, [food]);

  if (loading || !food)
    return (
      <div className="h-72 animate-pulse rounded-2xl border border-surface bg-card" />
    );

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-10 items-center">
      {/* Left: Image with overlay and wishlist */}
      <div className="relative rounded-2xl overflow-hidden border border-surface bg-card flex items-center justify-center">
        <img src={food.image} alt={food.name} className="w-full h-96 object-cover max-w-full" />
        <button
          onClick={async () => {
            isInWishlist(food._id) ? await remove(food._id) : await add(food._id);
            await hydrate();
          }
          }
          className="absolute top-3 right-3 rounded-full p-2 bg-black hover:opacity-90 cursor-pointer"
          aria-label="Toggle wishlist"
        >
          <Heart
            className={`w-5 h-5 ${
              isInWishlist(food._id) ? "text-accent" : "text-off-white"
            }`}
          />
        </button>
      </div>

      {/* Right: Info panel */}
      <div className="space-y-5 text-center lg:text-left">
        <div className="flex items-center gap-2 justify-center lg:justify-start">
          {food.category && (
            <span className="text-xs px-2 py-1 rounded bg-black border border-surface text-muted">
              {food.category}
            </span>
          )}
          {food.stockAvailable === false && (
            <span className="text-xs px-2 py-1 rounded border border-surface text-accent">
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
              onClick={async () => {
                await addCart(food._id, qty);
                navigate('/cart');
              }}
              className="px-6 py-3 rounded-md text-black font-semibold"
            >
              Add to Cart
            </Button>
          <Button
            onClick={async () => {
              isInWishlist(food._id) ? await remove(food._id) : await add(food._id);
              await hydrate();
            }}
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
  );
};

export default Details;
