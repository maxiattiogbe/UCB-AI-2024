'use client';

import { useBoolean } from "@/hooks/use-boolean";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Image from "next/image";

export default function DefaultPage() {
    const isDialogOpened = useBoolean(true)
    return <main>
    <Dialog open={isDialogOpened.value} fullWidth maxWidth="sm">
      <DialogTitle>Test dialog</DialogTitle>
      <DialogContent>
        <Button onClick={isDialogOpened.onFalse}>Example button</Button>
      </DialogContent>
    </Dialog>
  </main>
}