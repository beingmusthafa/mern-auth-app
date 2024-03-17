import React, { useRef } from "react";

const Popup = ({ text, onCancel, onConfirm }) => {
  const popupRef = useRef();
  return (
    <div
      ref={popupRef}
      className="w-60 font-semibold fixed mx-auto mt-40 z-10 rounded-xl bg-slate-900 p-5"
    >
      <p className="w-5/6 text-wrap text-center text-white">{text}</p>
      <div className="flex w-9/12 justify-between mt-6 mx-auto">
        <button className="rounded-md bg-white px-3" onClick={onCancel}>
          No
        </button>
        <button className="rounded-md bg-white px-3" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Popup;
