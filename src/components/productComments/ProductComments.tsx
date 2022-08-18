import { Comment, Tooltip, List } from "antd";
import React from "react";

interface PropsType {
  data: {
    author: string;
    avatar: string;
    content: string;
    createDate: string;
  }[];
}

const ProductComments: React.FC<PropsType>= ({data}) => (
  <List
    className="comment-list"
    header={`${data.length} replies`}
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (

      <li>
        <Comment
          author={item.author}
          avatar={item.avatar}
          content={item.content}
          datetime={item.createDate}
        />
      </li>
    )}
  />
);

export default ProductComments;

