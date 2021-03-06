import * as APIUtil from "../util/api_util_group";
import { RECEIVE_QUESTION } from "./question_actions";
export const RECEIVE_GROUPS = "RECEIVE_GROUPS";
export const RECEIVE_GROUP = "RECEIVE_GROUP";
export const REMOVE_GROUP = "REMOVE_GROUP";
export const RECEIVE_GROUP_ERRORS = "RECEIVE_GROUP_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveGroups = (groups) => {
  return {
    type: RECEIVE_GROUPS,
    groups,
  };
};

const receiveGroup = (group) => {
  return {
    type: RECEIVE_GROUP,
    group,
  };
};

const removeGroup = (groupId) => {
  return {
    type: REMOVE_GROUP,
    groupId,
  };
};

const receiveGroupErrors = (errors) => {
  // debugger;
  return {
    type: RECEIVE_GROUP_ERRORS,
    errors,
  };
};

const receiveQuestion = (question) => {
  return {
    type: RECEIVE_QUESTION,
    question,
  };
};

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

/*
1. `requestGroups`
2. `requestGroup(groupId)`
3. `createGroup(group)`
4. `updateGroup(group)`
5. `deleteGroup(groupId)`
*/

export const requestGroups = () => (dispatch) => {
  return APIUtil.fetchGroups().then(
    (groups) => {
      groups.map((q) => q.questions.map((q) => dispatch(receiveQuestion(q))));
      return dispatch(receiveGroups(groups));
    },
    (er) => dispatch(receiveGroupErrors(er.responseJSON))
  );
};

export const requestGroup = (groupId) => (dispatch) => {
  return APIUtil.fetchGroup(groupId).then(
    (group) => dispatch(receiveGroup(group)),
    (er) => dispatch(receiveGroupErrors(er.responseJSON))
  );
};

export const createGroup = (group) => (dispatch) => {
  return APIUtil.createGroup(group).then(
    (group) => dispatch(receiveGroup(group)),
    (er) => dispatch(receiveGroupErrors(er.responseJSON))
  );
};

export const updateGroup = (group) => (dispatch) => {
  return APIUtil.updateGroup(group).then(
    (group) => dispatch(receiveGroup(group)),
    (er) => dispatch(receiveGroupErrors(er.responseJSON))
  );
};

export const deleteGroup = (groupId) => (dispatch) => {
  return APIUtil.deleteGroup(groupId).then(
    () => dispatch(removeGroup(groupId)),
    (er) => dispatch(receiveGroupErrors(er.responseJSON))
  );
};
