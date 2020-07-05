import { useState, useCallback } from 'react';
import {
  Button, Layout, Icon, Input, Avatar,
} from 'antd';
import {
  GithubOutlined,
} from '@ant-design/icons';
import LINK from 'next/link';
import Container from './Container.jsx';

const { Header, Content, Footer } = Layout;

// 放在外面，可以避免每次生成同一个对象，造成重新渲染？
const githubIconStyle = {
  color: 'white',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20,
};

const footerStyle = {
  textAlign: 'center',
};

export default ({ children }) => {
  const [search, setSearch] = useState('');
  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value);
  }, [setSearch]);
  const handleOnSearch = useCallback(() => {

  });
  return (
    <Layout>
      <Header>
        <Container element={<div className="header-inner"></div>}>
          <div className="header-left">
            <div className="logo">
              <GithubOutlined style={githubIconStyle}/>
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              <Avatar size={40} icon="user"></Avatar>
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>
          {children}
        </Container>
      </Content>
      <Footer style={footerStyle}>
        Develop by shimengzhang @
        <a href="mailto:shimengzhang666@126.com">shimengzhang666@126.com</a>
      </Footer>
      <style jsx>{`
        .header-inner{
          display: flex;
          justify-content: space-between;
        }
        .header-left{
          display: flex;
          justify-content: flex-start;
        }
      `}</style>
      {/* 改 global 样式时，会影响热更新，刷新下就好 */}
      <style jsx global>{`
        #__next{
          height: 100%;
        }
        .ant-layout{
          height: 100%;
        }
        .ant-layout-header{
          paddingLeft: 0;
          paddingRight: 0
        }
      `}</style>
    </Layout>
  );
};
