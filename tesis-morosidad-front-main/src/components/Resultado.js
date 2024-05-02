import Navbar from './Navbar'
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import{Typography,Checkbox, FormControlLabel, Collapse, List, ListItem, ListItemText, TableSortLabel,TablePagination,Button,Modal, Box, Grid,Table,TableBody,TableContainer,TableHead,TableRow,Paper,Container, TextField,Select, MenuItem } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Papa from 'papaparse';
import DensityMediumSharpIcon from '@mui/icons-material/DensityMediumSharp';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import Cards from './Cards';
import { usePalabra } from './prueba';

  

export default function Resultado(){
  const [alertOpen, setAlertOpen] = useState(false);
  
// Define las variables de estado para los datos
const [dataLoaded, setDataLoaded] = useState(false);
const [dataDistrito, setDataDistrito] = useState([]);
const [dataUsuario, setDataUsuario] = useState([]);
const [dataEstadoCivil, setDataEstadoCivil] = useState([]);
const [dataNivelEducativo, setDataNivelEducativo] = useState([]);
const [dataRegion, setDataRegion] = useState([]);
const [dataMotivo, setDataMotivo] = useState([]);
const [clientes, setClientes] = useState([]);
const [porcentajes, setPorcentajes] = useState([]);
const [clientesExport, setClientesExport] = useState([]);
const [dni, setDNI] = useState('');
const { palabra } = usePalabra();
const [filterType, setFilterType] = useState('dni'); // Estado para almacenar el tipo de filtro seleccionado
const [userId, setUserId] = useState('');
const [filterValue, setFilterValue] = useState(''); // Estado para almacenar el valor del filtro
const [showHeaders, setShowHeaders] = useState(false);
const [initialPorcentajes, setInitialPorcentajes] = useState([]);
const [defaultOrder, setDefaultOrder] = React.useState('asc');
const [defaultOrderBy, setDefaultOrderBy] = React.useState('porcentaje');
const [filterOptions, setFilterOptions] = useState({
    dni: true,
    nombre: false,
    salario: false,
    distrito: false,
  edad:false,
    motivo: false,
    educacion: false,
    porcentaje:true,
});
const [selectedFilters, setSelectedFilters] = useState([]); // Estado para almacenar los filtros seleccionados
const [clientesFiltrados, setClientesFiltrados] = useState([]); // Estado para almacenar los clientes filtrados
console.log(palabra)
// Define selectedFilterCategories como un arreglo vacío o con algún valor inicial



const [selectedFilterCategories, setSelectedFilterCategories] = useState([]);

// Otras variables y estados... // Estado para almacenar los clientes filtrados// Estado para almacenar los filtros seleccionados

// Otras variables y estados...

const handleApplyFilters = () => {
  // Actualizar la lista de filtros seleccionados
  const newSelectedFilters = Object.keys(filterOptions).filter(filter => filterOptions[filter]);
  setSelectedFilters(newSelectedFilters);

  // Actualizar la lista de categorías de filtro seleccionadas
  const newSelectedFilterCategories = Object.keys(filterOptions).filter(filter => filterOptions[filter]);
  setSelectedFilterCategories(newSelectedFilterCategories);

  // Aplicar el filtro a los clientes según los filtros seleccionados
  let filteredClients = [...clientes];
  newSelectedFilters.forEach(filter => {
    if (filter === 'dni') {
      // Si el filtro es por DNI, aplicar el filtro directamente sobre la lista de clientes
      filteredClients = filteredClients.filter(cliente =>
        cliente.dni.toLowerCase().includes(dni.toLowerCase())
      );
    } else {
      // Para otros filtros, aplicar la lógica de filtrado correspondiente
      filteredClients = filteredClients.filter(cliente => cliente[filter]);
    }
  });

  // Actualizar el estado con la lista de clientes filtrados
  setClientesFiltrados(filteredClients);

  // Mostrar las cabeceras de la tabla después de aplicar los filtros
  setShowHeaders(true);
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'asc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'dni',
    numeric: false,
    disablePadding: false,
    label: 'DNI',
  },
  {
    id: 'porcentaje', //falta cambiarlo a porcentaje de morosidad
    numeric: false,
    disablePadding: false,
    label: 'Porcentaje',
  },
  {
    id: 'nombre',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  
  {
    id: 'distrito',
    numeric: false,
    disablePadding: false,
    label: 'Distrito',
  },
  {
    id: 'motivo', 
    numeric: false,
    disablePadding: false,
    label: 'Motivo',
  },
  {
    id: 'salario',
    numeric: false,
    disablePadding: false,
    label: 'Salario',
  },
  {
    id: 'niveleducativo', //falta cambiarlo a porcentaje de morosidad
    numeric: false,
    disablePadding: false,
    label: 'Educación',
  },
  {
    id: 'edad',
    numeric: false,
    disablePadding: false,
    label: 'Edad',
  },



];

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
const [hoveredColumn, setHoveredColumn] = useState(null); // Aquí se agrega el estado

const createSortHandler = (property) => (event) => {
  onRequestSort(event, property);
  setHoveredColumn(property);
};
    
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
         filterOptions[headCell.id] && 
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{backgroundColor:'#000000'}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)} sx={{color:'#ffffff', ':hover':{color:'#ffffff'}, '&.Mui-active':{color:'#ffffff'}, '& .MuiTableSortLabel-icon':{color:'#ffffff !important'}}}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};



  // Renderizado del componente...
    const [open, setOpen] = useState([]);

      const handleOpen = (clientIndex) => {
        const newOpen= [...open];
        console.log(newOpen);
        newOpen[clientIndex] = true;
        setOpen(newOpen);
      };

      const handleClose = (clientIndex) => {
        const newOpen= [...open];
        console.log(newOpen);
        newOpen[clientIndex] = false;
        setOpen(newOpen);
      };

      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 5,
        p: 3,
      };
      const { pbi } = useParams();

      const handleChangeFilterType = (event) => {
        setFilterType(event.target.value);
    };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('percentage');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [openList, setOpenList] = useState(false);
  
    const handleToggle = () => {setOpenList(!openList);};
    const [openList2, setOpenList2] = useState(false);
  
    const handleToggle2 = () => {setOpenList2(!openList2);};

    const loadData = async () => {
      try {
        // Carga los datos de distrito
        const regionResponse = await fetch(process.env.REACT_APP_API_URL + '/region');
        const regionData = await regionResponse.json();
        setDataRegion(regionData);
    
        const distritoResponse = await fetch(process.env.REACT_APP_API_URL + '/distrito');
        const distritoData = await distritoResponse.json();
        setDataDistrito(distritoData);
    
        const usuarioResponse = await fetch(process.env.REACT_APP_API_URL + '/usuario');
        const usuarioData = await usuarioResponse.json();
        setDataUsuario(usuarioData);
    
        const estadoResponse = await fetch(process.env.REACT_APP_API_URL + '/estado');
        const estadoData = await estadoResponse.json();
        setDataEstadoCivil(estadoData);
    
        const educativoResponse = await fetch(process.env.REACT_APP_API_URL + '/educativo');
        const educativoData = await educativoResponse.json();
        setDataNivelEducativo(educativoData);
    
        const motivoResponse = await fetch(process.env.REACT_APP_API_URL + '/motivo');
        const motivoData = await motivoResponse.json();
        setDataMotivo(motivoData);
    
        // Carga los datos de los clientes
        // fetch(process.env.REACT_APP_API_URL + '/clientes') // Reemplaza con la ruta correcta
        // .then((response) => response.json())
        // .then((data) => setClientes(data))
        // .catch((error) => console.error('Error al cargar datos de los clientes:', error));
        
        if(dataRegion && dataDistrito && dataUsuario && dataEstadoCivil && dataNivelEducativo && dataMotivo) {
        setDataLoaded(true);
        loadClientes();
        console.log(loadClientes())
        } 
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    }

    // Usa useEffect para cargar los datos cuando el componente se monta
    
    const exportClients = async () => {
      console.log('hhhhhhhuuuuuuuuuuuuuuuu')
      if (clientes.length === 0) {
       // setAlertOpen("El valor del PBI no puede estar vacío. Por favor, ingresa un valor válido.");
        console.log('jjjj')
        setAlertOpen(true);
        return;
      }
    console.log('hhhhhhhuuuuuuuuuuuuuuuu')
    let clientstoExport = [];
    clientes.forEach(element => {

      console.log(porcentajes)
        // Obtener el porcentaje correspondiente al ID del usuario
        const porcentaje = calcularPorcentaje(element); // Calcula el porcentaje
    
        const client = {
            id_cliente: element.id_cliente,
            nombre_cliente: element.nombre_cliente,
            dni: element.dni,
            fecha_nacimiento: element.fecha_nacimiento,
            cantidad_propiedades: element.cantidad_propiedades,
            cantidad_hijos: element.cantidad_hijos,
            genero: element.genero ? 'Hombre' : "Mujer",
            distrito: element.id_distrito.nombre_distrito, 
            usuario: element.id_usuario.nombre_usuario,
            estadocivil: element.id_estadocivil.tipo_de_estado,
            niveleducativo: element.id_niveleducativo.nivel_educativo,
            salario: element.salario,
            deudas: element.deudas,
            motivo: element.id_motivo.motivo,
            porcentaje: porcentaje,
        };
        console.log(client)
        clientstoExport.push(client);
      });
    
      const csvData = Papa.unparse(clientstoExport);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'data.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    };
    
  
    function calcularEdad(fechaNacimiento) {
      const fechaNacimientoArray = fechaNacimiento.split('-');
      const anioNacimiento = parseInt(fechaNacimientoArray[0], 10);
      const mesNacimiento = parseInt(fechaNacimientoArray[1], 10);
      const diaNacimiento = parseInt(fechaNacimientoArray[2], 10);
    
      const fechaActual = new Date();
      const diaActual = fechaActual.getDate();
      const mesActual = fechaActual.getMonth() + 1;
      const anioActual = fechaActual.getFullYear();
    
      let edad = anioActual - anioNacimiento;
    
      // Ajustar la edad si aún no se ha alcanzado el cumpleaños de este año
      if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
        edad--;
      }
    
      return edad;
    }
    const loadClientes = async () => {
      const response = await fetch(`http://localhost:4000/api/clientes/${userId}`);
      const data = await response.json();
      let clients = [];
      let porcentajesArray = []; // Define el array de porcentajes aquí
      data.forEach(element => {
        const fecha = new Date(element.fecha_nacimiento);
        const anio = fecha.getFullYear(); // 2023
        let mes = null;
        let dia = null;
    
        if (fecha.getMonth() + 1 < 10) {
          mes = "0" + (fecha.getMonth() + 1);
        } else {
          mes = fecha.getMonth() + 1;
        }
        if (fecha.getDate() < 10) {
          dia = "0" + fecha.getDate();
        } else {
          dia = fecha.getDate();
        }
        const distrito = dataDistrito.find((item) => item.id_distrito === element.id_distrito);
        const motivo = dataMotivo.find((item) => item.id_motivo === element.id_motivo);
        const usuario = dataUsuario.find((item) => item.id_usuario === element.id_usuario);
        const estadocivil = dataEstadoCivil.find((item) => item.id_estadocivil === element.id_estadocivil);
        const niveleducativo = dataNivelEducativo.find((item) => item.id_niveleducativo === element.id_niveleducativo);
    
        const edad = calcularEdad(element.fecha_nacimiento);
        const porcentaje = calcularPorcentaje(element); // Calcula el porcentaje
    
        console.log(distrito);

        // Verifica el porcentaje calculado
        console.log("Porcentaje calculado:", porcentaje);
    
        // Crea un objeto que contenga el ID del usuario y el porcentaje
        const porcentajeObjeto = {
          id_usuario: element.id_usuario,
          porcentaje: porcentaje
        };
    
        // Agrega este objeto al array de porcentajes
        porcentajesArray.push(porcentajeObjeto);
    
        // Si la edad es mayor a 10, agrega el cliente a la lista
        if (edad < 150 && element.salario <5000 && element.cantidad_propiedades<2 && element.cantidad_hijos>0) {
          clients.push({
            ...element,
            anio_nacimiento: anio,
            mes_nacimiento: mes,
            dia_nacimiento: dia,
            id_distrito: distrito,
            id_motivo: motivo,
            id_usuario: usuario,
            id_estadocivil: estadocivil,
            id_niveleducativo: niveleducativo,
          });
        }
      });
    
      // Ordena los clientes por deudas de forma descendente
      clients.sort((a, b) => b.deudas - a.deudas);
    
      // Establece los clientes filtrados en el estado
      setClientes(clients);
    
      // Calcula los top clientes
      const topClientes = clients.slice(0, 5);
   //   setTopClientes(topClientes);
    
      // Establece el array de porcentajes en el estado
      setPorcentajes(porcentajesArray);
    
      console.log("Datos cargados de loadClientes");
      console.log(userId);
      console.log(clients,'55555555555555555555');
   
    };
    
    
    
    const handleRequestSort = (event, property) => {
      // Determinar el nuevo orden y la columna por la que se ordenará
      let newOrder;
      let orderByProperty = property;
      console.log("Columna seleccionada:", property);
    
      if (property === 'porcentaje') {
        // Ordenar por la columna 'porcentaje'
        console.log("Ordenando por 'porcentaje'");
        newOrder = orderBy === 'porcentaje' && order === 'desc' ? 'asc' : 'desc';  // Invertir el orden si la columna es 'porcentaje'
      } else if (property === 'salario') {
        // Ordenar por la columna 'fecha'
        console.log("Ordenando por 'fecha'");
        newOrder = orderBy === 'asc' ? 'desc' : 'asc'; // Invertir el orden si la columna es 'fecha'
      } else {
        // Ordenar por otras columnas
        console.log("Ordenando por otra columna");
        newOrder = orderBy === property && order === 'asc' ? 'desc' : 'asc'; // Cambiar el orden si es la misma columna, de lo contrario, cambiar a ascendente
      }
    
      // Establecer el nuevo orden y la columna por la que se ordenará
      console.log("Nuevo orden:", newOrder);
      setOrder(newOrder);
      setOrderBy(orderByProperty);
    
      const sortedClientes = [...clientes].sort((a, b) => {
        if (property === 'porcentaje') {
          console.log('hhhhhhhhhhjjjhhh')
     
       // Obtener el índice del cliente en el arreglo de porcentajes
       const indexA = clientes.indexOf(a);
       const indexB = clientes.indexOf(b);
       console.log(indexA)
       // Obtener los porcentajes correspondientes a cada cliente
       const porcentajeA = porcentajes[indexA] || 0;
       const porcentajeB = porcentajes[indexB] || 0;

    console.log(porcentajes)
    console.log(porcentajeA > porcentajeB)
    console.log(porcentajeA > porcentajeB  ? 1 : -1 )
          // Comparar y ordenar los clientes basados en los porcentajes
          return newOrder === 'asc' ? porcentajeA > porcentajeB  ? 1 : -1 : porcentajeB > porcentajeA  ? 1 : -1 ;
        } 
      });
    
      // Actualizar el estado de los clientes con el arreglo ordenado
      setClientes(sortedClientes);
    
      // Mostrar el estado cuando el orden es ascendente
      if (newOrder === 'asc' ) {
        console.log("Nuevo orden ascendente:", sortedClientes);
      }
      if (newOrder === 'desc') {
        console.log("Nuevo orden descendente:", sortedClientes);
      }
    };
    
    useEffect(() => {
      const userIdFromStorage = localStorage.getItem('id_usuario');
        loadData();
        if (userIdFromStorage) {
          setUserId(userIdFromStorage);
        }

        setOrder(defaultOrder);
        setOrderBy(defaultOrderBy);
        handleRequestSort(null, defaultOrderBy);
    }, [dataLoaded]);
    
    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setAlertOpen(false);


    };
    
    
    const handleChangeFilterOption = (event) => {
      // Deshabilitar la opción de cambio si el nombre del filtro es "dni"
      if (event.target.name === "dni") {
        return;
      }
      setFilterOptions({
        ...filterOptions,
        [event.target.name]: event.target.checked,
      });
    };
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangeDNI = (e) =>{
      const newValue = e.target.value;
      if (/^[0-9]*$/.test(newValue)) {
        setDNI(newValue);
      }
    }
    const getVisibleColumns = () => {
      const columns = ["DNI","Porcentaje"]; // Asegura que la columna "DNI" siempre esté presente
  
      if (filterOptions.nombre) columns.push("Nombre");
      if (filterOptions.distrito) columns.push("Distrito");
      if (filterOptions.motivo) columns.push("Motivo");
      if (filterOptions.salario) columns.push("Salario");
      if (filterOptions.niveleducativo) columns.push("Educación");
      if (filterOptions.edad) columns.push("Edad");
     
    ;
      return columns;
    };
    

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clientes.length) : 0;

    const visibleRows = React.useMemo(
      () => {
        if (dni === '') {
          // Si el campo de DNI está vacío, mostrar todos los registros
          return stableSort(clientes, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          );
        } else {
          // Si se ha ingresado un valor en el campo de DNI, filtrar los registros
          const filteredClientes = clientes.filter((cliente) =>
            cliente.dni.toLowerCase().includes(dni.toLowerCase())
          );
          console.log(filteredClientes);
          return stableSort(filteredClientes, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          );
        }
      },[order, orderBy, page, rowsPerPage, clientes, dni],);

