import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../layouts/Navbar.jsx";
import DataTable from "react-data-table-component";
import UploadDocumentModal from "../components/UploadDocumentModal.jsx";
import DeleteDocumentModal from "../components/DeleteDocumentModal.jsx";
import EditDocumentModal from "../components/EditDocumentModal.jsx"; // <-- New

function DocumentsPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [fileToEdit, setFileToEdit] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/documents`);
      setFiles(response.data.files || []);
    } catch (error) {
      console.error("Error fetching documents:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleDeleteClick = (file) => {
    setSelectedFile(file);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteDocument = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/documents/delete/${selectedFile.id}`
      );
      if (response.status === 200) {
        setFiles(files.filter((file) => file.id !== selectedFile.id));
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting document:", error.message);
    }
  };

  // ฟังก์ชันเรียกเวลาอยากแก้ไข
  const handleEditClick = (file) => {
    setFileToEdit(file);
    setIsEditModalOpen(true);
  };

  const columns = [
    {
      name: "File Name",
      selector: (row) => row.file_name,
      sortable: true,
    },
    {
      name: "Tags",
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.tags?.map((tag, index) => (
            <button
              key={index}
              className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs"
              disabled
            >
              {tag}
            </button>
          ))}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.created_at).toLocaleString(),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <a
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mr-2"
          >
            View
          </a>
          <button
            onClick={() => handleEditClick(row)}
            className="ml-2 text-yellow-500"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(row)}
            className="ml-2 text-red-500"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-500 flex items-start justify-center py-12">
        <div className="w-full max-w-7xl bg-gray-100 rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">My Documents</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Upload Document
            </button>
          </div>

          {loading ? (
            <div className="text-center w-full">Loading...</div>
          ) : (
            <DataTable
              columns={columns}
              data={files}
              pagination
              highlightOnHover
              responsive
            />
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <UploadDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadSuccess={() => {
          setIsModalOpen(false);
          fetchDocuments();
        }}
      />

      {/* Delete Modal */}
      <DeleteDocumentModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        file={selectedFile}
        onDeleteSuccess={() => {
          setIsDeleteModalOpen(false);
          fetchDocuments(); // ลบเสร็จให้ refresh
        }}
      />

      {/* Edit Modal */}
      <EditDocumentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        file={fileToEdit}
        onEditSuccess={() => {
          setIsEditModalOpen(false);
          fetchDocuments(); // refresh หลังแก้ไข
        }}
      />
    </>
  );
}

export default DocumentsPage;
