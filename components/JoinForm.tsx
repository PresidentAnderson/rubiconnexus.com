"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export default function JoinForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !data?.ok) {
        throw new Error("request_failed");
      }
      setStatus("ok");
      setMessage("You're in. Welcome to the Wealth Enablement Network.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong — please try again, or email info@richereverydayineveryway.com.");
    }
  }

  return (
    <form className="signup" onSubmit={onSubmit}>
      <input
        type="email"
        required
        placeholder="you@email.com"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
      />
      <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Joining…" : "Join the network"}
      </button>
      {message && (
        <span className={`form-msg ${status === "error" ? "error" : "ok"}`} role="status">
          {message}
        </span>
      )}
    </form>
  );
}
