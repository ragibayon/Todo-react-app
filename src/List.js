import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, handleDelete, handleEdit }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                className="edit-btn"
                type="button"
                onClick={() => handleEdit(id)}
              >
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                type="button"
                onClick={() => handleDelete(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
