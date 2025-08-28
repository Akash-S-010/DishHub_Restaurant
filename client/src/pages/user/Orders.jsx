import React, { useEffect } from "react";
import useOrderStore from "../../store/orderStore";
import Button from "../../components/ui/Button";

const Orders = () => {
  const orders = useOrderStore((s) => s.orders);
  const hydrate = useOrderStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-off-white mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <div className="rounded-xl border border-surface bg-card p-6 text-muted">
          You have no orders yet.
        </div>
      ) : (
        orders.map((o) => (
          <div
            key={o._id}
            className="rounded-xl border border-surface bg-card p-4 mb-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-off-white">
                  Order #{o._id}
                </div>
                <div className="text-muted text-sm">
                  {new Date(o.createdAt).toLocaleString()}
                </div>
                <div className="text-muted text-sm">
                  Status: {o.orderStatus} — Payment: {o.paymentType} (
                  {o.paymentStatus})
                </div>
              </div>
              <div className="font-bold text-off-white">
                ₹{o.totalPrice.toFixed(2)}
              </div>
            </div>

            <div className="mt-3 border-t border-surface pt-3">
              {o.items.map((it) => (
                <div
                  key={it.food._id || it.food}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={it.food.image}
                      alt={it.food.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                    <div>
                      <div className="font-semibold text-off-white">
                        {it.food.name}
                      </div>
                      <div className="text-muted text-sm">
                        Qty: {it.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-off-white">
                    ₹{(it.food.price || 0) * it.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
