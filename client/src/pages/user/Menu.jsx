import React, { useEffect, useMemo, useState } from "react";
import useFoodStore from "../../store/foodStore.js";
import useWishlistStore from "../../store/wishlistStore.js";
import useCartStore from "../../store/cartStore.js";
import { Heart } from "lucide-react";
import FoodCard from '../../components/user/FoodCard';

const Menu = () => {
  const { foods, loading, fetchAll } = useFoodStore();
  const {
    items: wishlist,
    add: addWish,
    remove: removeWish,
  } = useWishlistStore();
  const { add: addCart } = useCartStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(foods.map((f) => f.category));
    return ["All", ...Array.from(set)];
  }, [foods]);

  const filtered = useMemo(() => {
    let list = [...foods];
    if (category !== "All") list = list.filter((f) => f.category === category);
    if (search)
      list = list.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
      );
    if (sort === "price") list.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sort === "-price") list.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sort === "createdAt")
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sort === "-createdAt")
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list;
  }, [foods, category, search, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-off-white">Menu</h1>

      <div className="grid gap-3 md:grid-cols-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search foods..."
          className="md:col-span-2 px-4 py-2 rounded-md bg-card border border-surface text-off-white placeholder:text-muted"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-md bg-card border border-surface text-off-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 rounded-md bg-card border border-surface text-off-white"
        >
          <option value="">Sort</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="createdAt">Oldest</option>
          <option value="-createdAt">Newest</option>
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-surface bg-card h-56 animate-pulse"
            />
          ))}
        {!loading && filtered.map((food) => (
          <FoodCard
            key={food._id}
            food={food}
            isFavorite={wishlist?.some((w) => (w._id || w) === food._id)}
            onToggleWishlist={(id) => wishlist?.some((w) => (w._id || w) === id) ? removeWish(id) : addWish(id)}
            onAdd={(id) => addCart(id, 1)}
            onDetails={(id) => window.location.href = `/food/${id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
