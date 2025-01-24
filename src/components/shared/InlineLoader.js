import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function InlineLoader({ size, ...props }) {
  return (
    <ClipLoader
      color={props.color ? props.color : "#9456c8"}
      loading={true}
      size={size}
    />
  );
}
