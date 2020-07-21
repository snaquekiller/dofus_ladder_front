import React from 'react';
import styled from 'styled-components';
import { Button, Form, FormControl, Card } from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

import Loader from 'react-loader-spinner';
import CompareService from '../service/CompareService.jsx';

const PanelForm = styled.div`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
`;
export default class GraphCompare extends React.Component {
  constructor(_props) {
    super(_props);
    this.state = {
      hide: ['name'],
      name: '',
      loading: false,
      colors: [
        '#003f5c',
        '#2f4b7c',
        '#665191',
        '#a05195',
        '#d45087',
        '#f95d6a',
        '#ff7c43',
        '#ffa600',
        '#003f1d',
        '#2f4b1d',
        '#66511d',
        '#a0511d',
        '#d4501d',
        '#f95d1d',
        '#ff7c1d',
        '#ffa61d',
        '#003f7e',
        '#2f4b7e',
        '#66517e',
        '#a0517e',
        '#d4507e',
        '#f95d7e',
        '#ff7c7e',
        '#ffa67e'
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.changeName = this.changeName.bind(this);
    this.scrap = this.scrap.bind(this);
    this.dataFormater = this.dataFormater.bind(this);
  }

  handleChange(_e) {
    this.setState({ url: _e.target.value });
  }

  changeName(_e) {
    this.setState({ name: _e.target.value });
  }

  scrap() {
    if (this.state.name) {
      this.setState({
        loading: true
      });
      CompareService.compare(this.state.name).then(_mangaGet => {
        this.setState({
          data: _mangaGet.data,
          loading: false
        });
      });
    }
  }

  dataFormater(_number) {
    if (_number > 1000000000) {
      return `${(_number / 1000000000).toString()}B`;
    }
    if (_number > 1000000) {
      return `${(_number / 1000000).toString()}M`;
    }
    if (_number > 1000) {
      return `${(_number / 1000).toString()}K`;
    }
    return _number.toString();
  }

  render() {
    const keys = [];
    const {
      data, name, loading, hide, colors
    } = this.state;
    if (data) {
      data.map(_data => Object.keys(_data)
        .map(_key => _key)
        .forEach(_keyName => {
          if (!keys.includes(_keyName) && _keyName !== 'name') {
            keys.push(_keyName);
          }
        }));
      console.log('keys', keys);
    }
    return (
      <div>
        <Card>
          <PanelForm>
            <Form>
              <FormControl
                type="text"
                width="500px"
                placeholder="Pseudo"
                onChange={this.changeName}
                value={name}
              />
              <Button
                bsStyle="primary"
                disabled={loading}
                onClick={this.scrap}
              >
                Graph Me !!
              </Button>
            </Form>
          </PanelForm>
        </Card>
        {loading && (
          <Card>
            <Loader type="Circles" color="#00BFFF" height="100" width="100" />
          </Card>
        )}
        {!loading && data && (
          <Card>
            <LineChart
              width={1500}
              height={700}
              data={data}
              margin={{
                top: 100,
                right: 30,
                left: 100,
                bottom: 5
              }}
            >
              <XAxis dataKey="name" />
              <YAxis type="number" tickFormatter={this.dataFormater} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip
                formatter={value => new Intl.NumberFormat('en').format(value)}
              />
              <Legend onClick={_data => console.log('data', _data)} />
              {keys.map((key, i) => {
                if (!hide.includes(key)) {
                  return (
                    <Line
                      key={key}
                      type="linear"
                      dot={false}
                      dataKey={key}
                      stroke={colors[i]}
                      activeDot={{ r: 5 }}
                    />
                  );
                }
                return null;
              })}
            </LineChart>
          </Card>
        )}
      </div>
    );
  }
}
