import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Comment = props => (
  <div className="singleComment">
    <img alt="user_image" className="userImage" src={`https://picsum.photos/70?random=${props.id}`} />
    <div className="textContent">
      <div className="singleCommentContent">
        <h3>{props.author} {props.squad_number}</h3>
        <ReactMarkdown source={props.children} />
      </div>
      <div className="singleCommentButtons">
      </div>
    </div>
  </div>
);

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  squad_number: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Comment;