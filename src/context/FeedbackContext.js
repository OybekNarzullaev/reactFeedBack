import { createContext, useEffect, useState } from "react";

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  // fetch data
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`);
    const data = await response.json();
    setFeedback(data);
    setLoading(false);
  };
  // delete feedback
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?"))
      await fetch(`/feedback/${id}`, { method: "DELETE" });
    setFeedback(feedback.filter((item) => item.id !== id));
  };

  // add new feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch(`/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    setFeedback([data, ...feedback]);
  };

  // set to begin update feedback
  const editFeedBack = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  };

  // update feedback
  const updateFeedback = async (id, updatedFeedback) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFeedback),
    });

    const data = await response.json();
    setFeedback(
      feedback.map((item) => (id === item.id ? { ...item, ...data } : item))
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
        loading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
