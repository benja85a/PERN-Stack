import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import { Container } from "@mui/material";
import Menu from "./components/Navbar";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/new" element={<TaskForm />} />
          <Route path="/tasks/:id/edit" element={<TaskForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
