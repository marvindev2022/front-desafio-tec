import message from "./../assets/message.png";
import notification from "./../assets/notification.png";

export default function RenderHeader({
  position,
  setPosition,
  showModal,
  setShowModal,
}: {
  position: string;
  setPosition: Function;
  showModal: boolean;
  setShowModal: Function;
  open: boolean;
}) {
  return (
    <header
      className={`relative  flex justify-between items-center w-full min-h-[5rem] `}
    >
      <h2 className="text-[#000606] font-playpen-sans font-medium text-4xl">
        {position === "Home" ? "Dashboard" : position}
      </h2>
      <div className="flex gap-8 cursor-pointer">
        <img
          onClick={() => {
            setShowModal(!showModal);
          }}
          src={notification}
          alt="icon Notification"
        />
        <img
          src={message}
          alt="icon message"
          onClick={() => {
            setPosition("Mensagem");
          }}
        />
      </div>
      <div className="absolute w-full h-1 right-0 bottom-0 bg-[#00173D] bg-gradient-to-r from-[#fff] via-[#00173D] to-[#fff]"></div>
    </header>
  );
}
