import React, { Component } from "react";
// import * as services from "../../services/commentService";
import PropTypes from "prop-types";
import logger from "sabio-debug";

class CommentFormV2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: {
        text: "",
        subject: "",
        parentId: 0,
        entityTypeId: 1,
        entityId: this.props.entityId,
        createdBy: "",
        isDeleted: false,
      },
    };
  }

  componentDidMount = () => {
    if (this.props.comment) {
      logger(this.props.comment, "v2state");
      this.setState({
        comment: {
          id: this.props.comment.id,
          subject: this.props.comment.subject,
          entityId: this.props.comment.entityId,
          entityTypeId: this.props.comment.entityTypeId,
          createdBy: this.props.comment.createdBy,
          text: this.props.comment.text,
          parentId: this.props.comment.parentId,
          isDeleted: this.props.comment.isDeleted,
        },
      });
    } else if (this.props.reply) {
      this.setState({
        comment: {
          subject: this.props.reply.subject,
          entityId: this.props.reply.entityId,
          entityTypeId: this.props.reply.entityTypeId,
          createdBy: this.props.reply.createdBy,
          text: "",
          parentId: this.props.reply.id,
          isDeleted: this.props.reply.isDeleted,
        },
      });
    } else {
      this.setState({
        comment: {
          text: "",
          subject: this.props.user.name,
          parentId: 0,
          entityTypeId: 1,
          entityId: this.props.entityId,
          createdBy: this.props.user.id,
          isDeleted: false,
        },
      });
    }
  };

  updateComment = () => {
    this.props.editToggle();
    this.props.updateComment(this.state.comment);
    this.setState((prevState) => {
      return {
        comment: {
          ...prevState.comment,
          text: "",
        },
      };
    });
  };
  cancelComment = () => {
    this.props.editToggle();
  };
  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState((prevState) => {
      return {
        comment: {
          ...prevState.comment,
          [name]: value,
        },
      };
    });
  };
  addComment = () => {
    if (this.props.reply) {
      this.props.addComment(this.state.comment);
      this.setState((prevState) => {
        return {
          comment: {
            ...prevState.comment,
            text: "",
          },
        };
      });
    } else {
      this.props.post(this.state.comment);
      this.setState((prevState) => {
        return {
          comment: {
            ...prevState.comment,
            text: "",
          },
        };
      });
    }
  };
  render() {
    if (this.props.comment) {
      return (
        <>
          <div className="media">
            <img
              className="mr-3 rounded-circle thumb64"
              src={this.props.comment.avatarUrl}
              alt="Demo"
            />
          </div>
          <div className="card-body">
            <form className="form-horizontal">
              <div className="form-group row">
                <div className="col-6"></div>
                <div className="col-6"></div>
              </div>
              <div className="form-group row">
                <div className="col-12">
                  <textarea
                    className="form-control"
                    name="text"
                    rows={4}
                    value={this.state.comment.text}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-dark"
                    size="sm"
                    onClick={this.updateComment}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark"
                    size="sm"
                    onClick={this.cancelComment}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      );
    } else if (this.props.post) {
      return (
        <>
          <div className="card-body">
            <form className="form-horizontal">
              <div className="form-group row">
                <div className="col-6"></div>
                <div className="col-6"></div>
              </div>
              <div className="form-group row">
                <div className="col-12">
                  <textarea
                    className="form-control"
                    name="text"
                    rows={4}
                    value={this.state.comment.text}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-dark"
                    size="sm"
                    onClick={this.addComment}
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      );
    } else if (this.props.reply) {
      return (
        <>
          <div className="card-body">
            <form className="form-horizontal">
              <div className="form-group row">
                <div className="col-6"></div>
                <div className="col-6"></div>
              </div>
              <div className="form-group row">
                <div className="col-12">
                  <textarea
                    className="form-control"
                    name="text"
                    rows={4}
                    value={this.state.comment.text}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-dark"
                    size="sm"
                    onClick={this.addComment}
                  >
                    Post
                  </button>
                  <div>
                    <button
                      className="btn btn-sm btn-primary"
                      type="button"
                      onClick={this.props.view}
                    >
                      view less
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      );
    } else if (this.props.update) {
    }
  }
}
CommentFormV2.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string,
    subject: PropTypes.string,
    parentId: PropTypes.number,
    entityTypeId: PropTypes.number,
    entityId: PropTypes.number,
    createdBy: PropTypes.number,
    id: PropTypes.number,
    isDeleted: PropTypes.bool,
    avatarUrl: PropTypes.string,
  }),
  updateComment: PropTypes.func,
  editToggle: PropTypes.func,
  addComment: PropTypes.func,
  update: PropTypes.func,
  post: PropTypes.func,
  view: PropTypes.func,
  reply: PropTypes.shape({
    text: PropTypes.string,
    subject: PropTypes.string,
    parentId: PropTypes.number,
    entityTypeId: PropTypes.number,
    entityId: PropTypes.number,
    createdBy: PropTypes.number,
    id: PropTypes.number,
    isDeleted: PropTypes.bool,
  }),
  entityId: PropTypes.number,
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default CommentFormV2;
