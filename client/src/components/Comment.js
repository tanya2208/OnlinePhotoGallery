import React, { memo } from "react";

function Comment(props) {
  return <div className="comment">{props.comment}</div>;
}

export default memo(Comment);
