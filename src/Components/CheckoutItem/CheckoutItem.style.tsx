import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;

  .quantity {
    display: flex;

    .icon {
      cursor: pointer;
    }

    .value {
      margin: 0 10px;
    }
`;

export const ImageContainer = styled.div`
  width: 22.5%;
  padding-right: 15px;
`;

export const CheckoutItemImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const CheckoutItemSpan = styled.span`
  width: 23%;
`;
