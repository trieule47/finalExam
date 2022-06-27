import React from 'react'
import {List, Card, Row, Col} from 'antd';

export default function Lists(props) {
  return (
  <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 3,
      xxl: 3,
    }}
    dataSource={props.data}
    renderItem={(item) => (
      <List.Item>
        <Card title={item.country} style={{ minWidth: 300 }}>
          <img src="img_girl.jpg" alt="Girl in a jacket" />
        </Card>
      </List.Item>
    )}
  />
  )
}
