import React from 'react';
import './MessageBox.css';

const MessageBox = (props) => {
  return(
    <div style={props.style} className="MessageBox">
      {props.message}
    </div>
  );
};

export default MessageBox;
