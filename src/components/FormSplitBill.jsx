import { useState } from "react";

function FormSplitBill({ selectedFriend, onSplitBill, onClose }) {
  const [amount, setAmount] = useState("");
  const [myBill, setMyBill] = useState("");
  const friendBill = amount ? amount - myBill : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!amount || !myBill) return;
    onSplitBill(whoIsPaying === "user" ? Number(friendBill) : -Number(myBill));
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        {/* Purple Close Button 'x' */}
        <button className="purple-close-x" onClick={onClose} type="button">
          ×
        </button>

        <form onSubmit={handleSubmit}>
          <h2 className="form-title pixel-text">
            PATUNGAN BARENG SI {selectedFriend.name.toUpperCase()}
          </h2>

          <div className="form-row">
            <label className="form-label pixel-text">TOTAL TAGIHAN :</label>
            <div className="form-input-wrapper">
              <input
                type="number"
                className="form-input"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <label className="form-label pixel-text">TAGIHAN KAMU :</label>
            <div className="form-input-wrapper">
              <input
                type="number"
                className="form-input"
                value={myBill}
                onChange={(e) =>
                  setMyBill(
                    Number(e.target.value) > Number(amount)
                      ? myBill
                      : Number(e.target.value)
                  )
                }
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <label className="form-label pixel-text">
              TAGIHAN {selectedFriend.name.toUpperCase()} :
            </label>
            <div className="form-input-wrapper">
              <input
                type="text"
                className="form-input"
                value={friendBill}
                disabled
              />
            </div>
          </div>

          <div className="form-row">
            <label className="form-label pixel-text">DITALANGIN SAMA :</label>
            <div className="form-input-wrapper">
              <select
                className="form-select"
                value={whoIsPaying}
                onChange={(e) => setWhoIsPaying(e.target.value)}
              >
                <option value="user">KAMU</option>
                <option value="friend">{selectedFriend.name.toUpperCase()}</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-retro btn-form-submit pixel-text" type="submit">
              TAMBAH
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormSplitBill;