import { useState } from "react";
import Home from "./../assets/home.svg";
import Courses from "./../assets/courses.svg";
import Table from "./../assets/table.svg";
import Forum from "./../assets/forum.png";
import Settings from "./../assets/settings.png";
import menu from "./../assets/menu.svg";
import profile from "./../assets/profile.png";
import logout from "./../assets/logout.png";
import { getItem } from "../utils/storage";
import { useNavigate } from "react-router-dom";

interface MenuOption {
  label: string;
  icon: string;
  position: string;
}

const menuOptions: MenuOption[] = [
  { label: "Home", icon: Home, position: "Home" },
  { label: "My Courses", icon: Courses, position: "My Courses" },
  { label: "Time Table", icon: Table, position: "Time Table" },
  { label: "Forum", icon: Forum, position: "Forum" },
  { label: "Settings", icon: Settings, position: "Settings" },
];

export default function RenderSidebar({
  open,
  setOpen,
  setPosition,
}: React.PropsWithChildren<any>) {
  const [dashWidth, setDashWidth] = useState("w-[15rem]");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setOpen(!open);
    if (open) {
      setDashWidth("w-[15rem]");
    } else {
      setDashWidth("w-[20rem]");
    }
  };

  const handleMenuItemClick = (position: string) => {
    setPosition(position);
  };

  return (
    <div
      className={`${
        open ? dashWidth : "w-[15rem]"
      }"  px-5 pt-10 flex flex-col bg-[#00173D] absolute left-6 rounded-lg gap-10 max-w-[108rem] max-h-[69.8125rem]
      }`}
    >
      <span
        className={`${
          open ? dashWidth : "w-[15rem]"
        }"  h-16 flex justify-end relative`}
      >
        <img
          onClick={toggleSidebar}
          className="w-5 h-5 absolute right-0 top-0 cursor-pointer"
          src={menu}
        />
      </span>
      <div
        className={`flex justify-center items-center gap-5 rounded-md border  ${
          open ? "w-[18rem] py-2" : "w-[8rem] ml-4"
        }`}
      >
        <img
          src={profile}
          alt="logo"
          className="w-16 h-16 rounded-[50%] ml-5"
        />
        <span className="flex flex-col text-white font-poppins font-bold">
          <h2>
            {open && "Hi, " + JSON.parse(getItem("user") as string).username}
          </h2>
        </span>
      </div>
      <nav>
        <ul className="flex flex-col items-center justify-center gap-10">
          {menuOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleMenuItemClick(option.position)}
              className={`flex items-center justify-center gap-5  bg-[#C2E8F8] ${
                open ? "w-[18rem]" : "w-[8rem]"
              } h-16 rounded-lg hover:transform hover:scale-110 hover:transition-transform `}
            >
              <img className="w-12 h-10" src={option.icon} alt={option.label} />
              {open && (
                <span className="text-black w-24 font-poppins">
                  {option.label}
                </span>
              )}
            </li>
          ))}
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="flex w-[10rem] h-16 text-white rounded-lg font-poppins hover:font-extrabold text-[1.5rem] items-center justify-center gap-4"
          >
            <img src={logout} className="w-6 h-6 " alt="Logout" />
            {open && "Logout"}
          </button>
        </ul>
      </nav>
    </div>
  );
}