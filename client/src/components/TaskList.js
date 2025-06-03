import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Container,
  Divider,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const loadTasks = async () => {
    const response = await fetch("http://localhost:3000/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const DeleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    return () => {
      window.location.href = `/edit/${id}`;
    };
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        Task List
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {tasks.length === 0 ? (
        <Box mt={4}>
          <Typography variant="body1" align="center" color="text.secondary">
            No tasks available.
          </Typography>
        </Box>
      ) : (
        <Grid container direction="column" spacing={3}>
          {tasks.map((task) => (
            <Grid key={task.id}>
              <Card
                sx={{
                  bgcolor: "#1e293b",
                  color: "white",
                  borderRadius: 2,
                  boxShadow: 6,
                  px: 2,
                  py: 1,
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "transform 0.2s ease-in-out",
                  },
                }}
                key={task.id}
              >
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ color: "white" }}>
                    <Typography variant="h6" gutterBottom>
                      {task.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {task.description}
                    </Typography>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => navigate(`/tasks/${task.id}/edit`)}
                    >
                      Edit
                    </Button> 
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ mt: 2 }}
                      onClick={() => DeleteTask(task.id)}
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default TaskList;
