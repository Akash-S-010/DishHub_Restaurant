import React, { useMemo, useState } from "react";
import useAuthStore from "../../store/authStore.js";
import { SubmitBtn } from "../../components/ui/Button.jsx";

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
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="rounded-2xl border border-surface bg-card p-6">
        <h1 className="text-2xl font-bold text-off-white">Your Profile</h1>
        <p className="text-muted text-sm">Update your account details.</p>
      </div>

      <form
        onSubmit={submit}
        className="rounded-2xl border border-surface bg-card p-6 space-y-4"
      >
        <div>
          <label className="block text-off-white text-sm mb-1">Name</label>
          <input
            value={form.name}
            onChange={(e) => change("name", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-card border border-surface text-off-white placeholder:text-muted"
            placeholder="Your name"
          />
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
          <label className="block text-off-white text-sm mb-1">Phone</label>
          <input
            value={form.phone}
            onChange={(e) => change("phone", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-card border border-surface text-off-white placeholder:text-muted"
            placeholder="9876543210"
          />
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
        <SubmitBtn title="Save Changes" loading={loading} />
      </form>
    </div>
  );
};

export default Profile;
