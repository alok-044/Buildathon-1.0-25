

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 page-fade-in">
      <h1 className="text-3xl font-bold text-brand-green mb-6">Admin Dashboard</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">NGO Verification Queue</h2>
      
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-500">No NGOs are currently pending verification.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;