import { Dispatch, SetStateAction, useState } from "react";
import { DocumentIcon, ImageIcon, StarIcon } from "../icons";

export default function TabComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}