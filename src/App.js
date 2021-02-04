import React from "react";
import { Layout, Menu, Row, Col, Divider } from "antd";
import "./App.css";
import DataTable from "./components/DataTable";
import tempIMG from "./assets/640-480.png";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">Settings</Menu.Item>
          <Menu.Item key="2">Dashboard</Menu.Item>
          <Menu.Item key="3">Map</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", height: "100vh" }}>
        <Divider orientation="left"></Divider>

        <div className="site-layout-content">
          <Row>
            <Col flex={2}>
              <div style={{ background: "##3CAEA3" }}>
                <DataTable />
              </div>
            </Col>
            <Col flex={4}>
              <div style={{ background: "#173F5F" }}>
                <Row style={{ alignContent: "center" }}>
                  <div>
                    <img src={tempIMG} alt="Empty img" />
                  </div>
                </Row>
                {/* <Row>
                  <DataTable />
                </Row> */}
              </div>
            </Col>
            <Col flex={2}>
              <div style={{ background: "#3CAEA3" }}>
                <DataTable />
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center", position: "sticky", bottom: "0" }}>
        Towed ROV, 2021 @andreasoie
      </Footer>
    </Layout>
  );
}
export default App;

//  <JsonHandler />
//<div><img src="http://localhost:8000/video" alt="nada" /></div>

/* <Grid container className={classes.root}>
  <Grid item className={classes.item}>
    A Hello
  </Grid>
  <Grid item className={classes.item}>
    B Hello
  </Grid>
  <Grid item className={classes.item}>
    C Hello
  </Grid>
</Grid> */
