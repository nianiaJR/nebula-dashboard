import { Col, Row } from 'antd';
import React from 'react';
import CustomServiceQueryPanel from '@assets/components/Service/CustomServiceQueryPanel';
import ServiceHeader from '@assets/components/Service/ServiceHeader';
import { IServicePanelConfig } from '@assets/utils/interface';
import StatusPanel from '@assets/components/StatusPanel';
import Icon from '@assets/components/Icon';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import intl from 'react-intl-universal';
import _ from 'lodash';
interface IProps extends RouteComponentProps {
  serviceType: string;
  icon: string;
  configs: IServicePanelConfig[],
  onConfigPanel: (serviceType: string, index: number)=>void;
}

class ServiceOverview extends React.PureComponent<IProps> {
  handleView = () => {
    const { serviceType } = this.props;
    this.props.history.push(`/service/${serviceType}-metrics`);
  }

  render () {
    const { 
      serviceType, 
      icon, 
      configs
    } = this.props;
    return (
      <div className="service-table-item">
        <ServiceHeader 
          title={`${serviceType} Service`}
          icon={icon}
        >
          <StatusPanel type={serviceType} />
          <div className="btn-icon-with-desc blue" onClick={this.handleView}>
            <Icon icon="#iconwatch" />
            <span>{intl.get('common.view')}</span>
          </div>
        </ServiceHeader>
        <Row>
          {configs.map((config, index) => <Col span={12} key={index}>
            <CustomServiceQueryPanel 
              config={config}
              onConfigPanel={() => this.props.onConfigPanel(serviceType, index)}
            />
          </Col>)}
        </Row>
      </div>
    );
  }
}

export default withRouter(ServiceOverview);