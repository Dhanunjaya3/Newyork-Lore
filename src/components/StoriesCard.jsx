import React from "react";
import { FaRegEdit, FaPlay } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

const StoriesCard = ({ stories, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(stories.id);
  };

  return (
    <article className="bg-gray-800 border border-gray-700 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-emerald-900/30 hover:-translate-y-2 hover:border-emerald-600 group">
      {/* Media Container */}
      <div className="relative h-56 bg-gray-700 overflow-hidden">
         {stories.type === "video" && stories.videoUrl ? (
          <video
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            autoPlay
            muted
            loop
            playsInline
            poster={stories.imageUrl}
          >
            <source src={stories.videoUrl} type="video/mp4" />

            <img
              src={stories.imageUrl}
              alt={stories.title}
              className="w-full h-full object-cover"
            />
          </video>
        ) : (
          <img
            src={stories.imageUrl || stories.media.fileData}
            alt={stories.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        
        {stories.type === "video" && stories.videoUrl && (
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-black bg-opacity-60 rounded-full p-3 backdrop-blur-sm">
              <FaPlay className="text-white text-lg ml-1" />
            </div>
          </div>
        )}

        {stories.media && stories.media.fileType && (
          <>
            {stories.media.fileType.match('image.*') ? (
              <img
                src={stories.media.url}
                alt="Story media"
                className="w-full h-full object-cover"
              />
            ) : stories.media.fileType.match('video.*') ? (
              <video
                muted
                loop
                src={stories.media.url}
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-sm">
                Unsupported media type: {stories.media.fileType}
              </div>
            )}
          </>
        )}

        {/* Content Type Badge */}
        {/* Content Type Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full
                ${stories.badge === "Article"
                ? "bg-blue-600"
                : stories.badge === "Poems"
                  ? "bg-purple-600"
                  : stories.badge === "Stories"
                    ? "bg-green-600"
                    : "bg-gray-600"} text-white`}
          >
            {stories.badge?.toUpperCase() || "UNKNOWN"}
          </span>
        </div>

        {/* Admin Actions - Top Right */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="p-2 rounded-full cursor-pointer bg-red-600 hover:bg-red-500 transition-colors shadow-lg"
            onClick={handleDelete}
          >
            <RiDeleteBin6Line size={16} />
          </button>
          <Link
            to={`/editstories/${stories.id}`}
            className="p-2 rounded-full bg-yellow-600 hover:bg-yellow-500 transition-colors shadow-lg"
          >
            <FaRegEdit size={16} />
          </Link>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400">•</span>
            {/* <span>{stories.date || new Date(stories.updatedAt).toLocaleDateString()}</span> */}
            <span>{stories.date || new Date(stories.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>

          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-emerald-400 mb-1 line-clamp-2 group-hover:text-emerald-300 transition-colors">
            {stories.title}
          </h3>
          {stories.subtitle && (
            <p className="text-gray-300 text-sm font-medium">
              {stories.subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {stories.description || stories.body?.substring(0, 150) + "..."}
        </p>

        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-emerald-200 flex items-center justify-center text-sm font-medium">
              {(stories.author || stories.name || "A").charAt(0)}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-300">
              <BiUser className="text-emerald-400" />
              <span>{stories.author || stories.name || "Anonymous"}</span>
            </div>
          </div>

          {/* Read More Button */}
          <Link
            to={`/stories/${stories.id}`}
            className="px-4 py-2 bg-[#E91E63] hover:bg-[#d81b60] text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#E91E63]/25"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default StoriesCard;