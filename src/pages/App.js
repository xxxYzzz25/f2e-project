import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Spin, Table, Input } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getRepositories } from '../store/data/actions.js';

const App = ({ className, getRepositories, list, total, pending }) => {
  const [state, setState] = useState({
    name: '',
    searchText: '',
    searchedColumn: '',
    currentLanguage: '',
    defaultPageSize: 10,
    current: 1,
  });

  useEffect(() => {
    getRepositories({
      name: '',
      language: state.currentLanguage,
      sort: 'desc',
      current: state.current,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = [
    {
      title: 'language',
      dataIndex: 'language',
      key: 'language',
      filterMuliple: false,
      filters: [
        { text: 'JavaScript', value: 'JavaScript' },
        { text: 'TypeScript', value: 'TypeScript' },
        { text: 'Python', value: 'Python' },
        { text: 'Java', value: 'Java' },
        { text: 'C', value: 'C' },
        { text: 'Swift', value: 'Swift' },
        { text: 'Go', value: 'Go' },
        { text: 'Dart', value: 'Dart' },
        { text: 'PHP', value: 'PHP' },
        { text: 'HTML', value: 'HTML' },
      ],
      render: (text, record) => {
        return text == null ? 'assembly' : text;
      },
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'stars',
      dataIndex: 'stargazers_count',
      key: 'stargazers_count',
      showSorterTooltip: false,
      sorter: (a, b) => a.stargazers_count - b.stargazers_count,
    },
  ];
  const handleTableChange = (pagination, filters, sorter) => {
    let language = '';
    filters.language ? (language = filters.language[0]) : (language = '');
    setState({
      ...state,
      current: pagination.current,
      currentLanguage: filters.language,
    });
    getRepositories({
      name: state.name,
      language: language,
      sort: sorter.order,
      current: pagination.current,
    });
  };

  const { Search } = Input;
  const onSearch = (value) => {
    setState({
      ...state,
      name: value,
    });
    getRepositories({
      name: value,
      language: state.currentLanguage,
      sort: 'desc',
      current: state.current,
    });
  };

  return (
    <div className={className}>
      <Search placeholder='Search Repo Name' onSearch={onSearch} enterButton className='search' />
      <Spin spinning={pending}>
        <Table
          columns={columns}
          dataSource={list}
          rowKey={(record) => record.id}
          className='certListTable'
          pagination={{
            defaultCurrent: 1,
            pageSize: state.defaultPageSize,
            total: total,
            showSizeChanger: false,
          }}
          onChange={handleTableChange}
        />
      </Spin>
    </div>
  );
};

const styledApp = styled(App)`
  width: 80%;
  margin: 0 auto;
  padding: 2%;
  box-shadow: 0 0 5px 2px #ccc;
  .search {
    margin-bottom: 3%;
  }
`;

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getRepositories,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(styledApp);
