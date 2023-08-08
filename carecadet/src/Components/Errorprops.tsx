import React from "react";

interface props {
  children: React.ReactNode;
}
export default function ErrorProps(props: props) {
  return (
    <div
      style={{
        textAlign: "left",
        color: "red",
        fontSize: "0.9rem",
        marginTop: "0.6rem",
      }}
    >
      {props.children}
    </div>
  );
}
