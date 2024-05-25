import React from "react";

const KanbanItem = ({ el, STATUS__ITEMS, setChangeStatus }) => {
  let time = el.createdAt.split("T")[1].slice(0, 5);
  return (
    <div className="kanban__item">
      <p>{el.title}</p>
      <p className="kanban__commit">{el.desc}</p>
      <div className="kanban__status">
        <select
          onChange={(e) => setChangeStatus({ ...el, status: e.target.value })}
          name=""
          id=""
          value={el.status}
        >
          {STATUS__ITEMS?.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <span>{time}</span>
      </div>
    </div>
  );
};

export default KanbanItem;
