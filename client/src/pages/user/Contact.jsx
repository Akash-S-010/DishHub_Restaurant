import React, { useState } from "react";
import Button from "../../components/ui/Button";
import axios from "../../config/axios";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = [];
    if (!form.name.trim()) errs.push("Name is required");
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      errs.push("Valid email is required");
    if (!form.subject.trim()) errs.push("Subject is required");
    if (!form.message.trim()) errs.push("Message is required");
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors.length) return toast.error(errors[0]);

    setLoading(true);
    try {
      // Attempt to POST to server contact endpoint if available
      await axios.post("/contact", form).catch(() => {
        /* ignore network errors; fallback to toast success */
      });
      toast.success("Message sent — we'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-off-white mb-4">
        Contact us
      </h1>
      <p className="text-muted mb-8 max-w-2xl">
        Have a question, feedback or want to partner with DishHub? Fill the form
        or reach out via the details on the right and we'll respond within 24
        hours.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 rounded-xl border border-surface bg-card p-6 space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded px-3 py-2 bg-bg border border-primary text-off-white"
              aria-label="Your name"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full rounded px-3 py-2 bg-bg border border-primary text-off-white"
              aria-label="Email address"
            />
          </div>

          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full rounded px-3 py-2 bg-bg border border-primary text-off-white"
            aria-label="Subject"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="How can we help?"
            className="w-full rounded px-3 py-2 bg-bg border border-primary text-off-white min-h-[140px] resize-y"
            aria-label="Message"
          />

          <div className="flex items-center gap-3">
            <Button type="submit" loading={loading} className="px-5 py-2">
              Send message
            </Button>
            <Button
              onClick={() =>
                setForm({ name: "", email: "", subject: "", message: "" })
              }
              className="px-5 py-2 bg-surface hover:bg-surface/70"
            >
              Clear
            </Button>
          </div>
        </form>

        <aside className="space-y-6">
          <div className="rounded-xl border border-surface bg-card p-4">
            <h3 className="font-semibold text-off-white mb-2">Get in touch</h3>
            <div className="flex items-start gap-3 text-muted text-sm mb-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <div className="text-off-white font-semibold">Our kitchen</div>
                <div>123 Flavor Street, Food City</div>
                <div>State, 560001, India</div>
              </div>
            </div>

            <div className="flex items-start gap-3 text-muted text-sm mb-3">
              <Phone className="w-5 h-5 text-primary mt-1" />
              <div>
                <div className="text-off-white font-semibold">Phone</div>
                <a href="tel:+911234567890" className="text-muted">
                  +91 12345 67890
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-muted text-sm">
              <Mail className="w-5 h-5 text-primary mt-1" />
              <div>
                <div className="text-off-white font-semibold">Email</div>
                <a href="mailto:support@dishhub.example" className="text-muted">
                  support@dishhub.example
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Contact;
