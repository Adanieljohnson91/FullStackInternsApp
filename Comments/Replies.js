import React, { useState } from "react";
import PropTypes from "prop-types";
import CommentFormV2 from "./CommentFormV2";
import * as profile from "../../services/userProfileService";

const Replies = (props) => {
  const [edit, setEdit] = useState(false);
  const editToggle = () => {
    setEdit(!edit);
  };
  let pic = null;
  const profileImg = () => {
    profile
      .getById(props.comment.createdBy)
      .then(({ item }) => {
        pic = item.avatarUrl;
        return;
      })
      .catch(() => {
        return;
      });
  };
  profileImg();
  const deleteId = () => {
    props.delete(props.comment.id);
  };
  if (edit === false) {
    return (
      <>
        <div className="border-dark">
          <div className="media border-primary">
            <img
              className="mr-3 rounded-circle thumb64 small"
              src={
                pic ||
                "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              }
              alt="Demo"
            />
            <div className="media-body">
              <h5 id="media-heading">{props.comment.subject}</h5>
              <p>{props.comment.text}</p>
            </div>

            {props.comment.createdBy !== props.user.id ? (
              <div>
                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={deleteId}
                >
                  delete
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={editToggle}
                >
                  edit
                </button>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <CommentFormV2
          updateComment={props.update}
          comment={props.comment}
          editToggle={editToggle}
        />
      </>
    );
  }
};
Replies.propTypes = {
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
  }),
  handleEdit: PropTypes.func,
  delete: PropTypes.func,
  handleChange: PropTypes.func,
  updateComment: PropTypes.func,
  update: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
};
export default Replies;
