## 按钮
<Button type="primary">点我！</Button>

```jsx
<Button type="primary">点我！</Button>
```

## 按钮链接

<Button style={{
  height: '',
  padding: '',
  fontSize: '16px',
  marginBottom: 'px',
  background: '#ff142b',
  borderColor: '#ff0070',
}} type="primary" size="large" shape="round">
  <a href='https://mp.toutiao.com/profile_v3_public/pgc_public/service/feedback?source=xigua' rel="noopener noreferrer" target="_blank">
        🍉呼叫西瓜君
    </a>
</Button>

```
<Button style={{
  height: '',
  padding: '',
  fontSize: '16px',
  marginBottom: 'px',
  background: '#ff142b',
  borderColor: '#ff0070',
}} type="primary" size="large" shape="round">
  <a href='https://mp.toutiao.com/profile_v3_public/pgc_public/service/feedback?source=xigua' rel="noopener noreferrer" target="_blank">
        🍉呼叫西瓜君
    </a>
</Button>
```

## 图标
<Icon type="play-circle" />

```
<Icon type="play-circle" />
```

## 轮播图

<Carousel autoplay>
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
</Carousel>
```
<Carousel autoplay>
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
</Carousel>
```

## 进度

<Progress type="circle" percent={60} />

```
<Progress type="circle" percent={60} />
```

## 时间轴

<Timeline>
    <Timeline.Item>视频云官网上线 2018-06-01</Timeline.Item>
    <Timeline.Item>视频云官网后台上线 2018-06-20</Timeline.Item>
    <Timeline.Item>视频云控制台一期上线 2018-09-01<p style={noteStyle}>note</p></Timeline.Item>
    <Timeline.Item color="red">未完待续</Timeline.Item>
</Timeline>

```
<Timeline>
    <Timeline.Item>视频云官网上线 2018-06-01</Timeline.Item>
    <Timeline.Item>视频云官网后台上线 2018-06-20</Timeline.Item>
    <Timeline.Item>视频云控制台一期上线 2018-09-01<p style={noteStyle}>note</p></Timeline.Item>
    <Timeline.Item color="red">未完待续</Timeline.Item>
</Timeline>
```

## 横向轴

<Steps current={3}>
    <Steps.Step title="2018-8-7" />
    <Steps.Step title="2018-8-8" />
    <Steps.Step title="2018-8-9" />
    <Steps.Step title="2018-8-10" />
</Steps>

```
<Steps current={3}>
    <Steps.Step title="2018-8-7" />
    <Steps.Step title="2018-8-8" />
    <Steps.Step title="2018-8-9" />
    <Steps.Step title="2018-8-10" />
</Steps>
```

## 星级评分

<Rate style={{padding:0}} disabled defaultValue={4} />

```
<Rate style={{padding:0}} disabled defaultValue={4} />
```

## 卡片

<Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png?width=606&height=758" />}
    >
    <Card.Meta
      title="卡片标题"
      description="卡片备注"
    />
</Card>

```
<Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png?width=606&height=758" />}
    >
    <Card.Meta
      title="卡片标题"
      description="卡片备注"
    />
</Card>
```
   
## 折叠面板

### 简写版
<Collapse bordered={false} defaultActiveKey={['1']}>
    <Collapse.Panel header="1号面板" key="1">
      嘿嘿嘿
    </Collapse.Panel>
    <Collapse.Panel header="2号面板" key="2">
      嘻嘻嘻
    </Collapse.Panel>
    <Collapse.Panel header="3号面板" key="3">
      哈哈哈
    </Collapse.Panel>
</Collapse>
```
<Collapse bordered={false} defaultActiveKey={['1']}>
    <Collapse.Panel header="1号面板" key="1">
      嘿嘿嘿
    </Collapse.Panel>
    <Collapse.Panel header="2号面板" key="2">
      嘻嘻嘻
    </Collapse.Panel>
    <Collapse.Panel header="3号面板" key="3">
      哈哈哈
    </Collapse.Panel>
</Collapse>
```

## 标签页

<Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Tab 1" key="1">1号内容</Tabs.TabPane>
    <Tabs.TabPane tab="Tab 2" key="2">2号内容</Tabs.TabPane>
    <Tabs.TabPane tab="Tab 3" key="3">3号内容</Tabs.TabPane>
</Tabs>  

```
<Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Tab 1" key="1">1号内容</Tabs.TabPane>
    <Tabs.TabPane tab="Tab 2" key="2">2号内容</Tabs.TabPane>
    <Tabs.TabPane tab="Tab 3" key="3">3号内容</Tabs.TabPane>
</Tabs>  
```
        
## 提示

<Alert 
   message="成功"
   description="success"
   type="success"
   showIcon>
</Alert>


## 分割线

<Divider>华丽的分割线</Divider>
```
<Divider>华丽的分割线</Divider>
```

## 自定义布局

<Row>
  <Col span={12}>左边12列</Col>
  <Col span={12}>右边12列~~~~</Col>
</Row>
```
<Row>
  <Col span={12}>左边12列</Col>
  <Col span={12}>右边12列~~~~</Col>
</Row>
```