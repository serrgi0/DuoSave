// src/pages/Dashboard.tsx
export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4">Bienvenido 👋</h1>
        <p>Usuario: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}
