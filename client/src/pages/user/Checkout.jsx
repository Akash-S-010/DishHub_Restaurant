import React, { useEffect, useState } from "react";
import useCartStore from "../../store/cartStore";
import useAddressStore from "../../store/addressStore";
import axios from "../../config/axios";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const hydrateCart = useCartStore((s) => s.hydrate);
  const addresses = useAddressStore((s) => s.addresses);
  const hydrateAddresses = useAddressStore((s) => s.hydrate);

  const deliveryFee = 20;
  const subtotal = items.reduce(
    (sum, it) => sum + (it.food?.price || 0) * (it.quantity || 0),
    0
  );
  const total = subtotal + deliveryFee;

  const [selected, setSelected] = useState(null);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    hydrateCart();
    hydrateAddresses();
  }, []);

  useEffect(() => {
    if (!selected && addresses.length > 0) setSelected(addresses[0]._id);
  }, [addresses]);

  const placeOrder = async () => {
    if (!selected) return alert("Please select a delivery address");
    setPlacing(true);
    try {
      const addr = addresses.find((a) => a._id === selected);
      const payload = {
        items: items.map((i) => ({
          food: i.food._id || i.food,
          quantity: i.quantity,
        })),
        totalPrice: total,
        address: addr,
        paymentType: "COD",
      };
      const { data } = await axios.post("/order/place", payload);
      setPlacing(false);
      // navigate to orders page
      navigate("/orders");
    } catch (err) {
      setPlacing(false);
      alert(err?.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 my-10">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold text-primary">Checkout</h1>
        <div className="rounded-xl border border-surface bg-card p-4">
          <h2 className="font-semibold text-off-white mb-2">Items</h2>
          {items.map((it) => (
            <div
              key={it.food._id || it.food}
              className="flex justify-between items-center py-2 border-b last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div>
                  <img
                    src={it.food?.image}
                    alt="foo img"
                    className="size-12 rounded-md"
                  />
                </div>
                <div className="font-semibold text-off-white">
                  {it.food?.name}
                </div>
                <div className="text-muted text-sm">Qty: {it.quantity}</div>
              </div>
              <div className="font-semibold text-off-white">
                ₹{(it.food?.price || 0) * it.quantity}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-surface bg-card p-4">
          <h2 className="font-semibold text-off-white mb-4">
            Choose Delivery Address
          </h2>
          {addresses.length === 0 ? (
            <div className="text-muted">
              No addresses found. Please add one first.
            </div>
          ) : (
            addresses.map((a) => (
              <label
                key={a._id}
                className={`block p-3 rounded-xl mb-2 border ${
                  selected === a._id ? "border-primary bg-bg" : "border-surface"
                }`}
              >
                <input
                  type="radio"
                  name="addr"
                  checked={selected === a._id}
                  onChange={() => setSelected(a._id)}
                  className="mr-2"
                />
                <span className="font-semibold text-off-white">{a.label}</span>
                <div className="text-muted text-sm">{a.street}</div>
                <div className="text-muted text-sm">
                  {a.city}, {a.state} - {a.pincode}
                </div>
                <div className="text-muted text-sm">{a.country}</div>
              </label>
            ))
          )}
          <Button
            title="Change Address"
            onClick={() => navigate("/address")}
            className="mt-4 w-full"
          />
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-xl border border-surface bg-card p-4">
          <h2 className="font-bold text-off-white mb-2">Summary</h2>
          <div className="flex justify-between text-muted">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Delivery</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="border-t border-surface my-2" />
          <div className="flex justify-between font-bold text-off-white">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <Button
            disabled={items.length === 0 || addresses.length === 0 || placing}
            onClick={placeOrder}
            className="mt-4 w-full"
          >
            Place Order
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default Checkout;
