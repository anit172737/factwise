import React from "react";
import { Trash2 } from "react-feather";
import "../sass/deleteForm.scss";

const DeleteForm = ({ setOpenDelete, handleDelete }) => {
  return (
    <div className="addModal">
      <div className="addModal__content addModal__content--padding">
        <div className="addModal__content--header">
          <h3 className="mb-0">Are you sure you want to delete?</h3>
        </div>
        <div style={{ display: "grid", justifyContent: "center" }}>
          <Trash2 size={30} />
        </div>

        <div className="addModal__content--footer">
          <button
            className="addModal__content--footer-btn addModal__content--footer-btn-close"
            onClick={() => setOpenDelete(false)}
          >
            cancel
          </button>
          <button
            className="addModal__content--footer-btn"
            onClick={handleDelete}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;
