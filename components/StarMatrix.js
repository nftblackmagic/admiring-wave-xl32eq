import React, { useEffect } from "react";
import classes from "./StarMatrix.module.css";
import Image from "next/image";
import { cloneDeep } from "lodash";

export const StarMatrix = () => {
  const isMobile = false;
  const rows = isMobile ? 8 : 24;
  const columns = 19;
  const [positions, setPositions] = React.useState([
    [1, 2],
    [3, 4],
  ]);

  const [running, setRunning] = React.useState(false);

  const stars = new Array(rows).fill(new Array(columns).fill(false));

  const [starsMatrix, setStarsMatrix] = React.useState(stars);

  useEffect(() => {
    const newStars = new Array(rows).fill(new Array(columns).fill(false));
    for (let i = 0; i < positions.length; i++) {
      const [x, y] = positions[i];
      const newRow = cloneDeep(newStars[x]);
      newRow[y] = true;
      newStars[x] = newRow;
    }
    // console.log(newStars);
    setStarsMatrix(newStars);
  }, [positions]);

  React.useEffect(() => {
    if (!running) {
      let a = 0;
      let b = columns / 2;
      const interval = setInterval(() => {
        let newPositions = [];
        for (let x = 0; x < rows; x++) {
          const y = a * x * x; // TODO: y = a* x^2
          if (y < columns - 1) {
            newPositions.push([x, Math.round(y)]);
          }
        }
        console.log(newPositions, a);
        setPositions(cloneDeep(newPositions));
        a = a > 0.2 ? 0 : a + 0.01; //TODO: a is changing over time
        // setB(b < 5 ? b + 1 : 0);
      }, 2000);
      setRunning(true);
    }
  }, [running]);

  return (
    <div className={classes.star}>
      {starsMatrix.map((row, rowIndex) => {
        return (
          <div className={classes.row} key={rowIndex}>
            {row.map((column, columnIndex) => {
              return (
                <div className={classes.column} key={columnIndex}>
                  <div className={classes.star}>
                    {starsMatrix[rowIndex][columnIndex] ? (
                      <Image
                        src={"/pai.svg"}
                        width={15}
                        height={15}
                        alt="star"
                      />
                    ) : (
                      <Image
                        src={"/star.svg"}
                        width={15}
                        height={15}
                        alt="star"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
