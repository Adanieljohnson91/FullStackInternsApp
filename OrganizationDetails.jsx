import React, { Component } from "react";
import organizationDetailsService from "../../services/organizationDetailsService";
import logger from "sabio-debug";
import PropTypes from "prop-types";
import OrgMemberCard from "./OrgMemberCard";
import OrgJobsCard from "./OrgJobsCard";

class OrganizationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdBy: this.props.location.state.createdBy,
      description: this.props.location.state.description,
      headline: this.props.location.state.headline,
      id: this.props.location.state.id,
      locationId: 0,
      logo: this.props.location.state.logo,
      name: this.props.location.state.name,
      openings: [],
      orgFollowers: [],
      orgMembers: [],
      organizationTypeId: "",
      phone: this.props.location.state.phone,
      siteUrl: this.props.location.state.siteUrl,
      jobs: false,
      followers: false,
      members: false,
    };
  }

  componentDidMount() {
    organizationDetailsService
      .selectById(this.state.id)
      .then(this.onGetOrganizationSuccess)
      .catch(this.onGetOrganizationError);
  }
  onGetOrganizationSuccess = (res) => {
    let org = res.item;
    this.setState((prevState) => {
      logger(org);
      return {
        ...prevState,
        createdBy: org.createdBy,
        description: org.description,
        headline: org.headline,
        id: org.id,
        locationId: org.locationId,
        logo: org.logo,
        name: org.name,
        openings: JSON.parse(org.openings).map(this.jobMapper),
        orgFollowers: JSON.parse(org.orgFollowers).map(this.orgMapper),
        orgMembers: JSON.parse(org.orgMembers).map(this.orgMapper),
        organizationTypeId: org.organizationTypeId,
        phone: org.phone,
        siteUrl: org.siteUrl,
      };
    });
  };
  onGetOrganizationError(err) {
    logger(err);
  }
  orgMapper = (member, index) => {
    return <OrgMemberCard member={member} key={index} />;
  };
  jobMapper = (job, index) => {
    return <OrgJobsCard opening={job} key={index} />;
  };
  jobButton = () => {
    this.setState((prevState) => ({ jobs: !prevState.jobs }));
  };
  followerButton = () => {
    this.setState((prevState) => ({ followers: !prevState.followers }));
  };
  membersButton = () => {
    this.setState((prevState) => ({ members: !prevState.members }));
  };
  render() {
    return (
      <>
        <div>
          <div className="p-4 text-center text-white bg-dark">
            <img
              className="img-thumbnail rounded-circle thumb128"
              src={this.state.logo}
              alt="Avatar"
            />
            <h3 className="m-0">{this.state.name}</h3>
            <p>{this.state.headline}</p>
          </div>
          <div className="text-center bg-gray-dark p-3 mb-4">
            <div className="row">
              <div className="br col-4">
                <h3 className="m-0">{this.state.orgMembers.length}</h3>
                <p className="m-0">
                  <span className="d-none d-md-inline">Company Size</span>
                </p>
              </div>
              <div className="br col-4">
                <h3 className="m-0">{this.state.openings.length}</h3>
                <p className="m-0">Job Openings</p>
              </div>
              <div className="col-4">
                <h3 className="m-0">{this.state.orgFollowers.length}</h3>
                <p className="m-0">Following</p>
              </div>
            </div>
          </div>

          <div className=" row">
            <div className="card card-default col-4">
              <div className="card-header">
                <a className="float-right">
                  <em className="icon-plus text-muted" />
                </a>
                <p className="text-center">Organization Members</p>
              </div>
              <ul className="list-group">
                {this.state.members === true
                  ? this.state.orgMembers
                  : this.state.orgMembers.slice(0, 5)}

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.membersButton}
                >
                  {this.state.members === true ? (
                    <p>View less</p>
                  ) : (
                    <p>View more</p>
                  )}
                </button>
              </ul>
            </div>
            <div className="card card-default col-4">
              <div className="card-header">
                <a className="float-right">
                  <em className="icon-plus text-muted" />
                </a>
                <p className="text-center">Job Openings</p>
              </div>
              <ul className="list-group">
                {this.state.jobs === true
                  ? this.state.openings
                  : this.state.openings.slice(0, 5)}

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.jobButton}
                >
                  {this.state.jobs === true ? (
                    <p>View less</p>
                  ) : (
                    <p>View more</p>
                  )}
                </button>
              </ul>
            </div>
            <div className="card card-default col-4">
              <div className="card-header">
                <a className="float-right">
                  <em className="icon-plus text-muted" />
                </a>
                <p className="text-center">Followers</p>
              </div>
              <ul className="list-group">
                {this.state.followers === true
                  ? this.state.orgFollowers
                  : this.state.orgFollowers.slice(0, 5)}

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.followerButton}
                >
                  {this.state.followers === true ? (
                    <p>View less</p>
                  ) : (
                    <p>View more</p>
                  )}
                </button>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}
OrganizationDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number,
      createdBy: PropTypes.number,
      headline: PropTypes.string,
      logo: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
      siteUrl: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }),
};
export default OrganizationDetails;
