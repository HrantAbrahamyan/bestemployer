import React from "react";

const table = props => {
  return (
    <tr>
      <td>{props.age}</td>
      <td>{props.gender}</td>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.position}</td>
      <td>{props.salary}</td>
      <td>{props.surname}</td>
    </tr>
  );
};

export default table;
