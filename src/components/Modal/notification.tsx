import { notificacoes } from "./../../data/notificacoes";
import notif from "./../../assets/notify.svg";
export default function ModalHeaderMain() {
  return (
    <div className="absolute  w-64 h-80 flex flex-col top-44 right-36 z-[999]  bg-white rounded-b-lg">
      <div className="relative">
        <img
          className="absolute -top-[1.59rem] right-14 w-10 h-10 z-10"
          src={notif}
          alt=""
        />
        <div className="absolute w-64 h-80 border-[.1875rem] border-primary  border-[#00173D] rounded-xl overflow-y-scroll scrollbar-thin scrollbar-thumb-primary">
          {notificacoes.map(({ msg }, key) => {
            return (
              <div
                key={key}
                className="font-secondary text-xs font-extralight border-b-[.06rem] border-[#00173D] mt-5 mx-3 pb-2 "
              >
                <h2>{msg}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
