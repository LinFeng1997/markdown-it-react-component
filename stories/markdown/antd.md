# Antd Example
usage:
```javascript
import MarkdownIt from 'markdown-it';
import { SupportReactComponent } from '../index';
import * as Antd from 'antd';

const md = new MarkdownIt({ highlight }).use(SupportReactComponent,{
  sandbox: {
    Antd
  },
});
```

## Button

### Input

```` js
``` rc
const { Button } = Antd;
const xss = () => {
  console.log('global methods is forbidden');
  alert('xss attack');
};
return (
    <div>
        <Button type="primary" onClick={xss}>
            Click me!
        </Button>
    </div>
);
```
````

<Antd.Button type="primary">
Simple React Component
</Antd.Button>
<Antd.Button type="primary">Simple React Component 2</Antd.Button>

### Output
``` rc
const { Button } = Antd;
const xss = () => {
  console.log('global methods is forbidden');
  alert('xss attack');
};
return (
    <div>
        <Button type="primary" onClick={xss}>
            Click me!
        </Button>
    </div>
);
```

## Icon

### Input
````js
``` rc
const Icon = Antd.Icon
return (
   <div>
      <Icon type="play-circle" />
      <Icon type="loading" />
      <Icon type="phone" />
   </div>
);
```
````

### OutPut
``` rc
const Icon = Antd.Icon
return (
   <div>
      <Icon type="play-circle" />
      <Icon type="loading" />
      <Icon type="phone" />
   </div>
);
```


## Carousel

### Input
````js
```rc
const { Carousel } = Antd
return (
  <Carousel autoplay>
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </Carousel>
)
```
````

### Output
``` rc
const { Carousel } = Antd
return (
  <Carousel autoplay>
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </Carousel>
)
```

## Progress

### Input

````js
```rc
const Progress = Antd.Progress
return (
   <div>
    <Progress type="circle" percent={60} />
   </div>
);
```
````

### Output

``` rc
const Progress = Antd.Progress
return (
   <div>
    <Progress type="circle" percent={60} />
   </div>
);
```


## Timeline

### Input
````js
```rc
const Timeline = Antd.Timeline
const noteStyle = {color:'grey',margin:0}
return (
   <div>
      <Timeline>
        <Timeline.Item>aaa</Timeline.Item>
        <Timeline.Item>bbb</Timeline.Item>
        <Timeline.Item>ccc<p style={noteStyle}>note</p></Timeline.Item>
        <Timeline.Item color="red">ddd</Timeline.Item>
      </Timeline>
   </div>
);
```
````

### Output
```rc
const Timeline = Antd.Timeline
const noteStyle = {color:'grey',margin:0}
return (
   <div>
      <Timeline>
        <Timeline.Item>aaa</Timeline.Item>
        <Timeline.Item>bbb</Timeline.Item>
        <Timeline.Item>ccc<p style={noteStyle}>note</p></Timeline.Item>
        <Timeline.Item color="red">ddd</Timeline.Item>
      </Timeline>
   </div>
);
```

## Steps

### Input
````js
```rc
const { Steps, Popover } = Antd;

const Step = Steps.Step;
const contents = ['1号内容','2号内容','3号内容','4号内容']

const customDot = (dot, { index }) => (
  <Popover content={contents[index]}>
    {dot}
  </Popover>
);
return (
   <div>
       <Steps current={3} progressDot={customDot}>
        <Step title="2018-8-7" />
        <Step title="2018-8-8" />
        <Step title="2018-8-9" />
        <Step title="2018-8-10" />
      </Steps>
   </div>
);
```
````

### Output

```rc
const { Steps, Popover } = Antd;

const Step = Steps.Step;
const contents = ['1号内容','2号内容','3号内容','4号内容']

const customDot = (dot, { index }) => (
  <Popover content={contents[index]}>
    {dot}
  </Popover>
);
return (
   <div>
       <Steps current={3} progressDot={customDot}>
        <Step title="2018-8-7" />
        <Step title="2018-8-8" />
        <Step title="2018-8-9" />
        <Step title="2018-8-10" />
      </Steps>
   </div>
);
```

