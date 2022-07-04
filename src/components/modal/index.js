import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import '../../App.css'
import Login from '../../pages/login'

const ModalApp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        className="MyM"
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Login />
      </Modal>
    </>
  )
}

export default ModalApp
