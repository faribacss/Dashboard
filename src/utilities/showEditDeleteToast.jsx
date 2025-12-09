import { toast } from "react-toastify";
import React from "react";

export function showEditConfirm({ onConfirm, onCancel, t }) {
  toast.info(
    <div style={{ textAlign: "center", fontSize: "14px" }}>
      <div style={{ marginBottom: 8 }}>{t("editPosts.confirmEdit")}</div>
      <button
        style={{ margin: "0 8px", cursor: "pointer" }}
        onClick={() => {
          toast.dismiss();
          onConfirm();
        }}
      >
        {t("editPosts.confirm")}
      </button>
      <button
        style={{ margin: "0 8px", cursor: "pointer" }}
        onClick={() => {
          toast.dismiss();
          if (onCancel) onCancel();
        }}
      >
        {t("editPosts.NoConfirm")}
      </button>
    </div>,
    { autoClose: false, closeOnClick: false, draggable: false }
  );
}

export function showDeleteConfirm({ onConfirm, onCancel, t }) {
  toast.warn(
    <div style={{ textAlign: "center", fontSize: "14px" }}>
      <div style={{ marginBottom: 8, cursor: "pointer" }}>
        {t("editPosts.confirmDelete")}
      </div>
      <button
        style={{ margin: "0 8px", cursor: "pointer" }}
        onClick={() => {
          toast.dismiss();
          onConfirm();
        }}
      >
        {t("editPosts.confirm")}
      </button>
      <button
        style={{ margin: "0 8px", cursor: "pointer" }}
        onClick={() => {
          toast.dismiss();
          if (onCancel) onCancel();
        }}
      >
        {t("editPosts.noDelete")}
      </button>
    </div>,
    { autoClose: false, closeOnClick: false, draggable: false }
  );
}
