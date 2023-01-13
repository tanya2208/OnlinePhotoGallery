import React, { memo } from "react";

function Image(props) {
  return (
    <div
      className="image"
      style={{
        backgroundImage: `url("${props.link}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    ></div>
  );
}

export default memo(Image);
