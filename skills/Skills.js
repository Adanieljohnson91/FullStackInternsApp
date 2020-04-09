import React, { Component } from "react";
import * as service from "../../services/skillService";
import SkillCard from "./SkillCard";
import Select from "react-select";
import { catagoryOptions } from "./skillData";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import logger from "sabio-debug";
import logo from "./photos/Skill_center.png";
import "./skillCard.css";

class Skills extends Component {
  state = {
    skills: [],
    mappedSkills: [],
    catagory: catagoryOptions[0].label,
    pageIndex: 1,
    pageSize: 12,
    count: 0
  };

  componentDidMount() {
    this.getCatagory();
  }
  getCatagory = () => {
    service
      .getByCatagory(this.state.pageIndex, this.state.catagory)
      .then(res => {
        logger(res);
        this.setState(
          prevState => {
            return {
              ...prevState,
              skills: res.items.results,
              count: res.items.count
            };
          },
          () => {
            this.setState(prevState => {
              return {
                ...prevState,
                mappedSkills: this.state.skills.map(this.skillMapper)
              };
            });
          }
        );
      })
      .catch(err => {
        logger(err);
      });
  };
  onChange = e => {
    // const { value } = e.target;

    this.setState(
      {
        catagory: e.label
      },
      () => {
        service
          .getByCatagory(1, e.label)
          .then(res => {
            logger(res);
            this.setState(
              prevState => {
                return {
                  ...prevState,
                  skills: res.items.results,
                  count: res.items.count,
                  pageIndex: 1
                };
              },
              () => {
                this.setState(prevState => {
                  return {
                    ...prevState,
                    mappedSkills: this.state.skills.map(this.skillMapper)
                  };
                });
              }
            );
          })
          .catch(err => {
            logger(err);
          });
      }
    );
  };
  skillMapper = skill => {
    return <SkillCard results={skill} />;
  };
  onNextPage = page => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          pageIndex: page
        };
      },
      () => {
        service
          .getByCatagory(this.state.pageIndex, this.state.catagory)
          .then(res => {
            logger(res);
            this.setState(
              prevState => {
                return {
                  ...prevState,
                  skills: res.items.results,
                  count: res.items.count
                };
              },
              () => {
                this.setState(prevState => {
                  return {
                    ...prevState,
                    mappedSkills: this.state.skills.map(this.skillMapper)
                  };
                });
              }
            );
          })
          .catch(err => {
            logger(err);
          });
      }
    );
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="d-flex justify-content-center row">
            <img className="carousel-inner" alt="" src={logo} />
            <div className="col-6">
              <Select
                defaultValue={catagoryOptions[0]}
                name="colors"
                options={catagoryOptions}
                className=""
                classNamePrefix="select"
                onChange={this.onChange}
              /></div>
          </div>
        </div>
        <div className="row ml-1 mr-1 mt-2">{this.state.mappedSkills}</div>

        <div className="d-flex justify-content-center">
          <Pagination
            showSizeChanger
            onChange={this.onNextPage}
            defaultPageSize={12}
            defaultCurrent={this.state.pageIndex}
            current={this.state.pageIndex}
            total={this.state.count}
          />
        </div>
      </>
    );
  }
}
export default Skills;
