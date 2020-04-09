import React, { useState } from "react";
import PropTypes from "prop-types";
import CommentFormV2 from "./CommentFormV2";
import Replies from "./Replies";
import Swal from "sweetalert";
import * as profile from "../../services/userProfileService";

const CommentCard = (props) => {
  let pic = null;
  const profileImg = () => {
    profile
      .getById(117)
      .then(({ item }) => {
        pic = item.avatarUrl;
        return;
      })
      .catch(() => {
        return;
      });
  };
  profileImg();
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const view = () => {
    setReply(!reply);
  };
  const editToggle = () => {
    setEdit(!edit);
  };
  const handleDelete = (id) => {
    const options = {
      title: "Delete Comment",
      text: "Are you sure you want to delete this comment?",
      icon: "warning",
      buttons: {
        confirm: {
          value: "confirm",
          text: "Yes, I'm sure",
        },
        deny: {
          value: "deny",
          text: "Nevermind",
        },
      },
    };
    Swal(options).then((value) => {
      if (value === "confirm") {
        if (typeof id === "number") {
          props.handleDelete(id);
        } else {
          props.handleDelete(props.comment.id);
        }
      }
    });
  };
  const replyMapper = (reply, index) => {
    return (
      <Replies
        comment={reply}
        key={index}
        delete={handleDelete}
        edit={props.handleEdit}
        update={props.updateComment}
        user={props.user}
      />
    );
  };
  const mappedReplies = props.comment.replies.map(replyMapper);
  return (
    <>
      {edit === false ? (
        <div className="media">
          <img
            className="mr-3 rounded-circle thumb64"
            src={
              pic ||
              "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            }
            alt="Demo"
          />
          <div className="media-body">
            <h4 id="media-heading">{props.comment.subject}</h4>
            <p>{props.comment.text}</p>
            {reply === true ? (
              <>
                <div className="col container">{mappedReplies}</div>
                <CommentFormV2
                  reply={props.comment}
                  updateComment={props.updateComment}
                  editToggle={editToggle}
                  addComment={props.addComment}
                  view={view}
                />
              </>
            ) : (
              <div>
                <button
                  className="btn btn-primary btn-sm"
                  type="button"
                  onClick={view}
                >
                  View more/Reply
                </button>
              </div>
            )}
          </div>

          {props.comment.createdBy !== props.user.id ? (
            <div>
              <button className="btn btn-sm btn-primary" onClick={editToggle}>
                Edit
              </button>
              <button className="btn btn-sm btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      ) : (
        <CommentFormV2
          comment={props.comment}
          updateComment={props.updateComment}
          editToggle={editToggle}
        />
      )}
      <hr></hr>
    </>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string,
    subject: PropTypes.string,
    parentId: PropTypes.number,
    entityTypeId: PropTypes.number,
    entityId: PropTypes.number,
    createdBy: PropTypes.number,
    id: PropTypes.number,
    edit: PropTypes.bool,
    handleChange: PropTypes.func,
    avatarUrl: PropTypes.string,
    replies: PropTypes.arrayOf(
      PropTypes.shape({
        createdBy: PropTypes.number,
        entityId: PropTypes.number,
        entityTypeId: PropTypes.number,
        id: PropTypes.number,
        isDeleted: PropTypes.bool,
        parentId: PropTypes.number,
        subject: PropTypes.string,
        text: PropTypes.string,
      })
    ),
  }),
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  handleChange: PropTypes.func,
  updateComment: PropTypes.func,
  replies: PropTypes.func,
  addComment: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default CommentCard;
