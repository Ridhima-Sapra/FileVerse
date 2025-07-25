import React from 'react';
import ToolCard from '../components/ToolCard';

export default function Home() {
  const tools = [
    {
      title: 'Image Captioning',
      description: 'Upload an image to generate a smart caption.',
      link: '/caption'
    },
    {
      title: 'Text Summarization',
      description: 'Summarize long articles into key points.',
      link: '/summarizer'
    },
    {
      title: 'PDF Converter',
      description: 'Convert images or docs into searchable PDFs.',
      link: '/pdf-converter'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, idx) => (
          <ToolCard key={idx} {...tool} />
        ))}
      </div>
    </div>
  );
}
