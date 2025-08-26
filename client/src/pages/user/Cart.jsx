import React, { useEffect } from "react";
import useCartStore from "../../store/cartStore.js";
import { Minus, Plus, Trash2 } from "lucide-react";
import Button from '../../components/ui/Button'
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { items, hydrate, updateQty, remove, clear, subtotal } = useCartStore();

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold text-off-white">Your Cart</h1>
        {items.length === 0 ? (
          <div className="rounded-xl border border-surface bg-card p-6">
            <p className="text-muted">
              Your cart is empty.{" "}
              <Link className="text-primary" to="/menu">
                Browse menu
              </Link>
            </p>
          </div>
        ) : (
          items.map((it) => (
            <div
              key={it.food?._id || it.food}
              className="rounded-xl border border-surface bg-card p-4 flex gap-4 items-center"
            >
              <img
                src={it.food?.image}
                alt={it.food?.name}
                className="h-20 w-20 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-off-white">
                  {it.food?.name}
                </h3>
                <p className="text-muted">₹{it.food?.price}</p>
                <div className="mt-2 inline-flex items-center gap-3 rounded-md border border-surface px-3 py-2">
                  <Button
                    onClick={() =>
                      updateQty(
                        it.food?._id || it.food,
                        Math.max(1, it.quantity - 1)
                      )
                    }
                    className="p-1 hover:text-primary bg-transparent"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="min-w-8 text-center font-semibold text-off-white">
                    {it.quantity}
                  </span>
                  <Button
                    onClick={() =>
                      updateQty(it.food?._id || it.food, it.quantity + 1)
                    }
                    className="p-1 hover:text-primary bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-off-white">
                  ₹{(it.food?.price || 0) * it.quantity}
                </p>
                <Button
                  onClick={() => remove(it.food?._id || it.food)}
                  className="mt-2 inline-flex items-center gap-1 text-accent hover:opacity-90 bg-transparent"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              </div>
            </div>
          ))
        )}
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
            <span>₹0</span>
          </div>
          <div className="border-t border-surface my-2" />
          <div className="flex justify-between font-bold text-off-white">
            <span>Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <Button
            disabled={items.length === 0}
            onClick={() => navigate("/checkout")}
            className="mt-4 w-full px-4 py-3 rounded-md text-black font-semibold"
          >
            Proceed to Checkout
          </Button>
          {items.length > 0 && (
            <Button
              onClick={clear}
              className="mt-2 w-full px-4 py-2 rounded-md border border-surface hover:bg-surface bg-transparent"
            >
              Clear Cart
            </Button>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Cart;
