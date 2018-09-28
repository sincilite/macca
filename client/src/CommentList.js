import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = (props) => {
  const commentNodes = props.data.map(comment => (
    <Comment author={comment.name} key={comment._id} id={comment._id} squad_number={comment.squad_number}>
      { comment.text }
    </Comment>
  ));
  return (
    <div>
      { commentNodes }
    </div>
  );
};

CommentList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    squad_number: PropTypes.number,
  })),
};

CommentList.defaultProps = {
  data: [],
};

export default CommentList;