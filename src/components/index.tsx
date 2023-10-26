import { useEffect, useState } from "react";
import api from "../services/instance";
import { getItem } from "../utils/storage";
import timeAgoFunc from "../utils/timeAgo";

interface Topic {
  id: string;
  title: string;
  content: string;
  user_id: string;
  user: {
    id: string;
    username: string;
  };
  created_at: string;
}
export default function RenderForum() {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [comments, setComments] = useState<any[]>();
  const topicId = getItem("topicId");
  const [render, setRender] = useState(false);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    async function fetchDataTopic() {
      try {
        const { data } = await api.get(`/topics/${topicId}/find`, {
          headers: {
            Authorization: `Bearer ${getItem("token")}`,
          },
        });
        setTopic(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchDataTopic();

    async function fetchDataMessages() {
      const {
        data
      } = await api.get(`/comments/${topicId}/all`, {
        headers: {
          Authorization: `Bearer ${getItem("token")}`,
        },
      });
      if (data.comments)
      
      setComments(Object.values(data.comments));
    }
    fetchDataMessages();
  }, [render]);
  const handleSubmitComment = async (e: any) => {
    e.preventDefault();

    if (newComment.trim() === "") {
      return;
    }

    try {
      await api.post(
        `/comments`,
        {
          topic_id: topicId,
          user_id: JSON.parse(getItem("user") as string).id,
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${getItem("token")}`,
          },
        }
      );

      setRender(!render);

      setNewComment("");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col  w-full max-h-full px-12  overflow-hidden gap-10">
      <div className="flex flex-col border bg-[#80808038] rounded-lg p-5 gap-1 ">
        <h2>Titulo: {topic?.title}</h2>
        <p>@{topic?.user.username}</p>
        <p>{topic?.created_at && timeAgoFunc(topic?.created_at as string)}</p>

        {topic?.content.split(";").map((item) => (
          <div className="disabled w-full h-full cursor-not-allowed">
            {item}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full max-h-[50%] overflow-auto bg-[#80808013] p-5">
        <>
          {comments &&
            comments?.map((comment) => (
              <div className="flex flex-col max-h-[30%] gap-2 mt-5 ">
                <p>{comment?.content}</p>
                <p>{timeAgoFunc(comment?.created_at as string)}</p>
              </div>
            ))}
        </>
      </div>
      <form onSubmit={handleSubmitComment}>
        <input
          className="min-w-[50%] max-w-full h-10 border rounded-lg p-2"
          type="text"
          placeholder="Digite seu comentário"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className="bg-[#00173D] text-white">
          Enviar Comentário
        </button>
      </form>
    </section>
  );
}
