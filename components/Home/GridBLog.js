import React from "react";
import {
  GridContainer,
  Title,
  Grid,
  Card,
  CardImage,
  CardOverlay,
  CardTitle,
} from "./GridBlog.styles";
import Link from "next/link";
import { tourTypeOption } from "../../utils";

const selectedTourIds = [101, 103, 105, 107, 110, 112, 114, 117];
const allTours = tourTypeOption
  .flatMap((option) => option.category)
  .flatMap((category) => category.tours);
const selectedTours = selectedTourIds
  .map((id) => allTours.find((tour) => tour.id === id))
  .filter(Boolean);

export default function GridBlog() {
  return (
    <GridContainer className="container">
      <Title>Featured Tours</Title>
      <Grid>
        {selectedTours.map((tour) => {
          const slug = tour.value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
          return (
            <Link
              key={tour.id}
              href={`/indian-tour/${tour.id}-${slug}`}
              className="link_url"
              passHref
            >
              <Card>
                <CardImage
                  style={{ backgroundImage: `url(${tour.coverImage})` }}
                />
                <CardOverlay>
                  <CardTitle>{tour.value}</CardTitle>
                </CardOverlay>
              </Card>
            </Link>
          );
        })}
      </Grid>
    </GridContainer>
  );
}
