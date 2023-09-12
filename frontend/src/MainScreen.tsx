import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import MultiActionAreaCard from "./Card";
import { createAPIEndpoint } from "./API/API";
import ClearIcon from "@mui/icons-material/Clear";

function MainScreen() {
  const [file, setFile] = useState({} as any);

  const [prediction, setPrediction] = useState("Loading...");
  const [confidence, setConfidence] = useState(0);

  const [imageFileG, setImageFileG] = useState({} as any);

  useEffect(() => {}, [file, prediction, confidence, imageFileG]);

  const predict = useCallback(
    async (imageFile: any) => {
      const formData = new FormData();
      formData.append("file", imageFile);
      createAPIEndpoint("predict")
        .post(formData)
        .then((r) => {
          setConfidence(r.data.confidence);
          setPrediction(r.data.class);
        })
        .catch((err) => console.log(err));
    },
    [file]
  );

  const handleInputImage = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      setFile(e.target.files[0]);
      let formValues = {};
      const reader = new FileReader();

      reader.onload = (x) => {
        setImageFileG({ imageFile: imageFile, image: x.target?.result });
        formValues = { file: x.target?.result };
      };
      reader.readAsDataURL(imageFile);
      predict(imageFile);
    }
  };

  return (
    <>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={2}
      >
        <Typography variant='h3'>Potato Disease Classification</Typography>
        {imageFileG.image && (
          <MultiActionAreaCard
            confidence={confidence}
            image={imageFileG.image}
            prediction={prediction}
          />
        )}

        <Stack spacing={1} direction={"row"}>
          <Avatar variant='rounded' src={imageFileG.image}>
            <EnergySavingsLeafIcon />
          </Avatar>
          <Button
            startIcon={<PhotoCamera />}
            variant='contained'
            component='label'
          >
            Upload Image
            <input
              hidden
              name='image'
              accept='image/*'
              type='file'
              onChange={handleInputImage}
            />
          </Button>
          {imageFileG.imageFile && (
            <Button startIcon={<ClearIcon />} onClick={() => setImageFileG("")}>
              Clear
            </Button>
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default MainScreen;
