import styles from "./SearchPage.module.css";
import React, { useEffect } from "react";
import { ProductList } from "../../components/productList/ProductList";
import { FilterArea } from "../../components/filter/FilterArea";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { searchProduct } from "../../redux/productSearch/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import {MainLayout} from '../../layouts/mainLayout/MainLayout'

//1 create page and the ui component
//2 configure the router and gain the search key work in the url 
//3 crate the product research state slice (solve the keyword request)
//4 finish redux and connect the page state

type MatchParams = {
  keywords:string;
} 
//use params to gain the keyword from the url


export const SearchPage: React.FC = () => {
  const { keywords } = useParams<MatchParams>();
  
  const loading = useSelector((state) => state.productSearch.loading);
  const error = useSelector((s) => s.productSearch.error);
  const pagination = useSelector((s) => s.productSearch.pagination);
  const productList = useSelector((s) => s.productSearch.data);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(()=>{
    if(keywords) {
      dispatch(searchProduct({nextPage:1, pageSize: 10, keywords}))
    }
  },[location])

  const onPageChange = (nextPage, pageSize) =>{
    if(keywords) {
      dispatch(searchProduct({nextPage, pageSize, keywords}))
    }
  }

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
    return <div>网站出错：{error}</div>;
  }

  return (
    <MainLayout>
      {/* 分类过滤器 */}
      <div className={styles["product-list-container"]}>
        <FilterArea />
      </div>
      {/* 产品列表 */}
      <div className={styles["product-list-container"]}>
        <ProductList
          data={productList}
          paging={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </MainLayout>
  );
};
