import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div>
      <h2>Page Not Found</h2>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default NotFound;
