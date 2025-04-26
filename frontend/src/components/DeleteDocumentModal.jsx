import React from "react";
import axios from "axios";

function DeleteDocumentModal({ isOpen, onClose, file, onDeleteSuccess }) {
  if (!isOpen || !file) return null;

  const API_URL = import.meta.env.VITE_API_URL;

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/documents/delete/${file.id}`);
      alert("Document deleted successfully.");
      onDeleteSuccess(); // ให้ parent ทำ refresh
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      alert("Failed to delete document.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Delete Document</h2>
        <p>
          Are you sure you want to delete <strong>{file.file_name}</strong>?
        </p>
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteDocumentModal;