## Rate

### Input
````js
```rc
const { Rate } = Antd
return (
   <div>
      <Rate style={{padding:0}} disabled defaultValue={4} /> 
   </div>
);
```
````

### Output
```rc
const { Rate } = Antd
return (
   <div>
      <Rate style={{padding:0}} disabled defaultValue={4} /> 
   </div>
);
```

## Card

### Input
````javascript
```rc
const { Card } = Antd
const { Meta } = Card
return (
   <div>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
        <Meta
          title="卡片标题"
          description="卡片备注"
        />
      </Card>
   </div>
);
```
````

### Output
```rc
const { Card } = Antd
const { Meta } = Card
return (
   <div>
    <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
    <Meta
      title="卡片标题"
      description="卡片备注"
    />
  </Card>
   </div>
);
```
        
## Collapse

### Input
````js
```rc
const { Collapse } = Antd;

const Panel = Collapse.Panel;

return (
   <div>
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header="1号面板" key="1">
          嘿嘿嘿
        </Panel>
        <Panel header="2号面板" key="2">
          嘻嘻嘻
        </Panel>
        <Panel header="3号面板" key="3">
          哈哈哈
        </Panel>
      </Collapse>
   </div>
);
```
````

### Output
```rc
const { Collapse } = Antd;

const Panel = Collapse.Panel;

return (
   <div>
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header="1号面板" key="1">
          嘿嘿嘿
        </Panel>
        <Panel header="2号面板" key="2">
          嘻嘻嘻
        </Panel>
        <Panel header="3号面板" key="3">
          哈哈哈
        </Panel>
      </Collapse>
   </div>
);
```

## Tabs

### Input
````js
```rc
const { Tabs } = Antd;

const TabPane = Tabs.TabPane;
return (
   <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tab 1" key="1">1号内容</TabPane>
        <TabPane tab="Tab 2" key="2">2号内容</TabPane>
        <TabPane tab="Tab 3" key="3">3号内容</TabPane>
       </Tabs>  
   </div>
);
```
````

### Output
```rc
const { Tabs } = Antd;

const TabPane = Tabs.TabPane;
return (
   <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tab 1" key="1">1号内容</TabPane>
        <TabPane tab="Tab 2" key="2">2号内容</TabPane>
        <TabPane tab="Tab 3" key="3">3号内容</TabPane>
       </Tabs>  
   </div>
);
```
        
## Alert

### Input
````js
```rc
const { Alert } = Antd
return (
   <div>
    <Alert
      message="成功"
      description="success"
      type="success"
      showIcon
    />
    <Alert
      message="信息"
      description="info"
      type="info"
      showIcon
    />
    <Alert
      message="警告"
      description="warning"
      type="warning"
      showIcon
    />
    <Alert
      message="error"
      description="error"
      type="error"
      showIcon
    />
   </div>
);
```
````

### Output
```rc
const { Alert } = Antd
return (
   <div>
    <Alert
      message="成功"
      description="success"
      type="success"
      showIcon
    />
    <Alert
      message="信息"
      description="info"
      type="info"
      showIcon
    />
    <Alert
      message="警告"
      description="warning"
      type="warning"
      showIcon
    />
    <Alert
      message="error"
      description="error"
      type="error"
      showIcon
    />
   </div>
);
```

## Divider

### Input
````js
```rc
const { Divider } = Antd
return (
   <div>
       <Divider>华丽的分割线</Divider>
   </div>
);
```
````

### Outpit
```rc
const { Divider } = Antd
return (
   <div>
       <Divider>华丽的分割线</Divider>
   </div>
);
```     

## Row&Col

### Input
````js
```rc
const { Row,Col } = Antd
return (
   <div>
        <Row>
          <Col span={12}>左边12列</Col>
          <Col span={12}>右边12列~~~~</Col>
        </Row>
   </div>
);
```
````

### Output
```rc
const { Row,Col } = Antd
return (
   <div>
        <Row>
          <Col span={12}>左边12列</Col>
          <Col span={12}>右边12列~~~~</Col>
        </Row>
   </div>
);
```