import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CheckCircle, XCircle, Mail, Phone, MapPin, User, Building2, Calendar, Loader2, LogOut } from 'lucide-react';
import { notifyError, notifySuccess } from '../../utils/tostify';
import { routes } from '../../data/routes';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate(routes.adminLogin);
      return;
    }
    fetchUnverifiedDepartments();
  }, []);

  const fetchUnverifiedDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("adminToken");
      
      const url = import.meta.env.VITE_BASEURL
      const response = await axios.get(`${url}/admin/get-unverified-departments`);

      if (response.data.status === "OK") {
        setDepartments(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch departments");
      console.error("Error fetching departments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (departmentId) => {
    try {
      setProcessingId(departmentId);
      const token = localStorage.getItem("adminToken");
      const url = import.meta.env.VITE_BASEURL;
      
      const response = await axios.post(`${url}/admin/verify-department`, 
        { _id: departmentId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Remove the accepted department from the list
      setDepartments(prev => prev.filter(dept => dept._id !== departmentId));
      
      notifySuccess("Department accepted successfully!");
    } catch (err) {
      console.error("Error accepting department:", err);
      notifyError(err.response?.data?.msg || "Failed to accept department");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (departmentId) => {
    try {
      setProcessingId(departmentId);
      const token = localStorage.getItem("adminToken");
      const url = import.meta.env.VITE_BASEURL;
      
      await axios.post(`${url}/admin/reject-department`, { _id: departmentId });

      // Remove the rejected department from the list
      setDepartments(prev => prev.filter(dept => dept._id !== departmentId));
      
      notifySuccess("Department rejected successfully!");
    } catch (err) {
      console.error("Error rejecting department:", err);
      notifyError(err.response?.data?.msg || "Failed to reject department");
    } finally {
      setProcessingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    notifySuccess("Logged out successfully!");
    window.location.reload();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading departments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage Unverified Departments</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-semibold">
                {departments.length} Pending
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Departments List */}
        {departments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Pending Departments</h3>
            <p className="text-gray-500">All departments have been verified!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {departments.map((dept) => (
              <div key={dept._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 className="w-6 h-6 text-indigo-600" />
                        <h2 className="text-2xl font-bold text-gray-800">{dept.DepartmentName}</h2>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          {dept.DepartmentShortName}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">ID: {dept.departmentId}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(dept._id)}
                        disabled={processingId === dept._id}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {processingId === dept._id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <CheckCircle className="w-5 h-5" />
                        )}
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(dept._id)}
                        disabled={processingId === dept._id}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {processingId === dept._id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <XCircle className="w-5 h-5" />
                        )}
                        Reject
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">Head:</span>
                        <span>{dept.HeadOfDepartment}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">Email:</span>
                        <a href={`mailto:${dept.email}`} className="text-indigo-600 hover:underline">
                          {dept.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">Mobile:</span>
                        <a href={`tel:${dept.mobileNumber}`} className="text-indigo-600 hover:underline">
                          {dept.mobileNumber}
                        </a>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">Location:</span>
                        <span>{dept.city}, {dept.state}</span>
                      </div>
                      <div className="flex items-start gap-2 text-gray-700">
                        <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                        <span className="font-medium">Address:</span>
                        <span className="flex-1">{dept.deptAddress}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">Created:</span>
                        <span>{formatDate(dept.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;