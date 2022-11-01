import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { differenceInMilliseconds, isBefore } from "date-fns";
import React, { useState } from "react";
import { useEffect } from "react";
import useSWR from "swr";
import TickingChip from "./TickingChip";

const fetcher = url => fetch(url).then(res => res.json());

const VotePercentage = () => {
  const votingEnds = new Date("2022-11-01T13:54:20");
  const [votingActive, setActive] = useState(isBefore(new Date(), votingEnds));

  useEffect(() => {
    if (!votingActive) return;
    const id = setTimeout(() => {
      setActive(false);
    }, differenceInMilliseconds(votingEnds, new Date()));
    return () => clearTimeout(id);
  }, [votingActive, setActive]);

  const { data } = useSWR("/api/voting_activity", fetcher, {
    refreshInterval: 30 * 60 * 1000 // 30 minutes
  });

  if (!votingActive) return null;

  return (
    <Box
      sx={{
        borderColor: "#fff500",
        borderWidth: "4px",
        borderStyle: "solid",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        width: "calc(50vw - 1rem)",
        bottom: "1rem",
        left: "1rem",
        backgroundColor: "#303030"
      }}
    >
      <TickingChip
        end={votingEnds}
        sx={{
          position: "absolute",
          left: "1rem",
          backgroundColor: "#fff500",
          color: "black"
        }}
      />
      <Typography variant="h2" sx={{ fontSize: "48px" }}>
        Vote: vaalit.hyy.fi
      </Typography>
      <Typography variant="h3" sx={{ fontSize: "36px" }}>
        31.10.-2.11.
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "4rem",
          textAlign: "center"
        }}
      >
        <Box>
          <Typography>Total voter turnout</Typography>{" "}
          <Typography>{data?.total}%</Typography>
        </Box>
        <Box>
          <Typography>Matlu voter turnout</Typography>{" "}
          <Typography>{data?.faculty}%</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VotePercentage;
