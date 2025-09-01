import React, { useEffect, useState } from "react";
import useOrderStore from "../../store/orderStore";
import ReviewModal from "../../components/user/ReviewModal";
import { MessageSquare } from "lucide-react";

const Orders = () => {
  const orders = useOrderStore((s) => s.orders);
  const hydrate = useOrderStore((s) => s.hydrate);
  const [reviewModal, setReviewModal] = useState({
    isOpen: false,
    foodId: null,
    foodName: "",
    foodImage: "",
  });

  useEffect(() => {
    hydrate();
  }, []);

  // Badge helper (common style, only text color changes)
  const makeBadge = (status, map) => {
    if (!status) return { label: "Unknown", classes: "text-gray-400" };
    const s = status.toLowerCase();
    for (const key in map) {
      if (s.includes(key))
        return { label: map[key].label, classes: map[key].classes };
    }
    return { label: status, classes: "text-gray-400" };
  };

  const paymentBadge = (status) =>
    // backend paymentStatus: ["pending", "paid", "failed"]
    makeBadge(status, {
      paid: { label: "Paid", classes: "text-emerald-500" },
      pending: { label: "Pending", classes: "text-yellow-500" },
      failed: { label: "Failed", classes: "text-rose-500" },
    });

  const orderBadge = (status) =>
    // backend orderStatus enum: ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"]
    makeBadge(status, {
      prepar: { label: "Preparing", classes: "text-yellow-500" },
      "out for delivery": {
        label: "Out for Delivery",
        classes: "text-indigo-500",
      },
      out: { label: "Out for Delivery", classes: "text-indigo-500" },
      delivery: { label: "Out for Delivery", classes: "text-indigo-500" },
      deliver: { label: "Delivered", classes: "text-emerald-500" },
      deliv: { label: "Delivered", classes: "text-emerald-500" },
      delivered: { label: "Delivered", classes: "text-emerald-500" },
      cancel: { label: "Cancelled", classes: "text-rose-500" },
    });

  const smallId = (id) => {
    if (!id) return "-";
    try {
      return `#${String(id).slice(-6)}`;
    } catch {
      return `#${id}`;
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-off-white mb-4">My Orders</h1>
        {orders.length === 0 ? (
          <div className="rounded-xl border border-surface bg-card p-6 text-muted">
            You have no orders yet.
          </div>
        ) : (
          orders.map((o) => {
            const pay = paymentBadge(o.paymentStatus || o.paymentType);
            const ord = orderBadge(o.orderStatus);

            return (
              <div
                key={o._id}
                className="rounded-xl border border-surface bg-card p-4 mb-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Left Section */}
                  <div>
                    <div className="font-semibold text-off-white text-lg">
                      {smallId(o._id)}
                    </div>
                    <div className="text-muted text-sm">
                      {new Date(o.createdAt).toLocaleString()}
                    </div>
                  </div>

                  {/* Middle Section */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-muted text-sm">
                        Payment (
                        <span className="font-bold text-off-white">
                          {o.paymentType || "N/A"}
                        </span>
                        ):
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold bg-black border border-surface ${pay.classes}`}
                      >
                        {pay.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted text-sm">Food Status:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold bg-black  border border-surface ${ord.classes}`}
                      >
                        {ord.label}
                      </span>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="font-bold text-off-white text-lg">
                    ₹{o.totalPrice.toFixed(2)}
                  </div>
                </div>

                {/* Food Items */}
                <div className="mt-4 border-t border-surface pt-3">
                  {o.items.map((it) => (
                    <div
                      key={it.food._id || it.food}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={it.food.image}
                          alt={it.food.name}
                          className="h-14 w-14 rounded object-cover"
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
                      <div className="flex items-center gap-3">
                        <div className="font-semibold text-off-white">
                          ₹{((it.food.price || 0) * it.quantity).toFixed(2)}
                        </div>
                        {o.orderStatus === "Delivered" && (
                          <button
                            onClick={() =>
                              setReviewModal({
                                isOpen: true,
                                foodId: it.food._id,
                                foodName: it.food.name,
                                foodImage: it.food.image,
                              })
                            }
                            className="flex items-center gap-1 px-2 py-2 rounded-lg bg-primary hover:bg-primary/90 cursor-pointer text-black font-bold text-sm transition-colors"
                          >
                            <MessageSquare className="w-3 h-3 text-black font-extrabold" />
                            Add Review
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewModal.isOpen}
        onClose={() =>
          setReviewModal({
            isOpen: false,
            foodId: null,
            foodName: "",
            foodImage: "",
          })
        }
        foodId={reviewModal.foodId}
        foodName={reviewModal.foodName}
        foodImage={reviewModal.foodImage}
      />
    </>
  );
};

export default Orders;