const calcularPorcentaje = (cliente) => {
  console.log('kkkkkkkkkkkkkkk')
  const porcentaje = Math.max(
    0,
    Math.min(
      100,
      Math.min(
        ((((cliente.salario) * palabra / ((cliente.deudas + 1) * (cliente.cantidad_propiedades + 1) * (cliente.cantidad_hijos + 1) * calcularEdad(cliente.fecha_nacimiento))) * 0.01) - 50) * -1,
        1000000
      )
    )
  );
  return porcentaje;
};



    return (dataLoaded && (
        <>
          <Navbar/>
          <Typography variant='body1' sx={{ marginBottom:'2rem'}}>
  El ID del usuario actual es: {userId}
</Typography>
          <Container sx={{marginBottom:'2rem'}}>
            <Typography variant='h3' textAlign='center' sx={{margin:"2rem 0"}}>
                RESULTADO DE CLIENTES MOROSOS
            </Typography>
            <p>El valor de PBI es: {palabra}</p>

            <Grid container spacing={2} sx={{marginTop:'2rem'}}>
            
              <Grid item xs={2}>
                    {/*
                    <Input type="file" id='file-upload' accept=".csv" onChange={handleFileChange} sx={{display:'none'}}></Input> 
                    <label htmlFor="file-upload"><Button variant='contained' fullWidth component="span" sx={{marginBottom:'2rem'}}>Importar</Button> </label>
                    <Button variant='contained' fullWidth component={Link} sx={{marginBottom:'2rem'}} to="/agregarcliente" >Agregar</Button>*/}
                    <Button variant='contained' fullWidth sx={{backgroundColor:"#B9B9B9", ':hover':{backgroundColor:'#B9B9B9'}}} endIcon={<DensityMediumSharpIcon />} onClick={handleToggle2}>Variables evaluadas</Button>
                    <Collapse in={openList2}>
                      <Paper>
                        <List>
                          <ListItem>
                            <ListItemText primary="Salario" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="PBI" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Deudas" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Hijos" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Propiedades" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Estado civil" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Nivel estudiantil" />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Motivo" />
                          </ListItem>
                        </List>
                      </Paper>
                    </Collapse>
                    <Button
                    variant='contained'
                    fullWidth
                    sx={{ marginTop: '1rem', backgroundColor: "#B9B9B9", ':hover': { backgroundColor: '#B9B9B9' } }}
                    endIcon={<DensityMediumSharpIcon />}
                    onClick={handleToggle}
                >
                    Filtrar
                </Button>
                {openList && (
                    <Paper>
                   
                    <FormControlLabel
                        control={<Checkbox checked={filterOptions.nombre} onChange={handleChangeFilterOption} name="nombre" />}
                        label="Nombre"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={filterOptions.salario} onChange={handleChangeFilterOption} name="salario" />}
                        label="Salario"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={filterOptions.distrito} onChange={handleChangeFilterOption} name="distrito" />}
                        label="Distrito"
                    />
                     <FormControlLabel
                        control={<Checkbox checked={filterOptions.edad} onChange={handleChangeFilterOption} name="edad" />}
                        label="Edad"
                    />
                   
                    <FormControlLabel
                        control={<Checkbox checked={filterOptions.motivo} onChange={handleChangeFilterOption} name="motivo" />}
                        label="Motivo"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={filterOptions.niveleducativo} onChange={handleChangeFilterOption} name="niveleducativo" />}
                        label="Educación"
                    />
                   
               <Button
          variant='contained'
          fullWidth
          sx={{ marginTop: '1rem', backgroundColor: "#1976D2" }}
          onClick={handleApplyFilters}
    >
        Aplicar
    </Button>
                    </Paper>
                )}
                
              </Grid>
              <Grid item xs={10}>
   <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <EnhancedTableHead
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={clientes.length}
                    />
      
      <TableBody>
        
        {visibleRows.map((cliente, i) => (
          <React.Fragment key={cliente.id_cliente}>
            
            <StyledTableRow key={cliente.id_cliente} onClick={() => handleOpen(cliente.id_cliente)}>
           
              {getVisibleColumns().map((column) => (
                <StyledTableCell key={column}>
                  {column === "DNI" && cliente.dni}
                  {column === "Nombre" && cliente.nombre_cliente}
                  {column === "Distrito" && cliente.id_distrito}
                  {column === "Salario" && cliente.salario}
                  {column === "Edad" && calcularEdad(cliente.fecha_nacimiento)}
                  {column === "Motivo" && cliente.id_motivo}
                  {column === "Educación" && cliente.id_niveleducativo}
                  {column === "Porcentaje" && calcularPorcentaje(cliente)}
                 
                </StyledTableCell>
              ))}
            </StyledTableRow>

      <Modal
        open={open[cliente.id_cliente] || false}
        onClose={() => handleClose(cliente.id_cliente)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" component="div" style={{ textAlign: 'center', marginBottom: '2rem' }}> Datos del cliente</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}> <b>Nombre:</b> {cliente.nombre_cliente} </Typography>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}> <b>DNI:</b> {cliente.dni} </Typography>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}> <b>Fecha Nacimiento:</b> {cliente.fecha_nacimiento} </Typography>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}> <b>Cantidad propiedades:</b> {cliente.cantidad_propiedades} </Typography>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}> <b>Cantidad hijos:</b> {cliente.cantidad_hijos} </Typography>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}> <b>Salario:</b> {cliente.salario} </Typography>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}> <b>Deudas:</b> {cliente.deudas} </Typography>
            </Grid>
            <Grid item xs={6}> 
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}> <b>Region:</b> {dataRegion[cliente.id_distrito.id_region-1] ? dataRegion[cliente.id_distrito.id_region-1].nombre_region : "Region no disponible"} </Typography>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}> <b>Distrito:</b> {cliente.id_distrito.nombre_distrito} </Typography>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}> <b>Usuario:</b> {cliente.id_usuario.nombre} </Typography>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}> <b>Estado Civil:</b> {cliente.id_estadocivil.tipo_de_estado} </Typography>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}> <b>Nivel Educativo:</b> {cliente.id_niveleducativo.nivel_educativo} </Typography>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}> <b>Motivo:</b> {cliente.id_motivo.motivo} </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" display="inline" sx={{ marginRight: '.4rem' }}>
                  Recomendación
                </Typography>
                <Cards sx={{ textAlign: 'center', backgroundColor: '#499BEA', width: '100%' }} texto="Rechazar solicitud" ></Cards>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  ))}
</TableBody>

                  </Table>
                </TableContainer>
                <p></p>
                <p style={{color: 'red', fontWeight: 'bold', fontStyle: 'italic' }}>
  Clientes que no se muestran en la tabla no cuentan con probabilidad de morosidad
</p>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={clientes.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" display="inline" sx={{ marginRight: '.4rem' }}>
                    DNI
                  </Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={dni}
                    onChange={handleChangeDNI}
                  />
                <Button
        variant="contained"
        sx={{ marginLeft: '36rem' }}
        onClick={exportClients}
      >
        Exportar
      </Button>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
        <MuiAlert onClose={handleCloseAlert} severity="error" elevation={6} variant="filled">
          No hay datos para exportar.
        </MuiAlert>
        </Snackbar>
                </Box>
                <p></p>
                
              </Grid>
            </Grid>
          </Container>
        </>      
    )); }