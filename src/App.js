import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [list, setList] = useState(getLocalStorage());
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "please enter value", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      showAlert(true, "item updated to the list", "success");
      setName("");
      setEditId(null);
      setIsEditing(false);
    } else {
      const newItem = {
        id: new Date(),
        title: name,
      };
      showAlert(true, "item added to the list", "success");
      setList((oldList) => [...oldList, newItem]);
      setName("");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleClear = (e) => {
    e.preventDefault();
    showAlert(true, "All items are cleared", "danger");
    setList([]);
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const handleDelete = (id) => {
    const updatedList = list.filter((items) => items.id !== id);
    showAlert(true, "Item deleted", "danger");
    setList(updatedList);
  };

  const handleEdit = (id) => {
    const specificItem = list.find((item) => item.id === id);
    console.log(specificItem);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form action="" className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3 className="title">Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            value={name}
            onChange={handleChange}
            placeholder="e.g. eggs"
          />
          <button className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container ">
          <List
            items={list}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <button className="clear-btn" onClick={handleClear}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
