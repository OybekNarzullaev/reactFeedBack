import { createContext, useState } from "react";
import { v4 } from "uuid";
import FeedbackData from "../data/FeedBackData";

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // delete feedback
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?"))
      setFeedback(feedback.filter((item) => item.id !== id));
  };

  // add new feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = v4();
    setFeedback([newFeedback, ...feedback]);
  };

  // set to begin update feedback
  const editFeedBack = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  };

  // update feedback
  const updateFeedback = (id, updatedFeedback) => {
    setFeedback(
      feedback.map((item) =>
        id === item.id ? { ...item, ...updatedFeedback } : item
      )
    );
  };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        handleDelete,
        addFeedback,
        editFeedBack,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
