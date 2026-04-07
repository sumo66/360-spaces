"use client";

import { useCallback, useEffect, useState } from "react";

interface Subscriber {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subscribed_at: string;
}

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      ...(search && { search }),
    });

    const res = await fetch(`/api/subscribers?${params}`);
    if (res.status === 401) {
      setLoggedIn(false);
      return;
    }
    const data = await res.json();
    setSubscribers(data.subscribers);
    setTotal(data.total);
    setTotalPages(data.totalPages);
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    if (loggedIn) fetchSubscribers();
  }, [loggedIn, fetchSubscribers]);

  // Check if already logged in
  useEffect(() => {
    fetch("/api/subscribers?page=1")
      .then((res) => {
        if (res.ok) setLoggedIn(true);
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      setLoggedIn(true);
    } else {
      setLoginError(data.message);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this subscriber?")) return;
    await fetch("/api/subscribers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchSubscribers();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  if (!loggedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background:
            "linear-gradient(135deg, #c4b84e 0%, #d66f8f 40%, #6a5fbf 100%)",
        }}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-[400px]">
          <h1 className="text-2xl font-bold text-[#2d2045] mb-2">
            ThreeSixty Spaces
          </h1>
          <p className="text-gray-400 text-sm mb-7">Admin Dashboard</p>

          {loginError && (
            <p className="text-red-500 text-sm mb-3">{loginError}</p>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-3 text-sm outline-none focus:border-[#6a5fbf] text-gray-800"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 text-sm outline-none focus:border-[#6a5fbf] text-gray-800"
            />
            <button
              type="submit"
              className="w-full py-3.5 bg-[#6a5fbf] text-white font-semibold rounded-lg hover:bg-[#5a4faf] transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f0f8]">
      {/* Top Bar */}
      <div className="bg-[#2d2045] text-white px-8 py-4 flex items-center justify-between">
        <h1 className="text-base font-bold">
          ThreeSixty Spaces — Subscribers
        </h1>
        <button
          onClick={handleLogout}
          className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      <div className="max-w-[1100px] mx-auto p-8">
        {/* Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="text-4xl font-extrabold text-[#6a5fbf]">{total}</div>
          <div className="text-sm text-gray-400 mt-1">Total Subscribers</div>
        </div>

        {/* Toolbar */}
        <div className="flex gap-3 mb-5 flex-wrap items-center">
          <form
            onSubmit={handleSearch}
            className="flex gap-3 flex-1 min-w-[200px]"
          >
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#6a5fbf] text-gray-800"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#6a5fbf] text-white text-sm font-semibold rounded-lg hover:bg-[#5a4faf] cursor-pointer"
            >
              Search
            </button>
          </form>
          <a
            href="/api/export"
            className="px-5 py-2.5 bg-[#6a5fbf] text-white text-sm font-semibold rounded-lg hover:bg-[#5a4faf] no-underline"
          >
            ⬇ Export CSV
          </a>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          {loading ? (
            <div className="text-center py-16 text-gray-400">Loading...</div>
          ) : subscribers.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              {search
                ? "No subscribers match your search."
                : "No subscribers yet."}
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                    #
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                    Name
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                    Email
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                    Phone
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                    Date
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100"></th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#faf8ff]">
                    <td className="px-4 py-3.5 text-sm border-b border-gray-50 text-gray-800">
                      {sub.id}
                    </td>
                    <td className="px-4 py-3.5 text-sm border-b border-gray-50 text-gray-800">
                      {sub.first_name} {sub.last_name}
                    </td>
                    <td className="px-4 py-3.5 text-sm border-b border-gray-50 text-gray-800">
                      {sub.email}
                    </td>
                    <td className="px-4 py-3.5 text-sm border-b border-gray-50 text-gray-800">
                      {sub.phone}
                    </td>
                    <td className="px-4 py-3.5 text-sm border-b border-gray-50 text-gray-800">
                      {new Date(sub.subscribed_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3.5 text-sm border-b border-gray-50">
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex gap-2 justify-center mt-6">
            {page > 1 && (
              <button
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#6a5fbf] hover:bg-[#f0edff] cursor-pointer"
              >
                &laquo; Prev
              </button>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer ${
                  p === page
                    ? "bg-[#6a5fbf] text-white"
                    : "bg-white border border-gray-200 text-[#6a5fbf] hover:bg-[#f0edff]"
                }`}
              >
                {p}
              </button>
            ))}
            {page < totalPages && (
              <button
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#6a5fbf] hover:bg-[#f0edff] cursor-pointer"
              >
                Next &raquo;
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
