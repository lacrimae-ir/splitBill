import { useState, useEffect } from 'react';
import FriendList from './components/FriendList';
import FormAddFriend from './components/FormAddFriend';
import FormSplitBill from './components/FormSplitBill';

function App() {
  // Load friends from localStorage, defaulting to an empty list on first run
  const [friends, setFriends] = useState(() => {
    const saved = localStorage.getItem('friends');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Synchronize friends data with localStorage database on changes
  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [friends]);

  function handleShowAddFriend() {
    setShowAddFriend(true);
    setSelectedFriend(null);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelectedFriend(friend) {
    setSelectedFriend(friend);
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends(
      friends.map((friend) => {
        if (friend.id === selectedFriend?.id) {
          return {
            ...friend,
            balance: friend.balance + value,
          };
        }
        return friend;
      })
    );
    setSelectedFriend(null);
  }

  // Deletion logic
  function handleDeleteFriend(id) {
    setFriends((friends) => friends.filter((friend) => friend.id !== id));
    if (selectedFriend?.id === id) {
      setSelectedFriend(null);
    }
  }

  // Closes Electron window cleanly when white X exit button is clicked
  function handleExit() {
    window.close();
  }

  return (
    <div className="app-container">
      {/* Title Header with White X Exit Button */}
      <header className="app-header">
        <h1 className="app-title pixel-text">SPLIT BILL</h1>
        <button 
          className="exit-button" 
          onClick={handleExit} 
          title="Exit App"
          type="button"
        >
          ×
        </button>
      </header>

      {/* Main Content Area */}
      <main className="app-content">
        {friends.length === 0 ? (
          /* State 1: Empty Card */
          <div className="empty-state-card">
            <h2 className="empty-state-title pixel-text">Tidak ada hutang</h2>
            <button 
              className="btn-retro pixel-text" 
              onClick={handleShowAddFriend}
              type="button"
            >
              TAMBAH TEMAN
            </button>
          </div>
        ) : (
          /* State 2: Friend List Screen */
          <>
            <FriendList
              friends={friends}
              onSelected={handleSelectedFriend}
              selectedFriend={selectedFriend}
              onDeleteFriend={handleDeleteFriend}
            />
            
            <button 
              className="btn-retro btn-add-floating pixel-text" 
              onClick={handleShowAddFriend}
              type="button"
            >
              TAMBAH TEMAN
            </button>
          </>
        )}

        {/* State 3: Add Friend Popup Modal */}
        {showAddFriend && (
          <FormAddFriend 
            onAddFriend={handleAddFriend} 
            onClose={() => setShowAddFriend(false)} 
          />
        )}

        {/* State 4: Split Bill Calculation Popup Modal */}
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
            onClose={() => setSelectedFriend(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;