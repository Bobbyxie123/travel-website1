import React,{useEffect} from 'react'
import styles from "./DetailPage.module.css";
import { useParams } from "react-router-dom";

import { MainLayout } from '../../layouts/mainLayout/MainLayout'
import {Spin,Row,Col, DatePicker, Typography, Divider, Anchor, Menu, Button,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector,useAppDispatch } from "../../redux/hooks";
import {  getProductDetail,productDetailSlice,} from "../../redux/productDetail/slice";

import {ProductIntro} from '../../components/productIntro/ProductIntro'
//dont forgot to import AsyncThunk
import { commentMockData } from "./mockup";
import ProductComments from '../../components/productComments/ProductComments'
import { addShoppingCartItem } from '../../redux/shoppingCart/slice';

const { RangePicker } = DatePicker;
type MatchParams = {
  touristRouteId: string;
};

export const DetailPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { touristRouteId } = useParams<MatchParams>();
  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);
  const jwt = useSelector((s) => s.user.token) as string;
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);

  useEffect(() => {
    if (touristRouteId) {
      dispatch(getProductDetail(touristRouteId));
    }
    return () => {
      dispatch(productDetailSlice.actions.pageOut());
    };
  }, [dispatch, touristRouteId]);
  
  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }

  if (error) {
    return <div>there is an error on this website:{error}</div>;
  }
  console.log(product)
  return (
    <MainLayout>
      {/* part one  */}
      <div className={styles["product-intro-container"]}>
        <Row className={styles['product-intro-row']}>
          <Col span={13} >
          <ProductIntro
              title={product.title}
              shortDescription={product.description}
              price={product.originalPrice}
              coupons={product.coupons}
              points={product.points}
              discount={product.price}
              rating={product.rating}
              pictures={product.touristRoutePictures.map((p) => p.url)}
            />
          </Col>
          <Col span={11}>
          <Button
              style={{ marginTop: 50, marginBottom: 30, display: "block" }}
              type="primary"
              danger
              loading={shoppingCartLoading}
              onClick={() => {
                dispatch(
                  addShoppingCartItem({ jwt, touristRouteId: product.id })
                );
              }}
            >
              <ShoppingCartOutlined />
              Add cart
            </Button>
            <RangePicker open style={{ marginTop: 20 }} />
          </Col>
        </Row>
      </div>
      {/* part two for anchor menu */}
      <Anchor className={styles["product-detail-anchor"]}>
        <Menu mode="horizontal">
          <Menu.Item key="1">
            <Anchor.Link href="#feature" title="product feature"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Anchor.Link href="#fees" title="fee"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Anchor.Link href="#notes" title="note"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Anchor.Link href="#comments" title="comment"></Anchor.Link>
          </Menu.Item>
        </Menu>
      </Anchor>
      {/* part three: product feature  */}
      <div id="feature" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>product feature</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.features }}
          style={{ margin: 50 }}
        ></div>
      </div>
      {/* part four: fee */}
      <div id="fees" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>fee</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.fees }}
          style={{ margin: 50 }}
        ></div>
      
      </div>
      {/* part five: note */}
      <div id="notes" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>note</Typography.Title>
        </Divider>
        <div
            dangerouslySetInnerHTML={{ __html: product.notes }}
            style={{ margin: 50 }}
        ></div>

      </div>
      
      {/* part six: comment */}
      <div id="comments" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
            <Typography.Title level={3}>users comments</Typography.Title>
          </Divider>
          <div style={{ margin: 40 }}>
            <ProductComments data={commentMockData} />
          </div>
      </div>
    </MainLayout>
  )
}
