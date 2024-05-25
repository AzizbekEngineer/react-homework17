import React, { useCallback, useEffect, useRef, useState } from "react";
import { DATA } from "@/static";
import KanbanBlock from "./KanbanBlock";
import KanbanItem from "./KanbanItem";

/**
 * ready
 * working
 * stuck
 * done
 */

let STATUS__ITEMS = ["ready", "working", "stuck", "done"];

const KanbanBoard = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("kanba-data")) || DATA
  );
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [changeStatus, setChangeStatus] = useState(null);

  const title = useRef(null);
  const desc = useRef(null);

  useEffect(() => {
    localStorage.setItem("kanba-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (changeStatus) {
      let index = data?.findIndex((el) => el.id === changeStatus.id);
      data?.splice(index, 1, changeStatus);
      setData([...data]);
    }
  }, [changeStatus]);

  const filterByStatus = (status) => {
    return data
      ?.filter((el) => el.status === status)
      ?.map((el) => (
        <KanbanItem
          setChangeStatus={setChangeStatus}
          key={el.id}
          el={el}
          STATUS__ITEMS={STATUS__ITEMS}
        />
      ));
  };

  let memoFilterByStatus = useCallback((status) => {
    return filterByStatus(status);
  });

  // let readyItems = filterByStatus("ready");
  // let workingItems = filterByStatus("working");
  // let stuckItems = filterByStatus("stuck");
  // let doneItems = filterByStatus("done");

  //   const handleAddItem = status => {
  //     setStatus(status)
  //   }

  const handleCreateItem = (e) => {
    e.preventDefault();
    let date = new Date();
    let timeZoneGTM = (hour) =>
      new Date(date.getTime() + hour * 60 * 60 * 1000);
    let newItems = {
      id: date.getTime(),
      title: title.current.value,
      desc: desc.current.value,
      status: selectedStatus,
      createdAt: timeZoneGTM(5).toISOString(),
    };
    console.log(newItems);
    setData((prev) => [...prev, newItems]);

    setSelectedStatus(null);
    title.current.value = "";
    desc.current.value = "";
  };

  return (
    <section>
      <div className="container">
        <div className="kanban">
          <h2 className="kanban__title">Kanban Board</h2>
          <div className="kanban__header">
            <button className="kanban__btn">Add</button>
          </div>
          <form
            onSubmit={handleCreateItem}
            className={`kanban__form ${selectedStatus ? "show" : ""}`}
          >
            <p>{selectedStatus} something</p>
            <input ref={title} type="text" />
            <input ref={desc} type="text" />
            <button>Create</button>
          </form>
          <div className="kanban__wrapper">
            <KanbanBlock
              status_items={STATUS__ITEMS}
              items={memoFilterByStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
