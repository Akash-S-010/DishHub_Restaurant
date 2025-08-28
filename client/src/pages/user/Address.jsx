import React, { useEffect, useState } from "react";
import useAddressStore from "../../store/addressStore";
import Button, { SubmitBtn } from "../../components/ui/Button";

const EmptyForm = {
  label: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
};

const Address = () => {
  const addresses = useAddressStore((s) => s.addresses);
  const hydrate = useAddressStore((s) => s.hydrate);
  const add = useAddressStore((s) => s.add);
  const update = useAddressStore((s) => s.update);
  const remove = useAddressStore((s) => s.remove);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EmptyForm);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (editing) {
      const addr = addresses.find((a) => a._id === editing);
      if (addr) setForm({ ...addr });
    } else {
      setForm(EmptyForm);
    }
  }, [editing, addresses]);

  const submit = async (e) => {
    e.preventDefault();
    // client-side validation
    const errs = [];
    if (!form.label || !form.label.trim()) errs.push("Label is required");
    if (!form.street || !form.street.trim())
      errs.push("Street / Address is required");
    if (!form.city || !form.city.trim()) errs.push("City is required");
    if (!form.state || !form.state.trim()) errs.push("State is required");
    if (!form.pincode || !form.pincode.toString().trim())
      errs.push("Pincode is required");

    if (errs.length) {
      setErrors(errs);
      return;
    }

    setErrors([]);
    const payload = { ...form, country: "India" };
    if (editing) await update(editing, payload);
    else await add(payload);
    setEditing(null);
    setForm(EmptyForm);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-off-white mb-4">
        Manage Addresses
      </h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          {addresses.length === 0 ? (
            <div className="rounded-xl border border-surface bg-card p-4 text-muted">
              No addresses saved.
            </div>
          ) : (
            addresses.map((a) => (
              <div
                key={a._id}
                className="rounded-xl border border-surface bg-card p-4 mb-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-off-white">
                      {a.label}
                    </div>
                    <div className="text-muted text-sm">{a.street}</div>
                    <div className="text-muted text-sm">
                      {a.city}, {a.state} - {a.pincode}
                    </div>
                    <div className="text-muted text-sm">{a.country}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => setEditing(a._id)}
                      className="px-3 py-1"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => remove(a._id)}
                      className="px-3 py-1 bg-red-400 hover:bg-red-500 border"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <form
            onSubmit={submit}
            className="rounded-xl border border-surface bg-card p-4 space-y-3"
          >
            <h2 className="font-semibold text-off-white">
              {editing ? "Edit Address" : "Add Address"}
            </h2>
            {errors.length > 0 && (
              <div className="bg-red-800/50 text-red-200 p-2 rounded">
                {errors.map((er, i) => (
                  <div key={i} className="text-sm">
                    {er}
                  </div>
                ))}
              </div>
            )}
            <input
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder="Label (e.g., Home)"
              className="w-full rounded px-3 py-2 bg-bg border border-primary text-off-white"
            />
            <input
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              placeholder="Street / Address"
              className="w-full rounded px-3 py-2 bg-bg border border-primary text-off-white"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="City"
                className="rounded px-3 py-2 bg-bg border border-primary text-off-white"
              />
              <input
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                placeholder="State"
                className="rounded px-3 py-2 bg-bg border border-primary text-off-white"
              />
              <input
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                placeholder="Pincode"
                className="rounded px-3 py-2 bg-bg border border-primary text-off-white"
              />
            </div>
            {/* Country is set to India by default and not editable */}
            <div className="flex gap-2">
              <SubmitBtn className="px-4 py-2">
                {editing ? "Update" : "Add"}
              </SubmitBtn>
              {editing && (
                <Button
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 bg-transparent border"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Address;
