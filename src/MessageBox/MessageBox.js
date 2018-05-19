import React from 'react';
import './MessageBox.css';

const style = {
  success: {
    backgroundColor: '#bdffb5',
    color: '#468840',
    borderLeft: '2px solid #468840'
  },
  warning: {
    backgroundColor: '#ffe649',
    color: '#887002',
    borderLeft: '2px solid #887002'
  }
}

const MessageBox = (props) => {
  const messageStyle = props.style === 'warning' ? style.warning : style.success;

  return(
      <div style={messageStyle} className="MessageBox">
        {props.message}
      </div>
  );
};

export default MessageBox;
