import React from "react";
import styles from "./ShoppingCart.module.css";
import { MainLayout } from "../../layouts/mainLayout/MainLayout";
import { Row, Col, Affix } from "antd";
import { ProductList } from "../../components/productList/ProductList";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { clearShoppingCartItem, checkout } from "../../redux/shoppingCart/slice";
import {PaymentCard} from '../../components/paymentCard/PaymentCard'
import { Navigate, useNavigate } from "react-router-dom";

export const ShoppingCartPage: React.FC = (props) => {
	const navigate = useNavigate();
	const loading = useSelector((s) => s.shoppingCart.loading);
	const shoppingCartItems = useSelector((s) => s.shoppingCart.items);
	const jwt = useSelector((s) => s.user.token) as string;
	const dispatch = useAppDispatch();
	return (
		<MainLayout>
			<Row className={styles.rowStyle}>
				{/* shopping cart list */}
				<Col span={16}>
					<div className={styles["product-list-container"]}>
					<ProductList
						data={shoppingCartItems.map((s) => s.touristRoute)}
						cartId={shoppingCartItems.map((s) => s.id)}
            			/>
					</div>
				</Col>
				{/* check out list */}
				<Col span={8}>
				<Affix>
					<div className={styles["payment-card-container"]}>
						<PaymentCard
							loading={loading}
							originalPrice={shoppingCartItems
							.map((s) => s.originalPrice)
							.reduce((a, b) => a + b, 0)}
							price={shoppingCartItems
							.map(
								(s) =>
								s.originalPrice *
								(s.discountPresent ? s.discountPresent : 1)
							)
							.reduce((a, b) => a + b, 0)}
							onCheckout={() => {
							if (shoppingCartItems.length <= 0) {
								return;
								//if shopping cart is empty, then return null
							}
							dispatch(checkout(jwt));
							navigate("/placeOrder");
							}}
							onShoppingCartClear={() => {
							dispatch(
								clearShoppingCartItem({
								jwt,
								itemIds: shoppingCartItems.map((s) => s.id),
								})
							);
							}}
						/>
					</div>
				</Affix>
				</Col>
			</Row>
		</MainLayout>
	);
};
