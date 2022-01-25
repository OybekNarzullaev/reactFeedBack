import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

export default function Post() {
  const status = 200;
  const navigate = useNavigate();
  const onClick = () => {
    console.log("hello");
    navigate("/about");
  };

  if (status === 404) {
    return <Navigate to="/notfound" />;
  }
  // const param = useParams();
  return (
    <div>
      <h1>Post </h1>
      <button onClick={onClick}>Click</button>
      <Routes>
        {/* bu qachonki app.js dagi post/* da yulduzcha bo'lsa ishlaydi */}
        <Route path="/show" element={<h1>Salom</h1>} />
      </Routes>
    </div>
  );
}
