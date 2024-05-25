import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

function KanbanItems({ setChangeStatus, STATUS_ITEMS, setData, el }) {
  const time = el.createdAt.split("T")[1].slice(0, 5);

  const handleDelete = (id) => {
    if (confirm("Malumot Ochirilsinmi")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div>
      <div className="kanban__item">
        <p>{el.title}</p>
        <p className="kanban__commit">{el.desc}</p>
        <div className="kanban__status">
          <select
            onChange={(e) => setChangeStatus({ ...el, status: e.target.value })}
            value={el.status}
          >
            <option value="" disabled>
              Select status
            </option>
            {STATUS_ITEMS.map((statusItem) => (
              <option key={statusItem.id} value={statusItem.title}>
                {statusItem.title}
              </option>
            ))}
          </select>
          <span>{time}</span>
          <button
            onClick={() => handleDelete(el.id)}
            className="kanban__delete"
          >
            <AiOutlineDelete />
          </button>
        </div>
      </div>
    </div>
  );
}

export default KanbanItems;
