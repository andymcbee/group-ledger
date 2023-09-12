import React from "react";

export function Input(props) {
  const { register } = props.validate(); // retrieve all hook methods

  return <input {...register("test")} />;
}
