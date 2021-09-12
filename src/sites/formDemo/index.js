import React, { memo, useCallback, useRef, useState } from "react";
import {
  MyForm,
  MyInput,
  MyLayout,
  MyEnumSelect,
  MyButton,
  MyRemoteSelect,
} from "../../framework";
import getEnums from "./enums/index";
import { getList } from "./services";
import api from "./config/api";
const { Item: FormItem, rules: rule } = MyForm;
const { required, maxLength, minLength, onlyNumber, numberTwo, number } = rule;
const { Row, Col } = MyLayout;
const selectEnum = getEnums("驾驶证");
export default memo(() => {
  const fromRef = useRef(null);
  const [form, setForm] = useState({
    select: [],
  });
  const { select, input } = form;
  const rules = {
    input: [required],
    select: [required],
  };
  const handleOnchange = useCallback((type) => (v) => {
    const value = v && v.target ? v.target.value : v;
    console.log(value);
    setForm((prev) => ({ ...prev, [type]: value }));
  });
  const handleSubmit = useCallback(async () => {
    const ff = await fromRef.current.validate();
    console.log(ff);
  }, [form]);
  const getData = async () => {
    const { state, results } = await getList({
      phone: "18460005575",
    });
    if (state === 200 && results) {
      console.log(results);
    }
  };
  return (
    <>
      <div style={{ textAlign: "center", fontSize: "25px", padding: "10px 0" }}>
        组件封装
      </div>
      <MyForm
        ref={fromRef}
        onSubmit={handleSubmit}
        rules={rules}
        model={form}
        labelWidth="100"
      >
        <Row>
          <Col span={12}>
            <FormItem label="猪只状态" prop="input">
              <MyInput value={input} onChange={handleOnchange("input")} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="猪只状态" prop="select">
              <MyEnumSelect
                value={select}
                enums={selectEnum}
                multiple={true}
                onChange={handleOnchange("select")}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="支持远程搜索">
              <MyRemoteSelect remoteUrl={api.getData.list1} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem>
            <MyButton type="primary" btnType="submit">
              提交
            </MyButton>
          </FormItem>
        </Row>
        <Row>
          <FormItem>
            <MyButton type="primary" onClick={() => getData()}>
              获取
            </MyButton>
          </FormItem>
        </Row>
      </MyForm>
    </>
  );
});
