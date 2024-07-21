

//הוק זה מאפשר ליצור דיאלוגים (חלונות קופצים) כדי להציג דיאלוג עם פרטי המוצר בצורה דינמית 

import { useCallback, useState } from "react";

export default function useDialogModal(Component) {
  const [open, setOpen] = useState(false);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const DialogComponent = useCallback(
    ({ ...props }) => {
      if (!open) return null;

      if (Component) {
        return (
          <Component open={open} onClose={() => setOpen(false)} {...props} />
        );
      }
    },
    [open, Component]
  );

  return [DialogComponent, openDialog];
}