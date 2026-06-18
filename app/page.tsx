"use client";

import Link from "next/link";
import { useState } from "react";
import Input from "./components/ui/Input";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  return (
    <div className=" mt-4 space-y-4">
      <h1 className="text-3xl">Home</h1>

      <br />

      <Link
        href="/link"
        className="inline-block bg-blue-400 text-white px-2 py-1 rounded-2xl hover:bg-blue-500 transition"
      >
        Go to Link View
      </Link>

      <br />

      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 cursor-pointer"
      >
        Open Modal
      </button>

      <div className="container">

        <h1>🔥 Theme UI Demo Page</h1>

        {/* ================= BUTTONS ================= */}
        <div className="card">
          <h3>Buttons</h3>

          <button className="btn btn-primary">
            Primary
          </button>

          <button className="btn btn-danger">
            Delete
          </button>

          <button className="btn btn-success">
            Success
          </button>
        </div>


        {/* ================= CARD ================= */}
        <div className="card">
          <h3>Card Example</h3>
          <p>
            This is a reusable card component using your custom CSS system.
          </p>

          <span className="badge badge-success">Active</span>
          <span className="badge badge-danger">Inactive</span>
        </div>

      </div>

      <div className="card">
        <Input
          label="Full Name যেহেতু মানব অধিকারের"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          error="this is error text"
        />
      </div>


      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg w-80">
            <h2 className="text-xl font-bold">My Modal</h2>

            <p className="mt-2">This is modal content</p>

            <button
              onClick={() => setOpen(false)}
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}