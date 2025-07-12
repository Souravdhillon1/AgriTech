import React, { useEffect, useState } from "react";

export default function Settings() {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user", {
          credentials: "include",
        });

        if (!res.ok) {
          setMessage("Failed to load user settings. Please log in.");
          return;
        }

        const data = await res.json();
        setUserData({ name: data.name || "", email: data.email });
        setEmailUpdates(data.emailUpdates || false);

        const savedDarkMode =
          localStorage.getItem("darkMode") === "true" || data.darkMode;
        setDarkMode(savedDarkMode);
      } catch (err) {
        console.error("Error fetching settings:", err);
        setMessage("Server error while fetching settings.");
      }
    };

    fetchSettings();
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode); // Optional: persist across reloads
  }, [darkMode]);

  // Save settings
  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: userData.name,
          emailUpdates,
          darkMode,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("Settings updated successfully.");
      } else {
        setMessage(result.message || "Failed to update settings.");
      }
    } catch (err) {
      console.error("Save error:", err);
      setMessage("Failed to save settings.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-6">
        ⚙️ Settings
      </h1>

      {message && <p className="mb-4 text-red-600 font-medium">{message}</p>}

      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6 mb-8 border border-gray-200 dark:border-gray-600 space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
            value={userData.name}
            onChange={(e) =>
              setUserData({ ...userData, name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-md"
            value={userData.email}
            readOnly
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="email-updates"
            checked={emailUpdates}
            onChange={() => setEmailUpdates(!emailUpdates)}
            className="accent-green-600"
          />
          <label htmlFor="email-updates">Receive email updates</label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="dark-mode"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="accent-green-600"
          />
          <label htmlFor="dark-mode">Enable dark mode</label>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
      >
        Save Settings
      </button>
    </div>
  );
}
