import React, { Component } from "react";
import * as commentService from "../../services/commentService";
import CommentCard from "./CommentCard";
import PropTypes from "prop-types";
import CommentFormV2 from "./CommentFormV2";
import logger from "sabio-debug";

class Comments extends Component {
  state = {
    comments: [],
    mainComments: [],
    mainCommentsMapped: [],
    repliesArray: [],
    sortedArray: [],
    pageIndex: 0,
    pageSize: 100,
    totalCount: 0,
    totalPages: 0,
    nextPage: true,
    prevPage: false,
  };

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    commentService
      .getByEntity(this.props.entityId, 1)
      .then(this.onPaginateSuccess)
      .catch(this.onPaginateError);
  }
  onPaginateSuccess = ({ items }) => {
    const comments = items;
    const mainComments = comments.filter((comment) => comment.parentId === 0);
    const repliesArray = comments.filter((comment) => comment.parentId > 0);
    repliesArray.forEach((reply) => {
      reply.entityId = this.props.entityId;
      reply.entityTypeId = 1;
    });
    mainComments.forEach((parent) => {
      parent.entityId = this.props.entityId;
      parent.entityTypeId = 1;
      parent.replies = comments.filter(
        (comment) => comment.parentId === parent.id
      );
    });
    this.setState({
      mainCommentsMapped: mainComments.map(this.mapComment),
      mainComments,
      repliesArray,
    });
  };
  mapComment = (comment) => {
    return (
      <CommentCard
        comment={comment}
        key={comment.id}
        handleDelete={this.handleDelete}
        updateComment={this.updateComment}
        handleChange={this.handleChange}
        addComment={this.addComment}
        user={this.props.user}
      />
    );
  };
  addComment = (data) => {
    commentService.add(data).then(this.addSuccess).catch(this.addError);
  };
  addSuccess = () => {
    this.setState((prevState) => {
      return {
        comment: {
          ...prevState.comment,
          text: "",
        },
      };
    });
    this.getComments();
  };
  addError = (err) => {
    logger(err);
  };
  updateComment = (target) => {
    let data = {
      text: target.text,
      subject: target.subject,
      createdBy: target.createdBy,
      entityId: target.entityId,
      entityTypeId: target.entityTypeId,
      parentId: target.parentId,
      isDeleted: target.isDeleted,
      avatarUrl: target.avatarUrl,
    };
    commentService
      .update(data, target.id)
      .then(this.updateSuccess)
      .catch(this.updateError);
  };
  updateSuccess = (data) => {
    if (data.parentId === 0) {
      this.mainMapper(this.state.mainComments, data);
    } else {
      this.replyMapper(this.state.mainComments, data);
    }
  };
  replyMapper(array, data) {
    const mIndex = array.findIndex((singleComment) => {
      return singleComment.id === data.parentId;
    });
    const index = array[mIndex].replies.findIndex(
      (singleComment) => singleComment.id === data.id
    );
    let comments = [...array];
    comments[mIndex].replies[index].text = data.text;

    this.setState((prevState) => {
      return {
        ...prevState,
        comments,
        mainCommentsMapped: comments.map(this.mapComment),
      };
    });
  }
  mainMapper(array, data) {
    const index = array.findIndex(
      (singleComment) => singleComment.id === data.id
    );
    let comments = [...array];
    comments[index].text = data.text;

    this.setState((prevState) => {
      return {
        ...prevState,
        comments,
        mainCommentsMapped: comments.map(this.mapComment),
      };
    });
  }
  updateError = (err) => {
    logger(err);
  };
  handleDelete = (id) => {
    let index = this.state.mainComments.findIndex(
      (comment) => comment.id === id
    );
    let comments = [this.state.mainComments];
    delete comments[index];
    if (this.state.mainComments.length === 1) {
      this.setState({ mainCommentsMapped: [] });
    }
    commentService
      .deleteById(id)
      .then(this.deleteSuccess)
      .catch(this.deleteError);
  };
  deleteSuccess = () => {
    this.getComments();
  };
  deleteError = (err) => {
    logger(err);
  };

  render() {
    return (
      <div className="card">
        <div className="card-header">
          {this.state.mainCommentsMapped.length} Comments
        </div>
        <div className="card-body">
          {this.state.mainCommentsMapped &&
          this.state.mainCommentsMapped.length > 0
            ? this.state.mainCommentsMapped
            : "Start a conversation"}
        </div>

        <CommentFormV2
          post={this.addComment}
          entityId={this.props.entityId}
          user={this.props.user}
        />
      </div>
    );
  }
}

Comments.propTypes = {
  handleChange: PropTypes.func,
  entityId: PropTypes.number,
  currentUser: PropTypes.number,
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default Comments;
