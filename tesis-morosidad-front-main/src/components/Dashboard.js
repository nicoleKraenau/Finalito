import Navbar from './Navbar'
import React, { useState, useEffect, Fragment } from 'react';
import {Typography, Button, Grid,Table,TableBody,TableContainer,TableHead,TableRow,Paper,Container, ListItem, ListItemText, List, Collapse, ListItemButton} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DensityMediumSharpIcon from '@mui/icons-material/DensityMediumSharp';
import { styled } from '@mui/material/styles';
import CardsHeader from './CardsHeader';
import {Spinner} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';

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
  
export default function Dashboard(){

    // Define las variables de estado para los datos
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataDistrito, setDataDistrito] = useState([]);
    const [dataUsuario, setDataUsuario] = useState([]);
    const [dataEstadoCivil, setDataEstadoCivil] = useState([]);
    const [dataNivelEducativo, setDataNivelEducativo] = useState([]);
    const [dataRegion, setDataRegion] = useState([]);
    const [dataMotivo, setDataMotivo] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [datacountClientsNivelEducativo, setCountNivelEducativo] = useState([]);
    const [datacountClientsMotivo, setCountMotivo] = useState([]);
    const [datacountClientsEstadoCivil, setCountEstadoCivil] = useState([]);
    const [datacountClientsDistrito, setCountDistrito] = useState([]);   
    const [datacountClientsRegion, setCountRegion] = useState([]); 
    const [distrito, setDistrito] = useState("");
 
    const [region, setRegion] = useState("");
    const [openList, setOpenList] = useState(false);    
    const [openList2, setOpenList2] = useState(false);
    const [top5clientes,setTopClientes] = useState([]);
    const [dataactualizada,setDataActualizada] = useState(0);
    const [showComponentA, setShowComponentA] = useState(true);
    const [userId, setUserId] = useState('');
    const handleToggle = () => {setOpenList(!openList);};
    const handleToggle2 = () => {setOpenList2(!openList2);};

    const PieEducativo =() => (
      <ResponsivePie
          data={datacountClientsNivelEducativo} 
          style={{ height: '300px' }}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2 ]]
          }}
          arcLinkLabel="label"
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2 ]]
          }}
          legends={[
              {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 50,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                      {
                          on: 'hover',
                          style: {itemTextColor: '#000'}
                      }
                  ]
              }
          ]}
      />
    )

    const PieEstadoCivil =() => (
      <ResponsivePie
          data={datacountClientsEstadoCivil} 
          style={{ height: '300px' }}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2 ]]
          }}
          arcLinkLabel="label"
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2 ]]
          }}
          legends={[
              {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                      {
                          on: 'hover',
                          style: {itemTextColor: '#000'}
                      }
                  ]
              }
          ]}
      />
    )

    const PieMotivo =() => (
      <ResponsivePie
          data={datacountClientsMotivo} 
          style={{ height: '300px' }}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2 ]]
          }}
          arcLinkLabel="label"
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2 ]]
          }}
          legends={[
              {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                      {
                          on: 'hover',
                          style: {itemTextColor: '#000'}
                      }
                  ]
              }
          ]}
      />
    )

    const BarDistrito = () => (
      <ResponsiveBar
          data={datacountClientsDistrito}
          keys={[
              'value',
          ]}
          indexBy="label"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: '#38bcb2',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: '#eed312',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
          borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      1.6
                  ]
              ]
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Distritos',
              legendPosition: 'middle',
              legendOffset: 32
          }}
          axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Cantidad',
              legendPosition: 'middle',
              legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      1.6
                  ]
              ]
          }}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
      />
    )

    const BarRegion = () => (
      <ResponsiveBar
          data={datacountClientsRegion}
          keys={[
              'value',
          ]}
          indexBy="label"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: '#38bcb2',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: '#eed312',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
          borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      1.6
                  ]
              ]
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Regiones',
              legendPosition: 'middle',
              legendOffset: 32
          }}
          axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Cantidad',
              legendPosition: 'middle',
              legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      1.6
                  ]
              ]
          }}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
      />
    )

      const loadData = async () => {
        try {
          const responseRegion = await fetch(process.env.REACT_APP_API_URL + '/region');
          const responseDistrito = await fetch(process.env.REACT_APP_API_URL + '/distrito');
          const responseUsuario = await fetch(process.env.REACT_APP_API_URL + '/usuario');
          const responseEstadoCivil = await fetch(process.env.REACT_APP_API_URL + '/estado');
          const responseNivelEducativo = await fetch(process.env.REACT_APP_API_URL + '/educativo');
          const responseMotivo = await fetch(process.env.REACT_APP_API_URL + '/motivo');
      
          const dataRegion = await responseRegion.json();
          const dataDistrito = await responseDistrito.json();
          const dataUsuario = await responseUsuario.json();
          const dataEstadoCivil = await responseEstadoCivil.json();
          const dataNivelEducativo = await responseNivelEducativo.json();
          const dataMotivo = await responseMotivo.json();
      
          setDataRegion(dataRegion);
          setDataDistrito(dataDistrito);
          setDataUsuario(dataUsuario);
          setDataEstadoCivil(dataEstadoCivil);
          setDataNivelEducativo(dataNivelEducativo);
          setDataMotivo(dataMotivo);

          console.log("datos cargados de loadData");

          if (
            dataRegion.length > 0 &&
            dataDistrito.length > 0 &&
            dataUsuario.length > 0 &&
            dataEstadoCivil.length > 0 &&
            dataNivelEducativo.length > 0 &&
            dataMotivo.length > 0
          ) {
            fillDashboard();
            loadClientes();
            setDataLoaded(true);
            console.log(datacountClientsDistrito,'ggg')
          }
           
        } catch (error) {
          console.error('Error al cargar datos:', error);
        }
      }
  
      // Usa useEffect para cargar los datos cuando el componente se monta
      useEffect(() => {
        const userIdFromStorage = localStorage.getItem('id_usuario');
          console.log("carga la app");
          loadData();
          if (userIdFromStorage) {
            setUserId(userIdFromStorage);
          }
      },[dataLoaded]);


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

    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    const fillDashboard = async() => {
      
      
      let allDistritos = [];
  
      // Siempre realiza una solicitud para obtener todos los distritos
      const responseDistrito = await fetch(process.env.REACT_APP_API_URL + '/distrito');
      allDistritos = await responseDistrito.json();
      const laregion = localStorage.getItem("region");

      if(laregion==="")
      {
        const data = await Promise.all(allDistritos.map(async (e) => {
          const id = e.nombre_distrito;
          const label = e.nombre_distrito;
          const region = e.id_region
          const value = await countClientsbyDistrito(e.id_distrito);
          const color = getRandomColor();
          return { id, label, value, color, region };
        }));
        const filteredData = data.filter((item) => item.value > 0);
        setCountDistrito(filteredData);
        setDataDistrito(allDistritos);
      }
      else{
        const data = await Promise.all(dataDistrito.map(async (e) => {
          const id = e.nombre_distrito;
          const label = e.nombre_distrito;
          const region = e.id_region
          const value = await countClientsbyDistrito(e.id_distrito);
          const color = getRandomColor();
          return { id, label, value, color, region };
        }));
        const filteredData = data.filter((item) => item.value > 0);
        setCountDistrito(filteredData);
      }      

      const data2 = await Promise.all(dataEstadoCivil.map(async (e) => {
        const id = e.tipo_de_estado;
        const label = e.tipo_de_estado;
        const value = await countClientsbyEstadoCivil(e.id_estadocivil);
        const color = getRandomColor();
        return { id, label, value, color };
      }));
      const filteredData2 = data2.filter((item) => item.value > 0);
      setCountEstadoCivil(filteredData2);

      const data3 = await Promise.all(dataMotivo.map(async (e) => {
        const id = e.motivo;
        const label = e.motivo;
        const value = await countClientsbyMotivo(e.id_motivo);
        const color = getRandomColor();
        return { id, label, value, color };
      }));
      const filteredData3 = data3.filter((item) => item.value > 0);
      setCountMotivo(filteredData3);

      const data4 = await Promise.all(dataNivelEducativo.map(async (e) => {
        const id = e.nivel_educativo;
        const label = e.nivel_educativo;
        const value = await countClientsbyEducativo(e.id_niveleducativo);
        const color = getRandomColor();
        return { id, label, value, color };
      }));
      const filteredData4 = data4.filter((item) => item.value > 0);
      setCountNivelEducativo(filteredData4);

      const data5 = await Promise.all(dataRegion.map(async (e) => {
        const id = e.id_region;
        const label = e.nombre_region;
        const value = await countClientsbyRegion(e.id_region);
        const color = getRandomColor();
        return { id, label, value, color };
      }));
      const filteredData5 = data5.filter((item) => item.value > 0);
      setCountRegion(filteredData5);
      setDataActualizada(dataactualizada);
      console.log("datos cargados de fillDashboard");
      console.log(dataactualizada,filteredData5,data5,'0000000000000000000000000000000000000')
    }

    const filtropordistrito = async (ident) => {
      console.log('nicoleaca', ident, dataDistrito)
      setShowComponentA(true);
      // Función para cambiar el estado después de un tiempo
      setTimeout(() => {
          setShowComponentA(false); // Cambiar el estado después de unos segundos
      }, 2000); // 3000 milisegundos = 3 segundos
      const distrito = dataDistrito.find(distrito => distrito.id_distrito === ident);
      console.log(distrito)
      setDistrito(distrito.nombre_distrito);
      console.log(distrito, 'iiiiiiiiiiiiiii');
      localStorage.setItem("region", distrito.nombre_distrito);
  
      const data = await Promise.all(dataDistrito.map(async (e) => {
          if (e.nombre_distrito) { // Verifica si nombre_distrito está definido
              const id = e.nombre_distrito;
              const label = e.nombre_distrito;
              const region = e.id_region;
              const value = await countClientsbyDistrito(e.id_distrito);
              const color = getRandomColor();
              if (e.id_distrito === ident) {
                  return { id, label, value, color, region };
              }
          }
      }));
      console.log(data);
      const filteredData = data.filter((item) => item !== undefined);
      const filteredData2 = filteredData.filter((item) => item.value > 0);
      console.log(filteredData2, 'gggggggggggggg');
      setCountDistrito(filteredData2);
  
      const data2 = await Promise.all(dataEstadoCivil.map(async (e) => {
          const id = e.tipo_de_estado;
          const label = e.tipo_de_estado;
          const value = await countClientsbyEstadoCivilDistrito(e.id_estadocivil, ident);
          const color = getRandomColor();
          return { id, label, value, color };
      }));
      setCountEstadoCivil(data2);
  
      const data3 = await Promise.all(dataMotivo.map(async (e) => {
          const id = e.motivo;
          const label = e.motivo;
          const value = await countClientsbyMotivoDistrito(e.id_motivo, ident);
          const color = getRandomColor();
          return { id, label, value, color };
      }));
      setCountMotivo(data3);
  
      const data4 = await Promise.all(dataNivelEducativo.map(async (e) => {
          const id = e.nivel_educativo;
          const label = e.nivel_educativo;
          const value = await countClientsbyEducativoDistrito(e.id_niveleducativo, ident);
          const color = getRandomColor();
          return { id, label, value, color };
      }));
      setCountNivelEducativo(data4);
  
      const data5 = await countAllClientsbyDistrito(ident);
      setClientes(data5);
  
      // Verifica si data5 es un array antes de intentar usar el método sort()
      if (Array.isArray(data5)) {
          const dataordenada = data5.sort((a, b) => b.deudas - a.deudas);
          setTopClientes(dataordenada.slice(0, 5));
          console.log(dataordenada, 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
          console.log(datacountClientsDistrito.length,'000000000000000000000000000000',datacountClientsDistrito)
      } else {
          // Manejar el caso en el que data5 no es un array
          console.error('Error: data5 no es un array');
          console.log(datacountClientsRegion.length,'000000000000000000000000000000',datacountClientsRegion)
      }
  }
  
    const filtroporregion = async (ident) => {
      setShowComponentA(true);
      // Función para cambiar el estado después de un tiempo
        setTimeout(() => {
          setShowComponentA(false); // Cambiar el estado después de unos segundos
        }, 2000); // 3000 milisegundos = 3 segundos
      
      setRegion(dataRegion[ident-1].nombre_region);
      localStorage.setItem("region", dataRegion[ident-1].nombre_region);

      const responseDistritobyRegion = await fetch(process.env.REACT_APP_API_URL + '/distritosporregion/' + ident+ "/"+userId);
      const distritos = await responseDistritobyRegion.json()
      setDataDistrito(distritos);

      const data = await Promise.all(distritos.map(async (e) => {
        const id = e.nombre_distrito;
        const label = e.nombre_distrito;
        const region = e.id_region;
        const value = await countClientsbyDistrito(e.id_distrito);
        const color = getRandomColor();
        return { id, label, value, color, region };
      }));
      setCountDistrito(data);

      const data2 = await Promise.all(dataEstadoCivil.map(async (e) => {
        const id = e.tipo_de_estado;
        const label = e.tipo_de_estado;
        const value = await countClientsbyEstadoCivilRegion(e.id_estadocivil, ident);
        const color = getRandomColor();
        return { id, label, value, color };
      }));
      const filteredData = data2.filter((item) => item.value > 0);
      setCountEstadoCivil(filteredData);

      const data3 = await Promise.all(dataMotivo.map(async (e) => {
        const id = e.motivo;
        const label = e.motivo;
        const value = await countClientsbyMotivoRegion(e.id_motivo, ident);
        const color = getRandomColor();
        return { id, label, value, color };
      }));
      const filteredData2 = data3.filter((item) => item.value > 0);
      setCountMotivo(filteredData2);

      const data4 = await Promise.all(dataNivelEducativo.map(async (e) => {
        const id = e.nivel_educativo;
        const label = e.nivel_educativo;
        const value = await countClientsbyEducativoRegion(e.id_niveleducativo, ident);
        const color = getRandomColor();
        return { id, label, value, color };
      }));
      const filteredData3 = data4.filter((item) => item.value > 0);
      setCountNivelEducativo(filteredData3);
      
      const data5 = await Promise.all(dataRegion.map(async (e) => {
        const id = e.id_region;
        const label = e.nombre_region;
        const value = await countClientsbyRegion(e.id_region);
        const color = getRandomColor();
        return { id, label, value, color };
      }));
      const filteredData4 = data5.filter((item) => item.id === ident);
      setCountRegion(filteredData4);
console.log(filteredData4,'tttttttttttttttttttttttt')
      const data6 =  await countAllClientsbyRegion(ident);
      setClientes(data6);
      const dataordenada = data6.sort((a, b) => b.deudas - a.deudas);
      setTopClientes(dataordenada.slice(0, 5));

      console.log(dataordenada,data5,data6,'555555555555555')
    }

    const countClientsbyRegion = async (id) => {
      const valor = await fetch(process.env.REACT_APP_API_URL + "/clientesporregion/" + id+"/"+ userId);
      return await valor.json();
    }

    const countAllClientsbyRegion = async (id) => {
      const valor = await fetch(process.env.REACT_APP_API_URL + "/allclientesporregion/" + id +"/"+ userId);
      return await valor.json();
    }

    const countClientsbyDistrito = async (id) => {
      const valor = await fetch(process.env.REACT_APP_API_URL + "/clientespordistrito/" + id+"/"+ userId);
      return await valor.json();
    }

    const countAllClientsbyDistrito = async (id) => {
      const valor = await fetch(process.env.REACT_APP_API_URL + "/allclientespordistrito/" + id+"/"+ userId);
      return await valor.json();
    }

    const countClientsbyEstadoCivil = async (id) => {
      const valor = await fetch(process.env.REACT_APP_API_URL + "/clientesporestadocivil/" + id+"/"+ userId);
      return await valor.json();
    }

    const countClientsbyEstadoCivilDistrito = async (id, distrito) => {
      const valor = await fetch(process.env.REACT_APP_API_URL + "/clientesporestadocivildistrito/" + id + "/" + distrito+ "/" + userId);
      return await valor.json();
    }

    const countClientsbyEstadoCivilRegion = async (id, region) => {
      const valor = await fetch(process.env.REACT_APP_API_URL + "/clientesporestadocivilregion/" + id + "/" + region+ "/" + userId);
      return await valor.json();
    }

    const countClientsbyMotivo = async (id) => {
      const valor = await fetch(process.env.REACT_APP_API_URL + "/clientespormotivo/" + id+"/"+ userId);
      return await valor.json();
    }

    const countClientsbyMotivoDistrito = async (id, distrito) => {
      const valor = await fetch(process.env.REACT_APP_API_URL + "/clientespormotivodistrito/" + id + "/" + distrito+ "/" + userId);
      return await valor.json();
    }

    const countClientsbyMotivoRegion = async (id, region) => {
      const valor = await fetch(process.env.REACT_APP_API_URL + "/clientespormotivoregion/" + id + "/" + region+ "/" + userId);
      return await valor.json();
    }

    const countClientsbyEducativo = async (id) => {
      const valor = await fetch(process.env.REACT_APP_API_URL + "/clientesporeducativo/" + id +"/"+ userId);
      return await valor.json();
    }

    const countClientsbyEducativoDistrito = async (id, distrito) => {
      const valor = await fetch(process.env.REACT_APP_API_URL + "/clientesporeducativodistrito/" + id + "/" + distrito+ "/" + userId);
      return await valor.json();
    }

    const countClientsbyEducativoRegion = async (id, region) => {
      const valor = await fetch(process.env.REACT_APP_API_URL + "/clientesporeducativoregion/" + id + "/" + region+ "/" + userId);
      return await valor.json();
    }
    
    const loadClientes = async () => {
      const response =  await fetch(process.env.REACT_APP_API_URL + '/clientes/'+ userId)
      const data = await response.json();
      setClientes(data);
      const dataordenada = data.sort((a, b) => b.deudas - a.deudas);
      setTopClientes(dataordenada.slice(0, 5));
      console.log("datos cargados de loadClientes");
      console.log(userId)
      console.log(data)
    }

    const edadPromedio = () => {
      let edadsumada = 0;
      // Verificar que clientes sea un array antes de usar map
      if (Array.isArray(clientes)) {
        clientes.map((e) => { edadsumada = edadsumada + calcularEdad(e.fecha_nacimiento); });
        const promedio = edadsumada / clientes.length;
        if (promedio) {
          return promedio.toFixed(0) + " años";
        } else {
          return "No hay datos";
        }
      } else {
        return "No hay datos";
      }
    }
    const morosos = () => {
      if (!Array.isArray(clientes)) {
        return "No hay datos";
      }
    
      // Filtrar los clientes que tienen más de 27 años
      const morosos = clientes.filter((cliente) => {
        return calcularEdad(cliente.fecha_nacimiento) < 150 && cliente.salario<5000 && cliente.cantidad_propiedades<2;
      });
    
      // Devolver el número de clientes que cumplen con el criterio
      return morosos.length;
    };
    const salariomorosos = () => {
      if (!Array.isArray(clientes) || clientes.length === 0) {
          return "No hay datos";
      }
  
      // Filtrar los clientes que tienen más de 27 años y cumplen con las condiciones
      const morososFiltrados = clientes.filter((cliente) => {
          return calcularEdad(cliente.fecha_nacimiento) < 150 && cliente.salario < 5000 && cliente.cantidad_propiedades < 2;
      });
  
      // Si no hay morosos, retornar 0 para el promedio de salario
      if (morososFiltrados.length === 0) {
          return 0;
      }
  
      // Sumar todos los salarios de los morosos
      const sumaSalarios = morososFiltrados.reduce((total, cliente) => {
          return total + parseFloat(cliente.salario);
      }, 0);
  
      // Calcular el promedio dividiendo la suma de salarios entre el número de morosos
      const promedioSalarios = sumaSalarios / morososFiltrados.length;
  
      // Devolver el promedio de salarios
      return promedioSalarios;
  };
  
    const nomorosos = () => {
      if (!Array.isArray(clientes)) {
        return "No hay datos";
      }
    
      // Filtrar los clientes que tienen más de 27 años
      const morosos = clientes.filter((cliente) => {
        return cliente.salario>5000  ;
      });
    
      // Devolver el número de clientes que cumplen con el criterio
      return morosos.length;
    };
    
    const filteredClients = Array.isArray(clientes) ? clientes.filter(cliente => {
      const clienteFechaNacimiento = new Date(cliente.fecha_nacimiento);
      const clienteEdad = Math.floor((new Date() - clienteFechaNacimiento) / 31557600000); // Calcula la edad en años
      return clienteEdad < 150 && cliente.deudas > 0 && cliente.salario<5000 && cliente.cantidad_propiedades<2;
    }) : [];
    
    
  
    const restablecer = () => {
      setShowComponentA(true);
      if(distrito !== ""){ setDistrito("");}
      if(region !== ""){setRegion("");
        localStorage.setItem("region", "");
        setDistrito("");}
        setTimeout(() => {
          setShowComponentA(false); // Cambiar el estado después de unos segundos
        }, 3000); // 3000 milisegundos = 3 segundos
      if(openList){handleToggle();}
      if(openList2){handleToggle2();}
      console.log("hora de restablecer");
      fillDashboard();
      loadClientes();
    }

    // Función para cambiar el estado después de un tiempo
    setTimeout(() => {
      setShowComponentA(false); // Cambiar el estado después de unos segundos
    }, 2000); // 3000 milisegundos = 3 segundos

    return (dataLoaded && (
        <>
          <Navbar/>
          <Container sx={{marginBottom:'2rem'}}>
            <Typography variant='h3' textAlign='center' sx={{margin:"2rem 0"}}>
                DASHBOARD
            </Typography>
            <Grid container spacing={2} sx={{marginTop:'2rem', marginBottom:'2rem'}}>
              <Grid item xs={10}>
                <Grid container>
                  <Grid item xs={12} md={6} sx={{height: 400, marginBottom:'2rem'}}>
                    <Typography variant="h6" sx={{marginBottom:'.5rem', textAlign:'center', fontWeight:'bold'}}>Región con mayor número de morosos</Typography>               
                    {showComponentA
                    ? <Typography sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh',}}> <Spinner color="success"/> Cargando</Typography>
                    : <Fragment>
                      {datacountClientsDistrito.length > 0
                      ? <BarRegion/>
                      : <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh',}}>No hay datos</Typography>}
                      
      
                      </Fragment>
                    }
                  </Grid>
                  <Grid item xs={12} md={6} sx={{height: 400,  marginBottom:'2rem'}}>
                    <Typography variant="h6" sx={{marginBottom:'.5rem', textAlign:'center', fontWeight:'bold'}}>Distrito con mayor número de morosos</Typography>              
                    {showComponentA
                    ? <Typography sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh',}}> <Spinner color="success"/> Cargando</Typography>
                    : <Fragment>
                      {datacountClientsDistrito.length > 0
                      ? <BarDistrito/>
                      : <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh',}}>No hay datos</Typography>}
                      </Fragment>
                    }                   
                  </Grid>
                  <Grid item xs={12} md={6} sx={{height: 400,  marginBottom:'2rem'  }}>
                    <Typography variant="h6" sx={{marginTop:'.5rem', textAlign:'center', fontWeight:'bold'}}>Estado civil</Typography>
                    {showComponentA
                    ? <Typography sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh',}}> <Spinner color="success"/> Cargando</Typography>
                    : <Fragment>
                      {datacountClientsDistrito.length > 0
                      ? <PieEstadoCivil/>
                      : <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh',}}>No hay datos</Typography>}
                      </Fragment>
                    }                          
                  </Grid>
                  <Grid item xs={12} md={6} sx={{height: 400,  marginBottom:'2rem'  }}>
                    <Typography variant="h6" sx={{marginTop:'.5rem', textAlign:'center', fontWeight:'bold'}}>Nivel educacional</Typography>                  
                    {showComponentA
                    ? <Typography sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh',}}> <Spinner color="success"/> Cargando</Typography>
                    : <Fragment>
                      {datacountClientsDistrito.length > 0
                      ? <PieEducativo/>
                      : <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh',}}>No hay datos</Typography>}
                      </Fragment>
                    }
                  </Grid>          
                  <Grid item xs={12} sx={{height: 400,  marginBottom:'2rem'  }}>
                    <Typography variant="h6" sx={{marginTop:'.5rem', textAlign:'center', fontWeight:'bold'}}>Motivos recurrentes</Typography>
                    {showComponentA
                    ? <Typography sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh',}}> <Spinner color="success"/> Cargando</Typography>
                    : <Fragment>
                      {datacountClientsDistrito.length > 0
                      ? <PieMotivo/>
                      : <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh',}}>No hay datos</Typography>}
                      </Fragment>
                    }
                  </Grid>              
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{marginTop:'.5rem', textAlign:'center', fontWeight:'bold'}}>Top 5 clientes con más deudas</Typography>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 400 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>DNI</StyledTableCell>
                            <StyledTableCell>Nombre</StyledTableCell>
                            <StyledTableCell>Deudas</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
    {filteredClients.length > 0 ? (
      filteredClients.map(cliente => (
        <StyledTableRow key={cliente.id_cliente}>
          <StyledTableCell component="th" scope="row">{cliente.dni}</StyledTableCell>
          <StyledTableCell>{cliente.nombre_cliente}</StyledTableCell>
          <StyledTableCell>{cliente.deudas}</StyledTableCell>
        </StyledTableRow>
      ))
    ) : (
      <StyledTableRow>
        <StyledTableCell colSpan={3}>
          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh' }}>No hay datos</Typography>
        </StyledTableCell>
      </StyledTableRow>
    )}
  </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{marginTop:'3rem', padding:'.5rem'}}>
                    <Grid container spacing={2}>
                      <Grid item xs={22} md={26}>
                        <CardsHeader titulo="Edad Promedio" texto={edadPromedio()} color="#F85032" font="white"/>
                      </Grid>
                      <Grid item xs={22} md={26}>
                      
                      </Grid>
                      <Grid item xs={22} md={26}>
                        <CardsHeader titulo="Clientes morosos" texto={morosos()} color="#F85032" font="white"/>
                      </Grid>
                      <Grid item xs={22} md={26}>
                        <CardsHeader titulo="Clientes no morosos" texto={nomorosos()}  color="#F85032" font="white"/>
                      </Grid>
                      <Grid item xs={22} md={26}>
                        <CardsHeader titulo="Salario Promedio" texto={salariomorosos()} color="#F85032" font="white"/>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6" sx={{marginBottom:'.5rem', textAlign:'center', fontWeight:'bold'}}>Filtro por región y distrito</Typography>               
                  <Button variant='contained' fullWidth sx={{backgroundColor:"#B9B9B9", ':hover':{backgroundColor:'#B9B9B9'}}} endIcon={<DensityMediumSharpIcon />} onClick={handleToggle2}>Regiones</Button>
                      <Collapse in={openList2}>
                        <Paper style={{ height: 300, overflow: 'auto' }}>
                          <List>
                            {dataRegion.map((d) =>(
                              <ListItem key={d.id_region}>
                                <ListItemButton onClick={() => filtroporregion(d.id_region)}>
                                {d.nombre_region === region 
                                  ? <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{d.nombre_region}</span>}/> 
                                  : <ListItemText primary={d.nombre_region}/>
                                }
                                </ListItemButton>
                              </ListItem>))
                            }
                            <ListItem>
                              <ListItemButton onClick={()=>restablecer()}>
                                <ListItemText primary="Restablecer"/>
                              </ListItemButton>
                            </ListItem>
                          </List>
                        </Paper>
                      </Collapse>
                  <Button variant='contained' fullWidth sx={{marginTop:"1rem", backgroundColor:"#B9B9B9", ':hover':{backgroundColor:'#B9B9B9'}}} endIcon={<DensityMediumSharpIcon />} onClick={handleToggle}>Distritos</Button>
                      <Collapse in={openList}>
                        <Paper style={{ height: 300, overflow: 'auto' }}>
                          <List>
                            {dataDistrito.map((d) =>(
                              
                              <ListItem key={d.id_distrito}>
                                <ListItemButton onClick={() => filtropordistrito(d.id_distrito)}>
                                {d.nombre_distrito === distrito 
                                  ? <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{d.nombre_distrito}</span>}/> 
                                  : <ListItemText primary={d.nombre_distrito}/>
                                }
                                </ListItemButton>
                              </ListItem>))
                            }
                            <ListItem>
                              <ListItemButton onClick={()=>restablecer()}>
                                <ListItemText primary="Restablecer"/>
                              </ListItemButton>
                            </ListItem>
                          </List>
                        </Paper>
                      </Collapse>
                <Typography variant="h6" sx={{marginY:'.5rem', textAlign:'center', fontWeight:'bold'}}>Filtros elegidos:</Typography>
                <Typography variant="h6" sx={{marginBottom:'.5rem', textAlign:'center'}}>Region: {region}</Typography>
                <Typography variant="h6" sx={{marginBottom:'.5rem', textAlign:'center'}}>Distrito: {distrito}</Typography>
              </Grid>    
            </Grid>
          </Container>
        </>
        
    ))
}