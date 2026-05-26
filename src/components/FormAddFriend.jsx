import { useState } from "react";

export default function FormAddFriend({ onAddFriend, onClose }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const id = typeof crypto.randomUUID === "function" 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2, 9);
      
    const newFriend = {
      id,
      name,
      balance: 0,
    };

    onAddFriend(newFriend);
    setName("");
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        {/* Purple Close Button 'x' */}
        <button className="purple-close-x" onClick={onClose} type="button">
          ×
        </button>

        <form onSubmit={handleSubmit}>
          <h2 className="form-title pixel-text">Tambah Teman</h2>
          
          <div className="form-row">
            <label className="form-label pixel-text">nama :</label>
            <div className="form-input-wrapper">
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-retro btn-form-submit pixel-text" type="submit">
              TAMBAH TEMAN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}