import { Spin } from 'antd';

const Loading = () => (
  <div style={{ display:'flex', height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center' }}>
    <Spin size={'large'}/>
  </div>
);

export default Loading;