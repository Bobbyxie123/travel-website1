import React, { useEffect } from 'react'
import {Header} from '../../components/header/Header'
import {Footer} from '../../components/footer/Footer'
import {SideMenu}  from '../../components/sideMenu/SideMenu'
import Carousel from '../../components/carousel/Carousel'
import {ProductCollection} from '../../components/productCollection/ProductCollection'
import BusinessPartners from '../../components/businessPartners/BusinessPartners'
import { Row, Col, Typography,Spin } from "antd";
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import { getRecommendProduct } from '../../redux/recommendProducts/slice'


import styles from './HomePage.module.css'
import { useTranslation } from 'react-i18next'
import { MainLayout } from '../../layouts/mainLayout/MainLayout'
import { Axios } from 'axios'
import { useSelector,useAppDispatch } from '../../redux/hooks'

import store from '../../redux/store'


export default function HomePage() {
  const {t} = useTranslation();
  const loading = useSelector((state) => state.recommendProduct.loading);
  const error = useSelector((state) => state.recommendProduct.error);
  const productList = useSelector(
    (state) => state.recommendProduct.productList
  );



  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRecommendProduct());
  }, [dispatch]);

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
    return <div>网站出错:{error}</div>;
  }
  return (
    <MainLayout>

        {/* content area */}
        <Row className={styles.firstRow} >
          {/* this row is for the part two  */}
          <Col span={6}>
            <SideMenu/>
          </Col>
          <Col span={18}>
            <Carousel/>
          </Col>
        </Row>
        <ProductCollection
          title = {
          <Typography.Title level={3} type='danger'>
            {t("home_page.hot_recommended")} 
          </Typography.Title>}
          sideImage={sideImage}
          products={productList[0].touristRoutes}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="danger">
              {t("home_page.new_arrival")}
            </Typography.Title>
          }
          sideImage={sideImage2}
          products={productList[1].touristRoutes}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="success">
              {t("home_page.domestic_travel")} 
            </Typography.Title>
          }
          sideImage={sideImage3}
          products={productList[2].touristRoutes}
          />
        {/* ProductCollection is for the forth part  */}
        <BusinessPartners/>

    </MainLayout>
  )
}
