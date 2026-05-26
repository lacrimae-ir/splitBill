function Friend({ friend, onSelected, selectedFriend, onDelete }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className="friend-item">
      {/* Retro SVG Avatar Icon instead of profile image input */}
      <div className="friend-avatar">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>

      <div className="friend-info">
        <h3 className="friend-name pixel-text">{friend.name.toUpperCase()}</h3>
        
        {friend.balance < 0 && (
          <p className="friend-balance-text you-owe pixel-text">
            KAMU BERHUTANG RP{Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance > 0 && (
          <p className="friend-balance-text owes-you pixel-text">
            BERHUTANG RP{Math.abs(friend.balance)} KE KAMU
          </p>
        )}
        {friend.balance === 0 && (
          <p className="friend-balance-text settled pixel-text">
            TIDAK ADA HUTANG
          </p>
        )}
      </div>

      <button
        className={`btn-pilih pixel-text ${isSelected ? "selected" : ""}`}
        onClick={() => onSelected(friend)}
        type="button"
      >
        PILIH
      </button>

      {/* Retro Delete button */}
      <button
        className="btn-delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(friend.id);
        }}
        title="Hapus Teman"
        type="button"
      >
        ×
      </button>
    </li>
  );
}

export default Friend;