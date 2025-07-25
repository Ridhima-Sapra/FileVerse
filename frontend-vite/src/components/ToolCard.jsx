import React from 'react';
import { Link } from 'react-router-dom';

export default function ToolCard({ title, description, link }) {
  return (
    <Link to={link} className="block bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2 text-blue-700">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}
