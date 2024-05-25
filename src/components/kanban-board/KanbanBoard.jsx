import React, { useRef, useState, useEffect, useCallback } from "react";
import { DATA } from "@/static";
import KanbanBlock from "./KanbanBlock";
import KanbanItem from "./KanbanItem";

const STATUS_ITEMS_DEFAULT = [];

const KanbanBoard = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("kanban-data")) || []
  );
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [changeStatus, setChangeStatus] = useState(null);
  const [addBtn, setAddBtn] = useState(false);
  const [info, setInfo] = useState("");
  const [status, setStatus] = useState(
    JSON.parse(localStorage.getItem("status-data")) || STATUS_ITEMS_DEFAULT
  );

  const title = useRef(null);
  const desc = useRef(null);

  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("status-data", JSON.stringify(status));
  }, [status]);

  useEffect(() => {
    if (changeStatus && data) {
      setData((prevData) => {
        let index = prevData.findIndex((el) => el.id === changeStatus.id);
        const newData = [...prevData];
        newData.splice(index, 1, changeStatus);
        return newData;
      });
    }
  }, [changeStatus]);

  const filterByStatus = (statusTitle) => {
    return data
      .filter((el) => el.status === statusTitle)
      .map((el) => (
        <KanbanItem
          key={el.id}
          el={el}
          setChangeStatus={setChangeStatus}
          STATUS_ITEMS={status}
          setData={setData}
        />
      ));
  };

  const memoFilterStatus = useCallback(
    (statusTitle) => {
      return filterByStatus(statusTitle);
    },
    [data]
  );

  const handleCreateItem = (e) => {
    e.preventDefault();
    const date = new Date();
    const newItem = {
      id: date.getTime(),
      title: title.current.value,
      desc: desc.current.value,
      status: selectedStatus,
      createdAt: new Date().toISOString(),
    };
    setData((prev) => [...prev, newItem]);
    setSelectedStatus(null);
    title.current.value = "";
    desc.current.value = "";
  };

  const lowerInfo = (str) => {
    return str.trim().toLowerCase();
  };

  const boxCreate = (e) => {
    e.preventDefault();
    if (status.length >= 4) {
      alert(
        "Sizning limitlaringiz tugadi. Limitdan foydalanish uchun Premium tarifga o'tishingiz lozim."
      );
      setAddBtn(false);
      return;
    }

    const lowerTitleinfo = lowerInfo(info);
    if (status.some((st) => lowerInfo(st.title) === lowerTitleinfo)) {
      alert("Bu nom bilan status yaratib bo'lmaydi, boshqa nom kiriting");
      return;
    }

    const newStatus = {
      id: new Date().getTime(),
      title: info.trim(),
    };
    setStatus((prevStatus) => [...prevStatus, newStatus]);
    setInfo("");
    setAddBtn(false);
  };

  return (
    <section>
      <div className="container">
        <div className="kanban">
          <h2 className="kanban__title">Kanban Board</h2>
          <div className="kanban__header">
            <button onClick={() => setAddBtn(true)} className="kanban__btn">
              Add
            </button>
            <form
              onSubmit={boxCreate}
              className={`kanban__header__form ${addBtn ? "show__add" : ""}`}
            >
              <h1
                onClick={() => setAddBtn(false)}
                className="kanban__header__close"
              >
                X
              </h1>
              <h1 className="kanban__header__form__title">Add Column</h1>
              <div className="kanban__header__form__info">
                <input
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                  type="text"
                />
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
          <form
            onSubmit={handleCreateItem}
            className={`kanban__form ${selectedStatus ? "show" : ""}`}
          >
            <p className="kanban__form__text">Create {selectedStatus}</p>
            <div
              onClick={() => setSelectedStatus(null)}
              className="kanban__form__close"
            >
              <h1>X</h1>
            </div>
            <input ref={title} type="text" placeholder="Title" />
            <input ref={desc} type="text" placeholder="Description" />
            <button type="submit">Create</button>
          </form>
          <div className="kanban__wrapper">
            {status.length ? (
              <KanbanBlock
                statusItems={status}
                items={memoFilterStatus}
                setSelectStatus={setSelectedStatus}
                setStatus={setStatus}
              />
            ) : (
              <div className="boshlash">
                <h1>O'z planlarizni yaratishingiz mumkin</h1>
                <button onClick={() => setAddBtn(true)} className="kanban__btn">
                  Boshlash
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
