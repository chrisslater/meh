import React, { Component, PropTypes } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/info';

import styles from './Home.scss';
import logoImage from './logo.png';

@connect(
  state => ({info: state.info.data}),
  dispatch => bindActionCreators({load}, dispatch))
export default class Home extends Component {

  static propTypes = {
    info: PropTypes.object,
    load: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.load();
  }

  render() {
    const { info } = this.props;
    let siteName = config.app.title;
    let slogan = config.app.description;

    if (info) {
      siteName = info.site_name;
      slogan = info.slogan;
    }

    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{siteName}</h1>
            <h2>{slogan}</h2>
          </div>
        </div>
      </div>
    );
  }
}
