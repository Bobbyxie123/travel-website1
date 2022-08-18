import React from 'react'
import styles from "./ProductIntro.module.css";
import { Typography, Carousel, Image, Rate, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { getKey } from '../../utils/nanoid/index'



interface PropsType {
  title: string;
  shortDescription: string;
  price: string | number;
  coupons: string;
  points: string;
  discount: string;
  rating: string | number;
  pictures: string[];
}

const columns: ColumnsType<RowType> = [
  {
    title: "title",
    dataIndex: "title",
    key: getKey(),
    align: "left",
    width: 120,
  },
  {
    title: "description",
    dataIndex: "description",
    key: getKey(),
    align: "center",
  },
];


interface RowType {
  title: string;
  description: string | number | JSX.Element;
  key: number | string;
}



export const ProductIntro: React.FC<PropsType> = ({
  title,
  shortDescription,
  price,
  coupons,
  discount,
  rating,
  pictures,
}) => { 
  console.log(title)
  const tableDataSource: RowType[] = [
    {
      key:getKey(),
      title:'Route',
      description:title,
    },
    {
      key:getKey(),
      title:'Price',
      description:(
        <>
          ¥{" "}
          <Typography.Text type="danger" strong>
            {price}
          </Typography.Text>
        </>
      ),
    },
    {
      key:getKey(),
      title:'limited offer',
      description:discount?(
        <>
          $ <Typography.Text delete>{price}</Typography.Text>{" "}
            <Typography.Text type="danger" strong>
            $ {discount}
            </Typography.Text>
        </>
      ):('no discount'),
    },
    {
      key: getKey(),
      title: "coupon",
      description: coupons ? discount : "no coupon",
    },
    {
      key:getKey(),
      title: "route comment",
      description: (
        <>
          <Rate allowHalf defaultValue={+rating} />
          <Typography.Text style={{ marginLeft: 10 }}>
            {rating} star
          </Typography.Text>
        </>
      ),
    },
  ]
  return(

    <div className={styles["intro-container"]}>

      {title}
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Text>{shortDescription}</Typography.Text>
      <div className={styles["intro-detail-content"]}>
        <Typography.Text style={{ marginLeft: 20 }}>
          $ <span className={styles["intro-detail-strong-text"]}>{price}</span>{" "}
          /person
        </Typography.Text>
        <Typography.Text style={{ marginLeft: 50 }}>
          <span className={styles["intro-detail-strong-text"]}>{rating}</span>{" "}
          star
        </Typography.Text>
      </div>
      <Carousel autoplay slidesToShow={3}>
        {pictures.map((p) => (
          <Image height={150} src={p} />
        ))}
      </Carousel>
      <Table<RowType>
        columns={columns}
        dataSource={tableDataSource}
        size="small"
        bordered={false}
        pagination={false}
        showHeader={false}
      />

    </div>

  )
}