import React from "react";
import { useParams } from "react-router-dom";

const JDStatusPage = () => {
  const { jdId } = useParams();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">JD Status Page</h1>
      <p className="mt-2">Showing status for JD ID: <strong>{jdId}</strong></p>
    </div>
  );
};

export default JDStatusPage;