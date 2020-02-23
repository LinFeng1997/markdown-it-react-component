## 时间轴

<Timeline>
    <Timeline.Item>1</Timeline.Item>
    <Timeline.Item>2</Timeline.Item>
    <Timeline.Item>3<p style={noteStyle}>note</p></Timeline.Item>
    <Timeline.Item color="red">4</Timeline.Item>
</Timeline>


## 横向轴

<Steps current={3}>
    <Steps.Step title="2018-8-7" />
    <Steps.Step title="2018-8-8" />
    <Steps.Step title="2018-8-9" />
    <Steps.Step title="2018-8-10" />
</Steps>

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

## 折叠面板

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