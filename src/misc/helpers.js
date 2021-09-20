export function getNameInitials(name) {
  const splitName = name.toUpperCase().split(' ');
  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0];
  }
  return splitName[0][0];
}

export function transformToArrayWithId(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map(roomId => {
        return { ...snapVal[roomId], id: roomId };
      })
    : [];
}

export async function getUserUpdates(userId, keyToUpdate, value, db) {
  const updates = {};

  updates[`/profiles/${userId}/${keyToUpdate}`] = value;

  const getMsgs = db
    .ref('/messages')
    .orderByChild('author/uid')
    .equalTo(userId)
    .once('value');
  const getRooms = db
    .ref('/rooms')
    .orderByChild('lastMessage/author/uid')
    .equalTo(userId)
    .once('value');

  const [mSnap, rSnap] = await Promise.all([getMsgs, getRooms]);

  mSnap.forEach(snap => {
    updates[`/messages/${snap.key}/author/${keyToUpdate}`] = value;
  });

  rSnap.forEach(snap => {
    updates[`/rooms/${snap.key}/lastMessage/author/${keyToUpdate}`] = value;
  });

  return updates;
}

export function transformToArray(snapVal) {
  return snapVal ? Object.keys(snapVal) : [];
}

export function groupBy(array, groupingKeyFn) {
  return array.reduce((result, item) => {
    const groupingKey = groupingKeyFn(item);
    if (!result[groupingKey]) {
      result[groupingKey] = [];
    }
    result[groupingKey].push(item);
    return result;
  }, {});
}

export const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);
