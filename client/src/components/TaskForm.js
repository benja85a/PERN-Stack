import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [editing, setEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (editing) {
      await fetch(`http://localhost:3000/tasks/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
    } else {
      await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    setLoading(false);
    navigate("/");
  };

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`);
    const data = await res.json();
    setTask({
      title: data.title,
      description: data.description,
    });
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    } else {
      setEditing(false);
      setTask({
        title: "",
        description: "",
      });
    }
  }, [params.id]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      px={2}
    >
      <Box width={{ xs: "100%", sm: "75%", md: "50%" }}>
        <Card
          sx={{
            bgcolor: "#334155",
            borderRadius: 3,
            boxShadow: 5,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ color: "white", mb: 2 }}
            >
              {editing ? "Edit Task" : "Create New Task"}
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Task Title"
                placeholder="Enter task title"
                fullWidth
                sx={{ mb: 3 }}
                onChange={handleChange}
                name="title"
                value={task.title}
                InputProps={{
                  style: { color: "white" },
                }}
                slotProps={{
                  inputLabel: {
                    style: { color: "white" },
                  },
                }}
              />

              <TextField
                variant="filled"
                label="Description"
                placeholder="Enter task description"
                multiline
                rows={4}
                fullWidth
                sx={{ mb: 3 }}
                onChange={handleChange}
                name="description"
                value={task.description}
                InputProps={{
                  style: { color: "white" },
                }}
                slotProps={{
                  inputLabel: {
                    style: { color: "white" },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!task.title || !task.description}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  py: 1,
                }}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  editing ? "Update Task" : "Create Task"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TaskForm;
