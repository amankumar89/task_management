import { Table, Flex, Tag } from 'antd';
import Icons from '../../public/Icons';

// Sample data
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
  // Add more data as needed
];

const columns = [
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
    render: (text: string) => <Tag color='blue-inverse'>{text}</Tag>
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    render: () => (
      <Flex gap={4} justify="center">
        <button type='button'>
          <img src={Icons.DeleteIcon} alt="delete-icon" />
        </button>
        <button type="button">
          <img src={Icons.PencilIcon} alt="edit-icon" />
        </button>
      </Flex>
    ),
  },
];

const TodoList = () => (
  <Table columns={columns} dataSource={data} />
);

export default TodoList;
