import { useState } from "react";
export default function ModalForum() {
  const [search, setSearch] = useState<string>("");
  return (
    <section className="w-full h-full flex  top-44 right-36 z-10  mt-10">
      <div className="flex flex-col w-full h-80 rounded-lg ">
        <input
          type="search"
          className="w-[29.5625rem] h-[4.5625rem] rounded-lg border-2 border-[#00173D] px-5"
          placeholder="Search"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />
        <div className="flex flex-col w-full h-80 rounded-lg  "></div>
      </div>
      <div className="flex flex-col w-full h-80 rounded-lg  ">
        <div className="flex flex-col w-full h-80 rounded-lg  ">
          <div className="flex flex-col w-full h-80 rounded-lg  ">
            <img src="" />
            <span className="flex flex-col">
              <h1>Anil</h1>
              <h2>Online - 32 min</h2>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
