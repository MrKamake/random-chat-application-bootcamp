import { socket } from './App';

const configureSocket = dispatch => {
  socket.on('wait message', hasPeer => {
    dispatch({ type: 'WAIT_MESSAGE', hasPeer });
  });

  socket.on('typing', () => {
    dispatch({ type: 'IS_TYPING' });
  });

  socket.on('enter message', ({ username }) => {
    dispatch({ type: 'ENTER_MESSAGE', username });
  });

  socket.on('send message', messageData => {
    dispatch({ type: 'SEND_MESSAGE', messageData });
  });

  socket.on('chat end', ({ username }) => {
    leaveRoom();
    dispatch({ type: 'SWITCH_PAGE', username });
    joinRoom(username);
  });

  socket.on('exit chat', () => {
    dispatch({ type: 'HOME' });
  });

  socket.on('disconnect', () => {
    console.log('Connection fell or your browser is closing.');
  });
};

export const joinRoom = username => socket.emit('join room', { username });

export const leaveRoom = () => socket.emit('leave room');

export default configureSocket;
