import { pool } from "../db.js";

  export const getAlldistritos = async (req, res, next) => {
    try {
      const allTasks = await pool.query("SELECT * FROM Distrito ");
      res.json(allTasks.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getDistrito = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM Distrito WHERE id_distrito= $1`, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Distrito no encontrado"
      })
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };

  export const getAllregion = async (req, res, next) => {
    try {
      const allTasks = await pool.query("SELECT * FROM Region");
      res.json(allTasks.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getRegion = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM Region WHERE id_region= $1`, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Region no encontrado"
      })
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };

  export const getAllusuario = async (req, res, next) => {
    try {
      const allTasks = await pool.query("SELECT * FROM usuario");
      res.json(allTasks.rows);
    } catch (error) {
      next(error);
    }
  };
  export const getAllestado = async (req, res, next) => {
    try {
      const allTasks = await pool.query("SELECT * FROM estado_civil ");
      res.json(allTasks.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getEstado = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM estado_civil WHERE id_estado_civil= $1`, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Estado civil no encontrado"
      })
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };

  export const getAlleducativo = async (req, res, next) => {
    try {
      const allTasks = await pool.query("SELECT * FROM nivel_educativo ");
      res.json(allTasks.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getEducativo = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM nivel_educativo WHERE id_nivel_educativo= $1`, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Nivel educativo no encontrado"
      })
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };

  export const getAllmotivo= async (req, res, next) => {
    try {
      const allTasks = await pool.query("SELECT * FROM motivo_prestamo ");
      res.json(allTasks.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getMotivo = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM motivo_prestamo WHERE id_motivo_prestamo= $1`, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Motivo no encontrado"
      })
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };

  export const getAllClientes = async (req, res, next) => {
    try {
      const allTasks = await pool.query("SELECT * FROM cliente ORDER BY id_cliente ASC");
      res.json(allTasks.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getCliente = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM cliente WHERE id_cliente = $1`, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Cliente no encontrado"
      })
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyNivelEducativo = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_niveleducativo = $1 
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;
`, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Cliente no encontrado"
      })
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyNivelEducativoDistrito = async (req, res, next) => {
    try {
      const {id, distrito} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_niveleducativo = $1 
      AND id_distrito = $2 
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;`, [id, distrito]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyNivelEducativoRegion = async (req, res, next) => {
    try {
      const {id, region} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      JOIN distrito ON cliente.id_distrito = distrito.id_distrito 
      JOIN region ON region.id_region = distrito.id_region 
      WHERE cliente.id_niveleducativo = $1 
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2 
      AND region.id_region = $2;`, [id, region]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyMotivo = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_motivo = $1 
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;`, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Cliente no encontrado"
      })
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyMotivoDistrito = async (req, res, next) => {
    try {
      const {id, distrito} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_motivo = $1 AND id_distrito = $2 
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;`, [id, distrito]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyMotivoRegion = async (req, res, next) => {
    try {
      const {id, region} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      JOIN distrito ON cliente.id_distrito = distrito.id_distrito 
      JOIN region ON region.id_region = distrito.id_region 
      WHERE cliente.id_motivo = $1 
      AND region.id_region = $2 
      AND EXTRACT(YEAR FROM age(cliente.fecha_nacimiento)) < 27 
      AND cliente.cantidad_propiedades < 2;
      `, [id, region]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyEstadoCivil = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_estadocivil = $1 
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;
      `, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Cliente no encontrado"
      })
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyEstadoCivilDistrito = async (req, res, next) => {
    try {
      const {id, distrito} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_estadocivil = $1 
      AND id_distrito = $2 
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;
      `, [id, distrito]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyEstadoCivilRegion = async (req, res, next) => {
    try {
      const {id, region} = req.params;
      const result = await pool.query(`SELECT * 
      FROM cliente 
      JOIN distrito ON cliente.id_distrito = distrito.id_distrito 
      JOIN region ON region.id_region = distrito.id_region 
      WHERE cliente.id_estadocivil = $1 
        AND region.id_region = $2 
        AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
        AND cantidad_propiedades < 2;
      `, [id, region]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyDistrito = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_distrito = $1 
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;`, [id]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getAllClientesbyDistrito = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM cliente 
      WHERE id_distrito = $1 
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2`, [id]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Cliente no encontrado"
      })
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getClientesbyRegion = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * 
      FROM cliente 
      JOIN distrito ON cliente.id_distrito = distrito.id_distrito 
      JOIN region ON region.id_region = distrito.id_region 
      WHERE region.id_region = $1
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2`, [id]);
      res.json(result.rows.length);
    } catch (error) {
      next(error);
    }
  };

  export const getAllClientesbyRegion = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * 
      FROM cliente 
      JOIN distrito ON cliente.id_distrito = distrito.id_distrito 
      JOIN region ON region.id_region = distrito.id_region 
      WHERE region.id_region = $1
      AND EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27 
      AND cantidad_propiedades < 2;
      `, [id]);
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  };

  export const getDistritosbyRegion = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM distrito
      WHERE id_region = $1
      AND id_distrito IN (
        SELECT id_distrito FROM cliente
        WHERE EXTRACT(YEAR FROM age(fecha_nacimiento)) < 27
        AND cantidad_propiedades < 2
      );`, [id]);
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  }; 

  export const getClientsbyDNI = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM cliente WHERE dni ILIKE $1`, [`%${id}%`]);
      if(result.rows.length === 0 ) return res.status(404).json({
        message: "Cliente no encontrado"
      })
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  };

  export const createcliente = async (req, res, next) => {
    try {
      const {
        nombre_cliente,
        dni,
        fecha_nacimiento,
        cantidad_propiedades,
        cantidad_hijos,
        genero,
        id_distrito, // Supongamos que esto es el nombre del distrito
        id_usuario,  // Supongamos que esto es el nombre del usuario
        id_estadocivil, // Supongamos que esto es el tipo de estado civil
        id_niveleducativo, // Supongamos que esto es el nivel educativo
        salario,
        deudas,
        id_motivo, // Supongamos que esto es el motivo del préstamo
      } = req.body;
console.log(req.body)
      // Función para buscar el ID de un elemento en una tabla por su nombre
      //const findIdInTable = async (tableName, columnName, value) => {
      //    const idtabla = "id_"+tableName;
      //    const result = await pool.query(
      //      `SELECT ${idtabla} FROM ${tableName} WHERE ${columnName} = $1`,
      //      [value]
      //    );
      //    return result.rows[0]?.id; // Devuelve el ID si se encuentra, o undefined si no se encuentra
      //};
  

      // Buscar los IDs correspondientes en las tablas relacionadas
      //const distritoId = await findIdInTable('distrito', 'nombre_distrito', id_distrito.nombre_distrito);
      //const usuarioId = await findIdInTable('usuario', 'nombre_usuario', id_usuario.nombre);
      //const estadoCivilId = await findIdInTable('estado_civil', 'tipo_de_estado', id_estadocivil.tipo_de_estado);
      //const nivelEducativoId = await findIdInTable('nivel_educativo', 'nivel_educativo', id_niveleducativo.nivel_educativo);
      //const motivoId = await findIdInTable('motivo_prestamo', 'motivo', id_motivo.motivo);
      //console.log(nombre_cliente);
      //console.log(dni);
      //console.log(fecha_nacimiento);
      //console.log(cantidad_propiedades);
      //console.log(cantidad_hijos);
      //console.log(genero);
      //console.log(id_distrito.id_distrito);
      //console.log(id_usuario.id_usuario);
      //console.log(id_estadocivil.id_estado_civil);
      //console.log(id_niveleducativo.id_nivel_educativo);
      //console.log(salario);
      //console.log(deudas);
      //console.log(id_motivo.id_motivo_prestamo);
      // Insertar el nuevo cliente en la tabla 'cliente' con los IDs correspondientes

      const nuevocliente = await pool.query(
        "INSERT INTO cliente(nombre_cliente, dni, fecha_nacimiento, cantidad_propiedades, cantidad_hijos, genero, id_distrito, id_usuario, id_estadocivil, id_niveleducativo, salario, deudas, id_motivo) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
        [
          nombre_cliente,
          dni,
          fecha_nacimiento,
          cantidad_propiedades,
          cantidad_hijos,
          genero,
          id_distrito.id_distrito, // Utiliza los IDs correspondientes
          id_usuario.id_usuario,
          id_estadocivil.id_estadocivil,
          id_niveleducativo.id_niveleducativo,
          salario,
          deudas,
          id_motivo.id_motivo,
          
        ]
        
      );
  
      // Devolver la respuesta completa
      res.json(nuevocliente.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);    
    }
  };

  export const deleteCliente = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
        const result = await pool.query('DELETE FROM cliente WHERE id_cliente = $1', [id]);
        if(result.rowCount===0) return res.status(404).json({
            message: "Cliente no encontrado"
        })

        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
  };

  export const deleteClientes = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
        const result = await pool.query('DELETE FROM cliente WHERE id_usuario = $1', [id]);
        if(result.rowCount===0) return res.status(404).json({
            message: "El usuario no ha registrado clientes"
        })

        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
  };

  export const deleteAllClientes = async (req, res, next) => {
    try {
        const result = await pool.query('DELETE FROM cliente');
        if(result.rowCount===0) return res.status(404).json({
            message: "No hay clientes registrados en el sistema"
        })

        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
  };

  export const updateCliente = async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        nombre_cliente,
        dni,
        fecha_nacimiento,
        cantidad_propiedades,
        cantidad_hijos,
        genero,
        id_distrito, // Supongamos que esto es el nombre del distrito
        id_usuario,  // Supongamos que esto es el nombre del usuario
        id_estadocivil, // Supongamos que esto es el tipo de estado civil
        id_niveleducativo, // Supongamos que esto es el nivel educativo
        salario,
        deudas,
        id_motivo, // Supongamos que esto es el motivo del préstamo
      } = req.body;

      const result = await pool.query('UPDATE cliente SET nombre_cliente = $1, dni = $2, fecha_nacimiento = $3, cantidad_propiedades = $4, cantidad_hijos = $5, genero = $6,' + 
       ' id_distrito = $7, id_usuario = $8, id_estadocivil = $9, id_niveleducativo = $10, salario = $11, deudas = $12, id_motivo = $13 WHERE id_cliente = $14 RETURNING *', 
       [
          nombre_cliente,
          dni,
          fecha_nacimiento,
          cantidad_propiedades,
          cantidad_hijos,
          genero,
          id_distrito.id_distrito, // Utiliza los IDs correspondientes
          id_usuario.id_usuario,
          id_estadocivil.id_estado_civil,
          id_niveleducativo.id_nivel_educativo,
          salario,
          deudas,
          id_motivo.id_motivo_prestamo,
          id
      ]);
      
      console.log(result);

      if(result.rows.length===0) return res.status(404).json({
          message: "Task not found"
      })
      return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
  };