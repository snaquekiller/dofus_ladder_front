import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Panel from 'react-bootstrap/lib/Panel';
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
  constructor(props) {
    super(props);
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

  handleChange(e) {
    this.setState({ url: e.target.value });
  }

  changeName(e) {
    this.setState({ name: e.target.value });
  }

  scrap() {
    if (this.state.name) {
      this.setState({
        loading: true
      });
      CompareService.compare(this.state.name).then(mangaGet => {
        this.setState({
          data: mangaGet.data,
          loading: false
        });
      });
    }
  }

  dataFormater(number) {
    if (number > 1000000000) {
      return `${(number / 1000000000).toString()}B`;
    }
    if (number > 1000000) {
      return `${(number / 1000000).toString()}M`;
    }
    if (number > 1000) {
      return `${(number / 1000).toString()}K`;
    }
    return number.toString();
  }

  render() {
    const keys = [];
    const { data, name, loading, hide, colors } = this.state;
    if (data) {
      data.map(data => Object.keys(data)
        .map(key => key)
        .forEach(keyName => {
          if (!keys.includes(keyName) && keyName !== 'name') {
            keys.push(keyName);
          }
        }));
      console.log('keys', keys);
    }
    return (
      <div>
        <Panel>
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
        </Panel>
        {loading && (
          <Panel>
            <Loader type="Circles" color="#00BFFF" height="100" width="100" />
          </Panel>
        )}
        {!loading && data && (
          <Panel>
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
              <Legend onClick={data => console.log('data', data)} />
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
              })}
            </LineChart>
          </Panel>
        )}
      </div>
    );
  }
}
