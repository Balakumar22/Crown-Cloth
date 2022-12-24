import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
  Title,
} from "./DirectoryItem.styles";

type DirectoryItemProps = {
  category: {
    id: number;
    title: string;
    imageUrl: string;
    route: string;
  };
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
  const { title, imageUrl, route } = category;

  const nav = useNavigate();

  const navigate = () => nav(route);

  return (
    <DirectoryItemContainer onClick={navigate}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <Title>{title}</Title>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
