import { Table, Flex, Tag, Tooltip } from 'antd';
import Icons from '../../Icons';

const data = [
  {
    key: '1',
    title: 'Sample Title 1',
    date: '2024-09-15',
    category: 'Category 1',
  },
  {
    key: '2',
    title: 'Sample Title 2',
    date: '2024-09-16',
    category: 'Category 2',
  },
];

const columns: any = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (text: string) => <Tag color='blue'>{text}</Tag>
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    render: () => (
      <Flex gap={8} justify="center" wrap>
        <button type='button'>
          <Tooltip title="Delete">
            <img 
              src={Icons.DeleteIcon}
              alt="delete-icon"
            />
          </Tooltip>
        </button>
        <button type="button">
          <Tooltip title="Edit">
            <img
              src={Icons.PencilIcon}
              alt="edit-icon"
            />
          </Tooltip>
        </button>
      </Flex>
    ),
  },
];

const TodoList = () => (
  <Table
    title={() => "Todo List"}
    columns={columns}
    dataSource={data} 
    bordered
  />
);

export default TodoList;
