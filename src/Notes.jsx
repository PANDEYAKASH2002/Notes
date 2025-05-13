import React, { useState, useRef } from "react";
import { MdDelete } from "react-icons/md";

function Notes() {
  const inputRef = useRef(null);

  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem("list-items")) || []
  );

  const handleClick = () => {
    const taskText = inputRef.current.value.trim();
    if (!taskText) return;

    const newList = [...lists, { name: taskText }];

    setLists(newList);
    localStorage.setItem("list-items", JSON.stringify(newList));

    inputRef.current.value = ""; // clear input
  };

  const handleDelete = (indexToDelete) => {
    const updatedList = lists.filter((_, index) => index !== indexToDelete);
    setLists(updatedList);
    localStorage.setItem("list-items", JSON.stringify(updatedList));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📝 NOTES</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your task here"
          className="todo-input border rounded p-2 w-64 mr-2"
          ref={inputRef}
          id="todoText"
        />
        <button
          id="AddUpdateClick"
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          +
        </button>
      </div>

      <hr className="mb-4" />

      <ul id="list-items" className="list-items space-y-2">
        {lists.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between  px-3 py-2 rounded shadow-sm"
          >
            <div className="flex items-center gap-3">
              <input type="checkbox" className="form-checkbox h-5 w-5" />
              <span>{item.name}</span>
            </div>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-500 hover:text-red-700"
              title="Delete Task"
            >
              <MdDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
