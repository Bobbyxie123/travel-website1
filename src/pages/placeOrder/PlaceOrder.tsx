import React from "react";
import styles from './PlaceOrder.module.css'
import { Row, Col } from "antd";
import { useSelector,useAppDispatch } from "../../redux/hooks";

import { MainLayout } from "../../layouts/mainLayout/MainLayout";
import { PaymentForm  } from "../../components/paymentForm/PaymentForm";
import  {CheckOutCard}   from "../../components/checkOutCard/CheckOutCard";
import { placeOrder } from "../../redux/order/slice";

export const PlaceOrderPage: React.FC =() => {
  const jwt = useSelector((s) => s.user.token) as string;
  const loading = useSelector((s) => s.order.loading);
  const order = useSelector((s) => s.order.currentOrder);

  const dispatch = useAppDispatch();

  return (
    <MainLayout>
      <Row className={styles.rowStyle}>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={order}
            onCheckout={() => {
              dispatch(placeOrder({ jwt, orderId: order.id }));
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};
