import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

interface IDropdownButtonProps {
  items: Array<any>;
  children?: React.ReactNode;
  onSelect?: (event: any) => void;
}

const DropdownButton = (props: IDropdownButtonProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>{props.children}</DropdownToggle>
      <DropdownMenu>
        {props.items.map((i) => (
          <DropdownItem
            id={i.key}
            onClick={props.onSelect}
            active={i.isActive}
            key={i.key}
          >
            {i.value}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default DropdownButton;
