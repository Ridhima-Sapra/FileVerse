import React, { useState } from 'react';
import axios from 'axios';

export default function Caption() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('image', image);
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/caption/', formData);
      setCaption(res.data.caption);
    } catch  {
      alert("Failed to generate caption");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Image Captioning</h2>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Caption"}
        </button>

        {caption && (
          <div className="mt-4">
            <p className="text-gray-600 font-medium">Caption:</p>
            <p className="text-gray-900">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
