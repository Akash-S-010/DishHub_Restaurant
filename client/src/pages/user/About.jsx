import React from "react";
import { ArrowRight, Star, Search, ShoppingCart, Truck, Target, Package, Users, User, MessageSquare } from "lucide-react";
import Button from "../../components/ui/Button";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Hero */}
      <section className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-off-white leading-tight">
            We make great food, faster.
          </h1>
          <p className="text-muted mt-4 max-w-xl">
            DishHub started with one simple goal: deliver delicious meals that
            feel homemade, without the wait. We partner with local kitchens and
            riders to bring fresh, dependable food straight to your door.
          </p>

          <div className="mt-6 flex gap-3">
            <Button
              onClick={() => (window.location.href = "/menu")}
              className="px-6 py-3"
            >
              Order now <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => (window.location.href = "/contact")}
              className="px-6 py-3 bg-transparent border border-muted text-off-white"
            >
              Contact us
            </Button>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-surface bg-card h-56 flex items-center justify-center">
          {/* placeholder image - replace src with your own */}
          <img
            src="/src/assets/Restaurant website Pre loader.json"
            alt="hero"
            className="object-cover w-full h-full opacity-80"
          />
        </div>
      </section>

      {/* Mission + Values */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          { title: "Our Mission", text: "Bring affordable, delicious food to every neighborhood.", icon: <Target className="w-6 h-6 text-primary" /> },
          { title: "Sourced Fresh", text: "We work with trusted suppliers and inspect ingredients daily.", icon: <Package className="w-6 h-6 text-primary" /> },
          { title: "People First", text: "Fair pay, safe kitchens, and reliable delivery partners.", icon: <Users className="w-6 h-6 text-primary" /> },
        ].map((s, i) => (
          <div key={i} className="rounded-xl border border-surface bg-card p-6">
            <div className="flex items-center gap-3 mb-3">
              {s.icon}
              <h3 className="font-bold text-off-white">{s.title}</h3>
            </div>
            <p className="text-muted text-sm">{s.text}</p>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="rounded-2xl border border-surface bg-card p-6">
        <h2 className="text-2xl font-bold text-off-white mb-4">How it works</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-2 text-primary font-bold"><Search className="w-5 h-5"/> <span>1. Browse</span></div>
            <p className="text-muted text-sm">Pick from our curated menu of crowd favorites.</p>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3 mb-2 text-primary font-bold"><ShoppingCart className="w-5 h-5"/> <span>2. Order</span></div>
            <p className="text-muted text-sm">Secure checkout with saved addresses and fast payment options.</p>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3 mb-2 text-primary font-bold"><Truck className="w-5 h-5"/> <span>3. Enjoy</span></div>
            <p className="text-muted text-sm">Track your order and receive fresh food at your door.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid sm:grid-cols-3 gap-6 text-center">
        {[
          { n: "1M+", label: "Orders Served", icon: <Package className="w-6 h-6 mx-auto text-primary"/> },
          { n: "250K+", label: "Happy Customers", icon: <Users className="w-6 h-6 mx-auto text-primary"/> },
          { n: "4.8", label: "Average Rating", icon: <Star className="w-6 h-6 mx-auto text-primary"/> },
        ].map((s, i) => (
          <div key={i} className="rounded-xl border border-surface bg-card p-6">
            {s.icon}
            <div className="text-3xl font-extrabold text-off-white">{s.n}</div>
            <div className="text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Team */}
      <section>
        <h2 className="text-2xl font-bold text-off-white mb-4">
          Meet the team
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Ava", "Liam", "Noah", "Olivia"].map((n, i) => (
            <div
              key={i}
              className="rounded-xl border border-surface bg-card p-4 text-center"
            >
              <div className="h-28 w-28 rounded-full bg-surface mx-auto mb-3 flex items-center justify-center text-primary font-bold text-xl">
                {n.charAt(0)}
              </div>
              <div className="font-semibold text-off-white">{n}</div>
              <div className="text-muted text-sm flex items-center justify-center gap-2"><User className="w-4 h-4"/> Role — Product</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="rounded-2xl border border-surface bg-card p-6">
        <h2 className="text-2xl font-bold text-off-white mb-4">
          What customers say
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-lg bg-[#071018]/40">
              <div className="flex items-start gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-surface flex items-center justify-center">
                  U
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-off-white">User {i}</div>
                  <div className="text-muted text-sm">Verified diner</div>
                </div>
                <MessageSquare className="w-5 h-5 text-muted" />
              </div>
              <p className="text-muted text-sm">
                Loved the quick delivery and fresh taste — highly recommend!
              </p>
              <div className="mt-3 text-primary">
                <Star className="inline w-4 h-4" />{" "}
                <Star className="inline w-4 h-4" />{" "}
                <Star className="inline w-4 h-4" />{" "}
                <Star className="inline w-4 h-4" />{" "}
                <Star className="inline w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-surface bg-card p-6 text-center">
        <h3 className="text-xl font-bold text-off-white">
          Ready to taste the difference?
        </h3>
        <p className="text-muted mt-2">
          Order now and get 20% off your first meal.
        </p>
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => (window.location.href = "/menu")}
            className="px-6 py-3"
          >
            View menu
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
