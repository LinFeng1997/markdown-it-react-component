import { Button, Modal,Form,Input } from 'antd'
import React, { useState } from 'react'

function CustomButton (props) {
  const [showModal, setShowModal] = useState(false)
  const [children, setChildren] = useState(props.children)

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        setChildren(values.text);
        setShowModal(false);
      }
    });
  };
  const edit = () => {
    setShowModal(!showModal)
  }
  const { getFieldDecorator } = props.form;
  return <div>
    <Button {...props}>
      {children}
    </Button>
    <span onClick={edit}>Edit</span>
    <Modal visible={showModal} onOk={handleSubmit} onCancel={edit}>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item label="Text">
          {getFieldDecorator('text', {
            rules: [{ required: true, message: 'Please input your text!' }],
          })(
            <Input
              placeholder="text"
            />,
          )}
        </Form.Item>
      </Form>
    </Modal>
  </div>
}

export default Form.create({ name: 'horizontal_login' })(CustomButton);