import { connect } from 'react-redux';
import App from '../component/App';
import configureSocket, { joinRoom } from './socket';
import io from 'socket.io-client';

export const socket = io.connect('http://localhost:5000');

const mapStateToProps = state => ({
  username: state.username,
  hasPeer: state.hasPeer,
  enterMessage: state.enterMessage,
  messageList: state.messageList
});

const mapDispatchToProps = dispatch => {
  configureSocket(dispatch);
  return {
    switchPage(username) {
      if (username) {
        dispatch({ type: 'SWITCH_PAGE', username });
        joinRoom(username);
      }
    },
    sendMessage(messageData) {
      socket.emit('chat', messageData);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
