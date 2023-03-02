import React from "react";
import { useState } from "react";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import Navbar from "../components/Navbar";
import { IoMdSend } from "react-icons/io";

const Chat = () => {
  return (
    <div>
      <Navbar />
      <div className="md:ml-20 my-8 mx-4 h-[calc(100vh-130px)] flex shadow-sm">
        <div className="bg-main-color basis-1/3 rounded-l-lg px-4 py-8">
          <div className="flex flex-col gap-4">
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className="bg-white-color basis-2/3 flex flex-col rounded-r-lg px-4 py-8">
          <div className="basis-11/12 overflow-y-scroll sticky scrollbar">
            <Message />
            <Message />
            <Message />
          </div>
          <div className="basis-1/12">
            <div className="flex gap-2 items-center relative">
              <textarea
                type="text"
                className="basis-11/12 border border-main-color-alt rounded-lg px-2 py-4 resize-none outline-none"
                placeholder="Message"
              />
              <button className="basis-1/12 bg-main-color rounded-full p-2 cursor-pointer absolute right-0">
                <IoMdSend className="text-white-color-alt" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
