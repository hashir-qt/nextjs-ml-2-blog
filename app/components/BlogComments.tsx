"use client"; // Client Component

import { useState, useEffect } from "react";

export default function BlogComments() {
  const [comments, setComments] = useState<{ name: string; comment: string; replies: { name: string; comment: string }[] }[]>([]);
  const [formData, setFormData] = useState({ name: "", comment: "" });
  const [replyData, setReplyData] = useState({ name: "", comment: "", replyingTo: -1 });
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null); // Track the index of the opened menu

  // Load comments from localStorage on initial load
  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComments([...comments, { ...formData, replies: [] }]);
    setFormData({ name: "", comment: "" });
  };

  const handleDelete = (idx: number) => {
    const updatedComments = comments.filter((_, index) => index !== idx);
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setOpenMenuIndex(null); // Close the dropdown after deletion
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedComments = [...comments];
    updatedComments[replyData.replyingTo].replies.push({ name: replyData.name, comment: replyData.comment });
    setComments(updatedComments);
    setReplyData({ name: "", comment: "", replyingTo: -1 });
    setOpenMenuIndex(null); // Close the dropdown after reply
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const handleReplyClick = (idx: number) => {
    setReplyData({ ...replyData, replyingTo: idx });
    setOpenMenuIndex(null); // Close the dropdown after reply button click
  };

  const toggleMenu = (idx: number) => {
    setOpenMenuIndex(openMenuIndex === idx ? null : idx); // Toggle the menu for the clicked comment
  };

  return (
    <div className="mt-10 max-w-4xl mx-auto px-4 py-7 rounded-2xl mb-10 sm:px-6 lg:px-8 dark:bg-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Comments</h2>
      <ul className="mt-6 space-y-6">
        {comments.map((comment, idx) => (
          <li key={idx} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 hover:border-green-500 transition duration-300 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-lg text-gray-900 dark:text-white">{comment.name}</p>
                <p className="text-gray-600 mt-2 dark:text-gray-300">{comment.comment}</p>
              </div>
              {/* Dropdown menu for Delete and Reply */}
              <div className="relative">
                <button onClick={() => toggleMenu(idx)} className="text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-300 dark:hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {openMenuIndex === idx && (
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => handleReplyClick(idx)}
                      >
                        Reply
                      </li>
                      <li
                        className="px-4 py-2 cursor-pointer text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400"
                        onClick={() => handleDelete(idx)}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Reply Form */}
            {replyData.replyingTo === idx && (
              <form onSubmit={handleReply} className="mt-4 space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={replyData.name}
                    onChange={(e) => setReplyData({ ...replyData, name: e.target.value })}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Reply"
                    value={replyData.comment}
                    onChange={(e) => setReplyData({ ...replyData, comment: e.target.value })}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={4}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none transition duration-300 dark:bg-green-500 dark:hover:bg-green-600"
                >
                  Submit Reply
                </button>
              </form>
            )}

            {/* Display Replies */}
            {comment.replies.length > 0 && (
              <div className="mt-4 pl-6 space-y-4">
                {comment.replies.map((reply, replyIdx) => (
                  <div key={replyIdx} className="bg-gray-50 dark:bg-gray-700 shadow-sm rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <p className="font-semibold text-gray-800 dark:text-white">{reply.name}</p>
                    <p className="text-gray-600 mt-2 dark:text-gray-300">{reply.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold mt-8">Leave a Comment</h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <textarea
            placeholder="Your Comment"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 mb-12 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none transition duration-300 dark:bg-green-500 dark:hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
