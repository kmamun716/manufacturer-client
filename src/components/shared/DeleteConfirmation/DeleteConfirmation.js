import React from "react";

const DeleteConfirmation = ({order, handleDelete}) => {
  return (
    <div>
      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Do you want to delete <span className="text-primary">{order.serviceName}</span>?</h3>
          <p className="py-4">
            If you click on <span className="text-red-500">Confirm Delete</span> your product will delete permanently
          </p>
          <div className="modal-action">
            <label htmlFor="delete-modal" className="btn btn-accent text-white font-bold">
              No
            </label>
            <label htmlFor="delete-modal" onClick={()=>handleDelete(order._id)} className="btn btn-warning">
              Confirm Delete
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
