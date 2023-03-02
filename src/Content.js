import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLikedFormSubmission } from "./providers/LikedFormSubmissionProvider";

export default function Content() {
  const { likedFormSubmissions } = useLikedFormSubmission();

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Typography variant="body1" sx={{ fontStyle: "italic", marginTop: 1 }}>
        {likedFormSubmissions.map((submission) => {
          return <div>submission</div>;
        })}
      </Typography>
    </Box>
  );
}
