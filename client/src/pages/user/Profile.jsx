import React, { useMemo, useState } from "react";
import useAuthStore from "../../store/authStore.js";
import useCartStore from "../../store/cartStore.js";
import useWishlistStore from "../../store/wishlistStore.js";
import { SubmitBtn } from "../../components/ui/Button.jsx";
import { User, Mail, Phone, Edit2 } from "lucide-react";

const Profile = () => {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: "",
  });

  const loading = useAuthStore((s) => s.loading);
  const ordersCount = useCartStore((s) => s.items.length);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const change = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.password) delete payload.password;
    await updateProfile(payload);
  };

  const masked = useMemo(
    () => (user?.email ? user.email.replace(/(.{2}).+(@.+)/, "$1***$2") : ""),
    [user]
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="rounded-2xl border border-surface bg-card p-6 flex items-center gap-6">
        <User className="w-20 h-20 p-3 rounded-full bg-surface text-primary"/>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-off-white">
            {user?.name || "User"}
          </h1>
          <div className="mt-3 flex items-center gap-4 text-sm text-muted">
            <div className="inline-flex items-center gap-1">
              <Mail className="w-4 h-4" /> {user?.email}
            </div>
            <div className="inline-flex items-center gap-1">
              <Phone className="w-4 h-4" /> {user?.phone || "—"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-surface bg-card p-4 text-center">
          <div className="text-muted text-sm">Orders</div>
          <div className="text-off-white font-bold text-xl">{ordersCount}</div>
        </div>
        <div className="rounded-lg border border-surface bg-card p-4 text-center">
          <div className="text-muted text-sm">Wishlist</div>
          <div className="text-off-white font-bold text-xl">
            {wishlistCount}
          </div>
        </div>
        <div className="rounded-lg border border-surface bg-card p-4 text-center">
          <div className="text-muted text-sm">Member since</div>
          <div className="text-off-white font-bold text-xl">
            {user?.createdAt ? new Date(user.createdAt).getFullYear() : "—"}
          </div>
        </div>
      </div>

      <form
        onSubmit={submit}
        className="rounded-2xl border border-surface bg-card p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-off-white pb-4">Update profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-off-white text-sm mb-1">Name</label>
            <input
              value={form.name}
              onChange={(e) => change("name", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-card border border-surface text-off-white placeholder:text-gray-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-off-white text-sm mb-1">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => change("phone", e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-card border border-surface text-off-white placeholder:text-muted"
              placeholder="9876543210"
            />
          </div>
        </div>

        <div>
          <label className="block text-off-white text-sm mb-1">Email</label>
          <input
            value={form.email}
            onChange={(e) => change("email", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-card border border-surface text-off-white placeholder:text-muted"
            placeholder="you@example.com"
          />
          {masked && (
            <p className="text-muted text-xs mt-1">Currently: {masked}</p>
          )}
        </div>

        <div>
          <label className="block text-off-white text-sm mb-1">
            New Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => change("password", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-card border border-surface text-off-white placeholder:text-muted"
            placeholder="Leave blank to keep current"
          />
          <p className="text-muted text-xs mt-1">Min 6 characters.</p>
        </div>

        <div className="flex justify-end">
          <SubmitBtn title="Save Changes" loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default Profile;


