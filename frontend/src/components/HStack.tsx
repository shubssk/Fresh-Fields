import { Stack, StackProps } from "@mui/material";

export default function HStack(props: StackProps) {
  return (
    <Stack {...props} direction={"row"}>
      {props.children}
    </Stack>
  );
}
