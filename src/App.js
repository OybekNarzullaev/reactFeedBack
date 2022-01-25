import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import Header from "./components/Header";
import FeedbackData from "./data/FeedBackData";
import AboutPage from "./pages/AboutPage";
import { v4 } from "uuid";
import AboutIconLink from "./components/AboutIconLink";
import Post from "./components/Post";
import { FeedbackProvider } from "./context/FeedbackContext";
// import Card from "./components/shared/Card";

export default function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const addFeedback = (newFeedback) => {
    newFeedback.id = v4();
    setFeedback([newFeedback, ...feedback]);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?"))
      setFeedback(feedback.filter((item) => item.id !== id));
  };
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm handleAdd={addFeedback} />
                  <FeedbackStats feedback={feedback} />
                  <FeedbackList
                    feedback={feedback}
                    handleDelete={handleDelete}
                  />
                </>
              }
            ></Route>

            <Route path="/about" element={<AboutPage />} />
            <Route path="/post/*" element={<Post />} />
          </Routes>
          {/* <Card>
          <NavLink to="/" activeclassName="active">
            Home
          </NavLink>
          <NavLink to="/about" activeclassName="active">
            About
          </NavLink>
        </Card> */}
          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
}
// 22 66 13T 26
