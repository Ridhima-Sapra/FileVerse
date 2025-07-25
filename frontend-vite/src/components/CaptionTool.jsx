import React, { useState } from 'react';
import axios from 'axios';

export default function CaptionTool() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const form = new FormData();
    form.append('image', file);
    const res = await axios.post('http://127.0.0.1:8000/api/caption/', form);
    setCaption(res.data.caption);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Image Caption Generator</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Generate Caption</button>
      </form>
      {caption && <p><strong>Caption:</strong> {caption}</p>}
    </div>
  );
}
