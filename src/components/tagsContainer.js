import React from "react";

function TagsContainer({ postCategories, theme }) {
  return (
    <div className="tags-container">
      {postCategories.map((tag, index) => (
        <span className={`tag ${theme === "dark" && "dark"}`} key={index}>
          {tag}
        </span>
      ))}
    </div>
  );
}

export default TagsContainer;
