"use client";

import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import PromptCard from "@components/PromptCard";

const Feed = ({ prompts = [], onEdit, onDelete, owned }) => {
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handleClick = (category) => {
    setKeyword(category);
  };

  const handleEdit = async (promptId) => {
    onEdit(promptId);
  };

  const handleDelete = async (promptId) => {
    onDelete(promptId);
  };

  useEffect(() => {
    if (prompts && 0 < prompts.length) {
      setFilteredPrompts(
        prompts.filter(
          (prompt) =>
            prompt.prompt
              .toLowerCase()
              .includes(keyword.trim().toLowerCase()) ||
            prompt.category.toLowerCase().includes(keyword.trim().toLowerCase())
        )
      );
    }
  }, [prompts, keyword]);

  return (
    <div className="flex flex-col gap-2 items-center justify-center mt-16 mx-auto w-full">
      <div className="flex items-center justify-center max-w-xl relative w-full">
        <input
          type="text"
          placeholder="Search..."
          value={keyword}
          className="border border-gray-300 flex outline-0 p-3 rounded-lg text-gray-500 text-sm w-full focus:border-gray-500"
          onChange={(event) => setKeyword(event.target.value)}
          required
        />
      </div>
      {prompts ? (
        <div className="gap-5 grid grid-cols-1 my-16 w-full sm:grid-cols-2 xl:grid-cols-3">
          {filteredPrompts.map((filteredPrompt, index) => (
            <PromptCard
              userId={filteredPrompt.user._id}
              email={filteredPrompt.user.email}
              name={filteredPrompt.user.name}
              imageUrl={filteredPrompt.user.imageUrl}
              promptId={filteredPrompt._id}
              prompt={filteredPrompt.prompt}
              category={filteredPrompt.category}
              onClick={handleClick}
              onEdit={owned && handleEdit}
              onDelete={owned && handleDelete}
              key={index}
            />
          ))}
        </div>
      ) : (
        <BeatLoader color="#FF5722" style={{ padding: "32px" }} />
      )}
    </div>
  );
};

export default Feed;
