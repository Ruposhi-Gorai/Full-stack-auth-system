const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-8 text-center">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          Welcome{user ? `, ${user.name}` : ""} 👋
        </h1>
        <p className="text-green-600 text-lg">
          You are successfully logged in.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
