'use client';

import { useBoolean } from "@/hooks/use-boolean";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Image from "next/image";

export default function DefaultPage() {
    const isDialogOpened = useBoolean(true)
    return <main>
    <Dialog open={isDialogOpened.value} fullWidth maxWidth="sm">
      <DialogTitle>Test dialog</DialogTitle>
      <DialogContent>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button color="primary" variant="soft" onClick={isDialogOpened.onFalse}>Example button</Button>
      </DialogActions>
    </Dialog>
  </main>
}