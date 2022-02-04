import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Table, Modal, Input } from "antd";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Navbar from "./Navbar";
import Papa from "papaparse";
import CsvDownload from "react-json-to-csv";

const Home = ({logout}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingState, setEditingState] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [inputData, setInputData] = useState();

  const onAddItem = () => {
    if (inputData) {
      setDataSource((e) => {
        return [
          ...e,
          {
            code: e.length + 1,
            state: inputData,
          },
        ];
      });
    } else {
      Modal.error({
        title: "Error",
        content: "Please enter a state",
      });
    }
  };
  const onDeleteItem = (record) => {
    Modal.confirm({
      title: "Are you sure delete this item?",
      onOk: () => {
        setDataSource((e) => {
          return e.filter((item) => item.code !== record.code);
        });
      },
      okText: "Yes",
      okType: "danger",
    });
  };
  const onEditItem = (record) => {
    setIsEditing(true);
    setEditingState({ ...record });
  };
  const columns = [
    {
      id: "1",
      title: "Code",
      dataIndex: "code",
    },
    {
      id: "2",
      title: "State",
      dataIndex: "state",
    },
    {
      id: "3",
      title: "Action",
      render: (record) => {
        return (
          <>
            <AiOutlineEdit
              size="1.25em"
              style={{ marginLeft: 10, color: "blue", cursor: "pointer" }}
              onClick={() => {
                onEditItem(record);
              }}
            />
            <AiOutlineDelete
              size="1.25em"
              style={{ marginLeft: 10, color: "red", cursor: "pointer" }}
              onClick={() => {
                onDeleteItem(record);
              }}
            />
          </>
        );
      },
    },
  ];
  const resetEditing = () => {
    setIsEditing(false);
    setEditingState(null);
  };
  const handleUpload = (e) => {
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        complete: function (results) {
          results.data.map((e, index) => {
            return setDataSource((d) => {
              return [...d, { code: index + 1, state: e[0] }];
            });
          });
        },
      });
    }
  };
  return (
    <>
      <div className="App">
        <div className="App-header">
          <Navbar logout={logout}/>
          <br />
          <Input type="file" accept=".csv,.xlsx,.xls" onChange={handleUpload} />
          <Input
            placeholder="Enter State"
            onChange={(e) => setInputData(e.target.value)}
            style={{
              width: "50%",
              marginLeft: "25%",
            }}
          />
          <Button onClick={onAddItem} style={{ margin: 20 }}>
            Add New State
          </Button>
          <CsvDownload data={dataSource} filename="my-file.csv"/>
          <Table columns={columns} dataSource={dataSource} />
          <Modal
            title="Edit State"
            visible={isEditing}
            okText="Save"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              setDataSource((e) => {
                return e.map((item) => {
                  if (item.code == editingState.code) {
                    return editingState;
                  } else {
                    return item;
                  }
                });
              });
              resetEditing();
            }}
          >
            <Input
              type="text"
              placeholder="Enter State"
              value={editingState?.state}
              onChange={(e) => {
                setEditingState((state) => {
                  return { ...state, state: e.target.value };
                });
              }}
            />
            <Input
              type="text"
              placeholder="Enter Code"
              value={editingState?.code}
              onChange={(e) => {
                Modal.error({
                  title: "Error",
                  content: "Cannot edit code",
                });
              }}
            />
          </Modal>
          <br />
        </div>
      </div>
    </>
  );
};

export default Home;
