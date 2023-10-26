import { stateProgress } from "../../data/stateProgess";
import { getItem } from "../../utils/storage";
import icons from "./../../assets/icons8-assignment-50 3.png";
import background from "./../../assets/background.png";
export default function ModalDashBoard() {
  return (
    <section className="w-full h-full flex flex-col top-44 right-36 z-10  overflow-auto">
      <h1 className="text-2xl font-bold">{`Welcome Back, ${
        JSON.parse(getItem("user") as string).name.split(" ")[0]
      }`}</h1>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
        className="flex flex-col w-full min-h-[21.875rem] rounded-lg bg-white mb-10 "
      />
      <div className="flex justify-around w-full ">
        <div className="flex bg-[#0A5F6F] w-72 h-32 rounded-lg justify-center items-center text-white gap-5 text-xl font-bold">
          <img src={icons} />
          <span className="flex flex-col">
            <h2>Diploma in</h2>
            <h3>DDS/ENG/01</h3>
          </span>
        </div>
        <div className="flex bg-[#0A5F6F] w-72 h-32 rounded-lg justify-center items-center text-white gap-5 text-xl font-bold">
          <img src={icons} />
          <span className="flex flex-col">
            <h2>Diploma in</h2>
            <h3>DDS/DIT/01</h3>
          </span>
        </div>
        <div className="flex bg-[#0A5F6F] w-72 h-32 rounded-lg justify-center items-center text-white gap-5 text-xl font-bold">
          <img src={icons} />
          <span className="flex flex-col">
            <h2>Diploma in</h2>
            <h3>DDS/HDN/01</h3>
          </span>
        </div>
      </div>
      <div className="flex  w-full flex-wrap justify-around gap-10 p-20  items-center ">
        {stateProgress.map((item, index) => {
          return (
            <span
              key={index}
              className="w-[40%] h-20 flex justify-between rounded-lg bg-[#00173D] items-center px-5 "
            >
              <h2 className="text-white font-poppins font-extrabold text-[1.8rem]">
                {item.name}
              </h2>
              <h2 className="text-white font-poppins font-extrabold text-[1.8rem]">
                {item.progress}
              </h2>
            </span>
          );
        })}
      </div>
    </section>
  );
}
