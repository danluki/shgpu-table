import React, { Dispatch, SetStateAction } from "react";

const SideBar = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  return <div>SideBar</div>;
};

export default SideBar;
