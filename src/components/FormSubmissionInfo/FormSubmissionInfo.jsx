import { Button } from "@mui/material";

export default function FormSubmissionInfo({ formSubmission }) {
  const {
    data: { firstName, lastName, email, liked },
  } = formSubmission;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          {firstName} {lastName}
        </div>
        <div>{email}</div>
      </div>
      <Button variant="text">Like</Button>
    </div>
  );
}
