import React from "react";
import { Table, Tag, Space } from "antd";

const columns = [
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    width: 50,
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    width: 10,
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
    width: 20,
  },
];

const dataSource = [
  {
    key: "1",
    type: "Temperature",
    value: 32,
    unit: "degrees",
  },
  {
    key: "2",
    type: "Pressure",
    value: 2.3,
    unit: "bar",
  },
];

const DataTable = () => {
  // STUFF

  return <Table pagination={false} dataSource={dataSource} columns={columns} />;
};

export default DataTable;
