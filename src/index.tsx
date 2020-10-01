import React from "react";

export interface MainProps {
  name: string;
}

const Main: React.FC<MainProps> = ({ name }) => {
  return <div>Hello, this is {name}</div>;
};

export default Main;
