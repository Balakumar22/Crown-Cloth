import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from "./DirectoryItem.styles.jsx";

import { useNavigate } from "react-router-dom";

function DirectoryItem({ category }) {
  const { title, imageUrl, route } = category;

  const nav = useNavigate();

  const navigate = () => nav(route);

  return (
    <DirectoryItemContainer onClick={navigate}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
