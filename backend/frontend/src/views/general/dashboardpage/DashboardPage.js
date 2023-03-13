import React, { useState, useEffect, useRef } from 'react';

import { useParams, Link, withRouter, Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Container,
  Col,
  Collapse,
} from "reactstrap";
import axios from 'axios';
import { signin, authenticate, isAuthenticated } from 'auth/index';
import PropagateLoader from "react-spinners/PropagateLoader";

//redux
import { useSelector, useDispatch } from 'react-redux'
import { getCarDataFunc } from 'redux/features/cardata/cardataSlice'

function DashboardPage({ match, theme }) {
  //user
  const { user } = isAuthenticated()
  //spinner
  const [isdataloaded, setIsdataloaded] = useState(false);
  //redux
  const dispatch = useDispatch()
  const reduxcardata = useSelector((state) => state.cardata.value)

  async function init() {
    setIsdataloaded(false);
  }

  const getReduxCardDataByUnitTypeAndUnitId = async () => {
    if (reduxcardata.length == 0) {
      await dispatch(getCarDataFunc(user));
    }
  }

  useEffect(() => {
    if (reduxcardata.length > 0) {
      init();
    }
  }, [match]);

  useEffect(() => {
    if (reduxcardata.length > 0 && isdataloaded == false) {
      init();
    }
  }, [reduxcardata]);

  useEffect(() => {
    getReduxCardDataByUnitTypeAndUnitId();
  }, [])

  return (
    !isdataloaded ?
      <div style={{ width: '50%', marginTop: '30%' }}>
        <PropagateLoader color={'#ff4650'} loading={true} size={25} />
      </div>
      :
      <div>
        <Row>
          <Col xs={12} md={3} style={{ textAlign: 'right' }}>
          </Col>
          <Col xs={12} md={6}>
          </Col>
          <Col xs={12} md={3}>
          </Col>
        </Row>
      </div>
  );
}

export default withRouter(DashboardPage);