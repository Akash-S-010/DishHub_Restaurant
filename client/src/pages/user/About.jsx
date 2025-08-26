import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold text-off-white">
          About DishHub
        </h1>
        <p className="text-muted">
          Fast, flavorful, and fresh — that’s our promise.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        {[
          {
            t: "Quality First",
            d: "We handpick ingredients and cook to perfection.",
          },
          {
            t: "Lightning Fast",
            d: "Hot meals delivered quickly to your door.",
          },
          {
            t: "Made for Cravings",
            d: "Burgers, pizzas, fries and more — always satisfying.",
          },
        ].map((b, i) => (
          <div key={i} className="rounded-xl border border-surface bg-card p-5">
            <h3 className="font-bold text-off-white mb-1">{b.t}</h3>
            <p className="text-muted text-sm">{b.d}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-surface bg-card p-6">
        <h2 className="text-xl font-bold text-off-white mb-2">Our Story</h2>
        <p className="text-muted">
          We started with a simple idea — great fast food should be easy, quick
          and consistently delicious. Today, DishHub brings that idea to life
          across your city with a menu built around crowd favorites and a team
          obsessed with quality and speed. Thanks for ordering with us!
        </p>
      </section>
    </div>
  );
};

export default About;
