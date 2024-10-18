import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Markdown from "react-markdown";
import { useAppSelector } from "../../app/hooks";
import { selectUserAuth } from "../../app/features/AuthContext";
import "./newPrompt.css";

type NewPromptProps = {
  data: {
    chat: {
      createdAt: string;
      history: {
        parts: {
          text: string;
        }[];
        role: string;
      }[];
      updatedAt: string;
      userId: string;
      _id: string;
      __v: number;
    };
  };
};

function NewPrompt({ data }: NewPromptProps) {
  const user = useAppSelector(selectUserAuth);
  const queryClient = useQueryClient();
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer]);

  const mutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/workout-buddy/chats/${data.chat._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            prompt: text,
          }),
        }
      );

      const json = await response.json();

      setAnswer(json.result);

      return json;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["chats", data.chat._id]).then(() => {
        formRef.current?.reset();
        setQuestion("");
        setAnswer("");
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const add = (text: string, isInitial?: boolean) => {
    try {
      if (!isInitial) setQuestion(text);

      if (!user) {
        setError("You must be logged");
        return;
      }

      mutation.mutate(text);
    } catch (error) {
      console.log(error);
    }

    // const response = await fetch(
    //   `${process.env.REACT_APP_API_URL}/api/workout-buddy`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //     body: JSON.stringify({ prompt: text }),
    //   }
    // );

    // const json = await response.json();

    // setAnswer(json.result);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = e.currentTarget.question.value;

    if (!text) return;

    add(text);
  };

  // const hasRun = useRef(false);

  // useEffect(() => {
  //   if (!hasRun.current) {
  //     if (data?.chat?.history.length === 1) {
  //       add(data.chat.history[0].parts[0].text, true);
  //     }
  //   }

  //   hasRun.current = true;
  // }, []);

  return (
    <>
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <input type="text" name="question" placeholder="Type a message" />
        <button>Send</button>
      </form>
    </>
  );
}

export default NewPrompt;
