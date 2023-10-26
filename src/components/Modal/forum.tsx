import React, { useEffect, useState } from "react";
import api from "./../../services/instance";
import { getItem, setItem } from "../../utils/storage";
import profile from "./../../assets/profile.png";
import { formatDistanceToNow } from "date-fns";
import { notifyError, notifySucess } from "../../utils/toastify";
import { useNavigate } from "react-router-dom";
import AppTeste from "../app";
import RenderForum from "..";
import timeAgoFuncFunc from "../../utils/timeAgo";

interface Topic {
  id: number;
  title: string;
  content: string;
  user_id: string;
  user: {
    id: string;
    username: string;
  };
  created_at: string;
}

export default function ModalForum() {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topic, setTopic] = useState<Topic>({} as Topic);
  const [messages, setMessages] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<Topic[]>(topics);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [render, setRender] = useState<boolean>(false);


  const handleSubmitTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      return;
    }
    const newTopicData = {
      title,
      content,
      user_id: JSON.parse(getItem("user") as string).id,
    };

    async function createTopic() {
      try {
        const { data } = await api.post("/topics", newTopicData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTopics([...topics, data]);
        notifySucess("Topic created successfully");
        setTitle("");
        setContent("");
        setRender(!render);
      } catch (err: any) {
        console.log(err);
        notifyError(err.message);
      }
    }
    createTopic();
  };

  useEffect(() => {
    try {
      async function fetchTopicsData() {
        const { data } = await api.get("/topics/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTopics(
          data.sort(
            (a: any, b: any) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
        );
      }
      fetchTopicsData();
      async function fetchMessageData() {
        const { data } = await api.get("/messages", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMessages(
          data.sort(
            (a: any, b: any) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          )
        );
      }
      fetchMessageData();
    } catch (err: any) {
      console.log(err);
    }
  }, [render]);

  useEffect(() => {
    const filteredTopics = topics.filter((topic: any) =>
      topic?.title?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredTopics);
  }, [search, topics]);

  return (
    <section className="w-full h-full flex top-44 right-36 z-10 mt-10 gap-10">
      {!open && (
        <>
          <div className="flex flex-col w-full h-full rounded-lg gap-10">
            <input
              type="text"
              className="w-96  rounded-lg border-2 border-[#00173D] px-5"
              placeholder="Search"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />

            <div className="flex flex-col w-full max-h-80 rounded-lg overflow-auto">
              <strong className="text-xl font-bold">Topics</strong>
              {searchResults.map((result: Topic) => (
                <div
                  key={result.id}
                  className="bg-gray-100 p-2 m-2 rounded"
                  onClick={() => {
                    setItem("topicId", result.id.toString());
                    setOpen(true);
                  }}
                >
                  <h1 className="text-xl font-bold">{result.title}</h1>
                  <div className="flex gap-5">
                    <img
                      src={profile}
                      className="w-10 h-10"
                      alt="User Profile"
                    />
                    <div className="flex flex-col">
                      <h6 className="text-xs">{`@${result.user.username}`}</h6>
                      <h6 className="text-xs">
                        {timeAgoFuncFunc(result.created_at)}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form
              className="flex flex-col w-full h-full rounded-lg border"
              onSubmit={(e) => handleSubmitTopic(e)}
            >
              <strong className="text-xl font-bold">Create Topic</strong>
              <div className="flex flex-col w-full h-full rounded-lg border">
                <input
                  type="text"
                  className="w-full  rounded-lg border-2 border-[#00173D] px-5"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  value={content}
                  className="min-w-full min-h-[50%]  max-w-full max-h-[50%] rounded-lg border-2 border-[#00173D] px-5 overflow-auto"
                  placeholder="Content"
                  onChange={(e) => setContent(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full bg-[#00173D] rounded-lg text-white"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {open && <RenderForum />}
      <AppTeste state={topics[0]} open={open} setOpen={setOpen} />
    </section>
  );
}
