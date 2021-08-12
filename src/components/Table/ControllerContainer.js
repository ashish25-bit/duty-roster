import React from "react";

const ControllerContainer = ({ openModal, deleteRow }) => {
  function closeModal(e) {
    if (e.target.classList.length === 1) {
      openModal(false, -1);
    }
  }

  return (
    <div className="controller-container" onClick={(e) => closeModal(e)}>
      <button
        style={{
          width: "100%",
          padding: "20px",
          background: "#bf2222",
          color: '#fff',
          textTransform: 'uppercase'
        }}
        onClick={() => deleteRow()}
      >
        delete
      </button>
    </div>
  );
};

export default ControllerContainer;
