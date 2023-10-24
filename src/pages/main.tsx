import { useState } from "react";
import RenderSidebar from "../components/sidebar";
import RenderHeader from "../components/header";
import ModalHeaderMain from "../components/Modal/notification";
import ModalDashBoard from "../components/Modal/dashboard";
import ModalCourses from "../components/Modal/courses";
import ModalTimeTable from "../components/Modal/timeTable";
import ModalForum from "../components/Modal/forum";
import ModalSettings from "../components/Modal/settings";

export default function Main() {
  const [position, setPosition] = useState("Home");
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(true);

  return (
    <section className="flex w-screen h-screen  justify-between p-20 ">
      <RenderSidebar open={open} setOpen={setOpen} setPosition={setPosition} />

      <div
        className={` flex flex-col justify-start items-center w-full max-h-full px-12  overflow-hidden ml-[18rem] gap-10`}
      >
        <RenderHeader
          open={open}
          position={position}
          setPosition={setPosition}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        {showModal && <ModalHeaderMain />}
        {position === "My Courses" && <ModalCourses />}
        {position === "Time Table" && <ModalTimeTable />}
        {position === "Forum" && <ModalForum />}
        {position === "Settings" && <ModalSettings />}
        {position === "Home" && <ModalDashBoard />}
      </div>
    </section>
  );
}
