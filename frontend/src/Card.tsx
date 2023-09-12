import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

type IMultiActionAreaCard = {
  image: any;
  prediction: string;
  confidence: number;
};

const MultiActionAreaCard = (props: IMultiActionAreaCard) => {
  return (
    <Card sx={{ width: 400, height: 400, borderRadius: 3 }}>
      <CardActionArea>
        <CardMedia component='img' height='300' image={props.image} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {props.prediction}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            confidence : {props.confidence * 100}%
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MultiActionAreaCard;
