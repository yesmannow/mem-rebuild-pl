import React from 'react';

interface InspirationCardProps {
  project: {
    data: {
      title: string;
      url: string;
      image: string;
      tags?: string[];
      summary: string;
      source_credit?: string;
    };
  };
}

const InspirationCard: React.FC<InspirationCardProps> = ({ project }) => {
  const { title, url, image, tags, summary, source_credit } = project.data;

  return (
    <div
      className="group block border-2 border-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 bg-white cursor-pointer"
      data-tags={tags?.map(t => t.toLowerCase()).join(' ')}
    >
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={image}
          alt={`Thumbnail for ${title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition duration-300">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {summary}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {(tags || []).slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          {source_credit || 'Source not specified'}
        </p>
      </div>
    </div>
  );
};

export default InspirationCard;

