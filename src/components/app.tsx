import { setItem } from "../utils/storage";

export default function AppTeste({state,open,setOpen}:any) {
  return (
    <div className="bg-gray-100 min-h-screen max-w-[30%] ">
     

      <div className="container mx-auto  flex flex-col gap-20 ">
        <section id="questions">
          <h1 className="text-2xl font-semibold">Perguntas Recentes</h1>
          <div className="bg-white p-4 mt-4 rounded-lg shadow">
            <h2 onClick={()=>{
                setItem("topicId", state?.id.toString());
                setOpen(!open);
            }}><a href="#" className="text-blue-600 hover:underline">{state?.title}</a></h2>
            <p>{state?.content}</p>
          </div>
          
        </section>
        
        <section id="sidebar" className="ml-4">
          <h2 className="text-2xl font-semibold">Perguntas Populares</h2>
          <ul className="mt-4">
            <li><a href="#" className="text-blue-600 hover:underline">Como aprender programação?</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Dicas para entrevista de emprego em TI</a></li>
          </ul>
        </section>
      </div>
      
      
    </div>
  );
}
