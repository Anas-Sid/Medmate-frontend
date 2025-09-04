export const fetchPendingRequests = async (userId, userModel) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/chat/requests/${userId}?userModel=${userModel}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    return [];
  }
};

export const fetchAcceptedChats = async (userId, userType) => {
  const res = await fetch(
    `http://localhost:5000/api/chat/connections/${userId}?userModel=${userType}`
  );
  const data = await res.json();
  return data;
};


export const fetchMessages = async (user1Id, user2Id) => {
  const res = await fetch(
    `http://localhost:5000/api/chat/messages?user1Id=${user1Id}&user2Id=${user2Id}`
  );
  const data = await res.json();
  return data;
};
