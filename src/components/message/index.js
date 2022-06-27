import { Button, message } from 'antd';
const key = 'updatable';

const openMessage = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.success({
      content: 'Đăng ký thành công!',
      key,
      duration: 2,
    });
  }, 1000);
};

const App = () => (
  <Button type="primary" onClick={openMessage}>
    Open the message box
  </Button>
);

export default App;