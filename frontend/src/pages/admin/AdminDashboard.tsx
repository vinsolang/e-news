import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Profile from '../../assets/image/lang.JPG';
import Swal from "sweetalert2";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Film,
  Users,
  Settings,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Trash2,
  Upload,
  Shield,
  LogOut,
  User, Mail, MessageSquare 
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
// import { mockNews, mockMovies } from '../../data/mockData';
import { mockNews, mockMovies } from '../../data/mockData';

/*=========================================================
                    @@ AdminOverview
==========================================================*/
const AdminOverview = () => {
  // analytics data (replace with real API later)
  const chartData = [
    { month: "Jan", views: 4000, users: 2400 },
    { month: "Feb", views: 3000, users: 1398 },
    { month: "Mar", views: 2000, users: 9800 },
    { month: "Apr", views: 2780, users: 3908 },
    { month: "May", views: 1890, users: 4800 },
    { month: "Jun", views: 2390, users: 3800 },
    { month: "Jul", views: 3490, users: 4300 },
  ];

  const stats = [
    { title: 'Total Articles', value: '1,234', icon: <FileText className="w-8 h-8" />, color: 'bg-blue-500' },
    { title: 'Total Views', value: '2.1M', icon: <Eye className="w-8 h-8" />, color: 'bg-green-500' },
    { title: 'Active Users', value: '8,567', icon: <Users className="w-8 h-8" />, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of your content management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Articles */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Articles
            </h2>
            <Link
              to="/admin/articles"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockNews.slice(0, 5).map((article) => (
              <div
                key={article.id}
                className="flex items-center space-x-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {article.category} • {article.views} views • By{" "}
                    {article.author}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Analytics Overview
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
/*=========================================================
                    @@ AdminArticles
==========================================================*/
interface Categorys {
  id: number;
  category_name: string;
}

interface NewsArticle {
  id: number;
  title: string;
  caption: string;
  category_id: number;
  category?: Categorys;
  type_news: string;
  name_post: string;
  time_red: string;
  view: number;
  description: string;
  image: string;
}

const AdminArticles = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<Categorys[]>([]);
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [newArticle, setNewArticle] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const fetchNews = () => {
    fetch("http://127.0.0.1:8000/api/news")
      .then(res => res.json())
      .then(data => setNewsList(data));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Save / Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(newArticle).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    if (isEditing) formData.append("_method", "PUT");

    const url = isEditing
      ? `http://127.0.0.1:8000/api/news/${newArticle.id}`
      : "http://127.0.0.1:8000/api/news";

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      let msg = await res.text();
      alert(msg);
      return;
    }

    alert(isEditing ? "Updated successfully!" : "Saved successfully!");
    setShowModal(false);
    setNewArticle({});
    setIsEditing(false);
    fetchNews();
  };

  // Edit
  const handleEdit = (article: NewsArticle) => {
    setNewArticle({
      ...article,
      image: null, // important: reset file input
      old_image: article.image, // store old image for preview
    });
    setIsEditing(true);
    setShowModal(true);
  };

  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this article?")) return;

    const res = await fetch(`http://127.0.0.1:8000/api/news/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    alert("Deleted successfully!");
    fetchNews();
  };

  const handleCancel = () => {
    setShowModal(false);
    setNewArticle({});
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage News Articles</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" /> New Article
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="p-4 rounded-xl w-full max-w-4xl py-16">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Article" : "Add Article"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-2xl shadow-lg space-y-4 max-w-7xl mx-auto"
            >
              <h2 className="text-2xl font-semibold text-gray-700 border-b pb-3">
                {isEditing ? "Update Article" : "Create New Article"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="flex flex-col">
                  <label className="font-medium mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    value={newArticle.title || ""}
                    onChange={e =>
                      setNewArticle({ ...newArticle, title: e.target.value })
                    }
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                {/* Caption */}
                <div className="flex flex-col">
                  <label className="font-medium mb-1">Caption</label>
                  <input
                    type="text"
                    placeholder="Enter caption"
                    value={newArticle.caption || ""}
                    onChange={e =>
                      setNewArticle({ ...newArticle, caption: e.target.value })
                    }
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col">
                  <label className="font-medium mb-1">Image</label>
                  <input
                    type="file"
                    onChange={e =>
                      setNewArticle({
                        ...newArticle,
                        image: e.target.files?.[0] || null,
                      })
                    }
                    className="rounded-lg border p-2 bg-gray-50"
                  />

                  {isEditing && newArticle.old_image && (
                    <img
                      src={newArticle.old_image}
                      className="w-28 h-28 mt-3 rounded-lg object-cover border"
                    />
                  )}
                </div>

                {/* Category */}
                <div className="flex flex-col">
                  <label className="font-medium mb-1">Category</label>
                  <select
                    value={newArticle.category_id || ""}
                    onChange={e =>
                      setNewArticle({
                        ...newArticle,
                        category_id: Number(e.target.value),
                      })
                    }
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='flex space-x-6'>
                  {/* Type News */}
                <div className="flex flex-col">
                  <label className="font-medium mb-1">Type News</label>
                  <select
                    value={newArticle.type_news || ""}
                    onChange={e =>
                      setNewArticle({ ...newArticle, type_news: e.target.value })
                    }
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  >
                    <option value="">Select Type</option>
                    <option value="trending">Trending</option>
                    <option value="latest">Latest</option>
                  </select>
                </div>

                {/* Sender */}
                <div className="flex flex-col">
                  <label className="font-medium mb-1">Sender Name</label>
                  <input
                    type="text"
                    placeholder="Enter sender name"
                    value={newArticle.name_post || ""}
                    onChange={e =>
                      setNewArticle({ ...newArticle, name_post: e.target.value })
                    }
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
                {/* Time Read */}
                <div className="flex flex-col">
                  <label className="font-medium mb-1">Time Read</label>
                  <input
                    type="text"
                    placeholder="Ex: 5 min"
                    value={newArticle.time_red || ""}
                    onChange={e =>
                      setNewArticle({ ...newArticle, time_red: e.target.value })
                    }
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
                </div>
              </div>

              {/* Description Full Width */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Write the article description..."
                  value={newArticle.description || ""}
                  onChange={e =>
                    setNewArticle({
                      ...newArticle,
                      description: e.target.value,
                    })
                  }
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Image</th>
              <th className="p-3">Article</th>
              <th className="p-3">view</th>
              <th className="p-3">Category</th>
              <th className="p-3">Type</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {newsList.map(article => (
          <tr
          key={article.id}
          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 group"
          >
          {/* 1. Photo */}
          <td className="px-6 py-4 whitespace-nowrap">
          {article.image && (
          <img
          src={article.image as string}
          className="w-16 h-16 rounded-xl object-cover shadow group-hover:scale-105 transition border border-gray-200 dark:border-gray-600"
          alt={article.title}
          />
          )}
          </td>


          {/* 2. Title + Caption */}
          <td className="px-6 py-4 max-w-sm">
          <div className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
          {article.title}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
          {article.caption}
          </div>
          </td>


          {/* 3. Views */}
          <td className="px-6 py-4 whitespace-nowrap text-sm">
          <span className="font-mono text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md shadow-sm">
          {article.view?.toLocaleString() || 0}
          </span>
          </td>


          {/* 4. Category */}
          <td className="px-6 py-4 whitespace-nowrap text-sm">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 shadow-sm">
          {article.category?.category_name || 'N/A'}
          </span>
          </td>


          {/* 5. Type News */}
          <td className="px-6 py-4 whitespace-nowrap">
          <span
          className={`px-3 py-1 text-xs font-semibold rounded-full capitalize shadow-sm ${
          article.type_news === 'trending'
          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          }`}
          >
          {article.type_news}
          </span>
          </td>


          {/* 6. Actions */}
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-3">
          <button
          onClick={() => handleEdit(article)}
          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-gray-600 transition shadow-sm"
          title="Edit Article"
          >
          <Edit size={18} />
          </button>


          <button
          onClick={() => handleDelete(article.id)}
          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 p-2 rounded-full hover:bg-red-50 dark:hover:bg-gray-600 transition shadow-sm"
          title="Delete Article"
          >
          <Trash2 size={18} />
          </button>
          </td>
          </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
/*=========================================================
                    @@ AdminMovies
==========================================================*/
// const AdminMovies = () => {
//   const [showModal, setShowModal] = useState(false);
//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Movies</h1>
//           <p className="text-gray-600 dark:text-gray-400">Upload and manage premium movie content</p>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
//         >
//           <Upload className="w-5 h-5" />
//           <span>Upload Movie</span>
//         </button>
//       </div>

//       {/* Modal Form */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
//           <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-200 dark:border-gray-700">
//             <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
//               🎬 Upload New Movie
//             </h2>

//             <form className="space-y-4">
//               {/* Movie Title */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Movie Title
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter movie title"
//                   className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   rows="4"
//                   placeholder="Write a short description"
//                   className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
//                 ></textarea>
//               </div>

//               {/* Poster Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Poster
//                 </label>
//                 <input
//                   type="file"
//                   className="w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 dark:file:bg-purple-700 dark:file:text-white dark:hover:file:bg-purple-600"
//                 />
//               </div>

//               {/* Price */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Price ($)
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Enter price"
//                   className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
//                 />
//               </div>

//               {/* Rating */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Rating
//                 </label>
//                 <input
//                   type="number"
//                   step="0.1"
//                   placeholder="Enter rating (1-5)"
//                   className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
//                 />
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-end space-x-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold hover:from-purple-700 hover:to-purple-600 shadow-md transition"
//                 >
//                   Upload Movie
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {mockMovies.map((movie) => (
//           <div key={movie.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//             <div className="aspect-w-16 aspect-h-9 h-48">
//               <img
//                 src={movie.poster}
//                 alt={movie.title}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="p-4">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-bold text-gray-900 dark:text-white">{movie.title}</h3>
//                 <span className="text-sm font-bold text-green-600">${movie.price}</span>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{movie.description}</p>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-yellow-500">★</span>
//                   <span className="text-sm text-gray-600 dark:text-gray-400">{movie.rating}</span>
//                 </div>
//                 <div className="flex space-x-2">
//                   <button className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
//                     <Edit className="w-4 h-4" />
//                   </button>
//                   <button className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
/*=========================================================
                    @@ AdminUsers
==========================================================*/
const AdminUsers = () => {
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', premium: false },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', premium: true },
    { id: '3', name: 'Admin User', email: 'admin@enews.com', role: 'Admin', status: 'Active', premium: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage user accounts and premium subscriptions</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Premium</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'Admin'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.premium
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                      {user.premium ? 'Premium' : 'Free'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700 dark:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
/*=========================================================
                    @@ AdminCategories
==========================================================*/
type Category = {
  id: number;
  category_name: string;
};
// const mockCategories: Category[] = [
//   { id: 1, name: "National"},
//   { id: 2, name: "International"},
//   { id: 3, name: "Sports", },
// ];
const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [newCategory, setNewCategory] = useState({ name: "" });

  // ---------------------------------------------------
  // Fetch All Categories
  // ---------------------------------------------------
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  // ---------------------------------------------------
  // Create Category
  // ---------------------------------------------------
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category_name: newCategory.name }),
    });

    const result = await res.json();
    setCategories([...categories, result]);
    setNewCategory({ name: "" });
    setShowModal(false);
  };

  // ---------------------------------------------------
  // Load category to modal for editing
  // ---------------------------------------------------
  const handleEdit = (cat: Category) => {
    setIsEditing(true);
    setEditId(cat.id);
    setNewCategory({ name: cat.category_name });
    setShowModal(true);
  };

  // ---------------------------------------------------
  // Update category
  // ---------------------------------------------------
  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`http://127.0.0.1:8000/api/categories/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category_name: newCategory.name }),
    });

    const updated = await res.json();

    setCategories(categories.map(c =>
      c.id === editId ? updated.category : c
    ));

    setIsEditing(false);
    setEditId(null);
    setNewCategory({ name: "" });
    setShowModal(false);
  };

  // ---------------------------------------------------
  // Delete category
  // ---------------------------------------------------
  const handleDelete = async (id: number) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, Delete',
    cancelButtonText: 'No, Not Delete',
  });

  if (result.isConfirmed) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Category has been deleted.',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete category.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong.',
      });
    }
  }
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories News</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage categories</p>
        </div>
        <button
          onClick={() => { setShowModal(true); setIsEditing(false); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-full max-w-md shadow-xl border border-gray-300 dark:border-gray-700">
            
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {isEditing ? "✏️ Edit Category" : "📂 Add New Category"}
            </h2>

            <form onSubmit={isEditing ? handleUpdateCategory : handleAddCategory} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={e => setNewCategory({ name: e.target.value })}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex justify-end pt-4 space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);                 // Close the modal
                    setNewCategory({ name: "" }); // Reset form fields
                    setIsEditing(false);                 // Optional: reset editing mode
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Category Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  {cat.category_name}
                </td>
                <td className="px-6 py-4 space-x-4">
                  <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:text-blue-700">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};
/*=========================================================
                    @@ AdminAnalytics
==========================================================*/
const AdminAnalytics = () => {
  // analytics data (replace with real API later)
  const chartData = [
    { month: "Jan", views: 4000, users: 2400 },
    { month: "Feb", views: 3000, users: 1398 },
    { month: "Mar", views: 2000, users: 9800 },
    { month: "Apr", views: 2780, users: 3908 },
    { month: "May", views: 1890, users: 4800 },
    { month: "Jun", views: 2390, users: 3800 },
    { month: "Jul", views: 3490, users: 4300 },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Analytice Overview 
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of analysis management system
        </p>
      </div>
      {/* Analytics Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Analytics Overview
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
/*=========================================================
                    @@ AdminSettings
==========================================================*/
const AdminSettings = () => {
 const [tab, setTab] = useState("profile");

  return (
    <div className="p-6">
      {/* Navigation */}
      <div className="flex gap-6 border-b pb-3 mb-6">
        <button
          className={`pb-2 font-medium ${
            tab === "profile"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setTab("profile")}
        >
          Profile
        </button>

        <button
          className={`relative pb-2 font-medium ${
            tab === "contact"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setTab("contact")}
        >
          Contact Messages

          {/* Notification Badge */}
          <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
            5
          </span>
        </button>

      </div>

      {/* PROFILE SECTION */}
      {tab === "profile" && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <User size={18} /> Admin Profile
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                className="w-full mt-1 px-3 py-2 border rounded-lg"
                placeholder="Enter admin name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                className="w-full mt-1 px-3 py-2 border rounded-lg"
                placeholder="Enter admin email"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Bio</label>
              <textarea
                className="w-full mt-1 px-3 py-2 border rounded-lg"
                placeholder="Short admin bio..."
              ></textarea>
            </div>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Save Profile
            </button>
          </div>
        </div>
      )}

      {/* CONTACT MESSAGES SECTION */}
      {tab === "contact" && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <MessageSquare size={18} /> User Contact Messages
          </h2>

          {/* Static message sample */}
          <div className="bg-gray-50 p-4 rounded-xl space-y-3 border">
            <div className="flex items-center gap-2 text-gray-700">
              <User size={16} /> <span className="font-medium">Name:</span>{" "}
              <span>John Doe</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <Mail size={16} /> <span className="font-medium">Email:</span>{" "}
              <span>john@example.com</span>
            </div>

            <div className="text-gray-700">
              <span className="font-medium">Subject:</span> Feedback
            </div>

            <div className="text-gray-700">
              <span className="font-medium">Message:</span> Your site UI looks
              very good!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
/*=========================================================
                    @@ AdminDashboard
==========================================================*/
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Simulate logged-in admin
  const adminUser = {
    name: "Vin Solang",
    email: "vinsolang9@gmail.com",
    avatar: Profile,
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Articles Posted', href: '/admin/articles', icon: FileText },
    { name: 'Categories News', href: '/admin/categories', icon: FolderOpen },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Admin Profile */}
        <div className="flex flex-col items-center justify-center h-32 border-b border-gray-200 dark:border-gray-700 mt-8">
          <img
            src={adminUser.avatar}
            alt={adminUser.name}
            className="w-18 h-18 rounded-full object-cover border-2 border-blue-600"
          />
          <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
            {adminUser.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{adminUser.email}</p>
          {/* <button
            onClick={() => alert("Go to Profile")}
            className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          >
            Profile
          </button> */}
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={() => alert("Logging out...")}
            className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Toggle Sidebar Button */}
        <div className="p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {sidebarOpen ? "<" : ">"}
          </button>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/articles" element={<AdminArticles />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/categories" element={<AdminCategories />} />
            <Route path="/analytics" element={<AdminAnalytics />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}