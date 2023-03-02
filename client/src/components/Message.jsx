import React from "react";

const Message = () => {
  return (
    <div className="flex flex-col items-start mb-3">
      <div>
        <p className="bg-chat-color py-2 px-4 rounded-2xl max-w-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptatem
          qui nulla deserunt eum hic doloribus. Optio molestias exercitationem
          excepturi inventore. Veritatis suscipit esse perspiciatis recusandae
          tenetur at vero dicta?
        </p>
      </div>
      <span className="text-sm font-light">1 hour ago</span>
    </div>
  );
};

export default Message;
