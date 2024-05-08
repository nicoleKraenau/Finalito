import{ Container, TextField,Button, Grid, CardContent, Card, Snackbar, IconButton, Alert, SnackbarContent} from "@mui/material";
import React, { useEffect, useState } from "react";
import Close from '@mui/icons-material/Close';
import { useNavigate, useParams } from "react-router-dom";
import Navbar2 from "./Navbar2";

const CrearCuenta = () =>{

        const [alert, setAlert] = useState('');
        const [task, setTask] = useState({
          nombre_usuario: "",
          email: "",
          contrasena: "",
        });
        const [loading, setLoading] = useState(false);

        const [usuarios,setUsuarios] = useState();

        const navigate = useNavigate();
        const params = useParams();
      
        useEffect(() => {
          fetch(process.env.REACT_APP_API_URL + '/usuario') // Reemplaza con la ruta correcta
          .then((response) => response.json())
          .then((data) => setUsuarios(data))
          .catch((error) => console.error('Error al cargar datos de usuario:', error));

          if (params.id) {
            loadTask(params.id);
          }
        }, [params.id]);
      
        const [open, setOpen] = useState(false);

        const handleOpen= () => {
          setOpen(true);
        };

        const handleClose = () => {
          setOpen(false);
        };


        const loadTask = async (id) => {
          const res = await fetch(process.env.REACT_APP_API_URL + "/registrousuario/" + id);
          const data = await res.json();
          setTask({ title: data.title, description: data.description });
        };

        function findEmail() {
          return usuarios.some(e => e.email === task.email);
      }
        
      const handleChange = (e) => {
        const { name, value } = e.target;

        // Verificar si el campo es el nombre y si contiene solo letras y espacios
        if (name === "nombre_usuario" && /^[a-zA-Z\s]*$/.test(value)) {
            setTask({ ...task, [name]: value });
        } else if (name !== "nombre_usuario") { // Para otros campos, simplemente actualizar el estado
            setTask({ ...task, [name]: value });
        }
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      const nombreEmpty = task.nombre_usuario === "";
      const emailEmpty = task.email === "";
      const contrasenaEmpty = task.contrasena === "";
      const contrasenaLengthValid = task.contrasena.length > 8; // Verificar la longitud de la contraseña
      const contrasenaSpecialCharValid = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(task.contrasena); // Verificar la presencia de caracteres especiales
  
      if (!nombreEmpty && !emailEmpty && !contrasenaEmpty && contrasenaLengthValid && contrasenaSpecialCharValid) {
          if (!findEmail()) {
              const response = await fetch(process.env.REACT_APP_API_URL + "/registrousuario", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(task),
              });
              const data = await response.json();
              navigate('/login');
          } else {
              setAlert("El correo ya ha sido registrado. Intente con otro.");
              setOpen(true);
          }
      } else {
          let errorMessage = "";
  
          if (nombreEmpty && contrasenaEmpty) {
              errorMessage = "Campos incompletos. ";
          } else if (emailEmpty && contrasenaEmpty) {
              errorMessage = "Campos incompletos. ";
          } else if (emailEmpty && nombreEmpty) {
              errorMessage = "Campos incompletos. ";
          } else {
              if (nombreEmpty) {
                  errorMessage += "Campo nombre incompleto. ";
              }
              if (emailEmpty) {
                  errorMessage += "Campo email incompleto. ";
              }
              if (contrasenaEmpty) {
                  errorMessage += "Campo contraseña incompleto. ";
              }
              if (!contrasenaLengthValid) {
                  errorMessage += "La contraseña debe tener más de 8 caracteres. ";
              }
              if (!contrasenaSpecialCharValid) {
                  errorMessage += "La contraseña debe contener al menos un carácter especial. ";
              }
          }
  
          setAlert(errorMessage.trim()); // Eliminar espacios adicionales al principio y al final
          setOpen(true);
      }
  };
  
          const action = (
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <Close fontSize="small" />
              </IconButton>
            </React.Fragment>
          );

    return (
       <>
        <Navbar2></Navbar2>
        <Container>
          <Grid container spacing={2} sx={{marginTop:'2rem'}}>
            <Grid item xs sx={{display:'flex', justifyContent:'center',alignItems:'center'}}>
              <img src='./images/CreditGuard.jpg' alt="Logo de CreditGuard"></img>
            </Grid>
            <Grid item xs>
              <Card sx={{ marginTop:'1.4rem'}}>
                <CardContent>
                  <h1 style={{textAlign:'center'}}>Crear Cuenta</h1>
                  <form onSubmit={handleSubmit}>
                    <TextField onChange={handleChange} style={{marginBottom:'2rem'}} fullWidth name="nombre_usuario" id="filled-basic" label="Nombre" variant="filled" value={task.nombre_usuario}/>
                    <TextField onChange={handleChange} style={{marginBottom:'2rem'}} fullWidth name="email" id="filled-basic1" label="Email" variant="filled" type="email" value={task.email}/>
                    <TextField onChange={handleChange} style={{marginBottom:'2rem'}} fullWidth name="contrasena"  id="filled-basic2" label="Contraseña" variant="filled" type="password" value={task.contrasena}/>
                    <Button fullWidth variant="contained" type="submit">Crear Cuenta</Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <SnackbarContent message={alert} action={action} sx={{backgroundColor:'red'}}></SnackbarContent>
                    </Snackbar>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
       </>
    );
    
};
export default CrearCuenta