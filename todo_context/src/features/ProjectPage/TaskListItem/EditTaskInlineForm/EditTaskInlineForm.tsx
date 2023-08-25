import { FC, useCallback } from "react";
import { EditToDoTaskFormValues, IToDoTask } from "../../../../types";
import { useTodo } from "../../../../hooks";
import { FormProvider, useForm } from "react-hook-form";
import { FormTextField } from "../../../../components/form";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

interface Props {
  task: IToDoTask;
  onCancel: () => void;
}

const EditTaskInlineForm: FC<Props> = ({ task, onCancel }) => {
  const { editTask } = useTodo();

  const formMethods = useForm<EditToDoTaskFormValues>({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  });

  const { handleSubmit } = formMethods;

  const handleSubmitForm = useCallback(
    async (values: EditToDoTaskFormValues) => {
      editTask(task.id, values);
      onCancel();
    },
    [editTask, onCancel, task.id]
  );

  return (
    <FormProvider {...formMethods}>
      <Stack
        direction={"row"}
        spacing={1}
        component={"form"}
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <FormTextField
          inputProps={{ maxLength: 43 }}
          name={"title"}
          placeholder="Edit project"
        />
        <IconButton onClick={onCancel}>
          <CancelIcon />
        </IconButton>
      </Stack>
    </FormProvider>
  );
};

export default EditTaskInlineForm;
