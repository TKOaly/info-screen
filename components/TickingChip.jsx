import Chip from "@mui/material/Chip";
import { differenceInSeconds } from "date-fns";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const padZero = num => num.toString().padStart(2, "0");
const formatCountdown = diff => {
  if (diff < 0) return false;

  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff - days * 86400) / 3600);
  const minutes = Math.floor((diff - days * 86400 - hours * 3600) / 60);
  const seconds = diff - days * 86400 - hours * 3600 - minutes * 60;

  let str = "";
  if (days > 0) str += `${days}d `;
  if (hours > 0) str += `${padZero(hours)}:`;
  str += `${padZero(minutes)}:`;
  str += `${padZero(seconds)}`;

  return str;
};

const useTickingLabel = targetDate => {
  // To match SSR and hydration, use actual dates only after loaded
  const [label, setLabel] = useState("soon");

  useEffect(() => {
    const interval = setInterval(() => {
      const newLabel = formatCountdown(
        differenceInSeconds(targetDate, new Date())
      );
      if (newLabel) {
        setLabel(newLabel);
      }
    }, 1000);

    return () => clearTimeout(interval);
  }, [targetDate, setLabel]);

  return [label];
};

const TickingChip = ({ end, prefix, ...props }) => {
  const [label] = useTickingLabel(end);
  if (!label) {
    return null;
  }

  return <Chip {...props} label={`${prefix}${label}`} />;
};

export default TickingChip;
