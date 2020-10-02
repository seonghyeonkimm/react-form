import React from "react";

export interface MainProps {
  name: string;
}

const Main: React.FC<MainProps> = ({ name }) => {
  return <div>My name is {name}</div>;
};

export default Main;
