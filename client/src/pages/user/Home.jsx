import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button";
import FoodCard from '../../components/user/FoodCard'
import useFoodStore from "../../store/foodStore.js";
import useWishlistStore from "../../store/wishlistStore.js";
import useCartStore from "../../store/cartStore.js";

const Home = () => {
  const navigate = useNavigate();
  const { foods, loading, fetchAll } = useFoodStore();
  const { items: wishlist, hydrate, add, remove } = useWishlistStore();
  const addCart = useCartStore((s) => s.add);

  useEffect(() => {
    fetchAll();
    hydrate();
  }, []);

  const isInWishlist = (id) => wishlist?.some((w) => (w._id || w) === id);

  const latest = [...foods]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-off-white">
            Taste the Best. Delivered Fast.
          </h1>
          <p className="text-muted md:text-lg">
            Burgers, pizzas, fries and more. Crafted fresh, delivered hot. Order
            now and satisfy your cravings.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/menu")}
              className="px-6 py-3 rounded-md inline-flex items-center gap-2 "
            >
              Order Now <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => navigate("/about")}
              className="px-6 py-3 rounded-md border border-muted text-off-white hover:bg-surface bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-surface bg-card min-h-[260px] md:min-h-[360px]" />
      </section>

      {/* Highlights */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {["Fresh Ingredients", "Fast Delivery", "Hot & Crispy"].map((t, i) => (
          <div key={i} className="rounded-xl border border-surface bg-card p-5">
            <h3 className="font-bold text-off-white mb-1">{t}</h3>
            <p className="text-muted text-sm">
              We focus on flavor, speed and quality for every order.
            </p>
          </div>
        ))}
      </section>

      {/* Latest section header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-off-white">Latest Delights</h2>
          <p className="text-muted text-sm">
            Freshly added items picked for you
          </p>
        </div>
        <Link
          to="/menu"
          className="text-primary hover:underline inline-flex items-center gap-2"
        >
          Show more <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-surface bg-card h-56 animate-pulse"
            />
          ))}
        {!loading && latest.map((food) => (
          <FoodCard
            key={food._id}
            food={food}
            isFavorite={isInWishlist(food._id)}
            onToggleWishlist={(id) => isInWishlist(id) ? remove(id) : add(id)}
            onAdd={(id) => addCart(id, 1)}
            onDetails={(id) => navigate(`/food/${id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
