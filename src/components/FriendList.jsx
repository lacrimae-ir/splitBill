import Friend from "./Friend";

function FriendList({ friends, onSelected, selectedFriend, onDeleteFriend }) {
  return (
    <div className="friend-list-container">
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelected={onSelected}
          selectedFriend={selectedFriend}
          onDelete={onDeleteFriend}
        />
      ))}
    </div>
  );
}

export default FriendList;