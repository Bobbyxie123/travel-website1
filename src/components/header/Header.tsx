import React,{ useState, useEffect,} from 'react'
import styles from './header.module.css'
import { Typography,Dropdown,Button,Menu,Space,Layout,Input } from 'antd'
import DropdownButton from 'antd/lib/dropdown/dropdown-button'
import { GlobalOutlined } from "@ant-design/icons";
import { useNavigate,useLocation,useParams } from 'react-router-dom';
import logo from "../../assets/logo.svg";
import {languageSlice} from '../../redux/language/slice'
import { useDispatch } from 'react-redux';
//使用useDispatch钩子获取到dispatch方法，并且根据需要dispatch actions
import { useTranslation } from 'react-i18next';
import { useSelector } from "../../redux/hooks";
import jwt_decode,{JwtPayload as DefaultJwtPayload} from 'jwt-decode'
import {userSlice} from '../../redux/user/slice'


interface JwtPayload extends DefaultJwtPayload{
  username:string; 
}

export const Header:React.FC = () => {
  const navigate =useNavigate();
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) =>state.language.languageList);
  // Expected an assignment or function call and instead saw an expression  @typescript-eslint/no-unused-expressions
  // if use arrow function with {}
  //使用useSelector钩子从store中读数据
//为什么这里是state.language.language

  const dispatch = useDispatch()
  const { t } = useTranslation();
  const jwt = useSelector(s=>s.user.token)
  const [username, setUsername] = useState('');

  const shoppingCartItems = useSelector(s => s.shoppingCart.items)
  const shoppingCartLoading = useSelector(s => s.shoppingCart.loading)

  useEffect(() => { 
    if(jwt){
      const token = jwt_decode<JwtPayload>(jwt);
      setUsername(token.username);
    }
   },[jwt]);

  const menuClickHandler = (e) => {
    console.log(e)
    dispatch(languageSlice.actions.changeLanguage(e.key))
    console.log(languageList)
    //payload is the key 
  }

  const onLogout = () => {
    dispatch(userSlice.actions.logOut())
    navigate("/")}
  //changeLanguage is the i18n 命令
  //this is a onclick function for changing the language

  
  // const langItems = () => {
  //   return[
  //     ...languageList.map((l) => {
  //       return { key: l.code, label: l.name };
  //     })]
  // }




  return (
    <div className={styles["app-header"]}>
    {/* header wrapper  */}
      <div className={styles["top-header"]}>
      {/* first line of the header wrapper*/}
        <div className={styles.inner}>
        {/* first line of the header */}
          <div className={styles.leftside}>
            {/* first line left side */}
            <Typography.Text>{t('header.slogan')}</Typography.Text>
            <Dropdown.Button 
            style={{ marginLeft: 15 }}
            overlay={
              <Menu 
              onClick={menuClickHandler}
              items={[
                ...languageList.map((l) => {
                  return { key: l.code, label: l.name };
                })
                //use ... to 遍历 [{},{}]
              ]
              }   
            />} 
            icon = {<GlobalOutlined />} 
            >
            {language === "en" ? "English": "中文" }
            </Dropdown.Button>
            
          </div>

          {jwt ? (
            <Button.Group className={styles["button-group"]}>
              <span>
                {t("header.welcome")} &nbsp;
                <Typography.Text strong>{username}&nbsp; </Typography.Text>
              </span>
              <Button 
                loading = {shoppingCartLoading}
                onClick={()=>{
                navigate('/shoppingCart')}}>
                {t("header.shoppingCart")}
                ({shoppingCartItems.length})
                </Button>
              <Button onClick={onLogout}>{t("header.signOut")}</Button>
            </Button.Group>
          ) : (
          <Space className={styles["button-group"]}>
            <Button onClick={()=> {navigate('./signin')} }>{t('header.signin')}</Button>
            <Button onClick={()=>{navigate('./register')} }>{t('header.register')}</Button>
          </Space>)}
        </div>
      </div>
      <Layout.Header className={styles["main-header"]}>
        {/* second line of the header */}
        <span onClick={()=>{navigate('/')}}>
            {/* remember navigate('/') */}
          <img src={logo} alt="logo" className={styles["App-logo"]}  />
          <Typography.Title level={3} className={styles.title}>
          {t("header.title")}
          </Typography.Title>
        </span>

        <Input.Search
          placeholder={"enter to search"}
          className={styles["search-input"]}
          onSearch={(keywords) => navigate("/search/" + keywords)}
        />
      </Layout.Header>
      
      {/* third line of the header */}
        <Menu 
        mode={"horizontal"}
        className={styles["main-menu"]}
        items={[
          { key: "1", label: t("header.home_page") },
          { key: "2", label: t("header.weekend") },
          { key: "3", label: t("header.group") },
          { key: "4", label: t("header.backpack") },
          { key: "5", label: t("header.private") },
          { key: "6", label: t("header.cruise")},
          { key: "7", label: t("header.hotel") },
          { key: "8", label: t("header.local") },
          { key: "9", label: t("header.theme") },
          { key: "10", label: t("header.custom") },
          { key: "11", label: t("header.study") },
          { key: "12", label: t("header.visa")},
          { key: "13", label: t("header.enterprise") },
          { key: "14", label: t("header.high_end") },
          { key: "15", label: t("header.outdoor") },
          { key: "16", label: t("header.insurance") },
        ]}/>
    </div>
  )
}
